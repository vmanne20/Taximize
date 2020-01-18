import {put, takeLatest, call} from 'redux-saga/effects';
import {AsyncStorage, Platform} from 'react-native';

const base = Platform.OS === "ios" ? 'localhost' : "10.0.2.2";

function* Login(action) {
  var data = {
    email: action.email,
    password: action.password,
  };

  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }

  formBody = formBody.join('&');

  console.log(formBody);

  const json = yield fetch('http://' + base + ':3000/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody,
  }).then(response => response.json())
  .catch(err => console.log(err.message))

  if(json) {
    yield call(AsyncStorage.setItem, "userToken", json.user.userId);
    yield call(AsyncStorage.setItem, "userData", JSON.stringify(json.user));
    yield put({ type: 'LOGIN_SUCCESS', id: json.user.userId, userobj: json.user})
  } else {
    yield put({ type: 'LOGIN_FAILURE', error: true })
  }
}

function* SignUp(action) {
  var data = {
    email: action.email,
    password: action.password,
    name: action.name,
    state: action.state,
    zipCode: action.zipCode,
    username: action.username,
    income: action.income,
    filingStatus: action.maritalStatus
  };

  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }

  formBody = formBody.join('&');

  const json = yield fetch('http://' + base + ':3000/auth/sign-up', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody,
  }).then(response => response.json())
  .catch(err => console.log(err.message))

  if(json) {
    yield call(AsyncStorage.setItem, "userToken", json.user.userId);
    yield call(AsyncStorage.setItem, "userData", JSON.stringify(json.user));

    yield put({ type: 'SIGNUP_SUCCESS', id: json.user.userId, userobj:json.user})
  } else {
    yield put({ type: 'SIGNUP_FAILURE', error: true })
  }
}

function* getUserToken(action) {
  yield put({type: 'GET_TOKEN_SUCCESS', token: action.token, userobj: action.data});
}

function* createProfile(action) {
  delete action.type
  console.log(action)

  var formBody = [];
  for (var property in action) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(action[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }

  formBody = formBody.join('&');
  console.log(formBody)

  yield fetch('http://' + base + ':3000/add-profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody,
  }).then(response => response.json())
  .catch(err => console.log(err.message))

  ///get-all-profiles
  var nBody = [];
  var encodedKey = encodeURIComponent("userId");
  var encodedValue = encodeURIComponent(action.userId);
  nBody.push(encodedKey + '=' + encodedValue);

  nBody = nBody.join('&');

  const json = yield fetch('http://' + base + ':3000/get-all-profiles' + "?" + nBody  , {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
  }).then(response => response.json())
  .catch(err => console.log(err.message))

  console.log(Object.keys(json))

  if(json)
    yield put({ type: 'UPDATE_PROFILES', profiles: json})
}

//watches for actions
export function* loginWatcher() {
  yield takeLatest('LOGIN', Login);
}

export function* signUpWatcher() {
  yield takeLatest('SIGNUP', SignUp);
}

export function* getUserTokenWatcher() {
  yield takeLatest('GET_TOKEN', getUserToken);
}

export function* createProfileWatcher() {
  yield takeLatest('CREATE_PROFILE', createProfile);
}

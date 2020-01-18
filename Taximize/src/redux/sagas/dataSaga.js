import {put, takeLatest, call} from 'redux-saga/effects';
import {AsyncStorage, Platform} from 'react-native';

const base = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';

function* get_expenses(action) {
  var nBody = [];
  var encodedKey = encodeURIComponent('userId');
  var encodedValue = encodeURIComponent(action.userId);
  nBody.push(encodedKey + '=' + encodedValue);

  nBody = nBody.join('&');

  const json = yield fetch(
    'http://' + base + ':3000/get-all-expenses' + '?' + nBody,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    },
  )
    .then(response => response.json())
    .catch(err => console.log(err.message));

  if (json) {
    const keys = Object.keys(json.expenses);
    yield put({type: 'GET_EXPENSES', keys: keys, obj: json.expenses});
  }
}

function* create_expense(action) {
  var data = {
    userId: action.userId,
    profileId: action.profileId,
    description: action.description,
    amount: action.amount,
    category: action.category,
    date: action.date,
    title: action.title,
  };

  var formBody = [];
  for (var property in data) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }

  formBody = formBody.join('&');

  yield fetch('http://' + base + ':3000/add-expense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: formBody,
  })
    .then(response => response.json())
    .catch(err => console.log(err.message));

  var nBody = [];
  var encodedKey = encodeURIComponent('userId');
  var encodedValue = encodeURIComponent(action.userId);
  nBody.push(encodedKey + '=' + encodedValue);

  nBody = nBody.join('&');
  console.log(nBody);

  const json = yield fetch(
    'http://' + base + ':3000/get-all-expenses' + '?' + nBody,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    },
  )
    .then(response => response.json())
    .catch(err => console.log(err.message));

  // console.log('JSON' + JSON.stringify(json));

  const keys = Object.keys(json.expenses);

  if (keys) {
    yield put({type: 'CREATE_EXPENSE_SUCCESS', keys: keys, obj: json.expenses});
  } else {
    yield put({type: 'CREATE_EXPENSE_FAILURE', error: true});
  }
}

function* get_taxes(action) {
  var formBody = [];
  var encodedKey = encodeURIComponent('userId');
  var encodedValue = encodeURIComponent(action.id);
  formBody.push(encodedKey + '=' + encodedValue);
  formBody = formBody.join('&');

  const json = yield fetch(
    'http://' + base + ':3000/get-tax-info' + '?' + formBody,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    },
  )
    .then(response => response.json())
    .catch(err => console.log(err.message));

  if (json)
    yield put({type: 'GET_TAX_SUCCESS', taxes: json});
}

export function* create_expense_watcher() {
  yield takeLatest('CREATE_EXPENSE', create_expense);
}

export function* get_taxes_watcher() {
  yield takeLatest('GET_TAX', get_taxes);
}

export function* get_expenses_watcher() {
  yield takeLatest('GET_EXPENSES', get_expenses);
}

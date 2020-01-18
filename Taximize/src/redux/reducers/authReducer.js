import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  SAVE_TOKEN,
  REMOVE_TOKEN,
  LOADING,
  ERROR,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  RESET,
  CREATE_PROFILE,
  UPDATE_PROFILES,
} from '../actions/index';

initialState = {
  loggedIn: false,
  loading: false,
  token: null,
  userobj: {
    profileList: {},
  },
};

export default authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return state;
    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        loggedIn: action.token !== null,
        token: action.token,
        loading: false,
        userobj: {
          ...action.userobj,
        },
      };
    case SAVE_TOKEN:
      return {...state, token: action.token};
    case REMOVE_TOKEN:
      return {...state, token: action.token};
    case LOADING:
      return {...state, loading: true};
    case ERROR:
      return {...state, error: action.error};
    case LOGIN:
      return {...state, loading: true};
    case LOGIN_FAILURE:
      return {...state, loading: false};
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        token: action.id,
        loading: false,
        userobj: action.userobj,
      };
    case SIGNUP:
      return {
        ...state,
        userobj: {...state.userobj, name: action.name, email: action.email},
        loading: true,
      };
    case SIGNUP_FAILURE:
      return {...state, loading: false};
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        token: action.id,
        loading: false,
        userobj: action.userobj,
      };
    case CREATE_PROFILE:
      return {
        ...state,
      };
    case UPDATE_PROFILES:
      return {
        ...state,
        userobj: {
          ...state.userobj,
          profileList: action.profiles
        }
      };
    case RESET:
      return {...state, loggedIn: false};
    default:
      return state;
  }
};

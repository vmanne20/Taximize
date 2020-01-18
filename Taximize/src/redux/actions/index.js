export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const GET_TOKEN = 'GET_TOKEN';
export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';

export const RESET = 'RESET';
export const CREATE_EXPENSE = 'CREATE_EXPENSE';

export const CREATE_EXPENSE_SUCCESS = 'CREATE_EXPENSE_SUCCESS';
export const CREATE_EXPENSE_FAILURE = 'CREATE_EXPENSE_FAILURE';

export const GET_EXPENSES = 'GET_EXPENSES';

export const CREATE_PROFILE = 'CREATE_PROFILE';
export const CREATE_PROFILE_SUCCESS = 'CREATE_PROFILE_SUCCESS';
export const CREATE_PROFILE_FAILURE = 'CREATE_PROFILE_FAILURE';

export const UPDATE_PROFILES = "UPDATE_PROFILES";

export const GET_TAX = "GET_TAX";
export const GET_TAX_SUCCESS = "GET_TAX_SUCCESS";

export const LoginAction = (email, password) => ({
  type: LOGIN,
  email: email,
  password: password,
});

export const SignUp = (
  name,
  username,
  password,
  email,
  state,
  zipCode,
  income,
  maritalStatus,
) => ({
  type: SIGNUP,
  name: name,
  username: username,
  email: email,
  password: password,
  state: state,
  zipCode: zipCode,
  income: income,
  maritalStatus: maritalStatus,
});

export const CreateExpense = data => ({
  type: CREATE_EXPENSE,
  ...data,
});

export const CreateProfile = data => ({
  type: CREATE_PROFILE,
  ...data,
});

export const GetTax = id => ({
  type: GET_TAX,
  id: id,
});

export const GetExpenses = id => ({
  type: GET_EXPENSES,
  userId: id,
});

export const getToken = (token, data) => ({
  type: GET_TOKEN,
  token: token,
  data: data,
});

export const saveToken = token => ({
  type: SAVE_TOKEN,
  token,
});

export const removeToken = () => ({
  type: REMOVE_TOKEN,
});

export const loading = bool => ({
  type: LOADING,
  isLoading: bool,
});

export const error = error => ({
  type: ERROR,
  error,
});

export const reset = () => ({
  type: RESET,
});

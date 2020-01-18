import {
  CREATE_EXPENSE,
  CREATE_EXPENSE_SUCCESS,
  GET_EXPENSES,
  GET_TAX,
  GET_TAX_SUCCESS
} from '../actions/index';

initialState = {
  allExpensesIDS: [],
  allExpenses: {},
  taxes: {},
};

export default dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EXPENSE:
      return {...state};
      break;
    case GET_TAX_SUCCESS:
      return {...state, taxes: action.taxes};
      break;
    case CREATE_EXPENSE_SUCCESS:
      return {...state, allExpensesIDS: action.keys, allExpenses: action.obj};
      break;
    case GET_EXPENSES:
      return {...state, allExpensesIDS: action.keys, allExpenses: action.obj};
      break;
    default:
      return state;
  }
};

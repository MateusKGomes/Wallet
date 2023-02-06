// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  API_SUCESS,
  REQUEST_API, API_ERROR,
  EXPENSE_INFOS,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

// const getId = (state, payload, id) => state.expenses.map((expense) => {
//   if (expense.id === id) {
//     return {
//       id: expense.id,
//       exchangeRates: expense.exchangeRates,
//       ...payload,
//     };
//   }
//   return state;
// });
// console.log(getId());
// return (...state, expenses:  getId(state, payload, id), editingExpenses: null) // retorno da última estrutura

const coinRedcuer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case API_SUCESS:
    return {
      ...state,
      currencies: payload,
    };
  case REQUEST_API:
    return {
      ...state,
    };
  case API_ERROR:
    return {
      ...state,
      errorMessage: payload,

    };
  case EXPENSE_INFOS:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: payload,
    };
  default:
    return state;
  }
};

export default coinRedcuer;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  API_SUCESS,
  API_ERROR,
  EXPENSE_INFOS,
  DELETE_EXPENSE,
  START_EDITING,
  FINISH_EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const coinRedcuer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case API_SUCESS:
    return {
      ...state,
      currencies: payload,
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
  case START_EDITING:
    return {
      ...state,
      editor: true,
      editingInfos: payload,
    };
  case FINISH_EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === payload.id) {
          return {
            ...expense,
            ...payload,
          };
        }
        return expense;
      }),
      editor: false,
    };
  default:
    return state;
  }
};

export default coinRedcuer;

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { API_SUCESS, REQUEST_API, API_ERROR } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const coinRedcuer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_SUCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case REQUEST_API:
    return {
      ...state,
    };
  case API_ERROR:
    return {
      ...state,
      errorMessage: action.payload,

    };
  default:
    return state;
  }
};

export default coinRedcuer;

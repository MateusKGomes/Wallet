import coinApi from '../../services/API';

export const ADD_EMAIL = 'ADD_EMAIL';
export const API_SUCESS = 'API_SUCESS';
export const API_ERROR = 'API_ERROR';
export const REQUEST_API = 'REQUEST_API';
export const API_PRICE_SUCESS = 'API_PRICE_SUCESS';
export const EXPENSE_INFOS = 'EXPENSE_INFOS';
export const FINISH_EDIT_EXPENSE = 'FINISH_EDIT_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const START_EDITING = 'START_EDITING';

export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const expenseAction = (payload) => ({
  type: EXPENSE_INFOS,
  payload,
});

const receiveSucess = (payload) => ({
  type: API_SUCESS,
  payload,
});

const receiveError = (error) => ({
  type: API_ERROR,
  payload: error,
});

export const deleteAfterClick = (newList) => ({
  type: DELETE_EXPENSE,
  payload: newList,
});

export const finishEdit = (newText) => ({
  type: FINISH_EDIT_EXPENSE,
  payload: newText,
});

export const startEditing = (id) => ({
  type: START_EDITING,
  payload: id,
});

export const coinRequest = () => async (dispatch) => {
  try {
    const response = await coinApi();
    const coins = Object.keys(response);
    const remove = coins.filter((coin) => coin !== 'USDT');
    dispatch(receiveSucess(remove));
  } catch (error) {
    dispatch(receiveError(error.message));
  }
};

export const priceRequest = (expense) => async (dispatch) => {
  try {
    const response = await coinApi();
    dispatch(expenseAction({ ...expense, exchangeRates: response }));
  } catch (error) {
    dispatch(receiveError(error.message));
  }
};

import coinApi from '../../services/API';

export const ADD_EMAIL = 'ADD_EMAIL';
export const API_SUCESS = 'API_SUCESS';
export const API_ERROR = 'API_ERROR';
export const REQUEST_API = 'REQUEST_API';

export const addEmail = (state) => ({
  type: ADD_EMAIL,
  payload: state,
});

const requestApiStarted = () => ({
  type: REQUEST_API,
});

const receiveSucess = (payload) => ({
  type: API_SUCESS,
  payload,
});

const receiveError = (error) => ({
  type: API_ERROR,
  payload: error,
});

const coinRequest = () => async (dispatch) => {
  try {
    dispatch(requestApiStarted());
    const response = await coinApi();
    const coins = Object.keys(response);
    const remove = coins.filter((coin) => coin !== 'USDT');
    dispatch(receiveSucess(remove));
  } catch (error) {
    dispatch(receiveError(error));
  }
};

export default coinRequest;

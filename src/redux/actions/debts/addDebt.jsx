import axios from 'axios';
import {
  ADD_DEBT,
  DEBT_ADDED_SUCCESS,
  baseUrl
} from '../types';

export const addDebt = (debtor, reason, amount, description, date) => {
  return (dispatch) => {

    return axios({
        method: "POST",
        url: baseUrl + "/debts/",
        headers: {
          type: "application/json",
        },
        data: {
          debtor,
          reason,
          amount,
          description,
          date
        },
      })
      .then(response => {
        dispatch(addDebtSucces(response.data))
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const addDebtSucces = (message, debt) => {
  if (message === DEBT_ADDED_SUCCESS) {
    return {
      type: ADD_DEBT,
      payload: {
        message,
        debt,
      }
    }
  } else {
    return {
      type: ADD_DEBT,
      payload: {
        message
      }
    }
  }

}
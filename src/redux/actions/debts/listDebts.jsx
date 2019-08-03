import axios from 'axios';
import { LIST_DEBTS, baseUrl} from '../types';

export const listDebts = (token) => {
  return (dispatch) => {
    
    return axios({
      method: "GET",
      url:baseUrl + "/debts",
      headers: {
        type: "application/json",
        Authorization: "Bearer " + token
      },
     })
      .then(response => {
        dispatch(listDebtsSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

  export const listDebtsSuccess = ({count,debts}) => {
      return {
        type: LIST_DEBTS,
        payload: {
          debts,
          count
        }
      }
    }
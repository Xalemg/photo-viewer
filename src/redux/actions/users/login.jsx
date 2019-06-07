import { LOGIN, baseUrl } from '../types';
import axios from 'axios';

export const login = (email, password) => {
    return (dispatch) => {
      console.log('eeeee');
      
      return axios({
        method: "POST",
        url:baseUrl + "/users/login",
        headers: {
          type: "application/json",
        },
        data: {
            email,
            password
        },
       })
        .then(response => {
          dispatch(loginSuccess(response.data))
        })
        .catch(error => {
          throw(error);
        });
    };
  };
  
  export const loginSuccess = ({message, token, id}) => {
    console.log("message " + JSON.stringify(message));
    
      return {
        type: LOGIN,
        payload: {
            message,
            token,
            id,
            online: true,
        }
      }
    }
    
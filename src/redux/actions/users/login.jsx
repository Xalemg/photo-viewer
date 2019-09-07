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
          console.log("Error login " + error);
          throw(error);
        });
    };
  };
  
  export const loginSuccess = ({message, token, id, image, name, email}) => {
    console.log("message " + JSON.stringify(message));
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('email', email);
      return {
        type: LOGIN,
        payload: {
            message,
            token,
            id,
            image,
            name,
            email,
            online: true,
        }
      }
    }

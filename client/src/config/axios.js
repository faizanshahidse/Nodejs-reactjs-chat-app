import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

const value = localStorage.getItem('authToken');
if (value) {
  axios.defaults.headers.common = {
    Authorization: `bearer ${value}`,
  };
} else {
  axios.defaults.headers.common = {
    Authorization: null,
  };
}

export default axios;

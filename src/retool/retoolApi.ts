//Sets up Axios instance to interact with Retool API
import axios from 'axios';

const retoolApi = axios.create({
  baseURL: '', // Leave it empty to use the proxy
  headers: {
    Authorization: `Bearer retool_01j38dgxkanh697nnypyqf7ezg`,
    'Content-Type': 'application/json',
  },
});

export default retoolApi;

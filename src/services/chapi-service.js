import Axios from 'axios';
import openSocket from 'socket.io-client';

export default class ChapiService {
  // _apiBase = 'https://neibchat-api.herokuapp.com/api/v1/';
  _apiBase = 'http://localhost:8000/api/v1/';

  // socket = openSocket('https://neibchat-api.herokuapp.com');
  socket = openSocket('http://localhost:8000');

  // ------------- USER REQUEST -------------
  userRequest = async (endpoint, body, token) => {
    const url = `${this._apiBase}users/${endpoint}/${token ? token : ''}`;
    const reqParams = { withCredentials: true };

    try {
      let res;

      switch (endpoint) {
        case 'getMe':
        case 'logout':
          res = await Axios.get(url, reqParams);
          break;
        case 'signup':
        case 'forgetPassword':
        case 'login':
          res = await Axios.post(url, body, reqParams);
          break;
        case 'updateMe':
        case 'updatePassword':
        case 'resetPassword':
          res = await Axios.patch(url, body, reqParams);
          break;

        default:
          console.error('From CHAPI: Incorrect request to the server');
          break;
      }

      if (res.status === 204) return;

      if (res.data.status === 'success') {
        return res.data.data;
      }
    } catch (error) {
      console.log('THis is error from chapi', error);
      throw new Error(`${error.response.data.message}`);
    }
  };

  // ------------- UPLOAD PHOTO -------------
  uploadPhoto = async (file) => {
    const url = `${this._apiBase}users/updateMe`;
    const reqParams = {
      withCredentials: true,
      headers: { 'content-type': 'multipart/form-data' },
    };
    const body = new FormData();
    body.append('photo', file);
    // console.log('This is body: ', body);

    try {
      const res = await Axios.patch(url, body, reqParams);

      if (res.data.status === 'success') {
        return res.data.data;
      }
    } catch (error) {
      console.error('THis is error from chapi', error);
      throw new Error(`${error.response.data.message}`);
    }
  };

  // ------------- MESSAGE REQUEST -------------
  messageRequest = async (endpoint, body, params, id) => {
    const reqId = id ? `/${id}` : '';
    const reqP = params ? `?${params}` : '';
    const url = `${this._apiBase}messages${reqId}${reqP}`;
    const reqParams = { withCredentials: true };
    try {
      let res;

      switch (endpoint) {
        case 'getMessages':
          res = await Axios.get(url, reqParams);
          break;
        case 'sendMessage':
          res = await Axios.post(url, body, reqParams);
          break;
        case 'deleteMessage':
          res = await Axios.delete(url, reqParams);
          break;

        default:
          console.error('From CHAPI: Incorrect request to the server');
          break;
      }

      if (res.data.status === 'success') {
        return res.data.data;
      }
    } catch (error) {
      console.error('THis is error from chapi', error);
      throw new Error(`${error.response.data.message}`);
    }
  };

  // ------------- REQUESTS REQUEST -------------
  requestRequest = async (endpoint, body, page, id) => {
    const reqId = id ? `/${id}` : '';
    const reqP = page ? `?page=${page}&limit=20` : '';
    const url = `${this._apiBase}requests${reqId}${reqP}`;
    const reqParams = { withCredentials: true };
    try {
      let res;

      switch (endpoint) {
        case 'getRequests':
          res = await Axios.get(url, reqParams);
          break;
        case 'sendRequest':
          res = await Axios.post(url, body, reqParams);
          break;
        case 'updateRequest':
          res = await Axios.patch(url, body, reqParams);
          break;

        default:
          console.error('From CHAPI: Incorrect request to the server');
          break;
      }

      if (res.data.status === 'success') {
        return res.data.data;
      }
    } catch (error) {
      console.error('THis is error from chapi', error);
      throw new Error(`${error.response.data.message}`);
    }
  };

  // ------------- CLIENTS REQUEST -------------
  clientRequest = async (endpoint, body, id) => {
    const reqId = id ? `/${id}` : '';
    const url = `${this._apiBase}users${reqId}`;
    const reqParams = { withCredentials: true };
    try {
      let res;

      switch (endpoint) {
        case 'getClients':
          res = await Axios.get(url, reqParams);
          break;
        case 'updateClient':
          res = await Axios.patch(url, body, reqParams);
          break;

        default:
          console.error('From CHAPI: Incorrect request to the server');
          break;
      }

      if (res.data.status === 'success') {
        return res.data.data;
      }
    } catch (error) {
      console.error('THis is error from chapi', error);
      throw new Error(`${error.response.data.message}`);
    }
  };
}

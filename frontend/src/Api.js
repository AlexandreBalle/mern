import axios from 'axios';
import { getUserToken, removeUserToken, setUserToken } from './Services/AuthService';

const api = {
  url: 'http://localhost:3000'
};

export const signUp = async user => {
  return await axios
    .post(`${api.url}/person`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error;
    });
};

export const login = async user => {
  return await axios
    .post(`${api.url}/person/login`, {
      email: user.email,
      password: user.password
    })
    .then(res => {
      if (typeof res.data === 'object') {
        return setUserToken(res.data.token);
      }

      return false;
    })
    .catch(() => {
      return false;
    });
};

export const getFishes = async () => {
  return await axios
    .get(`${api.url}/fish`)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      return error;
    });
};

export const createFish = async fish => {
  return await axios
    .post(
      `${api.url}/fish`,
      {
        image: fish.image,
        name: fish.name,
        desc: fish.desc,
        status: fish.status,
        price: parseInt(fish.price)
      },
      { headers: { Authorization: getUserToken() } }
    )
    .then(res => {
      return typeof res.data === 'object' ? true : false;
    })
    .catch(error => {
      if (error.response.status === 401) {
        return removeUserToken();
      }

      return error;
    });
};

export const putFish = async fish => {
  return await axios
    .put(
      `${api.url}/fish/${fish._id}`,
      {
        image: fish.image,
        name: fish.name,
        desc: fish.desc,
        status: fish.status,
        price: fish.price
      },
      { headers: { Authorization: getUserToken() } }
    )
    .then(res => {
      return res.data;
    })
    .catch(error => {
      if (error.response.status === 401) {
        return removeUserToken();
      }

      return error;
    });
};

export const removeFish = async id => {
  return await axios
    .delete(`${api.url}/fish/${id}`, { headers: { Authorization: getUserToken() } })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      if (error.response.status === 401) {
        return removeUserToken();
      }

      return error;
    });
};

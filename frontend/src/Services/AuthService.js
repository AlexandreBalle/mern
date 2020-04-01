export const isLoggedIn = () => {
  return localStorage.getItem('user') ? true : false;
};

export const getUserToken = () => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : false;
};

export const removeUserToken = () => {
  localStorage.removeItem('user');

  return true;
};

export const setUserToken = token => {
  localStorage.setItem('user', JSON.stringify({ token: token }));

  return true;
};

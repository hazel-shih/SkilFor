export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const TOKEN_NAME = "token";

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};

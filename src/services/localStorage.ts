export const LOCAL_STORAGE_KEY = {
  ACCESS_TOKEN: "accessToken",
};

export const setItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getItem = (key: string) => {
  return localStorage.getItem(key);
};

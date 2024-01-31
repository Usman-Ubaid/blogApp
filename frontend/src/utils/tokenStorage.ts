export const saveAuthToken = (token: string) => {
  return localStorage.setItem("auth-token", token);
};

export const getStorageToken = () => {
  return localStorage.getItem("auth-token");
};

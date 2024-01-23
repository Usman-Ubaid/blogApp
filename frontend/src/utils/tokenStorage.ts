export const saveAuthToken = (token: string) => {
  return localStorage.setItem("auth-token", token);
};

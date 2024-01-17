export const handleLoginError = (status: number) => {
  let message = "";
  if (status === 401) {
    message = "Invalid Credentials";
  } else if (status === 404) {
    message = "No User Found";
  }
  return message;
};

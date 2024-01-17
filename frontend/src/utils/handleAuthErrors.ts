export const handleLoginError = (status: number) => {
  let message = "";
  if (status === 401) {
    message = "Invalid Credentials";
  } else if (status === 404) {
    message = "No User Found";
  }
  return message;
};

export const handleRegisterError = (status: number, errMsg: string) => {
  let message = "";
  if (status === 400) {
    if (errMsg === "This email is already in use") {
      message = "Email already used";
    } else if (errMsg === "This username is taken") {
      message = "Username taken";
    } else if (errMsg === "Please fill all the fields") {
      message = "Fill all the fields";
    }
  } else {
    message = "Failed to register";
  }
  return message;
};

export const USER_PASSWORD_SUCCESS = "USER_PASSWORD_SUCCESS";

export const doPassword = (data) => {
  return {
    type: USER_PASSWORD_SUCCESS,
    payload: data,
  };
};

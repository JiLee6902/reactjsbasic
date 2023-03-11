import { USER_PASSWORD_SUCCESS } from "../action/passwordAction";
const INITIAL_STATE = {
  password: "",
};
const passwordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PASSWORD_SUCCESS:
      return {
        ...state,
        password: action.payload,
      };

    default:
      return state;
  }
};

export default passwordReducer;

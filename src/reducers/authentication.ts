import { Action, ActionTypes } from "../actions";

const INITIAL_STATE = {
  isAuthenticated: null,
  errorCounter: 0,
  message: null,
  coupon: null
};

export const authReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case ActionTypes.authenticateUser:
      return {
        isAuthenticated: action.payload.loginSuccess,
        coupon: action.payload.coupon
      };
    case ActionTypes.authenticateError:
      return {
        message: action.payload.message,
        errorCounter: action.payload.errorCounter
      };
    default:
      return state;
  }
};

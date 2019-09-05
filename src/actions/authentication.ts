import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
import { translations } from "../config/translations";
const url = process.env.REACT_APP_LOGIN_URI;

export interface User {
  username: string;
  password: string;
  coupon?: string;
  errorCounter?: number;
}

export interface AuthResponse {
  loginSuccess: boolean;
  coupon?: string;
  message?: string;
  errorCounter?: number;
}

export interface AuthenticateUserAction {
  type: ActionTypes.authenticateUser;
  payload: {
    loginSuccess: boolean;
    coupon?: string;
  };
}

export interface AuthenticateErrorAction {
  type: ActionTypes.authenticateError;
  payload: {
    message: string;
    errorCounter: number;
  };
}

export const authenticateUser = (data: User) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post<AuthResponse>(url!, data);
    if (data.coupon) {
      response.data.coupon = data.coupon;
    }
    dispatch<AuthenticateUserAction>({
      type: ActionTypes.authenticateUser,
      payload: response.data
    });
  } catch (error) {
    if (error.response.data) {
      if (data.errorCounter) {
        error.response.data.errorCounter = data.errorCounter + 1;
      } else {
        error.response.data.errorCounter = 1;
      }
      dispatch<AuthenticateErrorAction>({
        type: ActionTypes.authenticateError,
        payload: error.response.data
      });
    } else {
      dispatch<AuthenticateErrorAction>({
        type: ActionTypes.authenticateError,
        payload: {
          message: translations.en.specificLoginError,
          errorCounter: data.errorCounter!
        }
      });
    }
  }
};

import { combineReducers } from "redux";
import { destinationsReducer } from "./destinations";
import { authReducer } from "./authentication";
import { Destination, AuthResponse } from "../actions";
import { reducer as formReducer } from "redux-form";

export interface StoreState {
  destinations: Destination[];
  auth: AuthResponse;
  form: Function;
}

export const reducers = combineReducers<StoreState>({
  destinations: destinationsReducer,
  auth: authReducer,
  form: formReducer
} as any);

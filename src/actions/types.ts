import { FetchDestinationsAction } from "./destinations";
import {
  AuthenticateUserAction,
  AuthenticateErrorAction
} from "./authentication";

export enum ActionTypes {
  fetchDestinations,
  authenticateUser,
  authenticateError
}

export type Action =
  | FetchDestinationsAction
  | AuthenticateUserAction
  | AuthenticateErrorAction;

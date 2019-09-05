import { Destination, Action, ActionTypes } from "../actions";

export const destinationsReducer = (
  state: Destination[] = [],
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchDestinations:
      return action.payload;
    default:
      return state;
  }
};

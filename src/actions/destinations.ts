import axios from "axios";
import { Dispatch } from "redux";
import { ActionTypes } from "./types";
const url = process.env.REACT_APP_DESTINATION_API_URI;

export interface Destination {
  name: string;
  thumbnail: string;
  code: string;
  countHotels: number;
  slug: string;
}

export interface FetchDestinationsAction {
  type: ActionTypes.fetchDestinations;
  payload: Destination[];
}

export const fetchDestinations = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<Destination[]>(url!);

    dispatch<FetchDestinationsAction>({
      type: ActionTypes.fetchDestinations,
      payload: response.data
    });
  };
};

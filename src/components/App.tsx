import React from "react";
import { connect } from "react-redux";

import { Destination, fetchDestinations, AuthResponse } from "../actions";
import { StoreState } from "../reducers";
import Loader from "./Loader";
import { Login } from "./Login";
import "./App.scss";
const clientURI = process.env.REACT_APP_CLIENT_URI;
interface AppProps {
  destinations: Destination[];
  fetchDestinations: Function;
  auth: {
    isAuthenticated?: boolean;
    coupon?: string;
  };
}

interface AppState {
  fetching: boolean;
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      fetching: false
    };
  }

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.destinations.length && this.props.destinations.length) {
      this.setState({ fetching: false });
    }
  }

  componentDidMount(): void {
    this.props.fetchDestinations();
    this.setState({ fetching: true });
  }

  showCoupon(): JSX.Element {
    return (
      <div className="one column row centered">
        <h1>{this.props.auth!.coupon}</h1>
      </div>
    );
  }

  renderList(): JSX.Element[] {
    return this.props.destinations.map((destination: Destination) => {
      return (
        <div className="column">
          <div className="ui fluid card" key={destination.code}>
            <a className="image" href={`${clientURI}${destination.slug}`}>
              <img src={destination.thumbnail} alt={destination.code} />
            </a>
            <div className="content">
              <div className="header">{destination.name}</div>
              <div className="extra content">
                <span>
                  <i className="bed icon"></i>
                  {destination.countHotels} Hotels Available
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    if (this.props.auth && !this.props.auth.isAuthenticated) {
      return <Login />;
    } else {
      return (
        <div className="ui container">
          {this.state.fetching ? <Loader /> : null}
          <div className="ui link cards three column grid">
            {this.props.auth!.coupon && this.showCoupon()}
            {this.renderList()}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({
  destinations,
  auth
}: StoreState): { destinations: Destination[]; auth: AuthResponse } => {
  return { destinations, auth };
};

export const App = connect(
  mapStateToProps,
  { fetchDestinations }
)(_App);

import React, { Component } from "react";

export default class Loader extends Component {
  render() {
    return (
      <div className="ui segment">
        <p>Loading</p>
        <div className="ui active dimmer">
          <div className="ui loader"></div>
        </div>
      </div>
    );
  }
}

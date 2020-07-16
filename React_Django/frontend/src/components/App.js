import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

export class App extends Component {
  render() {
    return (
      <Fragment>
        <h1>React App</h1>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

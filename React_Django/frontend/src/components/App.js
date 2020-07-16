import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Headers from "./Header/Headers";
import DashBoard from "./DashBoard/DashBoard";
import { Provider } from "react-redux";
import store from "../Redux/Store";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Headers />
          <div className="container">
            <DashBoard />
          </div>
        </Fragment>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

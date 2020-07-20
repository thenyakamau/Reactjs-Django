import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Headers from "./Header/Headers";
import DashBoard from "./DashBoard/DashBoard";
import { Provider } from "react-redux";
import store from "../Redux/Store";
import { HashRouter, Switch, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import PrivateRoutes from "./utils/PrivateRoutes";
import { loadUser } from "../Redux/actions/Auth";

export class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Fragment>
            <Headers />
            <div className="container">
              <Switch>
                <PrivateRoutes exact path="/" component={DashBoard} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
              </Switch>
            </div>
          </Fragment>
        </HashRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));

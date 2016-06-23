import "babel-polyfill";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.css";

import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";

import configureStore from "./store/configureStore";
import routes from "./routes";

const store = configureStore();

render(
  <Provider store={store}>
  <Router history={browserHistory} routes={routes}/>
</Provider>, document.getElementById("app"));

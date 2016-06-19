import React from "react";
import Relay from "react-relay";
import "./setup/RelaySetup";
import ReactDOM from "react-dom";
import BookStoreRoute from "./routes/BookStoreRoute";
import App from "./components/App";
import "!style!css!sass!../sass/app.scss";

ReactDOM.render(<Relay.RootContainer Component={App} route={new BookStoreRoute()}/>, document.getElementById("app"));

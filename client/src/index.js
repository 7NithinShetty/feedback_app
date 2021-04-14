import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
// Provider makes the "store" accessilble to every component in the App .
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import reducers from "./reducers";

//Only for development use!!
import axios from "axios"; 
window.axios = axios;

//instance of a redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

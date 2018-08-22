import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import App from "./components/App.js";
import reducers from "./reducers";
import axios from "axios";
window.axios = axios;
const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
console.log("my key is", process.env);
console.log("enviroment", process.env.NODE_ENV);

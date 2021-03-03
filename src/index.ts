import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { e } from "./infra";
import { Provider } from "react-redux";
import { createSlapstukStore, setGlobalStore } from "./state";
import defaultBoard from "./defaultBoard";

const store = createSlapstukStore();
setGlobalStore(store);
ReactDOM.render(
  e(
    React.StrictMode,
    null,
    e(Provider, { store }, e(App, { board: defaultBoard }))
  ),
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

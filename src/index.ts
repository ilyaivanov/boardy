import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { viewApp } from "./App";
import reportWebVitals from "./reportWebVitals";
import { e } from "./infra";
import { Provider } from "react-redux";
import { createSlapstukStore, setGlobalStore, actions } from "./state";
import { initFirebase, loadUserSettings } from "./api/firebase";

const store: any = createSlapstukStore();
setGlobalStore(store);

initFirebase(null);
loadUserSettings("nLHkgavG6YXJWlP4YkzJ9t4zW692").then((data) => {
  const items: Items = JSON.parse(data.itemsSerialized);

  console.log(actions.setItems);
  actions.setItems(items);
});
ReactDOM.render(
  e(React.StrictMode, null, e(Provider, { store }, viewApp())),
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { div, e } from "./infra";
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
  actions.selectItem("0.2884379591659769");
});
ReactDOM.render(
  e(React.StrictMode, null, e(Provider, { store }, e(App))),
  document.getElementById("root")
);

// const Inner = ({ counter, onClick }: any) => {
//   return div({ onClick, style: { color: "red" } }, counter);
// };

// const intermediate = (props: any, ...children: any[]) => {
//   return div({ style: { padding: 40, ...props } }, ...children);
// };

// const Outer = () => {
//   const [counter, setCounter] = React.useState(0);
//   return div(
//     {},
//     intermediate(
//       {},
//       e(Inner, { counter, onClick: () => setCounter(counter + 1) })
//     ),
//     div({}, "fooo"),
//     div({}, "bar")
//   );
// };

// ReactDOM.render(e(Outer), document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AppNavigation } from "./constants/navigations/App.navigation";

ReactDOM.render(
  <React.StrictMode>
    <AppNavigation />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

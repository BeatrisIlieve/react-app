import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import reportWebVitals from "./reportWebVitals";

import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import App from "./App";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <AuthenticationProvider>
        <App />
      </AuthenticationProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();

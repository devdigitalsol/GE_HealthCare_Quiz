import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppState } from "./context/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppState>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AppState>
  </BrowserRouter>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { CartProvider } from "./context/CartContext.js";
import "./index.css";
import App from "./pages/App";
import CardPage from "./pages/CardPage";
import Header from "./pages/header";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/search/:cardName" element={<App />}>
          <Route path="page/:page" element={<Header />} />
        </Route>
        <Route path="/card/:cardName" element={<CardPage />} />
      </Routes>
    </Router>
  </CartProvider>
);

reportWebVitals();

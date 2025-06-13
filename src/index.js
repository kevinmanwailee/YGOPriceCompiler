import React from "react";
import ReactDOM from "react-dom/client";
import { CartProvider } from "./context/CartContext.js";
import "./index.css";
import Checkout from "./pages/Checkout.js";
import Search from "./pages/Search.js";
import CardPage from "./pages/CardPage.js";
import Home from "./pages/Home.js";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:cardName" element={<Search />}>
          <Route path="page/:page" element={<Home />} />
        </Route>
        <Route path="/card/:cardName" element={<CardPage />} />
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </Router>
  </CartProvider>
);

reportWebVitals();

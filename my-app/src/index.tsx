import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./components/Home";
import Books from "./components/Books";
import Clients from "./components/Clients";
import Loans from "./components/Loans";

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
              <Route path="/" element={<App />}>
                <Route path="/home" element={<Home/>} />
                <Route path="/books" element={<Books/>} />
                <Route path="/clients" element={<Clients/>} />
                <Route path="/loans" element={<Loans/>} />
              </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

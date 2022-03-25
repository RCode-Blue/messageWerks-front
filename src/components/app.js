import React from "react";
import { render } from "react-dom";

import { BrowserRouter, Link, Route, Routes, Router } from "react-router-dom";

import Landing from "./landing/landing";

import "../styles/styles.scss";

function App() {
  // console.log(process.env.NODE_ENV);
  return (
    <div className="App app-wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

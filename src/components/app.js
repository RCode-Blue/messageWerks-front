import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "./landing/landing";

import "../../styles/styles.scss";

function App() {
  // console.log(process.env.NODE_ENV);
  return (
    <div className="App">
      <Landing />
    </div>
  );
}

export default App;

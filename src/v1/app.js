import React from "react";
import "../../styles/v1/styles.css";

const greeting = (firstname, lastname) => {
  return (
    <p>
      My name is {firstname} {lastname}
    </p>
  );
};

function App() {
  // console.log(process.env.NODE_ENV);
  return (
    <div className="App">
      <h2>Hello world!</h2>
      {greeting("John", "Smith")}
    </div>
  );
}

export default App;

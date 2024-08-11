import React from "react";
import Navbar from "./navbar";
import First from "./first";
import Second from "./second";
import "./App.css";
import Third from "./third";
import Footer from "./Footer";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
      </div>
      <First />
      <Second />
      <Third />
      <Footer />
    </>
  );
}

export default App;

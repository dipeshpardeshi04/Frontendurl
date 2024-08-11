import React from "react";
import "./third.css";
import vio from "./Images/MYFULLSTACK.mp4";
const Third = () => {
  return (
    <>
      <div className="container">
        <h1>How to use</h1>
        <p className="subtitle">how it is works see in video</p>
        <div className="steps11">
          <video  controls autoplay>
            <source src={vio} type="video/mp4" />
          </video>
        </div>
      </div>
    </>
  );
};

export default Third;

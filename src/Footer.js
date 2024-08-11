import React from "react";
import "./Footer.css";
import Icon from "./Images/iccon";
const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container1 ">
          <p>&copy; 2024 Dipesh. All rights reserved.</p>
          <p>
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/dipeshpardeshi/"
              className="text-blue-400 hover:underline"
            >
              Dipesh Pardeshi  <Icon />
             
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;

import React, { useState } from "react";
import "./first.css";
import axios from "axios";
import fileDownload from "js-file-download";
import { Toaster, toast } from "react-hot-toast";
import Lottie from "lottie-react";
import Anima1 from "./Images/anima1.json";
import Anima2 from "./Images/Anima2.json";

function Hero() {
  const [URL, setURL] = useState("");
  const [isWaiting, setIsWaiting] = useState(false); // State to manage waiting animation
  // const [isReady, setIsReady] = useState(false); // State to manage file readiness
  // const [isDownloaded, setIsDownloaded] = useState(false); // State to manage the success animation

  const handleURLChange = (e) => setURL(e.target.value);

  const checkFileReady = async () => {
    try {
      const response = await axios.get("https://backendser-gkue.onrender.com//status");
      return response.data.isFileReady;
    } catch (error) {
      console.error("Error checking file status:", error);
      return false;
    }
  };

  const Download = async () => {
    try {
      const response = await axios.get("https://backendser-gkue.onrender.com//pdfs", {
        responseType: "blob",
      });
      fileDownload(response.data, `${URL.split("/")[4]}.pdf`);
      // setIsDownloaded(true); // Set downloaded state to true after downloading the file
      toast.success("File Downloaded");
    } catch (error) {
      console.error("Error downloading the file:", error);
      toast.error("Failed to download the PDF");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setIsWaiting(true); // Set waiting state to true on form submission

    try {
      const response = await axios.post("https://backendser-gkue.onrender.com//urll", {
        url: URL,
      });
      console.log("Response:", response.data);
      toast.success("URL submitted successfully!");

      // Poll the server until the file is ready
      const pollInterval = setInterval(async () => {
        const ready = await checkFileReady();
        if (ready) {
          clearInterval(pollInterval);
          setIsWaiting(false); // Stop the waiting animation
          // setIsReady(true); // Set ready state to true
          await Download(); // Download the file once it's ready
        }
      }, 1000); // Check every second
    } catch (error) {
      console.error("Error submitting the URL:", error);
      toast.error("Failed to submit the URL");
      setIsWaiting(false); // Stop the waiting animation on error
    }
  };

  return (
    <section className="hero">
      <Toaster />
      <div className="hero-content">
        <div className="text-content">
          <h1>ChatGPT Chat Downloader</h1>
          <p>
            Seamlessly convert your ChatGPT conversations into professional PDF
            documents that’s perfect for printing or sharing.
          </p>
          <form className="input-group mb-3">
            <input
              type="url"
              onChange={handleURLChange}
              className="form-control"
              placeholder="Chat URL"
              aria-label="Chat GPT URL"
              aria-describedby="basic-addon1"
              id="url"
              name="url" 
              required
            />
            <button
              onClick={handleSubmit}
              type="submit"
              className="styled-button"
            >
              Download
            </button>
            {isWaiting && (
              <div className="anima2">
                <Lottie animationData={Anima2} loop={true} />
              </div>
            )}
          </form>
        </div>

        <div className="image-content">
          {<Lottie animationData={Anima1} loop={true} />}
        </div>
      </div>
      {/* {isWaiting && (
            <div className="anima2">
              <Lottie animationData={Anima2} loop={true} />
            </div>
          )} */}
    </section>
  );
}

export default Hero;

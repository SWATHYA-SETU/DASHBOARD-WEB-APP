import React, { useState } from "react";
import logo from "../assets/logo2.png";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import gmail from "../assets/gmail.png";
import twitter from "../assets/twitter.png";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="bg-[#010851] w-full lg:px-12 lg:py-5 text-white">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-1/2 space-y-4">
            <a
              href="/"
              className="text-2xl font-semibold flex items-center space-x-3 text-white"
            >
              <img src={logo} alt="logo" className="w-16 h-15 inline-block" />
              <span className="text-white">Swasthya Setu</span>
            </a>

            {/* Paragraph and input with space adjustments */}
            <p className="text-justify px-7">
              Subscribe to be updated with the important alerts,
              <br />
              and exclusive insights delivered straight to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
                className="bg-[#9a7af1] py-2 px-7 rounded-md focus:outline-none w-full md:w-auto text-black"
                style={{ width: "280px", marginLeft: "25px", zIndex: 10 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="submit"
                value="Submit"
                className="bg-[#f9a826] py-2 px-4 rounded-md -ml-2 cursor-pointer bg-white text-black transition duration-300 relative overflow-hidden"
                style={{
                  marginLeft: "10px",
                  width: "90px",
                  textAlign: "center",
                  backgroundColor: "#f9a826",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.375rem",
                  color: "black",
                  transition: "transform 0.2s, background-color 0.3s",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#e89d24";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#f9a826";
                  e.target.style.transform = "scale(1)";
                }}
              />
            </form>
          </div>
          {/* Contact Information and Social Icons */}
          <div className="md:w-1/2 space-y-4 mt-4 md:mt-0 flex flex-col items-end">
            <div className="space-y-2 text-right">
              <div className="flex items-center">
                <FaEnvelope className="mr-2" /> {/* Email icon */}
                <span>info@swasthyasetu.com</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2" /> {/* Phone icon */}
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" /> {/* Location icon */}
                <span>123 Health Street, Wellness City, 12345</span>
              </div>
            </div>
            {/* Add vertical gap */}
            <div className="mt-4" /> {/* Adjust this margin as needed */}
            <div className="flex space-x-4 mt-4">
              {/* Social Media or Icons */}
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="Icon 1" className="w-10 h-10" />
              </a>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={instagram} alt="Icon 2" className="w-10 h-10" />
              </a>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={gmail} alt="Icon 3" className="w-10 h-10" />
              </a>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={twitter} alt="Icon 4" className="w-10 h-10" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Popup Message */}
      {isSubmitted && (
        <div
          style={{
            position: "absolute",
            bottom: "80px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            color: "black",
            padding: "1rem 2rem",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
          }}
        >
          Subscription Submitted!
          <button
            onClick={() => setIsSubmitted(false)} // Close the popup
            style={{
              marginLeft: "10px",
              backgroundColor: "#f9a826",
              border: "none",
              borderRadius: "5px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
              color: "white",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Footer;

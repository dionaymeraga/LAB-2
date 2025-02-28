import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="contactForm">
      <form className="contact-form">
        <h2 className="h2text">Contact Us:</h2>
        <div className="input-box1">
          <label>Full Name:</label>
          <input
            type="text"
            className="field1"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="input-box1">
          <label>Email Address:</label>
          <input
            type="email"
            className="field1"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-box1">
          <label>Your Message: </label>
          <textarea
            name=""
            id=""
            className="field1 mess"
            placeholder="Enter your message"
            required
          ></textarea>
        </div>
        <button type="submit" className="button1">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;

import React from "react";
import Swal from "sweetalert2";
import "./Contact.css";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("http://localhost:8800/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "Success!",
          text: "Your message has been sent successfully!",
          icon: "success",
        });

        event.target.reset();
      } else {
        Swal.fire({
          title: "Error!",
          text: "There was an issue sending your message. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong, please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <section className="contactForm">
      <form className="contact-form" onSubmit={onSubmit}>
        <h2 className="h2text">Contact Us:</h2>

        {/* Full Name Input */}
        <div className="input-box1">
          <label>Full Name:</label>
          <input
            type="text"
            className="field1"
            name="name"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email Input */}
        <div className="input-box1">
          <label>Email Address:</label>
          <input
            type="email"
            className="field1"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Message Input */}
        <div className="input-box1">
          <label>Your Message: </label>
          <textarea
            name="message"
            className="field1 mess"
            placeholder="Enter your message"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="button1">
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;

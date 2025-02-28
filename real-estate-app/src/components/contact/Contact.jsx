import React from "react";
import "./Contact.css";
import Swal from "sweetalert2";

const Contact = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "8ebdfe1f-84f3-4fb4-baf9-7657b42110ed");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      Swal.fire({
        title: "Success!",
        text: "Message was sent successfully!",
        icon: "success",
      });
    }
  };
  return (
    <section className="contactForm">
      <form className="contact-form" onSubmit={onSubmit}>
        <h2 className="h2text">Contact Us:</h2>
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

        <div className="input-box1">
          <label>Your Message: </label>
          <textarea
            name="message"
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

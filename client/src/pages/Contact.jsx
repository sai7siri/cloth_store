import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send the data to an API)
    console.log(formData);
    alert("Message sent successfully!");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-4 text-lg">We'd love to hear from you. Get in touch with us!</p>
        </div>
      </header>

      {/* Contact Form Section */}
      <section className="container mx-auto px-6 py-16 max-w-3xl">
        <h2 className="text-3xl font-semibold text-blue-600 text-center">Send Us a Message</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg"
              rows="5"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          <button type="submit" className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </section>


      {/* Map Section (optional) */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold text-blue-600">Find Us on the Map</h2>
          <div className="mt-6">
            {/* You can embed a Google Map here */}
            <iframe
              className="w-full h-64 rounded-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1166404574624!2d-122.42664268468198!3d37.77492977975917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064a24c44b7%3A0xa6a7a923b2c3ed69!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1622436312873!5m2!1sen!2sin"
              frameBorder="0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

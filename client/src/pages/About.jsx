import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-4 text-lg">Welcome to Our E-Commerce Store!</p>
        </div>
      </header>

      {/* Story Section */}
      <section className="container mx-auto px-6 py-16 text-center max-w-3xl">
        <h2 className="text-3xl font-semibold text-blue-600">Our Story</h2>
        <p className="mt-4 text-lg text-gray-600">
          We started in 2022 with a mission to make quality products accessible to everyone. We are passionate about providing a seamless shopping experience with exceptional customer service.
        </p>
      </section>

      {/* Mission and Values Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-blue-600">Our Mission</h3>
            <p className="mt-4 text-gray-600">
              Our mission is to offer top-quality products at affordable prices, making shopping easier and more enjoyable for everyone.
            </p>
          </div>

          {/* Values */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-blue-600">Our Values</h3>
            <p className="mt-4 text-gray-600">
              We are committed to sustainability, providing excellent customer service, and creating long-lasting relationships with our customers and suppliers.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 py-16 text-center max-w-3xl">
        <h2 className="text-3xl font-semibold text-blue-600">Meet Our Team</h2>
        <p className="mt-4 text-lg text-gray-600">Our dedicated team works hard to bring you the best products and customer experience.</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://thumbs.dreamstime.com/b/d-clipart-product-manager-holding-roadmap-standing-right-side-image-randomly-colored-background-k-cartoon-351037694.jpg" alt="Team Member images" className="rounded-full mx-auto w-32 h-32 object-cover" />
            <h4 className="mt-4 text-xl font-semibold">Sai Sirimarthi</h4>
            <p className="mt-2 text-gray-600">CEO & Founder</p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://www.shutterstock.com/image-illustration/jakarta-indonesia-june-6th-2023-600nw-2313586653.jpg" alt="Team Member" className="rounded-full mx-auto w-32 h-32 object-cover" />
            <h4 className="mt-4 text-xl font-semibold">Sai Sirimarthi</h4>
            <p className="mt-2 text-gray-600">Marketing Director</p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src="https://thumbs.dreamstime.com/b/d-cartoon-ceo-bright-idea-smiling-excited-white-background-copy-space-d-cartoon-ceo-bright-idea-smiling-346895793.jpg" alt="Team Member" className="rounded-full mx-auto w-32 h-32 object-cover" />
            <h4 className="mt-4 text-xl font-semibold">Sai Sirimarthi</h4>
            <p className="mt-2 text-gray-600">Product Manager</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;

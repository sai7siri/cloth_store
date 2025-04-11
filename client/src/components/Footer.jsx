import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#000] py-10 px-4 text-white">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start text-center md:text-start">
        {/* About Section */}
        <div>
          <p className="font-bold text-2xl md:text-3xl sofadi-one-regular mb-4">MY STORE</p>
          <p className="text-sm font-serif text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Exercitationem quod assumenda, adipisci alias inventore nihil ab
            numquam. Odit veniam ex dolorum quia soluta incidunt quidem fugit
            unde, eligendi doloremque eos.
          </p>
        </div>

        {/* Company Section */}
        <div>
          <p className="font-bold text-2xl md:text-3xl sofadi-one-regular mb-4">COMPANY</p>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-sky-600 transition">Home</li>
            <li className="hover:text-sky-600 transition">About</li>
            <li className="hover:text-sky-600 transition">Delivery</li>
            <li className="hover:text-sky-600 transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Get in Touch Section */}
        <div>
          <p className="font-bold text-2xl md:text-3xl sofadi-one-regular mb-4">GET IN TOUCH</p>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-sky-600 transition">+1-212-903456772</li>
            <li className="hover:text-sky-600 transition">contact@mystore.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-300 mt-8 pt-4">
        <p className="font-semibold text-sm text-center text-gray-600">
          &copy; {new Date().getFullYear()} Sai Sirimarthi. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

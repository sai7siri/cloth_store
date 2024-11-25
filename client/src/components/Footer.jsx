import React from "react";

const Footer = () => {
  return (
   <div>

    <div className="flex flex-col gap-4 md:flex-row items-center justify-evenly my-4 text-center md:text-start">
      <div>
        <p className="font-bold text-3xl sofadi-one-regular mb-4">MY STORE. </p>
        <p className="text-sm font-serif max-w-[320px]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Exercitationem quod assumenda, adipisci alias inventore nihil ab
          numquam. Odit veniam ex dolorum quia soluta incidunt quidem fugit
          unde, eligendi doloremque eos.
        </p>
      </div>

      <div >
        <p className="font-bold text-3xl sofadi-one-regular mb-4">COMPANY </p>
        <ul>
         <li>Home</li>
         <li>About</li>
         <li>Delivery</li>
         <li>Privacy Policy</li>
        </ul>
      </div>

      <div >
        <p className="font-bold text-3xl sofadi-one-regular mb-4">GET IN TOUCH </p>
        <ul>
         <li>+1-212-903456772</li>
         <li>contact@mystore.com</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-gray-600"> 
      <p className="font-semibold text-sm text-center py-4 text-sky-600">&copy;sai sirimarthi. all rights reserved.</p>
    </div>
   </div>
  );
};

export default Footer;

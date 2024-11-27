import React, { useState } from "react";
import exhange from "../assets/exchange.png";
import quality from "../assets/quality.png";
import support from "../assets/support.png";

const Policy = () => {

const [contact , setContact] = useState("")

const handleSubmit =(e)=>{
  e.preventDefault();
    alert("thanku for contacted me" , {contact});
    setContact("");
}




  return (
    <div>
      <div className="my-20 flex flex-col gap-10 md:gap-0 md:flex-row items-center justify-around ">
        <div className="flex flex-col items-center justify-center">
          <img src={exhange} alt="image" className="w-12 h-14" />
          <p className="font-bold">Easy Exhange Policy</p>
          <p className="text-sm font-medium">
            we offer hassle free exchange policy
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <img src={quality} alt="image" className="w-16 h-14" />
          <p className="font-bold">7days return Policy</p>
          <p className="text-sm font-medium">
            we offer 7days free exchange policy
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <img src={support} alt="image" className="w-16 h-16" />
          <p className="font-bold">Best Customer Support </p>
          <p className="text-sm font-medium">we offer 24/7 customer support</p>
        </div>
      </div>


      <div className="mb-10 flex flex-col items-center justify-center">

      <p className="text-slate-800 font-serif text-sm py-3">This is a modern, feature-rich e-commerce platform built using the MERN stack (MongoDB, Express.js, React, Node.js). It offers a seamless shopping experience with robust backend functionality and an intuitive frontend design.</p>
      <form onSubmit={handleSubmit} className="max-w-md flex items-center gap-1">
        <input type="email" value={contact || ""}
        onChange={(e)=> setContact(e.target.value)}

        placeholder="enter your email"
        required className="w-full outline outline-gray-700 outline-1 p-2 " />
        <button className="px-6 py-3 bg-black text-white text-sm">
          submit
        </button>
      </form>
      </div>
    </div>
  );
};

export default Policy;

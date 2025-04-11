import React, { useEffect, useRef, useState } from "react";
import img1 from "../assets/cloth1.jpg";
import img2 from "../assets/cloth2.jpg";
import img3 from "../assets/cloth3.jpg";
import img4 from "../assets/cloth4.jpg";
import img5 from "../assets/cloth5.jpg";
import img6 from "../assets/cloth6.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  const [slide, setSlide] = useState(0);
  const imgRef = useRef();

  const backdrop = [img1, img2, img3, img4, img5, img6];

  const offers = [
    { icon: "🔥", title: "50% OFF", desc: "On Winter Collection" },
    { icon: "🛍️", title: "Buy 1 Get 2 Free", desc: "Limited Stock Available" },
    { icon: "💥", title: "Flat 30% OFF", desc: "On All Jackets" },
    { icon: "⛄", title: "Winter Sale", desc: "10% Extra OFF on Checkout" },
    { icon: "🧥", title: "New Arrivals", desc: "Just Dropped – Explore Now" },
    { icon: "🎁", title: "Special Deal", desc: "This Week Only!" },
  ];

  const nextImg = () => {
    setSlide((prev) => (prev === backdrop.length - 1 ? 0 : prev + 1));
  };

  const previousImg = () => {
    setSlide((prev) => (prev === 0 ? backdrop.length - 1 : prev - 1));
  };

  useEffect(() => {
    imgRef.current = setTimeout(nextImg, 2000);

    return () => {
      clearTimeout(imgRef.current);
    };
  }, [slide]);

  return (
    <div className="w-full flex  items-center gap-4 py-8 relative">
      {/* text-info */}
      {/* <div className="w-1/2 flex flex-col items-center">
        <div>
          <div className="flex items-center gap-1">
            <p className="font-semibold text-xl font-serif">Winter Sale</p>
            <p className="w-8 h-[3px] bg-black"></p>
          </div>
          <p className="font-mono text-3xl text-sky-600 py-4">
            Latest Collections
          </p>

          <div className="flex items-center gap-1">
            <p className="w-12 h-[2px] bg-black"></p>
            <p className="font-sans font-medium text-gray-600 text-lg">
              Let's grab the Offers
            </p>
          </div>
        </div>
      </div> */}

      {/* images */}
      <div className="flex items-center w-full px-10">
        <div
          className="group relative w-full"
          onMouseEnter={() => clearTimeout(imgRef.current)}
          onMouseLeave={() => (imgRef.current = setTimeout(nextImg, 4000))}
        >
          <img
            src={backdrop[slide]}
            alt="image"
            className="w-full h-[450px] rounded-md transition-all duration-300 ease-in-out object-cover"
          />

          {/* Left and Right numbers */}
          <div className="absolute top-1/2 transform -translate-y-1/2 hidden group-hover:flex justify-between w-full px-4">
            <p
              onClick={previousImg}
              className="text-center flex justify-center items-center text-2xl cursor-pointer w-12 h-12 bg-black rounded-full"
            >
              👈
            </p>

            <p
              onClick={nextImg}
              className="text-center flex items-center justify-center text-2xl cursor-pointer w-12 h-12 bg-black rounded-full"
            >
              👉
            </p>
          </div>
        </div>

        <div className="absolute top-1/2 left-28 transform -translate-y-1/2 z-10 text-white space-y-4 max-w-md">
          <p className="text-4xl font-bold drop-shadow-lg">{offers[slide].icon} {offers[slide].title} </p>
          <p className="text-2xl font-semibold drop-shadow-md">
                {offers[slide].desc}
          </p>
          <p className="text-lg font-medium drop-shadow-md">
            Grab the hottest deals before they’re gone!
          </p>
          <button className="bg-white text-black font-semibold px-6 py-2 rounded-md shadow-lg hover:bg-black hover:text-white transition-all duration-300">
            <Link to={'/collections'}>
            Shop Now
            </Link>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Hero;

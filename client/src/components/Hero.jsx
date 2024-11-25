import React, { useEffect, useRef, useState } from "react";
import { backdrop } from "../utils/backdrops";

const Hero = () => {
  const [slide, setSlide] = useState(0);
  const imgRef = useRef();

  const nextImg = () => {
    setSlide((prev) => {
      if (slide === backdrop.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  };

  const previousImg = () => {
    if (slide === 0) {
      setSlide(backdrop.length - 1);
    } else {
      setSlide(slide - 1);
    }
  };

  useEffect(() => {
    imgRef.current = setTimeout(nextImg, 4000);

    return () => {
      clearTimeout(imgRef.current);
    };
  }, [slide]);

  return (
    <div className="w-full border flex flex-col md:flex-row items-center gap-4 py-8">
      {/* text-info */}
      <div className="w-1/2 flex flex-col items-center">
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
      </div>

      {/* images */}
      <div className="flex flex-col items-center w-1/2">
        <div
          className="group relative max-w-lg lg:min-w-[500px]"
          onMouseEnter={() => clearTimeout(imgRef.current)}
          onMouseLeave={() => (imgRef.current = setTimeout(nextImg, 4000))}
        >
          <img
            src={backdrop[slide].img}
            alt="image"
            className="w-full h-[450px] rounded-md transition-all duration-300 ease-in-out"
          />

          {/* Left and Right numbers */}
          <div className="absolute top-1/2 transform -translate-y-1/2 hidden group-hover:flex justify-between w-full px-4">
            <p
              onClick={previousImg}
              className="text-center text-xl cursor-pointer w-8 h-8 bg-white rounded-full"
            >
              &#8249;
            </p>

            <p
              onClick={nextImg}
              className="text-center text-xl cursor-pointer w-7 h-7 bg-white rounded-full"
            >
              &#8250;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

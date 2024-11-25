import React from "react";

const Heading = ({ text1, text2 }) => {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <p className="sofadi-one-regular text-3xl font-semibold">
        {text1}
      </p>
      <div className="flex items-center gap-1 ml-14">
        <p className="w-12 h-[2px] bg-black"></p>
        <p className="text-xl font-medium">{text2}</p>
      </div>
    </div>
  );
};

export default Heading;

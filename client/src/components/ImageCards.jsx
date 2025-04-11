import React from "react";
import { Link } from "react-router-dom";

const ImageCards = ({ data, image }) => {
  const handleAdd = () => {
    alert("Please open the product and select a size to add to cart.");
  };

  console.log(data);

  return (
    <div className="relative border border-gray-300 rounded-lg shadow-md overflow-hidden group">
      <Link to={`/productview/${data?._id}`}>
        <img
          src={image} // Fallback image
          alt={data?.name || "Product Image"}
          className="w-full h-64 object-cover transition-all duration-300 group-hover:scale-110"
        />
      </Link>
      
      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{data?.name}</h3>
        <p className="text-sm text-gray-700">Price: ${data?.price}</p>
        <div className="absolute right-3 top-2 hidden group-hover:block">
          <p className="px-4 py-1 rounded-lg bg-black text-white font-bold">Stock : <span className={`${data?.stock < 30 ? "text-red-700" : "text-yellow-400"}`}>{data?.stock}</span></p>
        </div>
      </div>
    </div>
  );
};

export default ImageCards;

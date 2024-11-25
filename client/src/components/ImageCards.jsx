import React from "react";
import { Link } from "react-router-dom";

const ImageCards = ({ data, image }) => {
  const handleAdd = () => {
    alert("Please open the product and select a size to add to cart.");
  };

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
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-1 hidden group-hover:block">
          <button
            onClick={handleAdd}
            className="w-full text-sm px-2 py-1 rounded-md bg-green-600 text-white hover:bg-green-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCards;

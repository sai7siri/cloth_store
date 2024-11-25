import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/product";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const location = useLocation();

  const [locationView, setLocationView] = useState(false);

  const { setShowBar, showBar, setSearch, search , setLocationIcon} = useProductContext();

  useEffect(() => {
    if (location.pathname.includes("collections")) {
      setLocationView(true);
      setLocationIcon(true)
    } else {
      setLocationView(false);
      setLocationIcon(false);
    }
  }, [location]);

  return showBar && locationView ? (
    <div className="container">
    <div className="flex items-center justify-center py-5 gap-3 bg-pink-50">

      <input
        type="text"
        placeholder="search products"
        className="px-4 py-2 rounded-full max-w-md w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p onClick={() => setShowBar(false)}>
        <RxCross2 size={"24"} />
      </p>
    </div>
    </div>
  ) : null;
};

export default SearchBar;

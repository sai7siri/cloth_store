import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/product";
import { RxCross2 } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [change , setChange] = useState(false);
  const { setShowBar, showBar, setSearch, search } = useProductContext();
  const { client } = useSelector((state) => state.product);
  
  const [auto , setAuto] = useState(false);
  
  // Filter product names based on input
  const filteredSuggestions = client?.filter((item) =>
    item.name.toLowerCase().includes(search)
);



  useEffect( ()=>{
    if(search.length > 0 && location.pathname !== 'collections'){
        navigate('/collections')
    }
  } , [search])

  console.log(search);


  return (
     (
      <div className="max-w-md w-full">
        <div className="flex items-center justify-center w-full">
          <div className="relative w-full flex justify-center max-w-md">
            <div className="flex items-center gap-4 w-full relative">
              <input
                type="text"
                placeholder="Search product brand names"
                className="px-4 py-2 rounded-full max-w-md w-full border border-black"
                value={search}
                onChange={(e) =>(
                  setSearch(e.target.value.toLowerCase()),
                  setAuto(true)
                ) }
              />
              <p onClick={() => setShowBar(false)} className="absolute right-2">
                <CiSearch size={"22"} />
              </p>
            </div>

            {/* 🔽 Auto-suggestions dropdown */}
            {search && auto && (
              <div className={` absolute top-full mt-1 bg-white border shadow-md rounded-md w-full max-h-60 overflow-x-auto  z-10`}>
                {filteredSuggestions && filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item, idx) => (
                    <p
                      key={idx}
                      className="px-4 py-2 hover:bg-black hover:text-white hover:scale-105 cursor-pointer"
                      onClick={() => (
                        setSearch(item.name),
                        setAuto(false)
                  )}
                    >
                      {item.name}
                    </p>
                  ))
                ) : (
                  <p className="px-4 py-2 text-gray-500">No matching products</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default SearchBar;

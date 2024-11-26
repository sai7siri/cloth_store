import React, { useEffect, useState } from "react";
import ImageCards from "./ImageCards";

const RelatedProducts = ({ category, subCategory , client }) => {
  const [relatedData, setRelatedData] = useState([]);


  useEffect(() => {
    let productsCopy = client.slice();

    if (productsCopy.length > 0) {
      productsCopy = productsCopy.filter( item => category === item.category);
      productsCopy = productsCopy.filter( item => subCategory === item.subCategory);

      setRelatedData(productsCopy.slice(0,5))
    }
  }, [category , subCategory]);

  return <div 
  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 my-4"> 
   {
      relatedData && relatedData.map( (item , i )=> (
         <ImageCards key={i} data={item} image={item?.products[0]} />
      ))
   }
  </div>;
};

export default RelatedProducts;

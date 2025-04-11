import React, { useEffect, useState } from 'react';
import Heading from "../components/Heading"
import { useProductContext } from '../context/product';
import ImageCards from "../components/ImageCards";
import {useDispatch , useSelector } from "react-redux";
import Loading from "../utils/Loading";
import {fetchData} from "../context/productsSlice";
import { FaChevronRight } from "react-icons/fa6";

const Collections = () => {

    const dispatch = useDispatch();
    const { client , loading } = useSelector( state=> state.product)

    const { search , showBar }  = useProductContext();
    const [showFilter , setShowFilter] = useState(false);
    const [filteredData , setFilteredData] = useState([]);
    const [category , setCategory] = useState([]);
    const [ type , setType ] = useState([]);
    const [sortType , setSortType ] = useState("relavent");

    console.log(search);
  
    useEffect( ()=>{
      dispatch(fetchData())
    } , [dispatch])


    const categoryFilter = (e)=>{

      if(category.includes(e.target.value)){
        setCategory( prev=> prev.filter( item => item !== e.target.value ))
      }else{
        setCategory(prev=> [...prev , e.target.value]);
      }
    }

    
    const typeFilter=(e)=>{
      
      if(type.includes(e.target.value)){
        setType( prev=> prev.filter( item => item !== e.target.value) );
        
      }else{
        setType(prev => [...prev , e.target.value]);
      }
    }
    
    let productsCopy = client.slice();

    const applyFilter = ()=>{

        productsCopy = productsCopy.filter( item => item.name.toLowerCase().includes(search) )
      

      if(category.length > 0){
        productsCopy = productsCopy.filter(item => category.includes(item.category) )
      }

      if(type.length > 0){
        productsCopy = productsCopy.filter( item=> type.includes(item.subCategory))
      }
      setFilteredData(productsCopy);
    }

    const sortFilter = ()=>{
      let spCopy = filteredData.slice();

      switch (sortType) {
          case "low-high":
            setFilteredData(spCopy.sort( ( a, b ) => a.price - b.price ) )
            break;
          case "high-low":
            setFilteredData(spCopy.sort( ( a,b )=> b.price - a.price ))
            break;
          default :
            applyFilter();
            break;  
      }
    }

    useEffect( ()=>{
        applyFilter();
    } , [category , type , search , showBar])
    
    useEffect( ()=>{
      sortFilter();
    } , [sortType] )

    // console.log(productsCopy);


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-7 my-7  h-full bg-[#f8daf0] p-1'>
        {/* filters */}

        {
          loading ? <Loading  bar={'bar'} /> : (
            <>
            
        <div className='min-w-60'>
            <p 
            onClick={()=> setShowFilter(!showFilter)}
            className='cursor-pointer font-mono flex items-center text-2xl  gap-2'>Filters
              <span className={`md:hidden ${showFilter ? "rotate-90" : ""} h-3 mt-1' `}><FaChevronRight size={"16"}/></span>
            </p>
            {/* category */}
            <div className={`border border-gray-500 py-2 pl-4 mt-6 ${showFilter ? "" : "hidden"} md:block`}>
            <p className='font-medium text-zinc-700'>Category</p>
              <p className='flex gap-2'>
                <input type="checkbox" value={"MEN"} 
                  onChange={categoryFilter}
                /> Men
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" value={"WOMEN"} 
                  onChange={categoryFilter}
                
                /> Women
              </p>
              <p className='flex gap-2'>
                <input type="checkbox" value={"KID"} 
                  onChange={categoryFilter}
                
                /> Kids
              </p>
            </div>
            {/* sub-category */}
            <div className={`${showFilter ? "" : "hidden"} md:block border my-4 border-gray-600 py-2 pl-4 `}>
            <p className='font-medium text-zinc-700'>Type</p>
              <p className='flex gap-1'>
                <input type="checkBox" value="TopWear" onChange={typeFilter} /> Topwear
              </p>
              <p className='flex gap-1'>
                <input type="checkBox" value="BottomWear" onChange={typeFilter} /> Bottomwear
              </p>
              <p>
                <input type="checkBox" value='WinterWear' onChange={typeFilter} /> Winterwear
              </p>
            </div>
        </div>

        {/* all products */}
        <div className='flex-1 '>
          <div className='flex justify-between mb-4'>
            <div>
            <Heading text1={"Latest-Product"}/>
            </div>
            <div>

              <select onClick={(e)=> setSortType(e.target.value) } className='border-2 border-gray-600 p-1'>
                <option value="relavant">Sort-by : relavent</option>
                <option value="low-high">Sort-by : low-high</option>
                <option value="high-low"> Sort-by : high-low</option>
              </select>
            </div>
      
          </div>
          {/* products */}
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
            {
                filteredData && filteredData.length > 0 ? (
                  filteredData.map( (item , index)=> (
                    <ImageCards key={index} data={item} image={item?.products[0]}/>
                  ))
                ) : (
                  <p className='font-bold text-amber-600 text-xl mr-16 w-[60vw] text-center'>No Products Available....😒</p>
                  
                )
            }
          </div>
        </div>
            </>
          )
        }
    </div>

  )
}

export default Collections

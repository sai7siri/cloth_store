import React from 'react'
import { useProductContext } from '../context/product'
import ImageCards from './ImageCards';
import Loading from '../utils/Loading';

const BestSeller = ( {client}) => {

   const bestSells = client.filter( (item)=> item.bestSeller);


  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 '>
      {
         bestSells &&  bestSells.length > 0 ? (
            bestSells.map( ( items , index )=>(
               <ImageCards data={items} key={index} image={items?.products[0]} />
            ))
         ) : (
            <Loading spinner={'spinner'}/>
         )
      }
    </div>
  )
}

export default BestSeller

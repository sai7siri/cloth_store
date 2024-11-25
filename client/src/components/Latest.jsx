import React from 'react'
import { useProductContext } from '../context/product'
import ImageCards from "../components/ImageCards.jsx"
import Loading from '../utils/Loading.jsx'

const Latest = ({ client }) => {


  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {
          client && client?.length > 0 ? (
            client.map( (items , index)=>{
          return <ImageCards data={items} key={index} image={items?.products[0] } />
})
          ) : 
          (
           <Loading spinner={'spinner'}/>
          )
        }
    </div>
  )
}

export default Latest

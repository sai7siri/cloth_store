import React, { useState } from 'react'

const AddressCard = ({address , handleDelete , handleEdit , setOpenMd , handleSelectAddress , selectedAddres}) => {

  
  return (
          <div
            className={`w-full p-3 bg-white shadow-lg rounded-l m-2 flex flex-col border-2 ${selectedAddres && selectedAddres._id === address._id ? "border-black" : "border-gray-200"}`}
            onClick={()=> handleSelectAddress(address)}
          >
            <h2 className="text-xl font-semibold text-neutral-500">
              {address.name}
            </h2>

            <p className="mt-2 text-gray-600">
              <span className="font-semibold text-lg text-slate-800">
                Street
              </span>
              : {address.street}
              <br />
              <span className="font-semibold text-lg text-slate-800">
                City
              </span>{" "}
              : {address.city}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold text-lg text-slate-800">
                State
              </span>{" "}
              : {address.state}
              <br />
              <span className="font-semibold text-lg text-slate-800">
                PostalCode
              </span>{" "}
              : {address.postalCode}
            </p>

            <p className="text-gray-600 mt-1">
              <span className="font-semibold text-lg text-slate-800">
                Phone
              </span>{" "}
              : {address.phone}
            </p>

            <div className='flex items-center justify-around'>
            <button
              onClick={() =>{
                setOpenMd(true);
                handleEdit(address._id)}
              } 
              className="mt-2  bg-violet-600 text-white py-2 px-5 rounded hover:bg-violet-900 transition duration-150 "
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(address._id)}
              className="mt-2  bg-red-500 text-white py-2 px-5 rounded hover:bg-red-600 transition duration-150 "
            >
              Delete
            </button>
            </div>
          </div>
  )
}

export default AddressCard

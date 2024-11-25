import React, { useEffect, useRef, useState } from "react";
import AddressCard from "./AddressCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAddress,
  
} from "../../context/addresSlice.js";
import Loading from "../../utils/Loading.jsx";
import { toast } from "react-toastify";

const Address = ({ selectedAddres , setSelectedAddres }) => {
  const dispatch = useDispatch();
  const { addressData, loading } = useSelector((state) => state.address);
  const [openMd, setOpenMd] = useState(false);
  const [editData , setEditData] = useState(null);


  useEffect(() => {
    dispatch(fetchAddress());
  }, [dispatch]);

  const handleAdd = () => {
    setEditData(null);
    setOpenMd(false);
    document.getElementById("my_modal_3").showModal();
  };

  const handleEdit = (id) => {
    const data = addressData.find( item => item._id === id);
    setEditData(data);
    document.getElementById("my_modal_3").showModal();
  };

  const handleDelete = (id) => {
    dispatch(deleteAddress(id)).then((data)=>{
      if(data.type === 'deleteAddres/fulfilled'){
        setSelectedAddres(null);
      } 
    })
  };

  const handleSelectAddress = (data)=>{
      setSelectedAddres(data);
  }

  return (
    <div className="flex flex-wrap ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        {loading ? (
          <Loading bar={"bar"} />
        ) : (
          addressData &&
          addressData.length > 0 &&
          addressData.map((item, idx) => (
            <AddressCard
              key={idx}
              address={item}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              setOpenMd={setOpenMd}
              handleSelectAddress={handleSelectAddress}
              selectedAddres={selectedAddres}
            />
          ))
        )}

        {/* Dummy Add Address Card */}
        {!loading && (
          <div
            onClick={handleAdd}
            className="w-full h-[250px] border-2 border-dashed border-red-700 rounded-md shadow-md text-gray-500 m-2 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 transition duration-150"
          >
            <p className="font-bold text-sky-600"> + Add New Address </p>
          </div>
        )}
      </div>
      <OpenModel
        setOpenMd={setOpenMd}
        openMd={openMd}
        editData={editData}
        setEditData={setEditData}
      />
    </div>
  );
};

const OpenModel = ({ openMd, setOpenMd, editData , setEditData }) => {
  const dispatch = useDispatch();
  const closeRef = useRef();

  const [form, setForm] = useState({
    name: "",
    city: "",
    state: "",
    street: "",
    postalCode: "",
    phone: "",
  });

  function clearForm(){
    setForm({
      name: "",
      city: "",
      state: "",
      street: "",
      postalCode: "",
      phone: "",
    });
  }
  

  // console.log(editData._id);

  useEffect(() => {
    if (openMd) {
      setForm({
        name: editData?.name,
        city: editData?.city,
        state: editData?.state,
        street: editData?.street,
        postalCode: editData?.postalCode,
        phone: editData?.phone,
      });
    } else {
      setOpenMd(false);
      setEditData(null);
      clearForm();
    }
  }, [openMd , editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.city ||
      !form.state ||
      !form.street ||
      !form.postalCode ||
      !form.phone
    ) {
      return toast.error("all fields required");
    }

    if(openMd){
      dispatch(editAddress( {form , id:editData._id})).then( (data)=>{
        console.log(data);
      })

    }else{
      dispatch(addAddress({ form })).then((data) => {
        if (data.payload.success) {
          dispatch(fetchAddress());
          clearForm(); 
        } else {
          toast.error("something went wrong");
        }
      });
    }
    if (closeRef.current) {
      closeRef.current.close();
    }

  };

  return (
    <>
      <dialog id="my_modal_3" className={`model`} ref={closeRef}>
        {/* <div className="modal-box"> */}
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ❌
            </button>
          </form>
          <h3 className="font-bold text-lg text-center mb-4"> {openMd ? "Edit-Address" : "Add Address" }</h3>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 items-center p-6"
          >
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="input input-bordered input-success w-full"
                  id="name"
                  value={form.name || ""}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="enter your name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="2">City</label>
                <input
                  type="text"
                  className="input input-bordered input-success w-full"
                  id="2"
                  value={form.city || ""}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="enter your city"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="3">State</label>
                <input
                  type="text"
                  className="input input-bordered input-success w-full"
                  id="3"
                  value={form.state || ""}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  placeholder="enter your state"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="6">Street</label>
                <input
                  type="text"
                  className="input input-bordered input-success w-full"
                  id="6"
                  value={form.street || ""}
                  onChange={(e) => setForm({ ...form, street: e.target.value })}
                  placeholder="enter your street"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="4">PostalCode</label>
                <input
                  type="text"
                  className="input input-bordered input-success w-full"
                  id="4"
                  value={form.postalCode || ""}
                  onChange={(e) =>
                    setForm({ ...form, postalCode: e.target.value })
                  }
                  placeholder="enter your postalCode"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="5">Phone</label>
                <input
                  type="text"
                  className="input input-bordered input-success w-full"
                  id="5"
                  value={form.phone || ""}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="enter your phone"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary px-20 mt-3">
             { openMd ? "Update" : "Add" }
            </button>
          </form>
        {/* </div> */}
      </dialog>
    </>
  );
};

export default Address;

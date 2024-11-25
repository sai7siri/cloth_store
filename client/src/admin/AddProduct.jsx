import { useEffect, useRef, useState } from "react";
import axios from "axios";
import backendUrl from "../utils/baseUrl";
import { useProductContext } from "../context/product";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { fetchData } from "../context/productsSlice";

export default function AddProduct() {
  const { setOpenModel, editProduct, setEditProduct } = useProductContext();
  const dispatch = useDispatch();

  const [selectedImg, setSelected] = useState([]);
  const [formUrl, setFormUrl] = useState([]);
  const inputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    subCategory: "",
    sizes: "",
    bestSeller: false,
  });

  //clear form fields
  const clearInputs = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      subCategory: "",
      sizes: "",
      bestSeller: false,
    });
    setFormUrl('');
    setSelected('')
  };

  // update and add functionality
  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name || "",
        description: editProduct.description || "",
        price: editProduct.price || "",
        stock: editProduct.stock || "",
        category: editProduct.category || "",
        subCategory: editProduct.subCategory || "",
        sizes: editProduct.sizes || "",
        bestSeller: editProduct.bestSeller || false,
      });
    }else{
      clearInputs();
    } 
    
  }, [editProduct]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imgUrl = files.map((file) => URL.createObjectURL(file));
    setSelected((prev) => [...prev, ...imgUrl]);
    setFormUrl((prev) => [...prev, ...files]);

    inputRef.current.value = null;
  };

  const handleRemove = (id) => {
    setSelected((prev) => prev.filter((_, index) => index !== id));
    setFormUrl((prev) => prev.filter((_, index) => index !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("category", form.category);
    formData.append("subCategory", form.subCategory);
    formData.append("sizes", form.sizes);
    formData.append("bestSeller", form.bestSeller);

    if (formUrl && formUrl.length > 0) {
      formUrl.forEach((img) => formData.append("images", img));
    }

    try {
      setLoading(true);

      const url = editProduct ? `${backendUrl}/api/admin/edit/${editProduct._id}` :
                  `${backendUrl}/api/admin/add`;

      const method = editProduct ? 'put' : 'post'            

      const res = await axios({
        method,
        url,
        data : formData,
        headers : { 'Content-Type' : 'multipart/form-data' },
        withCredentials : true 
      });

      setLoading(false);
      toast.success(res.data.message);


      if(editProduct){
        const updatedDetails = res.data.data || editProduct
        setEditProduct(updatedDetails);
      }
      dispatch( fetchData() );
      clearInputs();
      setOpenModel(false);

    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className=" flex items-center justify-center relative">
      <p
        className="absolute right-4 top-5 cursor-pointer"
        onClick={() => setOpenModel(false)}
      >
        ❌
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-2 border w-[500px] p-4"
      >
        <h1 className="text-lg font-mono "> {editProduct ? "Update product" : "Add Product"}</h1>
        <div className="flex flex-col w-full">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="enter brand name"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            id="name"
            className="border border-black p-2 rounded-md focus:outline-2 focus:outline-blue-600"
          />
        </div>

        <div className="flex flex-col w-full">
          <label htmlFor="desc">Description</label>
          <input
            type="text"
            placeholder="enter product title"
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            id="desc"
            className="border border-black p-2 rounded-md focus:outline-2 focus:outline-blue-600"
          />
        </div>

        {/* prices and stock */}
        <div className="flex items-center gap-4 w-full ">
          <div className="flex flex-col w-full">
            <label htmlFor="name">Price</label>
            <input
              type="number"
              placeholder="enter item price"
              value={form.price || ""}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              id="Price"
              className="border border-black p-2 rounded-md focus:outline-2 focus:outline-blue-600"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              placeholder="enter item name"
              value={form.stock || ""}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              id="stock"
              className="border border-black p-2 rounded-md focus:outline-2 focus:outline-blue-600"
            />
          </div>
        </div>

        {/* category and subCategory */}

        <div className="flex items-center gap-4 w-full ">
          <div className="flex flex-col w-full">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              placeholder="enter category"
              value={form.category || ""}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              id="category"
              className="border border-black p-2 rounded-md focus:outline-2 focus:outline-blue-600"
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="sub">SubCategory</label>
            <input
              type="text"
              placeholder="enter subCategory"
              value={form.subCategory || ""}
              onChange={(e) =>
                setForm({ ...form, subCategory: e.target.value })
              }
              id="sub"
              className="border border-black p-2 rounded-md focus:outline-2 focus:outline-blue-600"
            />
          </div>
        </div>

        {/* sizes and best seller */}

        <div className="flex items-center  gap-4 w-full ">
          <div className="flex flex-col w-1/2">
            <label htmlFor="size">Sizes</label>
            <input
              type="text"
              placeholder="enter sizes"
              value={form.sizes || ""}
              onChange={(e) => setForm({ ...form, sizes: e.target.value })}
              id="size"
              className="border border-black p-2 rounded-md focus:outline-2 focus:outline-blue-600"
            />
          </div>

          <div className="flex items-center mt-4 space-x-4">
            <span className="text-gray-700">Best Seller :</span>

            {/* Yes Radio Button */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={form.bestSeller}
                className="border"
                onChange={() =>
                  setForm((prev)=>({...prev , bestSeller : !prev.bestSeller}))
                }
              />
            </label>
          </div>
        </div>

        {/* upload images */}

        <div className="p-6 w-full">
          <label className="block text-gray-700 text-lg font-semibold mb-2">
            Upload Images
          </label>

          {/* File input for multiple images */}
          <input
            type="file"
            multiple
            ref={inputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500"
          />

          {selectedImg && selectedImg.length > 0 && (
            <div className="border-red-500 border border-dotted p-2 my-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {selectedImg.map((img, idx) => (
                <div
                  key={idx}
                  className="w-full h-full border border-gray-600 text-center"
                >
                  <img
                    src={img}
                    className=" object-cover w-28 h-24"
                    alt="file errupted"
                  />
                  <p
                    className="text-xl  mt-3 cursor-pointer
                  "
                    onClick={() => handleRemove(idx)}
                  >
                    {" "}
                    remove ❌{" "}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="px-6 py-2 text-white bg-sky-500 hover:bg-sky-800 rounded-lg ">
          {loading ? <span className="loading loading-spinner loading-md"></span> : editProduct ? 'Update-product' : "Add-Product"}
        </button>
      </form>
    </div>
  );
}

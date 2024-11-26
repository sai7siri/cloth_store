import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/product";
import Heading from "./Heading";
import RelatedProduct from "./RelatedProducts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { fetchData } from "../context/productsSlice";
import { fetchCart } from "../context/cartSlice";
import { toast } from "react-toastify";
import Footer from "./Footer";
import { FaStar, FaStarHalf } from "react-icons/fa";

const ProuctsView = () => {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.product);
  const { accUser } = useProductContext();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const { id } = useParams();

  const [selectedImg, setSelectedImg] = useState("");
  const [size, setSize] = useState(null);

  const data = client && client.find((item) => item._id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // selected image updating
  useEffect(() => {
    if (data) {
      setSelectedImg("");
      setSize(null);
    }
  }, [data]);

  // console.log(size);

  const handleAdd = async (id) => {
    if (!size) return toast.info("select a size");

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/user/addtocart/${id}`,
        { size },
        { withCredentials: true }
      );
      toast.success(data.message);
      setSize(null);
      dispatch(fetchCart());
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-start my-7 gap-4 overflow-auto">
        {/* ------imagesection------- */}
        <div
          className="flex-1 flex flex-col-reverse items-center
      sm:flex-row gap-2"
        >
          {/* multiple image */}
          <div className="flex flex-row sm:flex-col w-full sm:w-[20%] h-[20%] gap-1 overflow-x-auto sm:h-[450px] items-center justify-center">
            {data?.products.map((item, i) => (
              <img
                key={i}
                onClick={() => setSelectedImg(item)}
                src={item}
                alt=""
                className="w-[100px] sm:w-[100%]"
              />
            ))}
          </div>
          {/* main image */}
          <div className="w-[80%] ml-10">
            <img
              src={
                selectedImg ||
                (Array.isArray(data?.products)
                  ? data.products[0]
                  : data?.products)
              }
              className="object-cover h-[400px] rounded-sm"
            />
          </div>
        </div>

        {/* -----description----- */}
        <div className="flex-1">
          <p className="font-semibold text-lg">{data?.name}</p>

          <div className="my-3 flex items-center justify-center sm:justify-start gap-2">
            <p>
              <FaStar size={"26"} />
            </p>
            <p>
              <FaStar size={"26"} />
            </p>
            <p>
              <FaStar size={"26"} />
            </p>
            <p>
              <FaStar size={"26"} />
            </p>
            <p>
              <FaStarHalf size={"26"} />
            </p>

            <p className="font-mono font-semibold text-blue-700">( 177 )</p>
          </div>

          <p className="font-bold text-xl">Price : ${data?.price}</p>

          <p className="text-sm py-2 font-serif text-gray-500">
            {data?.description}
          </p>

          <div className="my-4">
            <p className=" pb-2 font-mono text-zinc-600">Select Size</p>

            {data?.sizes.map((item, i) => (
              <button
                key={i}
                onClick={() => setSize(item.toUpperCase())}
                className={`px-4 py-2 border mr-2 ${
                  item === size ? "border border-blue-700" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {accUser && accUser.role === "admin" ? null : (
            <button
              onClick={() => handleAdd(data._id)}
              className="px-6 py-2 my-2 rounded-sm  bg-black text-white hover:bg-blue-600 transition-all duration-500"
            >
              add to cart
            </button>
          )}

          <hr />
          <div className="text-sm font-serif text-zinc-700 py-3">
            <p>100% original product</p>
            <p>cash on delivery is available on this product</p>
            <p>easy return & policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* reviews-----description */}
      <div className="my-10">
        <button className="px-3 py-1 bg-opacity-20 border">description</button>

        <button className="px-3 py-1 bg-opacity-20 border">Reviews(177)</button>
        <p className="border p-1 text-sm">
          An eCommerce website is a digital platform that facilitates the buying
          and selling of products or services over the internet. It typically
          includes a user-friendly interface where customers can browse various
          product categories, view detailed product descriptions, add items to a
          virtual shopping cart, and complete purchases securely through
          integrated payment gateways
        </p>
      </div>
      {/* ----related---products */}
      <div className="my-7">
        <Heading text1={"Related"} text2={"Products"} />
        <RelatedProduct
          category={data?.category}
          subCategory={data?.subCategory}
          client={client}
        />
      </div>
      <Footer />
    </>
  );
};

export default ProuctsView;

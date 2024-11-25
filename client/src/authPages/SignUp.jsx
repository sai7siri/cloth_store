import { useState } from "react";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { Link  , useNavigate} from "react-router-dom";
import { useProductContext } from "../context/product";
import { CgEye } from "react-icons/cg";
import { FaRegEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function SignUp() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [eye , setEye] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${baseUrl}/api/user/signup`;

    try {
      setLoading(true);
      const { data } = await axios.post(url, form, {
        withCredentials: true,
      });

      setLoading(false);
      if(data.success){

        setTimeout( ()=>{
          navigate('/signin');
        } , 2000)
      }
    } catch (err) {
      setLoading(false);
      if (err.response || err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("something went wrong");
      }
    }
  };

  const handleClose =()=>{
    navigate('/')
  }

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-800 opacity-50"></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-md shadow-md p-6 w-[450px] text-black">
      <p 
        onClick={handleClose}
        className="absolute right-4 cursor-pointer">❌</p>

        <h1 className="font-serif font-bold text-lg text-center text-sky-700">
          Welcome to SignUp Page
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 px-6"
        >
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={form.fullName || ""}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              placeholder="Enter your name"
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
 
          <div className="flex flex-col relative">
            <label htmlFor="password">Password</label>
            <input
              type={eye ? 'text' : 'password'}
              id="password"
              value={form.password || ""}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              className="border border-gray-300 rounded px-2 py-1 relative"
            />
            <p className="absolute top-8 right-2"
            onClick={()=> setEye(!eye)}
            > { eye ? <FaRegEyeSlash /> : <CgEye /> } </p>

          </div>

          <button
            type="submit"
            className="bg-blue-400 text-white px-7 py-2 rounded hover:bg-blue-700"
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : "SignUp"}
          </button>
        </form>
        <div className="flex mt-6 justify-end">
          <p>have you an account ?</p>{" "} &nbsp;
          <span className="font-bold text-blue-600 hover:underline">
            <Link to="/signin">Signin</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

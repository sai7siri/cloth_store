import { useRef, useState } from "react";
import { useProductContext } from "../../context/product";
import baseUrl from "../../utils/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile() {
  const { accUser, setAccUser } = useProductContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const imgRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  const handleOnchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
      setFile(file);
      imgRef.current.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("profile", file);
    formdata.append("fullName", form.fullName);
    formdata.append("email", form.email);
    formdata.append("password", form.password);

    try {
      setLoading(true);
      const { data } = await axios.put(`${baseUrl}/api/user/update`, formdata, {
        withCredentials: true,
      });

      setLoading(false);

      if (data.success) {
        setAccUser(data.updateUser);
      }
      setForm({
        fullName: "",
        email: "",
        password: "",
      });
      setFile(null);
      setImageUrl(null);
      console.log(data);
    } catch (err) {
      setLoading(false);
      toast.error('an error occured')
    }
  };

  return (
    <div className="flex items-center justify-center h-full px-5 sm:px-0 bg-zinc-700">
      <form
        onSubmit={handleSubmit}
        className="border max-w-md w-full flex flex-col items-center p-4 gap-4 rounded-lg"
      >
        <div
          className="avatar cursor-pointer"
          onClick={() => imgRef.current.click()}
        >
          <div className="mask mask-squircle w-24">
            <img src={imageUrl || accUser?.profile} alt="profile" />
          </div>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            ref={imgRef}
            accept="image/*"
            onChange={handleOnchange}
          />
        </div>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>

          <input
            type="text"
            className="grow"
            placeholder="Email"
            defaultValue={accUser?.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>

          <input
            type="text"
            className="grow"
            placeholder="Username"
            defaultValue={accUser.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>

          <input
            type="password"
            className="grow"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </label>
        <div>
          <button className="btn btn-outline btn-accent  w-48">
            {loading ? <span className="loading loading-spinner loading-md"></span> : "Update" }</button>
        </div>
      </form>
    </div>
  );
}

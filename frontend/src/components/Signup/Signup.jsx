/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState } from "react";
import register from "../../assets/register.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullName, setfullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "enctype-Type": "multipart/form-data" } };

    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("fullName", fullName);
    newForm.append("email", email);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("password", password);

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setfullName("");
        setEmail("");
        setPassword("");
        setAvatar("");
        setPhoneNumber("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    // <!-- Container -->

    <div className="container mx-">
      <div className="flex justify-center px-6 my-12">
        {/* <!-- Row --> */}

        <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-lg ">
          {/* <!-- Col --> */}

          <div className="w-full h-auto bg-gray-100 hidden rounded-1-2xl lg:block lg:w-5/12 bg-cover ">
            <img src={register} alt="" />
          </div>
          {/* <!-- Col --> */}
          <div className="w-full lg:w-7/12  bg-gray-100 p-5 rounded-2xl lg:rounded-l-none">
            <h3 className="pt-0 text-2xl text-center">Sign Up</h3>
            <form
              className="px-8 pt-6 pb-8 mb-4  bg-gray-100 rounded"
              onSubmit={handleSubmit}
            >
              <div className="mb- md:flex md:justify-between">
                <div className="md:mr-2 md:mb-2">
                  <input
                    className="p-2 mt-8 rounded-xl border appearance-non w-full"
                    type="text"
                    name="text"
                    autoComplete="fullName"
                    placeholder="full Name"
                    required
                    value={fullName}
                    onChange={(e) => setfullName(e.target.value)}
                  />
                </div>
                <div className="md:ml-2">
                  <input
                    className="p-2 mt-8 rounded-xl border appearance-non w-full"
                    type="tel"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    placeholder="+XXX-XX-XX-XX-XX"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4 md:flex md:justify-between">
                <div className="md:mb-5">
                  <input
                    className="p-2 mt-8 rounded-xl border appearance-non w-full"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="avatar "
                    className="block text-sm font-medium text-gray-700"
                  ></label>
                  <div className="mt-7 mr-3 flex items-center">
                    <span className="inline-block text-blue-500 h-12 w-12 rounded-full overflow-hidden">
                      {avatar ? (
                        <img
                          src={URL.createObjectURL(avatar)}
                          alt="avatar"
                          className="h-full w-full text-gray-400 object-cover rounded-full"
                        />
                      ) : (
                        <RxAvatar className="h-12 w-12" />
                      )}
                    </span>
                    <label
                      htmlFor="file-input"
                      className="ml-5 flex  items-center justify-center px-4 py-2 border-2 border-gray-300 rounded-xl  text-sm font-medium text-gray-400 bg-white hover:bg-gray-50"
                    >
                      <span>Upload a file</span>
                      <input
                        required
                        type="file"
                        name="avatar"
                        id="file-input"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileInputChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-5 md:flex md:justify-center">
                <div className="mb-2  ml-17 md:mb-0 relative">
                  <input
                    className="p-2 rounded-xl border w-full"
                    type={visible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer text-gray-400"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer text-gray-400"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
                <div className="mb-4 md:mr-2 md:mb-0 relative"></div>
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold  bg-[#002D74] text-white rounded-full hover:scale-110 duration-300 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                <hr className="border-gray-400" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-400" />
              </div>
              <button className="bg-white border py-2 w-full rounded-xl mt-5 mb-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                <svg
                  className="mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="25px"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                SignUp with Google
              </button>

              <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center">
                <h4 className="text-blue-500">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500">
                    Login
                  </Link>
                </h4>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

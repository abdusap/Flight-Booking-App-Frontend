import React, {  useState } from 'react'
import { Link ,useNavigate } from "react-router-dom";
import loginValidation from '../Validation/LoginValidate';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginApi } from '../Helpers/UserApi';

function LoginForm() {
    const navigate = useNavigate();
    const [data, setData] = useState({
      email: "",
      password: "",
    });
    const handleClick = () => {
        loginValidation
          .validate(data)
          .then((validatedData) => {
       
            loginApi(validatedData).then((response) => {
              if (response.data.verify) {
                console.log(response.data);
                const token = response.data.token;
                localStorage.setItem('jwt',token)
                navigate("/");
                window.location.reload(true);
              } else if (!response.data.verify) {
                toast.error(response.data.message, {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              } else {
                toast.error(response.data.message, {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }
            });
          })
          .catch((validationErrors) => {
            toast.error(validationErrors.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          });
      };
  return (
    <div className="  bg-white w-96 border-2 rounded-2xl p-7 flex-col flex z-10 shadow-2xl relative">
    <h3 className="text-lg font-normal text-center pb-5">
      YOUR ACCOUNT FOR EVERYTHING
    </h3>
    <ToastContainer />
    <div className="flex flex-col items-center">
      <input
        type="email"
        placeholder="Email"
        value={data.email}
        className="border border-gray-400  w-full text-base px-2 focus:outline-none focus:border-gray-600 rounded h-9 mb-4"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={data.password}
        className="border border-gray-400 w-full text-base px-2 focus:outline-none focus:border-gray-600 rounded h-9 mb-4"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      />
    </div>
    <p className="text-center font-thin mb-4">Forgoten Your Password? </p>
    <div className="text-center">
      <button
        className="rounded-full bg-black text-white w-32 h-9  hover:bg-gray-800 mb-4"
        onClick={handleClick}
      >
        Login
      </button>
    </div>
    <span className="text-center font-thin">
      Not a Member?{" "}
      <Link to={"/signup"}>
        {" "}
        <span className="font-semibold">Join Us</span>
      </Link>
    </span>
  </div>
  )
}

export default LoginForm
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import signUpValidation from '../Validation/SignUpValidate';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signupApi } from '../Helpers/UserApi';
import Swal from "sweetalert2";



function SignUpForm() {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
      event.preventDefault();
      const formData = {
        name: event.target[0].value,
        mobile: event.target[1].value,
        email: event.target[2].value,
        password: event.target[3].value,
        confirmPassword: event.target[4].value,
      };
      signUpValidation 
        .validate(formData)
        .then(async (validatedData) => {
           const response= await signupApi(validatedData)
           if(response.data.success){
            Swal.fire({
                            title: "Success!",
                            text: "Your Account created successfully",
                            icon: "success",
                          }).then(() => {
                            navigate("/login");
                          });
           }
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
      <ToastContainer />
      <h3 className="text-lg font-normal text-center pb-5">
        YOUR ACCOUNT FOR
        {/* <br /> */}
        EVERYTHING
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Name"
            required
            className="border border-gray-400 w-full text-base px-2 focus:outline-none focus:border-gray-600 rounded h-9 mb-4"
          />
          <input
            type="number"
            placeholder="Mobile"
            required
            className="border border-gray-400 w-full text-base px-2 focus:outline-none focus:border-gray-600 rounded h-9 mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="border border-gray-400  w-full text-base px-2 focus:outline-none focus:border-gray-600 rounded h-9 mb-4"
          />
            <input
              type="password"
              placeholder="Password"
              required
              className="border border-gray-400 w-80 text-base px-2 focus:outline-none focus:border-gray-600 rounded h-9 mb-4"
            />

          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="border border-gray-400 w-full text-base px-2 focus:outline-none focus:border-gray-600 rounded h-9 mb-4 "
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="rounded-full bg-black text-white w-32 h-9  hover:bg-gray-800 mb-4"
          >
            SignUp
          </button>
        </div>
      </form>
      <span className="text-center font-thin">
        Already a Member?{" "}
        <Link to={"/login"}>
          {" "}
          <span className="font-semibold">Login</span>
        </Link>
      </span>
    </div>
  )
}

export default SignUpForm
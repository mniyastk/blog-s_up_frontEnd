import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = " Invalid Email ";
    }
    if (!values.password) {
      errors.password = "Password is Required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate(formValues));
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
            alt="Placeholder  "
            className="object-cover w-full h-full"
          />
        </div>

        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form action="#" method="POST">
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600">
                Email <span className=" ml-2 text-red-600"> {formErrors.email}</span>
              </label>
              <input
                type="text"
                onChange={handleOnChange}
                id="email"
                name="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password{" "}
                <span className=" ml-2 text-red-600"> {formErrors.password}</span>
              </label>
              <input
                type="password"
                onChange={handleOnChange}
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-blue-500"
              />
              <label htmlFor="remember" className="text-gray-600 ml-2">
                Remember Me
              </label>
            </div>

            <div className="mb-6 text-blue-500">
              <Link className="hover:underline">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-blue-500 text-center">
            <Link className="hover:underline">
              <Link to={"/register"}> Sign up Here</Link>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

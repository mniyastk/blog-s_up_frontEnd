import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
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
      errors.email = "Email is Requried";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email";
    }
    if (!values.phone) {
      errors.phone = "Enter Your Phone Number";
    }
    if (!values.username) {
      errors.username = "Enter Your Username";
    }
    if (!values.password) {
      errors.password = "Enter  Your Password";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormErrors(validate(formValues));
  };
  return (
    <div>
      <div className=" h-screen bg-[#667FFF] flex justify-center items-center">
        <div className="lg:w-2/6 md:w-1/2">
          <form className="bg-white p-10 rounded-lg shadow-lg  min-w-full ">
            <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
              Blog'sUp
            </h1>
            <div>
              <label
                className="text-gray-800 font-semibold block my-3 text-md"
                htmlFor="username"
              >
                Username{" "}
                <span className=" ml-2 text-red-600">
                  {formErrors.username}
                </span>
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                onChange={handleOnChange}
                name="username"
                id="username"
                placeholder="username"
              />
            </div>
            <div>
              <label
                className="text-gray-800 font-semibold block my-3 text-md"
                htmlFor="email"
              >
                Email{" "}
                <span className="ml-2 text-red-600">{formErrors.email}</span>
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                name="email"
                onChange={handleOnChange}
                id="email"
                placeholder="@email"
              />
            </div>
            <div>
              <label
                className="text-gray-800 font-semibold block my-3 text-md"
                htmlFor="password"
              >
                Password{" "}
                <span className="ml-2 text-red-600">{formErrors.password}</span>
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="password"
                name="password"
                onChange={handleOnChange}
                id="password"
                placeholder="password"
              />
            </div>
            <div>
              <label
                className="text-gray-800 font-semibold block my-3 text-md"
                htmlFor="phone"
              >
                Phone{" "}
                <span className="ml-2 text-red-600">{formErrors.phone}</span>
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                name="phone"
                id="phone"
                onChange={handleOnChange}
                placeholder="1234"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full mt-6 bg-indigo-600 hover:bg-blue-gray-400 hover:text-gray-800  rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
            >
              Register
            </button>
            <button className="w-full mt-6 mb-3 hover:bg-indigo-600 hover:text-white bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans">
              <Link to={"/login"}>Login</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;

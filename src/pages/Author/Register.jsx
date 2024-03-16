import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../Register/GoogleAuth";
import { toast } from "react-toastify";

function Register() {
  const history = useNavigate();
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [showRegistrationOptions, setShowRegistrationOptions] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is Required";
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
      errors.password = "Enter Your Password";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(validate(formValues));

    if (Object.keys(errors).length === 0) {
      setShowRegistrationOptions(true);
    }
  };

  const handleUser = () => {
    axios
      .post("http://localhost:3005/user/register", formValues)
      .then((res) => {
        toast.success("Account Created Successfully");
        history("/home");
      })
      .catch((err) => {
         
        toast.error(err.response.data);
        setShowRegistrationOptions(false)
      });
  };
  const hanldeAuthor = () => {
    axios
      .post("http://localhost:3005/author/register", formValues)
      .then((res) => {
        toast.success("Account Created Successfully");
        history("/home");
      })
      .catch((err) => {
        toast.error(err.response.data);
        setShowRegistrationOptions(false)
      });
  };

  return (
    <div className="relative">
      {showRegistrationOptions && (
        <div className="absolute    inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-10">
          <div className="border inline-block bg-indigo-600 px-6 py-9 rounded-2xl">
            <button
              onClick={handleUser}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            >
              Register as User
            </button>
            <button
              onClick={hanldeAuthor}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Register as Author
            </button>
          </div>
        </div>
      )}

      <div className="h-screen bg-[#667FFF] flex justify-center items-center">
        <div className="lg:w-2/6 md:w-1/2 relative">
          <form className="bg-white p-10 rounded-lg shadow-lg min-w-full">
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
                placeholder="Username"
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
                placeholder="Email"
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
                placeholder="Password"
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
                placeholder="Phone"
              />
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full mt-6 bg-indigo-600 hover:bg-blue-gray-400 hover:text-gray-800 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
            >
              Register
            </button>
            <button className="w-full mt-6 mb-3 hover:bg-indigo-600 hover:text-white bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans">
              <Link to={"/login"}>Login</Link>
            </button>
            <div className="flex justify-center">
              <GoogleAuth />
            </div>
          </form>
        </div>
      </div>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end"></div>
      </div>
    </div>
  );
}

export default Register;

import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmail = (e) => {
    setEmail(e.currentTarget.value);
  };

  const handlePassword = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const handleName = (e) => {
    setName(e.currentTarget.value);
  };

  const handleBirth = (e) => {
    setBirth(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Confirmed password is wrong");
      return;
    }
    setPasswordError("");
    onSubmit(name, email, password, birth);
  };

  return (
    <div className="bg-black">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-10">
        <Link
          to="/"
          className="flex items-center mb-6 text-4xl font-bold text-red-400"
        >
          StellaNeX
        </Link>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-5 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-red-400 md:text-2xl mb-2">
              Create an account
            </h1>
            <form className="space-y-2 md:space-y-3" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-base font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleEmail}
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-base font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePassword}
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-base font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-base font-medium black"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={handleName}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="birth"
                  className="block mb-2 text-base font-medium text-gray-900"
                >
                  Your birth
                </label>
                <input
                  type="date"
                  name="birth"
                  id="birth"
                  value={birth}
                  onChange={handleBirth}
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    required=""
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500">
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              {passwordError && (
                <p className="text-sm font-medium text-red-500">
                  {passwordError}
                </p>
              )}
              <button
                type="submit"
                className="w-full text-white bg-red-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-base px-5 py-2.5 text-center"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Already have an account?{" "}
                <Link
                  to="/Login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [susername, setUsername] = useState("");
  const [spassword, setPassword] = useState("");
  const [semail, setEmail] = useState("");

  const register = () => {
    axios({
      method: "post",
      data: {
        username: susername,
        email: semail,
        password: spassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/register",
    })
      .then((res) => {
        console.log(res.data); // Log the response data
        // Add any additional logic here based on the response
      })
      .catch((err) => {
        console.error(err); // Log the error
        // Add error handling logic here
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Register</h1>
      <div className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="username"
            id="username"
            placeholder="username"
            value={susername}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="email"
            id="email"
            placeholder="email"
            value={semail}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={spassword}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={register}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;

"use client";
// pages/signup.tsx
import React, { useState } from "react";
import executeQuery from "../lib/db"; // import the helper function
import bcrypt from "bcryptjs"; // import bcrypt to hash the password

const Signup = () => {
  // Define the state variables for the form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // define a state variable for error messages
  const [success, setSuccess] = useState(""); // define a state variable for success messages

  // Define the handler function for the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate the form inputs and send a request to the backend
    // For simplicity, we will just log the input values to the console
    // Check if the passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Check if the email already exists in the database
    const emailCheck = await executeQuery({
      query: "SELECT * FROM profiles WHERE email = ?",
      values: [email],
    });
    if (emailCheck.error) {
      setError("Somethig w wrong");
      return;
    }
    if (emailCheck.length > 0) {
      setError("Email already exists");
      return;
    }
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert the user data into the database
    const result = await executeQuery({
      query:
        "INSERT INTO profiles (username, email,password, confpwd) VALUES (?, ?, ?, ?)",
      values: [name, email, password, confirmPassword], // use the email as the username and the name as the first and last name
    });
    if (result.error) {
      setError("Something went");
      return;
    }
    // Perform an update operation on the profiles table using a custom API route
    // Send a POST request with the form data to /api/update-profile
    const response = await fetch("../update-profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    // Check the response status and handle the errors or success
    if (response.ok) {
      // Set the success message
      setSuccess("Profile updated successfully");
    } else {
      // Set the error message
      setError(await response.text());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-6 bg-white rounded-xl shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;

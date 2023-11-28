"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import mysql2 from "mysql2";

export default function LoginForm() {
  // Define the state variables for the username and password inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Define the router object to redirect the user after login
  const router = useRouter();

  // Define the function to handle the form submission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    // Prevent the default behavior of the form
    e.preventDefault();

    // Create a connection to the MySQL database
    // You will need to provide your own credentials and database name
    const connection = mysql2.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "profiles",
    });

    // Connect to the database
    connection.connect((err) => {
      if (err) {
        // If there is an error, show an alert message
        alert("Error connecting to the database: " + err.message);
      } else {
        // If the connection is successful, query the database for the username and password
        const query =
          "SELECT * FROM profiles WHERE username = ? AND password = ?";
        connection.query(query, [username, password], (err, results: any) => {
          if (err) {
            // If there is an error, show an alert message
            alert("Error querying the database: " + err.message);
          } else {
            // If the query is successful, check if the results are not empty
            if (results.length > 0) {
              // If the results are not empty, that means the username and password are valid
              // Redirect the user to the home page
              router.push("/");
            } else {
              // If the results are empty, that means the username and password are invalid
              // Show an alert message
              alert("Invalid username or password");
            }
          }
        });
      }
    });
  };

  // Define the function to handle the username input change
  const handleUsernameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    // Set the username state to the input value
    setUsername(e.target.value);
  };

  // Define the function to handle the password input change
  const handlePasswordChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    // Set the password state to the input value
    setPassword(e.target.value);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
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
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember_me"
            name="remember_me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember_me"
            className="ml-2 block text-sm text-gray-900"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
  );
}

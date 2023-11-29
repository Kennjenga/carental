"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Users = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/getUser",
    })
      .then((res) => setUsername(res.data.username))
      .catch((err) => console.log(err));
  };
  return (
    <div className="p-4 mt-8">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <h3 className="text-lg font-semibold mb-2">Profiles</h3>
      <h3 className="text-lg">Logged In user: {username}</h3>
    </div>
  );
};

export default Users;

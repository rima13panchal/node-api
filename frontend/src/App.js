import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getName();

    getUsers();
  }, []);

  const getName = async () => {
    const response = await axios.get("/name");
    setName(response.data.msg);
  };

  const getUsers = async () => {
    const response = await axios.get("/users");
    console.log(response);
    setUsers(response.data);
  };
  console.log(users);
  return (
    <>
      <h1>My Website</h1>
      <h3>{name}</h3>
    </>
  );
}

export default App;

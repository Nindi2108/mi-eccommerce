import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (user) => setUsers([...users, user]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Gagal fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User Management</h2>
      <div className="row">
        <div className="col-lg-4 col-md-5 col-12 mb-3">
          <UserForm onAddUser={addUser} />
        </div>
        <div className="col-lg-8 col-md-7 col-12">
          <UserTable users={users} />
        </div>
      </div>
    </div>
  );
}

export default App;

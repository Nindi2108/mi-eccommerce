import React, { useState } from "react";

function UserForm({ onAddUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !role) return;

    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role }),
    });
    const data = await res.json();
    if (res.ok) {
      onAddUser(data);
      setName(""); setEmail(""); setRole("");
    } else {
      alert(data.error || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="form-control mb-2"/>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="form-control mb-2"/>
      <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" className="form-control mb-2"/>
      <button type="submit" className="btn btn-primary w-100">Add User</button>
    </form>
  );
}

export default UserForm;

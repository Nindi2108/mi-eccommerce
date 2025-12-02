import React from "react";

function UserTable({ users }) {
  return (
    <table className="table table-striped table-bordered">
      <thead className="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="4" className="text-center">Tidak ada data</td>
          </tr>
        ) : (
          users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default UserTable;

import React from "react";

function UserList({ users }) {
  return (
    <ul className="list-group">
      {users.map((user) => (
        <li key={user.id} className="list-group-item">
          {user.name} - {user.email} - {user.role}
        </li>
      ))}
    </ul>
  );
}

export default UserList;

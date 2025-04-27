import React, { useState } from 'react'
import UserForm from './userForm/UserForm';
import UserList from './userList/UserList';


function User() {

const [activeView, setActiveView] = useState("form");


  return (
    <div className="user-management-container">
      <div className="header">
        <h1 className="title">User Management</h1>
        <div className="button-group">
          <button
            onClick={() => setActiveView("form")}
            className={`toggle-button ${activeView === "form" ? "active" : ""}`}
          >
            Add a User
          </button>
          <button
            onClick={() => setActiveView("list")}
            className={`toggle-button ${activeView === "list" ? "active" : ""}`}
          >
            Users List
          </button>
        </div>
      </div>

      {activeView === "form" ? <UserForm /> : <UserList />}
    </div>
  )
}

export default User
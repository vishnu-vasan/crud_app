import React, { useState } from "react";
import UserDataService from "../services/UserService";
import Login from "./Login";
import { Link } from "react-router-dom";

const AddUser = () => {
  const initialUserState = {
    name: "",
    username: "",
    role: "user",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState(null);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const saveUser = () => {
    var data = {
      name: user.name,
      username: user.username,
      role: user.role,
      email: user.email,
      password: user.password,
    };
    UserDataService.create(data)
      .then((response) => {
        setUser({
          name: response.data.name,
          username: response.data.username,
          role: response.data.role,
          email: response.data.email,
          password: response.data.password,
        });
        setSubmitted(true);
        console.log(response.data);
        console.log(response.data.username);
      })
      .catch((e) => {
        console.log(e.response.data.error);
      });
  };
  // const newUser = () => {
  //   setUser(initialUserState);
  //   setSubmitted(false);
  // };
  return (
    <div className="submit-form">
      {submitted ? (
        // <div>
        //   <h4>User created successfully</h4>
        //   <button className="btn btn-success" onClick={newUser}>
        //     Add User
        //   </button>
        // </div>
        <Login />
      ) : (
        <div>
          <h1>Sign up</h1>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={user.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              required
              value={user.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="role">Role</label>
            <input
              type="text"
              className="form-control"
              id="role"
              required
              value={user.role}
              onChange={handleInputChange}
              name="role"
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <br></br>
            <select
              id="role"
              defaultValue={user.role}
              onChange={handleInputChange}
              name="role"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              required
              value={user.email}
              onChange={handleInputChange}
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={user.password}
              onChange={handleInputChange}
              name="password"
            />
          </div>
          <br></br>
          <button onClick={saveUser} className="btn btn-success">
            Submit
          </button>
          <br></br>
          <Link to={"/login-user"} className="nav-link">
            Have an account ?
          </Link>
          <br></br>
          {err ? <p>{err}</p> : <p></p>}
        </div>
      )}
    </div>
  );
};

export default AddUser;

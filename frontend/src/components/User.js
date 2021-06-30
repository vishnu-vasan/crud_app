import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";
import axios from "axios";

const User = (props) => {
  const initialUserState = {
    id: null,
    name: "",
    role: "",
    email: "",
    password: "",
  };
  const [currentUser, setCurrentUser] = useState(initialUserState);
  const [message, setMessage] = useState("");

  const getUser = (id) => {
    UserDataService.get(id)
      .then((response) => {
        setCurrentUser(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getUser(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUser = () => {
    // UserDataService.update(currentUser.id, currentUser)
    axios
      .put(
        `http://127.0.0.1:8000/api/user-update/${currentUser.id}/`,
        currentUser
      )
      .then((response) => {
        console.log(response.data);
        setMessage("The user was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteUser = () => {
    UserDataService.remove(currentUser.id)
      .then((response) => {
        console.log(response.data);
        setMessage(response.data.message);
        props.history.push("/users-list");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User Detail:</h4>
          <form>
            <br></br>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={currentUser.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                type="text"
                className="form-control"
                id="role"
                value={currentUser.role}
                onChange={handleInputChange}
                name="role"
              />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={currentUser.email}
                onChange={handleInputChange}
                name="email"
              />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={handleInputChange}
                name="password"
              />
            </div>
          </form>
          <br></br>
          <button className="btn btn-danger mr-2" onClick={deleteUser}>
            Delete
          </button>
          {"  "}
          <button
            type="submit"
            className="btn btn-warning"
            onClick={updateUser}
          >
            Update User
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a User...</p>
        </div>
      )}
    </div>
  );
};

export default User;

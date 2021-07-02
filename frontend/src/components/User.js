import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";
import axios from "axios";

const User = (props) => {
  var initialUserState = {
    id: null,
    username: "",
    name: "",
    role: "",
    loggedInUser: "",
  };
  const loggedInUser = props.location.state.lg_user;
  const lgUserRole = props.location.state.role;
  console.log(props);
  initialUserState = {
    ...initialUserState,
    loggedInUser: loggedInUser,
    lgUserRole: lgUserRole,
  };
  console.log(initialUserState);
  const [currentUser, setCurrentUser] = useState(initialUserState);
  console.log(currentUser);
  const [message, setMessage] = useState("");

  const getUser = (id) => {
    UserDataService.get(id)
      .then((response) => {
        var final = response.data;
        final["loggedInUser"] = loggedInUser;
        final["lgUserRole"] = lgUserRole;
        setCurrentUser(final);
        console.log(final);
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
    axios({
      method: "put",
      url: `http://127.0.0.1:8000/router/user/${currentUser.id}/`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: currentUser,
    })
      .then((response) => {
        console.log(response.data);
        setMessage("The user was deleted successfully!");
        props.history.push("/users-list");
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
        if (e.response.status === 403)
          setMessage("You cannot update this user");
        console.log(message);
      });
  };

  const deleteUser = () => {
    axios({
      method: "delete",
      url: `http://127.0.0.1:8000/router/user/${currentUser.id}/`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      data: currentUser,
    })
      .then((response) => {
        setMessage("The user was deleted successfully!");
        props.history.push("/users-list");
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 403)
          setMessage("You cannot delete this user");
      });
  };
  const back = () => {
    props.history.push("/users-list");
  };
  return (
    <div>
      {currentUser ? (
        <div className="edit-form">
          <h4>User Detail:</h4>
          <form>
            <br></br>
            <div className="form-group">
              <label htmlFor="name">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={currentUser.username}
                onChange={handleInputChange}
                name="username"
              />
            </div>
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
          </form>
          <br></br>
          {lgUserRole === "admin" || currentUser.username === loggedInUser ? (
            <button className="btn btn-danger mr-2" onClick={deleteUser}>
              Delete
            </button>
          ) : (
            <div></div>
          )}
          {"  "}
          {currentUser.username === loggedInUser ? (
            <button
              type="submit"
              className="btn btn-warning"
              onClick={updateUser}
            >
              Update User
            </button>
          ) : (
            <div></div>
          )}
          <p>{message}</p>
          <br></br>
          <button className="btn btn-danger mr-2" onClick={back}>
            Go back
          </button>
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

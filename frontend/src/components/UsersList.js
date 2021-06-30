import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import Logout from "./Logout";
import history from "../history";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);
  const [currentuser, setCurrentUser] = useState(null);
  const [isLogin, setisLogin] = useState(props.isAuth);
  const [currentIndex, setCurrentIndex] = useState(-1);
  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserDataService.getAll()
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
        setisLogin(true);
      })
      .catch((e) => {
        console.log("---" + e.message);
        setisLogin(false);
        window.location.href = "/login-user";
      });
  };
  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };
  const lgout = () => {
    fetch("/api/user-logout", {
      credentials: "same-origin",
    })
      .then((response) => {
        // console.log(response.data);
        setisLogin(false);
      })
      .catch((e) => {
        console.log(e);
      });
    history.push("/login-user");
  };
  return (
    <>
      {isLogin ? (
        <div>
          <div class="btn-lgout">
            <button className="btn btn-warning" onClick={lgout}>
              Logout
            </button>
          </div>
          <div className="list row">
            <div className="col-md-6">
              <h4>Users List</h4>

              <ul className="list-group">
                {users &&
                  users.map((user, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => setActiveUser(user, index)}
                      key={index}
                    >
                      {user.name}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-6">
              {currentuser ? (
                <div>
                  <h4>User</h4>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentuser.name}
                  </div>
                  <div>
                    <label>
                      <strong>Role:</strong>
                    </label>{" "}
                    {currentuser.role}
                  </div>
                  <div>
                    <label>
                      <strong>Email:</strong>
                    </label>{" "}
                    {currentuser.email}
                  </div>
                  <br></br>
                  {/* {currentuser.role === "admin" ? (
                  <Link
                    to={"/user-detail/" + currentuser.id}
                    className="btn btn-warning"
                  >
                    Edit/View
                  </Link>
                ) : (
                  <div></div>
                )} */}
                  <Link
                    to={"/user-det/" + currentuser.id}
                    className="btn btn-warning"
                  >
                    Edit/View
                  </Link>
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a User...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default UsersList;

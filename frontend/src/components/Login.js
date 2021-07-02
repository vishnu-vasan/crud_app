import React, { useState, useEffect } from "react";
import UsersList from "./UsersList";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const Login = () => {
  const cookies = new Cookies();
  const initialUserState = {
    username: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialUserState);
  const [authenticated, setauthenticated] = useState(false);
  const [err, setErr] = useState(null);
  const setauth = (val) => {
    setauthenticated(val);
  };
  useEffect(() => {
    getSession();
  }, []);
  const getSession = () => {
    axios({
      method: "get",
      url: "/api/session",
      withCredentials: true,
    }).then((response) => {
      console.log(response.data);
      if (response.data.isAuthenticated) {
        setauth(true);
      } else {
        setauth(false);
      }
    });
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const logUser = (event) => {
    var log_data = {
      username: user.username,
      email: user.email,
      password: user.password,
    };
    event.preventDefault();
    axios({
      method: "post",
      url: "/api/user-login/",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      withCredentials: true,
      data: log_data,
    })
      .then((response) => {
        setauthenticated(true);
        console.log("---", authenticated);
      })
      .catch((e) => {
        if (e.response.status === 401) setErr("Wrong credentials");
        if (e.response.status === 400) setErr("Bad Request, Try again");
        if (e.response.status === 406) setErr(e.response.data.error);
        console.log(e.response);
      });
  };

  // const getSession = () => {
  //   fetch("/api/session", {
  //     credentials: "same-origin",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (data.isAuthenticated) {
  //         setauthenticated(true);
  //       } else {
  //         setauthenticated(false);
  //       }
  //     });
  // };
  return (
    <div className="submit-form">
      {authenticated ? (
        <UsersList isAuth={authenticated} />
      ) : (
        <div>
          <h1>Log In</h1>
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
            <label htmlFor="email">Username</label>
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
          <button onClick={logUser} className="btn btn-success">
            Submit
          </button>
          <br></br>
          <Link to={"/user-add"} className="nav-link">
            Dont have an account ?
          </Link>
          <br></br>
          {err ? <p>{err}</p> : <p></p>}
        </div>
      )}
    </div>
  );
};

export default Login;

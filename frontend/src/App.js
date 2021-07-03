import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddUser from "./components/AddUser";
import User from "./components/User";
import UsersList from "./components/UsersList";
import Login from "./components/Login";
import Logout from "./components/Logout";

const App = () => {
  const [name, setName] = useState(false);
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    getSession();
  }, []);
  const getSession = () => {
    fetch("/api/session", {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isAuthenticated) {
          setAuth(true);
          setName(data.name);
        } else {
          setAuth(false);
          setName("");
        }
      });
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {" "}
        <div className="navbar-nav mr-auto">
          {auth ? (
            <li className="nav-item">
              <Link to={"/users-list"} className="nav-link">
                Welcome {name}
              </Link>
            </li>
          ) : (
            <></>
          )}
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/users-list"]} component={UsersList} />
          <Route exact path={["/user-add"]} component={AddUser} />
          <Route exact path={["/user-det/:id"]} component={User} />
          <Route exact path={["/", "/login-user"]} component={Login} />
          <Route exact path={["/logout-user"]} component={Logout} />
        </Switch>
      </div>
    </div>
  );
};

export default App;

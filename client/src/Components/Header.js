import React from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Features/UserSlice";

function Header() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  return (

<div className="header">

      <div className="left-side">
        <Link to="/" className="logo-text">
          UniGuide
        </Link>
      </div>

      <div className="center-nav">
        <NavItem>
          <Link to="/CourseList">Courses</Link>
        </NavItem>

        <NavItem>
          <Link to="/profile">Profile</Link>
        </NavItem>

      </div>

      <div className="right-side">

  {user ? (
    <>
      <span className="user-name" float="right">
          Hello {user ? `${user.name} (${user.email})` : "Guest"}
        </span>
      <button
        className="logout"
        onClick={handleLogout}>
        Logout
      </button>
    </>
  ) : (
    <div className="buttons">
      <button
        className="Login"
        onClick={() => navigate("/Login")}
      >
        Login
      </button>

      <button
        className="signup"
        onClick={() => navigate("/Register")}
      >
        Sign Up
      </button>
    </div>
  )}

</div>
    </div>
  );
}

export default Header;
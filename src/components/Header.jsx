import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  HiOutlineHome,
  HiUserAdd,
  HiLogin,
  HiLogout,
  HiOutlinePencilAlt,
  HiOutlineDocumentText,
  HiOutlineCollection,
  HiUserCircle,
} from "react-icons/hi";

import AuthContext from "../store/auth-context";
import "../style/style.css"
export default function Header() {
  const { isLoggedIn, logout, userName } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-dark bg-primary shadow-sm px-3 py-3">
      <div className="container-fluid">
      
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/6114045.png"
            alt="Logo"
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
          Story Crafter
        </Link>

       
        <div className="d-none d-lg-flex ms-auto gap-3 align-items-center">
          <NavLink className="nav-link text-white" to="/" end>
            Home
          </NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink className="nav-link text-white" to="/signup">
                Register
              </NavLink>
              <NavLink className="nav-link text-white" to="/login">
                Login
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-white fw-bold">{userName}</span>

              <NavLink className="nav-link text-white" to="/create-blog">
                New Post
              </NavLink>
              <NavLink className="nav-link text-white" to="/edit-blog/1">
                Edit Blog
              </NavLink>
              <NavLink className="nav-link text-white" to="/my-blogs">
                My Blogs
              </NavLink>
              <button className="btn btn-outline-light btn-sm" onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>

    
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
          aria-controls="mobileMenu"
        >
          <span className="navbar-toggler-icon" />
        </button>

      
        <div
          className="offcanvas offcanvas-end text-bg-primary custom-offcanvas-width"
          tabIndex="-1"
          id="mobileMenu"
          aria-labelledby="mobileMenuLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="mobileMenuLabel">
              Menu
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <NavLink
            className="nav-link text-white d-flex align-items-center gap-2"
            to="/"
            end
          >
            <HiOutlineHome size={22} /> Home
          </NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink
                className="nav-link text-white d-flex align-items-center gap-2"
                to="/signup"
              >
                <HiUserAdd size={24} /> Register
              </NavLink>
              <NavLink
                className="nav-link text-white d-flex align-items-center gap-2"
                to="/login"
              >
                <HiLogin size={24} /> Login
              </NavLink>
            </>
          ) : (
            <>
              <span className="text-white fw-bold d-flex align-items-center gap-2">
                <HiUserCircle size={28} /> {userName}
              </span>

              <NavLink
                className="nav-link text-white d-flex align-items-center gap-2"
                to="/my-blogs"
              >
                <HiOutlineCollection size={24} /> My Blogs
              </NavLink>
              <NavLink
                className="nav-link text-white d-flex align-items-center gap-2"
                to="/create-blog"
              >
                <HiOutlinePencilAlt size={24} /> New Post
              </NavLink>
              <NavLink
                className="nav-link text-white d-flex align-items-center gap-2"
                to="/edit-blog"
              >
                <HiOutlineDocumentText size={24} /> Edit Blog
              </NavLink>
              <button
                className="btn btn-outline-light mt-2 d-flex align-items-center gap-2"
                onClick={logout}
              >
                <HiLogout size={24} /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

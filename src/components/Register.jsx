import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "../network/api";
import "../style/style.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerApi({ name, email, password });
      toast.success("Registration successful!");
      navigate("/create-blog");
    } catch (err) {
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form
        onSubmit={handleSubmit}
        className="register-form bg-white mt-2 p-4 rounded shadow-lg"
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <h2 className="mb-4 text-center">Register</h2>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope-fill"></i>
            </span>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Registering…" : "Register"}
        </button>
      </form>
    </div>
  );
}

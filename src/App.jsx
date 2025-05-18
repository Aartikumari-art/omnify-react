import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import AuthContext from "./store/auth-context";
import Header from "./components/Header";
import Footer from "./components/Footer";

import BlogList from "./pages/BlogList";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateBlog from "./pages/CreateBlog";

import ProtectedRoute from "./components/ProtectedRoute";
import BlogDetail from "./pages/BlogDetail";
import EditBlog from "./pages/EditBlog";
import MyBlogs from "./pages/MyBlogs";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <Header />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/single-blog/:id" element={<BlogDetail />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute isAuthenticated={isLoggedIn} />}>
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/edit-blog/:id" element={<EditBlog />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;

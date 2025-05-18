import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { singleBlogApi } from "../network/api"; 
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";

const BlogDetail = () => {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogDetails = async () => {
    try {
      const data = await singleBlogApi(id, {});
      setBlog(data.data); 
    } catch (err) {
      console.error("Failed to fetch blog details", err);
    }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!blog) return <div className="text-center my-5">Blog not found</div>;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "2rem 0",
      }}
    >
      <div className="container">
        <div className="card shadow-lg rounded-4 border-0 p-4">
          <h2>{blog.title}</h2>
          <div className="text-muted small mb-3 d-flex justify-content-between">
            <span>
              <FaUser className="me-1" />
              {blog.createdBy?.name}
            </span>
            <span>
              <MdDateRange className="me-1" />
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p>{blog.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;

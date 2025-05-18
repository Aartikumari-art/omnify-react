import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Spinner, Pagination } from "react-bootstrap";
import { myBlogApi, deleteBlogApi, editBlogApi } from "../network/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";
import "../style/style.css"
const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6; 

  
  const fetchMyBlogs = async () => {
    setLoading(true);
    try {
      const data = await myBlogApi();
      setBlogs(data.data || []); 
    } catch (err) {
      console.error("Failed to fetch my blogs", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };


  const handleEdit = (blogId) => {
    navigate(`/edit-blog/${blogId}`); 
  };
  

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlogApi(blogId);
        toast.success("Blog deleted successfully!")
        fetchMyBlogs(); 
      } catch (err) {
        console.error("Error deleting blog:", err);
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 className="text-center py-3">My Blogs</h2>

      <div className="container flex-grow-1 mb-5 pb-5">
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : currentBlogs.length === 0 ? (
          <p className="text-center my-5">No blogs found.</p>
        ) : (
          <div className="row">
            {currentBlogs.map((blog) => (
              <div key={blog._id} className="col-12 col-md-6 col-lg-4 mb-5">
                <div className="card h-100 shadow-lg rounded-4 border-0 blog-card">
                  <div className="card-body d-flex flex-column">
                    <Link
                      to={`/single-blog/${blog._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                      className="flex-grow-1"
                    >
                      <h5 className="card-title mb-2">{blog.title}</h5>
                      <p className="card-text">
                        {blog.content.slice(0, 180)}...
                      </p>
                    </Link>
                    <div className="d-flex justify-content-between align-items-center mt-3 text-muted small flex-wrap">
                      <div className="d-flex align-items-center gap-3">
                        <span>
                          <FaUser className="me-1" />
                          {blog.createdBy?.name || "You"}
                        </span>
                        <span>
                          <MdDateRange className="me-1" />
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="d-flex align-items-center gap-3">
                        <i
                          className="bi bi-pencil text-secondary fs-6"
                          title="Edit"
                          onClick={() => handleEdit(blog._id)}
                          style={{ cursor: "pointer" }}
                        ></i>
                        <i
                          className="bi bi-trash text-danger fs-6"
                          title="Delete"
                          onClick={() => handleDelete(blog._id)}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <nav
          aria-label="Page navigation"
          style={{
            background: "white",
            padding: "10px 0",
            marginTop: "40px",
            boxShadow: "0 -2px 10px rgba(0,0,0,0.1)",
            position: "sticky",
            bottom: 0,
            zIndex: 1000,
          }}
          className="d-flex justify-content-center"
        >
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <li
                  key={pageNum}
                  className={`page-item ${
                    pageNum === currentPage ? "active" : ""
                  }`}
                  aria-current={pageNum === currentPage ? "page" : undefined}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                </li>
              );
            })}

            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default MyBlogs;

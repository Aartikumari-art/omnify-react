import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { Spinner, Pagination } from "react-bootstrap";
import { getBlogsApi } from "../network/api";
import { Link } from "react-router-dom"; 

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async (page = 1) => {
    setLoading(true);
    try {
      const data = await getBlogsApi(page);
      setBlogs(data.data);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" }); 
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
    

      <div className="container flex-grow-1 mt-3">
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            <div className="row">
              {blogs.map((blog) => (
                <div key={blog._id} className="col-md-6 col-lg-4 mb-4">
                  <Link
                    to={`/single-blog/${blog._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="card h-100 shadow-lg rounded-4 border-0 blog-card">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title mb-2">{blog.title}</h5>
                        <p className="card-text flex-grow-1">
                          {blog.content.slice(0, 180)}...
                        </p>
                        <div className="d-flex justify-content-between align-items-center mt-3 text-muted small">
                          <span>
                            <FaUser className="me-1" />
                            {blog.createdBy?.name}
                          </span>
                          <span>
                            <MdDateRange className="me-1" />
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

     
      {!loading && (
  <nav
    aria-label="Page navigation"
    style={{
      background: "white",
      padding: "10px 0",
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
            className={`page-item ${pageNum === currentPage ? "active" : ""}`}
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

      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
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

export default BlogList;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { singleBlogApi, editBlogApi } from "../network/api";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await singleBlogApi(id);
        const blog = response.data;

  

        setTitle(blog.title);
        setContent(blog.content);
      } catch (err) {
        toast.error("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id,  navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await editBlogApi(id, { title, content });
      toast.success("Blog updated successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to update blog.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="container flex-grow-1 d-flex justify-content-center align-items-start mt-4">
        <div
          className="card shadow-lg rounded-4 border-0 w-100"
          style={{ maxWidth: "700px" }}
        >
          <div className="card-body">
            <h4 className="card-title mb-4 text-center">Edit Your Blog</h4>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter blog title"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <textarea
                  id="content"
                  className="form-control"
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="Write your blog content here"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Updating...
                  </>
                ) : (
                  "Update Blog"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

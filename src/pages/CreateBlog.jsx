
import React, { useState } from "react";
import { createBlogApi } from "../network/api";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBlogApi({ title, content });
      toast.success("Blog created successfully!");
      setTitle("");
      setContent("");
    } catch (err) {
      toast.error("Failed to create blog.");
    } finally {
      setLoading(false);
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
      <div className="container flex-grow-1 d-flex justify-content-center align-items-start mt-4">
        <div
          className="card shadow-lg rounded-4 border-0 w-100"
          style={{ maxWidth: "700px" }}
        >
          <div className="card-body">
            <h4 className="card-title mb-4 text-center">
              Blog Submission Form
            </h4>

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
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" className="me-2" />
                    Creating...
                  </>
                ) : (
                  "Create Blog"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

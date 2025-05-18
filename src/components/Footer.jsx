import React from "react";

export default function Footer() {
  return (
    <footer
      className="bg-dark text-light py-3 text-center"
      style={{ position: "fixed", bottom: 0, width: "100%" }}
    >
      <div className="container">
        <small>
          © {new Date().getFullYear()} Your Blog Name. All rights reserved.
        </small>
      </div>
    </footer>
  );
}

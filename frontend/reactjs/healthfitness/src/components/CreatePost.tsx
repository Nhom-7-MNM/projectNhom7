import React, { useState, useEffect } from "react";
import { createPost } from "../api";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role"); // Lấy role từ localStorage
    setUserRole(storedRole || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userRole !== "ADMIN") {
      alert("Bạn không có quyền tạo bài viết!");
      return;
    }
    try {
      await createPost({ title, content });
      alert("Bài viết đã được tạo!");
      navigate("/blog"); // Quay về trang blog
    } catch (error) {
      console.error("Lỗi khi tạo bài viết", error);
      alert("Đăng bài thất bại!");
    }
  };

  if (userRole !== "ADMIN") {
    return <h2>Bạn không có quyền truy cập trang này!</h2>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Thêm Bài Viết</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Tiêu đề:</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Nội dung:</label>
          <textarea
            id="content"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>Đăng bài
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
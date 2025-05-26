import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPost, updatePost, getPostById } from "../api";

const BlogPostForm = () => {
  const { id } = useParams<string>(); // Nếu có id thì là cập nhật
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const response = await getPostById(id);
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          console.error("Lỗi khi lấy bài viết:", error);
        }
      };
      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const postData = { title, content };
    try {
      if (id) {
        await updatePost(id, postData);
      } else {
        await createPost(postData);
      }
      navigate("/posts"); // Chuyển về danh sách bài viết
    } catch (error) {
      console.error("Lỗi khi lưu bài viết:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h2 className="mb-4">{id ? "Cập nhật bài viết" : "Tạo bài viết mới"}</h2>
      <div className="form-group mb-3">
        <label htmlFor="title">Tiêu đề:</label>
        <input
          type="text"
          id="title"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="content">Nội dung:</label>
        <textarea
          id="content"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={5}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {id ? (
          <>
            Cập nhật <i className="bi bi-pencil ms-1"></i>
          </>
        ) : (
          "Tạo"
        )}
      </button>
    </form>
  );
};

export default BlogPostForm;
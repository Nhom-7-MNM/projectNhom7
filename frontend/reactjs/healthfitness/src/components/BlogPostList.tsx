import React, { useEffect, useState } from "react";
import { getAllPosts, deletePost } from "../api";
import { Link } from "react-router-dom";

const BlogPostList = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Kiểm tra quyền admin dựa trên email
    const adminEmails = ["admin@gmail.com", "admin1@gmail.com", "admin2@gmail.com"];
    const userEmail = localStorage.getItem("userEmail");
    setIsAdmin(adminEmails.includes(userEmail || ""));
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        console.log("Danh sách bài viết:", response.data);
        setPosts(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
     
      
      {isAdmin && (
        <div className="mb-4">
      <Link 
  to="/posts/create"
  className="bg-blue-500 hover:bg-blue-600 text-black force-text-black py-2 px-4 rounded"
>
  Tạo bài viết mới
</Link>

        </div>
      )}
      <ul className="space-y-4 ">
        {posts.map((post) => (
          <li 
            key={post.id}
            className="border border-gray-300 p-4 rounded flex items-center justify-between"
          >
            <Link 
              to={`/posts/${post.id}`}
              className="text-lg font-medium hover:underline force-text-black"
            >
              {post.title}
            </Link>
            {isAdmin && (
  <div className="d-flex gap-2 align-items-center">
    <Link 
      to={`/posts/edit/${post.id}`}
      className="btn btn-warning text-black"
    >
      Sửa <i className="bi bi-pencil ms-1"></i>
    </Link>
    <button 
      onClick={() => handleDelete(post.id)}
      className="btn btn-danger text-black"
    >
      Xóa <i className="bi bi-trash ms-1"></i>
    </button>
  </div>
)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPostList;

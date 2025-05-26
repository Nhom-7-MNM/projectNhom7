import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BlogPostList from "./BlogPostList"; // Import BlogPostList

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setUserRole(storedRole || "");
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Danh sách bài viết</h1>
      <button
        className="btn btn-secondary"
        onClick={() => navigate("/")}>
          Quay về trang chủ
      </button>
   
    <p></p>
      {userRole === "ADMIN" && (
        <button 
          onClick={() => navigate("/create-post")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mb-4"
        >
          Thêm Bài Viết
        </button>
      )}
      <BlogPostList /> {/* Hiển thị danh sách bài viết */}
    </div>
  );
};

export default BlogPage;

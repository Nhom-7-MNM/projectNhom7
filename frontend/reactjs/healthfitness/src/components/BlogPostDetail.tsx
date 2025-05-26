import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById, likePost } from "../api";

const BlogPostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [userEmail] = useState("user@example.com"); // Thay bằng logic lấy email thực tế

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setPost(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết bài viết:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    try {
      await likePost(id, userEmail);
      const response = await getPostById(id); // Cập nhật lại dữ liệu
      setPost(response.data);
    } catch (error) {
      console.error("Lỗi khi thả tim:", error);
    }
  };

  if (!post) return <div className="text-center mt-8">Đang tải...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <p className="mb-6">{post.content}</p>
      <p className="mb-4">
        <span className="font-semibold">Số lượt thích: </span>{post.likes || 0}
      </p>
      <button 
        onClick={handleLike}
        className="bg-red-500 hover:bg-red-600 text-black py-2 px-4 rounded"
      >
        Thả tim
      </button>
    </div>
  );
};

export default BlogPostDetail;

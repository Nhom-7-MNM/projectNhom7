// src/components/LikeButton.tsx
import React from "react";
import { likePost } from "../api";

const LikeButton = ({ postId, userEmail, onLike }) => {
  const handleLike = async () => {
    try {
      await likePost(postId, userEmail);
      onLike(); // Callback để cập nhật UI
    } catch (error) {
      console.error("Lỗi khi thả tim:", error);
    }
  };

  return <button onClick={handleLike}>Thả tim</button>;
};

export default LikeButton;
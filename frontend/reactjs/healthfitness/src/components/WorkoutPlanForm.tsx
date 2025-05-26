import React, { useState } from "react";
import { createWorkoutPlan } from "../api";

interface WorkoutPlanFormProps {
  isEdit: boolean;
  onPlanCreated?: (plan: any) => void;
}

const WorkoutPlanForm: React.FC<WorkoutPlanFormProps> = ({
  isEdit,
  onPlanCreated = () => {},
}) => {
  const [planName, setPlanName] = useState("");
  const [description, setDescription] = useState("");
  const [targetUserEmail, setTargetUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const role = localStorage.getItem("role") || "";
  const isAdmin = role.toLowerCase() === "admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const requestData: any = {
        name: planName,
        description: description,
      };

      if (isAdmin && targetUserEmail.trim() !== "") {
        requestData.userEmail = targetUserEmail.trim();
      }

      const response = await createWorkoutPlan(requestData);
      onPlanCreated(response.data);
      setPlanName("");
      setDescription("");
      if (isAdmin) {
        setTargetUserEmail("");
      }
    } catch (err: any) {
      setError("Có lỗi xảy ra khi tạo giáo án");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{isEdit ? "Chỉnh sửa Giáo Án" : "Tạo Giáo Án Mới"}</h2>
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        {isAdmin && (
          <div className="mb-3">
            <label htmlFor="targetUserEmail" className="form-label">
              Email người dùng cần tạo giáo án:
            </label>
            <input
              type="email"
              id="targetUserEmail"
              className="form-control"
              value={targetUserEmail}
              onChange={(e) => setTargetUserEmail(e.target.value)}
              placeholder="Nhập email người dùng"
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="planName" className="form-label">
            Tên giáo án:
          </label>
          <input
            type="text"
            id="planName"
            className="form-control"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Mô tả:
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            "Đang xử lý..."
          ) : isEdit ? (
            <>
              <i className="bi bi-pencil-square me-2"></i>Cập nhật
            </>
          ) : (
            <>
              <i className="bi bi-plus-circle me-2"></i>Tạo Giáo Án
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default WorkoutPlanForm;
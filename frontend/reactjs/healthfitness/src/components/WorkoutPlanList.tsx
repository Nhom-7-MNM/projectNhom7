import React, { useEffect, useState } from "react";
import { getWorkoutPlans } from "../api";

interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  // Thêm các trường khác nếu cần
}

const WorkoutPlanList: React.FC = () => {
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlans = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getWorkoutPlans();
      setPlans(response.data);
    } catch (err) {
      setError("Không lấy được danh sách giáo án");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Danh Sách Giáo Án</h2>
      {loading && <p className="text-muted">Đang tải...</p>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {plans.map((plan) => (
          <li key={plan.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">{plan.name}</h5>
              <p className="mb-0">{plan.description}</p>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-primary me-2">
                <i className="bi bi-pencil me-1"></i>Chỉnh sửa
              </button>
              <button className="btn btn-sm btn-outline-danger">
                <i className="bi bi-trash me-1"></i>Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutPlanList;
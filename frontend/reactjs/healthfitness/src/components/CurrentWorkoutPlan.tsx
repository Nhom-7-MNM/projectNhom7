import React, { useEffect, useState } from "react";
import { getCurrentWorkoutPlan } from "../api"; // Sửa import

interface UserWorkoutPlan {
  id: string;
  userEmail: string;
  workoutTemplateId: string;
  assignedDate: string;
  status?: string;
}

const CurrentWorkoutPlan: React.FC = () => {
  const [plan, setPlan] = useState<UserWorkoutPlan | null>(null);

  useEffect(() => {
    getCurrentWorkoutPlan()
      .then((res) => {
        setPlan(res.data);
      })
      .catch(() => {
        setPlan(null);
      });
  }, []);

  return (
    <div>
      <h2>Giáo Án Đã Liên Kết</h2>
      {plan ? (
        <div>
          <p><strong>Email:</strong> {plan.userEmail}</p>
          <p><strong>Mã mẫu giáo án:</strong> {plan.workoutTemplateId}</p>
          <p><strong>Ngày áp dụng:</strong> {plan.assignedDate}</p>
          <p><strong>Trạng thái:</strong> {plan.status}</p>
        </div>
      ) : (
        <p>Chưa có giáo án được liên kết.</p>
      )}
    </div>
  );
};

export default CurrentWorkoutPlan;
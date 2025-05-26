import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWorkoutTemplatesByGoal, assignWorkoutTemplate } from "../api";

// Định nghĩa interface cho WorkoutSet
interface WorkoutSet {
  muscleGroup: string;
  exerciseName: string;
  sets: number;
  reps: number;
}

// Định nghĩa interface cho WorkoutTemplate
interface WorkoutTemplate {
  id: string;
  name: string;
  goal: string;
  description?: string;
  workoutSets: WorkoutSet[];
}

const WorkoutTemplatesByGoal: React.FC = () => {
  const [goal, setGoal] = useState<string>("tăng cơ");
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const navigate = useNavigate();
  // Gọi API để lấy danh sách mẫu giáo án theo mục tiêu
  useEffect(() => {
    getWorkoutTemplatesByGoal(goal).then((res) => {
      setTemplates(res.data); // Giả định res.data là mảng WorkoutTemplate
    }).catch((error) => {
      console.error("Lỗi khi lấy mẫu giáo án:", error);
    });
  }, [goal]);

  // Xử lý sự kiện gán mẫu giáo án cho người dùng
  const handleAssign = (templateId: string) => {
    assignWorkoutTemplate(templateId).then(() => {
      alert("Mẫu giáo án đã được áp dụng thành công!");
    }).catch((error) => {
      console.error("Lỗi khi gán mẫu giáo án:", error);
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Chọn Mẫu Giáo Án</h2>
      <button
        className="btn btn-secondary"
        onClick={() => navigate("/")}>
          Quay về trang chủ
      </button>
   
    <p></p>
      <div className="mb-3">
        <label htmlFor="goalSelect" className="form-label">Chọn mục tiêu:</label>
        <select
          id="goalSelect"
          className="form-select"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        >
          <option value="tăng cơ">Tăng cơ</option>
          <option value="giảm mỡ">Giảm mỡ</option>
          <option value="duy trì">Duy trì</option>
        </select>
      </div>
      <div className="row">
        {templates.map((template) => (
          <div key={template.id} className="col-md-4 mb-3">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{template.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Mục tiêu: {template.goal}</h6>
                <p className="card-text">{template.description || "Không có mô tả"}</p>
                <h6 className="mt-3">Các bài tập:</h6>
                <ul className="list-group mb-3">
                  {template.workoutSets.map((set, index) => (
                    <li key={index} className="list-group-item">
                      {set.exerciseName} ({set.muscleGroup}) - {set.sets} sets x {set.reps} reps
                    </li>
                  ))}
                </ul>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAssign(template.id)}
                >
                  <i className="bi bi-check-circle me-2"></i>Áp dụng mẫu này
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutTemplatesByGoal;
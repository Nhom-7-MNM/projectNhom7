import React, { useEffect, useState } from "react";
import { createWorkoutTemplate, updateWorkoutTemplate, getWorkoutTemplateById } from "../api";
import { useNavigate, useParams } from "react-router-dom";

interface WorkoutTemplate {
  id?: string;
  name: string;
  goal: string;
  description?: string;
  workoutSets?: any[];
}

const WorkoutTemplateForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<WorkoutTemplate>({
    name: "",
    goal: "",
    description: "",
    workoutSets: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getWorkoutTemplateById(id).then((res) => setTemplate(res.data));
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateWorkoutTemplate(id, template).then(() => {
        navigate("/admin/workout-templates");
      });
    } else {
      createWorkoutTemplate(template).then(() => {
        navigate("/admin/workout-templates");
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{id ? "Chỉnh sửa" : "Tạo mới"} Mẫu Giáo Án</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Tên mẫu:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={template.name}
            onChange={(e) => setTemplate({ ...template, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="goal" className="form-label">Mục tiêu:</label>
          <select
            id="goal"
            className="form-select"
            value={template.goal}
            onChange={(e) => setTemplate({ ...template, goal: e.target.value })}
            required
          >
            <option value="">Chọn mục tiêu</option>
            <option value="tăng cơ">Tăng cơ</option>
            <option value="giảm mỡ">Giảm mỡ</option>
            <option value="duy trì">Duy trì</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Mô tả:</label>
          <textarea
            id="description"
            className="form-control"
            value={template.description}
            onChange={(e) => setTemplate({ ...template, description: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? (
            <>
              <i className="bi bi-pencil-square me-2"></i>Cập nhật
            </>
          ) : (
            <>
              <i className="bi bi-plus-circle me-2"></i>Tạo
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default WorkoutTemplateForm;
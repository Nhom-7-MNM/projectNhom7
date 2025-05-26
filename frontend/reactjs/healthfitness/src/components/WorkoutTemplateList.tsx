import React, { useEffect, useState } from "react";
import { getAllWorkoutTemplates, deleteWorkoutTemplate } from "../api";
import { useNavigate } from "react-router-dom";

interface WorkoutTemplate {
  id: string;
  name: string;
  goal: string;
  description?: string;
}

const WorkoutTemplateList: React.FC = () => {
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllWorkoutTemplates().then((res) => {
      setTemplates(res.data);
    });
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mẫu giáo án này không?")) {
      deleteWorkoutTemplate(id).then(() => {
        setTemplates((prev) => prev.filter((t) => t.id !== id));
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Quản lý Mẫu Giáo Án (Admin)</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/admin/workout-templates/new")}
      >
        <i className="bi bi-plus-circle me-2"></i>Tạo Mẫu Mới
      </button>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Tên Mẫu</th>
            <th>Mục Tiêu</th>
            <th>Mô Tả</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id}>
              <td>{template.name}</td>
              <td>{template.goal}</td>
              <td>{template.description}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => navigate(`/admin/workout-templates/edit/${template.id}`)}
                >
                  <i className="bi bi-pencil me-1"></i>Chỉnh Sửa
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(template.id)}
                >
                  <i className="bi bi-trash me-1"></i>Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkoutTemplateList;
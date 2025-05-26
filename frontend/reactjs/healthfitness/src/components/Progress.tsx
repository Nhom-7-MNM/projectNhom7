import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createOrUpdateProgress, getProgressByEmail } from "../api";
import { Button } from "react-bootstrap"; // nếu dùng React-Bootstrap


const Progress: React.FC = () => {
  const storedUserEmail = localStorage.getItem("userEmail") || "";
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [bodyFat, setBodyFat] = useState<string>("");
  const [progress, setProgress] = useState<any>(null);
  const [oldProgress, setOldProgress] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const fetchProgress = async () => {
    try {
      const response = await getProgressByEmail(storedUserEmail);
      setProgress(response.data);
      setMessage("Dữ liệu tiến độ đã được tải thành công.");
    } catch (error) {
      console.error(error);
      setProgress(null);
      setMessage("Không tìm thấy dữ liệu tiến độ cho người dùng này.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (progress) {
      setOldProgress(progress);
    }
    const progressData = {
      email: storedUserEmail,
      weight: parseFloat(weight),
      height: parseFloat(height),
      waist: parseFloat(waist),
      bodyFat: parseFloat(bodyFat),
    };
    try {
      const response = await createOrUpdateProgress(progressData);
      setProgress(response.data);
      setMessage("Tiến độ đã được lưu thành công.");
    } catch (error) {
      console.error(error);
      setMessage("Có lỗi xảy ra khi lưu tiến độ.");
    }
  };

  useEffect(() => {
    if (storedUserEmail) {
      fetchProgress();
    }
  }, [storedUserEmail]);

  return (
    
    <div className="container mt-4">
      <h2 className="mb-4">Ghi chép & So sánh tiến độ</h2>
      
      <button
        className="btn btn-secondary"
        onClick={() => navigate("/")}>
          Quay về trang chủ
      </button>
   
    <p></p>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="weight">Cân nặng (kg): </label>
          <input
            type="number"
            step="0.1"
            id="weight"
            className="form-control"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Nhập cân nặng"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="height">Chiều cao (cm): </label>
          <input
            type="number"
            step="0.1"
            id="height"
            className="form-control"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Nhập chiều cao"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="waist">Vòng eo (inch/cm): </label>
          <input
            type="number"
            step="0.1"
            id="waist"
            className="form-control"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            placeholder="Nhập vòng eo"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="bodyFat">Lượng mỡ (%): </label>
          <input
            type="number"
            step="0.1"
            id="bodyFat"
            className="form-control"
            value={bodyFat}
            onChange={(e) => setBodyFat(e.target.value)}
            placeholder="Nhập lượng mỡ cơ thể"
            required
          />
          {/* Thêm hướng dẫn tính toán lượng mỡ */}
          <small className="text-muted">
            Hãy cộng số đo vòng eo và hông của bạn, sau đó trừ đi số đo vòng cổ.
            Ví dụ: nếu vòng eo là 30, hông là 36 và vòng cổ là 13, tỷ lệ mỡ sẽ là 53%.
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Lưu Tiến độ <i className="bi bi-pencil ms-1"></i>
        </button>
      </form>

      {/* <div className="mt-3">
        <button className="btn btn-secondary" onClick={fetchProgress}>
          Lấy Dữ liệu Tiến độ
        </button>
      </div> */}

      {message && <p className="mt-3">{message}</p>}

      <div className="row mt-4">
        {progress && (
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-header">
                <h3 className="mb-0">Tiến độ MỚI</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="fw-bold">Email: </span>{progress.email}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Cân nặng: </span>{progress.weight}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Chiều cao: </span>{progress.height}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Vòng eo: </span>{progress.waist}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Lượng mỡ: </span>{progress.bodyFat}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Thời gian ghi chép: </span>{progress.recordDate}
                </li>
              </ul>
            </div>
          </div>
        )}
        {oldProgress && (
          <div className="col-md-6 mb-3">
            <div className="card">
              <div className="card-header">
                <h3 className="mb-0">Tiến độ CŨ</h3>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="fw-bold">Email: </span>{oldProgress.email}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Cân nặng: </span>{oldProgress.weight}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Chiều cao: </span>{oldProgress.height}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Vòng eo: </span>{oldProgress.waist}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Lượng mỡ: </span>{oldProgress.bodyFat}
                </li>
                <li className="list-group-item">
                  <span className="fw-bold">Thời gian ghi chép: </span>{oldProgress.recordDate}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
     


    </div>
  );
};

export default Progress;

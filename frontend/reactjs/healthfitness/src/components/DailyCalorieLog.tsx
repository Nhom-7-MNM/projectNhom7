// src/components/DailyCalorieLog.tsx
import React, { useState } from "react";
import { createOrUpdateDailyLog, getDailyLog } from "../api";

const DailyCalorieLog: React.FC = () => {
  const [log, setLog] = useState({
    date: "",
    caloriesConsumed: "",
    caloriesBurned: "",
  });
  const [logData, setLogData] = useState<any>(null); // Có thể định nghĩa interface cụ thể nếu cần
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createOrUpdateDailyLog({
        date: log.date,
        caloriesConsumed: Number(log.caloriesConsumed),
        caloriesBurned: Number(log.caloriesBurned),
      });
      setLogData(response.data);
      setMessage("Log đã được cập nhật!");
    } catch (error) {
      console.error(error);
      setMessage("Lỗi khi cập nhật log.");
    }
  };

  const handleFetchLog = async () => {
    try {
      const response = await getDailyLog(log.date);
      setLogData(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy log", error);
      setMessage("Không tìm thấy log cho ngày này.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Nhật ký calo hàng ngày</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Ngày (YYYY-MM-DD):
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="form-control"
            value={log.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="caloriesConsumed" className="form-label">
            Lượng calo tiêu thụ:
          </label>
          <input
            type="number"
            id="caloriesConsumed"
            name="caloriesConsumed"
            className="form-control"
            value={log.caloriesConsumed}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="caloriesBurned" className="form-label">
            Lượng calo tiêu hao:
          </label>
          <input
            type="number"
            id="caloriesBurned"
            name="caloriesBurned"
            className="form-control"
            value={log.caloriesBurned}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          <i className="bi bi-save me-2"></i>Ghi nhận log
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleFetchLog}
        >
          <i className="bi bi-search me-2"></i>Lấy log theo ngày
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
      {logData && (
        <div className="mt-4">
          <h3>Thông tin nhật ký:</h3>
          <p>Ngày: {logData.date}</p>
          <p>Calo tiêu thụ: {logData.caloriesConsumed}</p>
          <p>Calo tiêu hao: {logData.caloriesBurned}</p>
        </div>
      )}
    </div>
  );
};

export default DailyCalorieLog;
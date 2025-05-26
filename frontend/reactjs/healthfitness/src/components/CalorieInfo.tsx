import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { updateCalorieInfo, getCalorieInfo } from "../api";




const CalorieInfo = () => {
  const [calorieInfo, setCalorieInfo] = useState({
    weight: "",
    height: "",
    age: "",
    gender: "",
    activityLevel: "",
  });
  const [calculatedInfo, setCalculatedInfo] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCalorieInfo({ ...calorieInfo, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateCalorieInfo({
        weight: Number(calorieInfo.weight),
        height: Number(calorieInfo.height),
        age: Number(calorieInfo.age),
        gender: calorieInfo.gender,
        activityLevel: calorieInfo.activityLevel,
      });
      setCalculatedInfo(response.data);
      setMessage("Thông tin đã được cập nhật thành công!");
    } catch (error) {
      console.error(error);
      setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await getCalorieInfo();
        setCalculatedInfo(response.data);
      } catch (error) {
        console.error("Không lấy được thông tin calo", error);
      }
    };
    fetchInfo();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tính toán thông tin calo cơ bản</h2>
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
            id="weight"
            name="weight"
            className="form-control"
            value={calorieInfo.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="height">Chiều cao (cm): </label>
          <input
            type="number"
            id="height"
            name="height"
            className="form-control"
            value={calorieInfo.height}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="age">Tuổi: </label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-control"
            value={calorieInfo.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="gender">Giới tính: </label>
          <select
            id="gender"
            name="gender"
            className="form-control"
            value={calorieInfo.gender}
            onChange={handleChange}
            required
          >
            <option value="">Chọn</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="activityLevel">Mức độ hoạt động: </label>
          <select
            id="activityLevel"
            name="activityLevel"
            className="form-control"
            value={calorieInfo.activityLevel}
            onChange={handleChange}
            required
          >
            <option value="">Chọn</option>
            <option value="ít vận động">Ít vận động</option>
            <option value="vận động nhẹ">Vận động nhẹ</option>
            <option value="vừa phải">Vừa phải</option>
            <option value="nhiều">Nhiều</option>
            <option value="rất nhiều">Rất nhiều</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Tính toán <i className="bi bi-pencil ms-1"></i>
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
      {calculatedInfo && (
  <div className="mt-4">
    <h3 className="mb-3">Kết quả tính toán:</h3>
    <div className="card">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <span className="fw-bold">BMI: </span>{calculatedInfo.bmi.toFixed(2)}
        </li>
        <li className="list-group-item">
          <span className="fw-bold">BMR: </span>{calculatedInfo.bmr.toFixed(2)}
        </li>
        <li className="list-group-item">
          <span className="fw-bold">TDEE: </span>{calculatedInfo.tdee.toFixed(2)}
        </li>
      </ul>
      <div className="card-body">
        <p className="text-info mb-0">
          {calculatedInfo.bmi < 18.5
            ? "Thiếu cân"
            : calculatedInfo.bmi < 25
            ? "Bình thường"
            : calculatedInfo.bmi < 30
            ? "Thừa cân"
            : "Béo phì"}
        </p>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default CalorieInfo;
// src/components/DietLogPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createOrUpdateDietLog, getCurrentDietLog, getDietLogByDate } from "../api";

interface DietLogEntry {
  foodName: string;
  caloriesPerUnit: number;
  quantity: number;
  totalCalories?: number;
}

interface DietLog {
  id?: string;
  userEmail?: string;
  date: string; // định dạng yyyy-MM-dd
  entries: DietLogEntry[];
  totalCalories?: number;
  remark?: string;
}

const DietLogPage: React.FC = () => {
  // Ngày hiện tại theo định dạng yyyy-MM-dd
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [entries, setEntries] = useState<DietLogEntry[]>([]);
  const [dietLog, setDietLog] = useState<DietLog | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  // Thêm một entry mới
  const handleAddEntry = () => {
    setEntries([...entries, { foodName: "", caloriesPerUnit: 0, quantity: 0 }]);
  };

  // Cập nhật thông tin của từng entry
  const handleEntryChange = (index: number, field: keyof DietLogEntry, value: any) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  // Xóa entry khỏi danh sách
  const handleRemoveEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  // Gửi dữ liệu nhật ký lên server
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    const dietLogPayload: DietLog = {
      date,
      entries
    };
    try {
      const response = await createOrUpdateDietLog(dietLogPayload);
      setDietLog(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating/updating diet log");
    }
    setLoading(false);
  };

  // Lấy nhật ký của ngày hiện tại từ server
  const handleGetCurrentLog = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getCurrentDietLog();
      setDietLog(response.data);
      setDate(response.data.date);
      setEntries(response.data.entries);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching current diet log");
    }
    setLoading(false);
  };

  // Lấy nhật ký theo ngày được chọn
  const handleGetLogByDate = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getDietLogByDate(date);
      setDietLog(response.data);
      setEntries(response.data.entries);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching diet log for selected date");
    }
    setLoading(false);
  };

  // Khi component mount, tự động tải nhật ký hôm nay
  useEffect(() => {
    handleGetCurrentLog();
  }, []);

  return (
    
    <div className="container mt-4" style={{ padding: "1rem" }}>
      <h2 className="mb-4">Nhật Ký Ăn Uống</h2>
      <button
        className="btn btn-secondary"
        onClick={() => navigate("/")}>
          Quay về trang chủ
      </button>
      <p></p>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ marginBottom: "1rem" }}>
        <label>Chọn ngày: </label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
        <button onClick={handleGetLogByDate} style={{ marginLeft: "1rem" }}>Xem theo ngày</button>
      </div>

      <div style={{ marginBottom: "1rem", border: "1px solid #ccc", padding: "1rem" }}>
        <h3>Nhập Món Ăn</h3>
        {entries.map((entry, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <div>
              <label>Tên Món Ăn: </label>
              <input 
                type="text" 
                value={entry.foodName} 
                onChange={(e) => handleEntryChange(index, "foodName", e.target.value)}
              />
            </div>
            <div>
              <label>Calo/Đơn Vị: </label>
              <input 
                type="number" 
                value={entry.caloriesPerUnit} 
                onChange={(e) => handleEntryChange(index, "caloriesPerUnit", parseFloat(e.target.value))}
              />
            </div>
            <div>
              <label>Số Lượng: </label>
              <input 
                type="number" 
                value={entry.quantity} 
                onChange={(e) => handleEntryChange(index, "quantity", parseFloat(e.target.value))}
              />
            </div>
            <button onClick={() => handleRemoveEntry(index)}>Xóa Món</button>
          </div>
        ))}
        <button onClick={handleAddEntry}>Thêm Món Ăn</button>
      </div>

      <div>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Đang xử lý..." : "Lưu Nhật Ký Ăn Uống"}
        </button>
      </div>

      {dietLog && (
        <div style={{ marginTop: "2rem", borderTop: "1px solid #ccc", paddingTop: "1rem" }}>
          <h3>Chi Tiết Nhật Ký</h3>
          <p><strong>Ngày:</strong> {dietLog.date}</p>
          <ul>
            {dietLog.entries.map((entry, index) => (
              <li key={index}>
                {entry.foodName} - {entry.quantity} {entry.totalCalories ? `(Tổng: ${entry.totalCalories} calo)` : ""}
              </li>
            ))}
          </ul>
          <p><strong>Tổng Calo:</strong> {dietLog.totalCalories}</p>
          <p><strong>Nhận Xét:</strong> {dietLog.remark}</p>
        </div>
      )}
    </div>
  );
};

export default DietLogPage;

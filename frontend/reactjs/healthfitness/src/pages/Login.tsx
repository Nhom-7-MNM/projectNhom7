import React, { useState } from "react";
import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Hoặc domain thực của backend bạn
});

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("danger");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Reset thông báo

    try {
      // Gọi API đăng nhập qua endpoint POST /auth/log-in
      const response = await api.post("/auth/log-in", credentials);
      if (response.data && response.data.result) {
        // Lưu token và email vào localStorage
        localStorage.setItem("token", response.data.result.token);
        localStorage.setItem("userEmail", credentials.email);
        setMessage("✅ Đăng nhập thành công!");
        setVariant("success");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage("❌ Đăng nhập thất bại, vui lòng thử lại!");
        setVariant("danger");
      }
    } catch (error: any) {
      setMessage("❌ " + (error.response?.data?.message || "Lỗi kết nối server"));
      setVariant("danger");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-4">
      <Card style={{ width: "30rem" }} className="shadow">
        <Card.Body>
          <h2 className="text-center text-primary">🔐 Đăng nhập</h2>
          {message && <Alert variant={variant} className="mt-3">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Nhập email"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Đăng nhập
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <span>Bạn chưa có tài khoản? </span>
            <Link to="/register">Đăng ký ngay</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;

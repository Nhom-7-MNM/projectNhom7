import React, { useState } from "react";
import { Form, Button, Card, Container, Alert, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api"; // Sử dụng registerUser thay vì api

const Register: React.FC = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "USER",
  });
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      setMessage("❌ Mật khẩu không khớp!");
      setVariant("danger");
      return;
    }

    setLoading(true);

    try {
      // Gọi API tạo người dùng qua hàm registerUser từ api.js
      const response = await registerUser({
        fullName: user.fullName,
        email: user.email,
        password: user.password,
        roles: [user.role],
      });
      if (response && response.data) {
        setMessage("✅ Đăng ký thành công! Chuyển hướng đến trang đăng nhập...");
        setVariant("success");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("❌ Không nhận được phản hồi từ server!");
        setVariant("danger");
      }
    } catch (error: any) {
      if (error.response?.data?.message === "ErrorCode.USER_EXISTED") {
        setMessage("❌ Email đã tồn tại! Vui lòng sử dụng email khác.");
      } else {
        setMessage("❌ " + (error.response?.data?.message || "Lỗi kết nối server"));
      }
      setVariant("danger");
    }
    setLoading(false);
  };

  return (
    <Container className="d-flex justify-content-center mt-4">
      <Card style={{ width: "30rem" }} className="shadow">
        <Card.Body>
          <h2 className="text-center text-primary">📝 Đăng ký tài khoản</h2>
          {message && <Alert variant={variant} className="mt-3">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Họ và Tên</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Nhập họ và tên"
                value={user.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Nhập email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* Nếu cần nhập số điện thoại, mở phần này */}
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={user.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Xác nhận Mật khẩu</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Nhập lại mật khẩu"
                value={user.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Đăng ký"}
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <span>Bạn đã có tài khoản? </span>
            <Link to="/login">Đăng nhập ngay</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;

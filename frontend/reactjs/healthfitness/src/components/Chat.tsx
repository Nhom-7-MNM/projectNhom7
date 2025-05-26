import React, { useEffect, useState } from "react";
import { Form, Button, Container, Card, Alert, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { chatQuestion } from "../api";

const Chat: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("userEmail");
    console.log("Token:", token, "Email:", email);
    if (!token || !email) {
      // Nếu chưa đăng nhập, hiển thị thông báo kèm link đăng nhập
      setMessage("Bạn chưa đăng nhập. Vui lòng đăng nhập để sử dụng dịch vụ chat.");
    } else {
      setUserEmail(email);
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setAnswer("");
    setLoading(true);

    try {
      // Sử dụng hàm chatQuestion từ api.js để đảm bảo header Authorization được gắn nếu có token
      const response = await chatQuestion({ question });
      if (response.data && response.data.answer) {
        setAnswer(response.data.answer);
      } else {
        setMessage("Không nhận được phản hồi từ server");
      }
    } catch (error: any) {
      setMessage("Lỗi khi gọi API: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (!userEmail) {
    return (
      <Container className="mt-4">
        <Alert variant="warning">
          {message} <Link to="/login">Đăng nhập ngay</Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <Card.Body>
          <h2 className="text-center">Chat AI</h2>
          <p className="text-center">
            Bạn đã đăng nhập với: <strong>{userEmail}</strong>
          </p>
          {message && <Alert variant="danger">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nhập câu hỏi của bạn:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ví dụ: Chỉ số BMI là gì ?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "Gửi câu hỏi"}
            </Button>
            
          </Form>
           

          {answer && (
            <Card className="mt-4">
              <Card.Body>
                <h4>Câu trả lời:</h4>
                <p>{answer}</p>
              </Card.Body>
            </Card>
            
          )}
          <p></p>
           <Button
              variant="secondary"
              type="submit"
              onClick={() => navigate("/")}>
              Quay về trang chủ
            </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Chat;

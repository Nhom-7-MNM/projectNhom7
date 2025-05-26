// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Import các thành phần giao diện (components)
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

// Các trang đăng ký, đăng nhập và chat
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./components/Chat";

// Các component liên quan đến quản lý tiến trình
import Progress from "./components/Progress";

// Các component liên quan đến blog
import BlogPage from "./components/BlogPage";
import CreatePost from "./components/CreatePost";
import BlogPostList from "./components/BlogPostList";
import BlogPostDetail from "./components/BlogPostDetail";
import BlogPostForm from "./components/BlogPostForm";

// Các component liên quan đến Calorie Info
import CalorieInfo from "./components/CalorieInfo";

// Các component liên quan đến Workout Plan & Diet Log
import WorkoutPlanList from "./components/WorkoutPlanList";
import WorkoutPlanForm from "./components/WorkoutPlanForm";
import DietLogPage from "./components/DietLogPage";

// Các component dành cho Workout Template & Workout Plan
import WorkoutTemplateList from "./components/WorkoutTemplateList";
import WorkoutTemplateForm from "./components/WorkoutTemplateForm";
import WorkoutTemplatesByGoal from "./components/WorkoutTemplatesByGoal";
import CurrentWorkoutPlan from "./components/CurrentWorkoutPlan";

import About from "./components/About";

/* ----------------- PrivateRoute và AdminRoute ----------------- */
// PrivateRoute: Dùng để bảo vệ các route cần người dùng đăng nhập
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    // Nếu không có token, chuyển hướng về trang đăng nhập
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// AdminRoute: Dùng để bảo vệ các route chỉ dành cho quản trị viên (Admin)
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const role = localStorage.getItem("role");
  // Giả sử role của Admin được lưu là "ROLE_ADMIN" hoặc "ADMIN"
  if (role !== "ROLE_ADMIN" && role !== "ADMIN") {
    // Nếu không đúng vai trò admin, chuyển hướng về trang chủ
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

/* ----------------- Layout chung cho các trang có Header và Footer ----------------- */
// Layout bao gồm Header, Nội dung (Outlet) và Footer
const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

/* ----------------- Định nghĩa các Route của ứng dụng ----------------- */
function App() {
  return (
    <Router>
      <Routes>
        {/* --------------------- Các Route Công Khai --------------------- */}
        {/* Các route không cần đăng nhập: Đăng nhập và Đăng ký */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ----------------- Các Route Dùng Layout (Có Header và Footer) ----------------- */}
        {/* Các route này được bảo vệ bởi PrivateRoute, yêu cầu đăng nhập */}
        <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route path="/" element={<Main />} />
        </Route>

        {/* ----------------- Các Route Không Sử Dụng Layout ----------------- */}
        {/* Nhóm các route cần đăng nhập nhưng không có Layout chung */}
        <Route element={<PrivateRoute><Outlet /></PrivateRoute>}>
          <Route path="/progress" element={<Progress />} />
          <Route path="/chat" element={<Chat />} />

          {/* ----------------- Các Route Liên Quan đến Blog ----------------- */}
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/posts" element={<BlogPostList />} />
          <Route path="/posts/:id" element={<BlogPostDetail />} />
          <Route path="/posts/create" element={<BlogPostForm />} />
          <Route path="/posts/edit/:id" element={<BlogPostForm />} />

          {/* ----------------- Các Route Liên Quan đến Calorie Info ----------------- */}
          <Route path="/calorie-info" element={<CalorieInfo />} />

          {/* ----------------- Các Route Liên Quan đến Workout Plans và Diet Log ----------------- */}
          <Route path="/workout-plans" element={<WorkoutPlanList />} />
          <Route path="/workout-plans/new" element={<WorkoutPlanForm isEdit={false} />} />
          <Route path="/workout-plans/:planId/edit" element={<WorkoutPlanForm isEdit={true} />} />
          <Route path="/diet-log" element={<DietLogPage />} />

          {/* ----------------- Các Route Liên Quan đến Workout Template & Admin ----------------- */}
          {/* Các route dưới đây chỉ dành cho Admin, được bảo vệ bởi AdminRoute */}
          <Route 
            path="/admin/workout-templates" 
            element={
              <AdminRoute>
                <WorkoutTemplateList />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/workout-templates/new" 
            element={
              <AdminRoute>
                <WorkoutTemplateForm />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/workout-templates/edit/:id" 
            element={
              <AdminRoute>
                <WorkoutTemplateForm />
              </AdminRoute>
            } 
          />
            <Route 
            path="/About" 
            element={
              <AdminRoute>
                <WorkoutTemplateForm />
              </AdminRoute>
            } 
          />
          {/* ----------------- Các Route Dành Cho Người Dùng Liên Quan đến Workout Template & Plan ----------------- */}
          <Route path="/workout-templates" element={<WorkoutTemplatesByGoal />} />
          <Route path="/workout-plans/current" element={<CurrentWorkoutPlan />} />
        </Route>

        {/* --------------------- Route Fallback --------------------- */}
        {/* Nếu không khớp với route nào, chuyển hướng tới trang chính nếu có token, ngược lại chuyển đến trang đăng nhập */}
        <Route
          path="*"
          element={<Navigate to={localStorage.getItem("token") ? "/" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;

import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Địa chỉ API, có thể thêm /api nếu cần

// Hàm tạo instance axios: mỗi khi gọi đều lấy token mới từ localStorage nếu có
const createApiInstance = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // Nếu có token thì thêm header Authorization
    },
  });
};

/* ------------- API dành cho người dùng (User Management) ------------- */

// Đăng ký người dùng mới
export const registerUser = async (userData) => {
  return createApiInstance().post("/Users", userData);
};

// Đăng nhập: sau khi đăng nhập thành công, lưu token và role vào localStorage
export const loginUser = async (loginData) => {
  const response = await createApiInstance().post("/auth/log-in", loginData);
  const { token, role } = response.data.result;
  localStorage.setItem("token", token);
  localStorage.setItem("role", role); // Đảm bảo role được lưu đúng
  return response;
};

/* ------------- API dành cho chat ------------- */

// Gửi câu hỏi chat
export const chatQuestion = async (questionData) => {
  return createApiInstance().post("/chat", questionData);
};

/* ------------- API Quản lý tiến trình học tập và luyện tập (Progress) ------------- */

// Tạo hoặc cập nhật tiến trình của người dùng
export const createOrUpdateProgress = async (progressData) => {
  return createApiInstance().post("/progress", progressData);
};

// Lấy tiến trình theo email
export const getProgressByEmail = async (email) => {
  return createApiInstance().get(`/progress/${email}`);
};

// Lấy tiến trình theo userId
export const getProgressByUserId = async (userId) => {
  return createApiInstance().get(`/progress/${userId}`);
};

/* ------------- API Quản lý bài viết (Posts) ------------- */

// Tạo bài viết mới
export const createPost = async (postData) => {
  return createApiInstance().post("/posts", postData);
};

// Lấy tất cả bài viết
export const getAllPosts = async () => {
  return createApiInstance().get("/posts");
};

// Lấy bài viết theo ID
export const getPostById = async (id) => {
  return createApiInstance().get(`/posts/${id}`);
};

// Cập nhật bài viết theo ID
export const updatePost = async (id, postData) => {
  return createApiInstance().put(`/posts/${id}`, postData);
};

// Xóa bài viết theo ID
export const deletePost = async (id) => {
  return createApiInstance().delete(`/posts/${id}`);
};

// Thích bài viết: gửi email người dùng qua params
export const likePost = async (id, userEmail) => {
  return createApiInstance().post(`/posts/${id}/like`, null, {
    params: { userEmail },
  });
};

/* ------------- API Quản lý thông tin Calorie ------------- */

// Cập nhật thông tin calorie
export const updateCalorieInfo = async (calorieInfo) => {
  return createApiInstance().post("/api/calorie-info", calorieInfo);
};

export const getCalorieInfo = async () => {
  return createApiInstance().get("/api/calorie-info");
};



/* ------------- API Quản lý nhật ký hàng ngày (Daily Calorie Log) ------------- */

// Tạo hoặc cập nhật nhật ký hàng ngày cho calorie
export const createOrUpdateDailyLog = async (dailyLog) => {
  return createApiInstance().post("/daily-calorie-log", dailyLog);
};

// Lấy nhật ký hàng ngày theo ngày
export const getDailyLog = async (date) => {
  return createApiInstance().get(`/daily-calorie-log/${date}`);
};

/* ------------- API Quản lý kế hoạch luyện tập (Workout Plans) ------------- */

// Tạo kế hoạch luyện tập mới
export const createWorkoutPlan = async (workoutPlanData) => {
  return createApiInstance().post("/workout-plans", workoutPlanData);
};

// Lấy danh sách các kế hoạch luyện tập của người tạo
export const getWorkoutPlans = async () => {
  return createApiInstance().get("/workout-plans");
};

// Lấy kế hoạch luyện tập hiện tại của người dùng
export const getCurrentWorkoutPlan = async () => {
  return createApiInstance().get("/workout-plans/current");
};

/* ------------- API cho Diet Log ------------- */

// Lấy nhật ký chế độ ăn hiện tại của người dùng
export const getCurrentDietLog = async () => {
  return createApiInstance().get("/diet-logs/current");
};

// Tạo hoặc cập nhật nhật ký chế độ ăn
export const createOrUpdateDietLog = async (dietLog) => {
  return createApiInstance().post("/diet-logs", dietLog);
};

// Lấy nhật ký chế độ ăn theo ngày
export const getDietLogByDate = async (date) => {
  return createApiInstance().get(`/diet-logs/${date}`);
};

/* ------------- API cho Workout Template & Workout Plan ------------- */

/* 
  --- Phần quản lý dành cho Admin: Quản lý mẫu giáo án ---
  Các API này dùng để tạo, cập nhật, lấy danh sách, xóa các mẫu giáo án
*/

// Tạo mẫu giáo án mới
export const createWorkoutTemplate = async (template) => {
  return createApiInstance().post("/admin/workout-templates", template);
};

// Lấy tất cả mẫu giáo án
export const getAllWorkoutTemplates = async () => {
  return createApiInstance().get("/admin/workout-templates");
};

// Cập nhật mẫu giáo án theo ID
export const updateWorkoutTemplate = async (id, template) => {
  return createApiInstance().put(`/admin/workout-templates/${id}`, template);
};

// Xóa mẫu giáo án theo ID
export const deleteWorkoutTemplate = async (id) => {
  return createApiInstance().delete(`/admin/workout-templates/${id}`);
};

// Lấy mẫu giáo án theo ID
export const getWorkoutTemplateById = async (id) => {
  return createApiInstance().get(`/admin/workout-templates/${id}`);
};

/* 
  --- Phần dành cho User: Lựa chọn và áp dụng mẫu giáo án ---
  Các API này dùng để lấy danh sách mẫu giáo án theo mục tiêu và gán mẫu cho kế hoạch luyện tập của người dùng
*/

// Lấy mẫu giáo án theo mục tiêu (goal)
export const getWorkoutTemplatesByGoal = async (goal) => {
  return createApiInstance().get(`/workout-templates/${goal}`);
};

// Gán mẫu giáo án cho kế hoạch luyện tập của người dùng
export const assignWorkoutTemplate = async (templateId) => {
  return createApiInstance().post(`/workout-plans/assign?workoutTemplateId=${templateId}`);
};

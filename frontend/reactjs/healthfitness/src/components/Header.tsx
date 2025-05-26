import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Cập nhật thông tin email và role khi component mount hoặc khi location thay đổi
    setUserEmail(localStorage.getItem("userEmail"));
    setRole(localStorage.getItem("role"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role");
    setUserEmail(null);
    setRole(null);
    navigate("/login");
  };

  // Xác định trang chủ để hiển thị hero-section nếu cần
  const isHome = location.pathname === "/";

  return (
    <>
      {/* Off-canvas & mobile menu */}
      <nav>
        {/* Phần navigation có thể giữ nguyên */}
      </nav>
      <div className="offcanvas-menu-overlay"></div>
      <div className="offcanvas-menu-wrapper">
        <div className="canvas-close">
          <i className="fa fa-close"></i>
        </div>
       
        <nav className="canvas-menu mobile-menu">
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}><Link to="/">Home</Link></li>
            <li className={location.pathname === "/about-us" ? "active" : ""}><Link to="/about-us">About Us</Link></li>
            <li className={location.pathname === "/classes" ? "active" : ""}><Link to="/classes">Classes</Link></li>
            <li className={location.pathname === "/services" ? "active" : ""}><Link to="/services">Services</Link></li>
            <li className={location.pathname === "/team" ? "active" : ""}><Link to="/team">Our Team</Link></li>
            <li>
              <Link to="/pages">Pages</Link>
              <ul className="dropdown">

                <li><Link to="/class-timetable">Class timetable</Link></li>
                <li><Link to="/bmi-calculator">BMI Calculator</Link></li>
                <li><Link to="/team">Our team</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/blog">Our blog</Link></li>
                <li><Link to="/404">404</Link></li>
              </ul>
            </li>
            <li className={location.pathname === "/contact" ? "active" : ""}><Link to="/contact">Contact</Link></li>
            <li className={location.pathname === "/chat" ? "active" : ""}><Link to="/chat">Chat</Link></li>
            {/* Nếu người dùng đã đăng nhập thì hiển thị thêm các đường dẫn sau */}
            {token && (
              <>
                <li className={location.pathname === "/progress" ? "active" : ""}><Link to="/progress">Tiến trình</Link></li>
                <li className={location.pathname === "/calorie-info" ? "active" : ""}><Link to="/calorie-info">Calorie Info</Link></li>
                <li className={location.pathname === "/workout-plans" ? "active" : ""}><Link to="/workout-plans">Workout Plans</Link></li>
                <li className={location.pathname === "/diet-log" ? "active" : ""}><Link to="/diet-log">Diet Log</Link></li>
                <li className={location.pathname === "/blog" ? "active" : ""}><Link to="/blog">Blog</Link></li>
                {/* Nếu là admin thì hiển thị thêm các đường dẫn quản trị */}
                {(role === "ROLE_ADMIN" || role === "ADMIN") && (
                  <li className={location.pathname.startsWith("/admin") ? "active" : ""}>
                    <Link to="/admin/workout-templates">Admin</Link>
                    <ul className="dropdown">
                      <li className={location.pathname === "/admin/workout-templates" ? "active" : ""}>
                        <Link to="/admin/workout-templates">Quản lý Workout Templates</Link>
                      </li>
                      <li className={location.pathname === "/admin/workout-templates/new" ? "active" : ""}>
                        <Link to="/admin/workout-templates/new">Tạo Workout Template</Link>
                      </li>
                    </ul>
                  </li>
                )}
                {/* Các đường dẫn dành cho người dùng về Workout Template & Plan */}
                <li className={location.pathname === "/workout-templates" ? "active" : ""}>
                  <Link to="/workout-templates">Workout Templates</Link>
                </li>
                <li className={location.pathname === "/workout-plans/current" ? "active" : ""}>
                  <Link to="/workout-plans/current">Current Workout Plan</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div className="canvas-social">
          <a href="#"><i className="fa fa-facebook"></i></a>
          <a href="#"><i className="fa fa-twitter"></i></a>
          <a href="#"><i className="fa fa-youtube-play"></i></a>
          <a href="#"><i className="fa fa-instagram"></i></a>
        </div>
      </div>

      {/* Header chính */}
      <header className="header-section">
  <div className="container-fluid">
    <div className="row">
      {/* Logo */}
      <div className="col-lg-3">
        <div className="logo">
          <Link to="/"><img src="img/logo.png" alt="Logo"/></Link>
        </div>
      </div>

      {/* Menu điều hướng */}
      <div className="col-lg-6">
        <nav className="nav-menu">
          <ul>
            <li className={location.pathname === "/" ? "active" : ""}><Link to="/">Trang chủ</Link></li>
            <li className={location.pathname === "/chat" ? "active" : ""}><Link to="/chat">Chat Box</Link></li>

            {/* Các đường dẫn dành cho người dùng đã đăng nhập */}
            {token && (
              <>
                <li className={location.pathname === "/progress" ? "active" : ""}><Link to="/progress">Tiến trình</Link></li>
                <li className={location.pathname === "/calorie-info" ? "active" : ""}><Link to="/calorie-info">Thông tin Calo</Link></li>
                <li className={location.pathname === "/diet-log" ? "active" : ""}><Link to="/diet-log">Nhật ký ăn uống</Link></li>
                <li className={location.pathname === "/blog" ? "active" : ""}><Link to="/blog">Blog</Link></li>

                {/* Nếu là admin thì hiển thị menu quản trị */}
                {(role === "ROLE_ADMIN" || role === "ADMIN") && (
                  <li className={location.pathname.startsWith("/admin") ? "active" : ""}>
                    <Link to="/admin/workout-templates">Quản trị</Link>
                    <ul className="dropdown">
                      <li className={location.pathname === "/admin/workout-templates" ? "active" : ""}>
                        <Link to="/admin/workout-templates">Quản lý mẫu bài tập</Link>
                      </li>
                      <li className={location.pathname === "/admin/workout-templates/new" ? "active" : ""}>
                        <Link to="/admin/workout-templates/new">Tạo mẫu bài tập</Link>
                      </li>
                    </ul>
                  </li>
                )}

                {/* Các đường dẫn dành cho người dùng về Mẫu bài tập & Kế hoạch */}
                <li className={location.pathname === "/workout-templates" ? "active" : ""}>
                  <Link to="/workout-templates">Mẫu bài tập</Link>
                </li>
             
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Phần tùy chọn phía trên cùng bên phải */}
      <div className="col-lg-3">
        <div className="top-option">
        
          <div className="to-social">
            {userEmail ? (
              // Khi đã đăng nhập, hiển thị email cùng nút đăng xuất
              <div className="user-info">
                <span style={{ color: "white" }}>{userEmail}</span>
                <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Đăng xuất</button>
              </div>
            ) : (
              // Nếu chưa đăng nhập, hiển thị các liên kết Đăng ký / Đăng nhập
              <ul>
                <li><Link to="/register">Đăng ký</Link></li>
                <li><Link to="/login">Đăng nhập</Link></li>
              </ul>
            )}
            <a href="#"><i className="fa fa-facebook"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>
            <a href="#"><i className="fa fa-youtube-play"></i></a>
            <a href="#"><i className="fa fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>

    {/* Biểu tượng mở menu (cho giao diện mobile) */}
    <div className="canvas-open">
      <i className="fa fa-bars"></i>
    </div>
  </div>
</header>


      {/* Hero-section chỉ hiển thị khi ở trang chủ */}
      {isHome && (
        <section className="hero-section">
          <div className="hs-slider owl-carousel">
            <div className="hs-item set-bg" style={{ backgroundImage: `url('/img/hero/hero-1.jpg')` }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 offset-lg-6">
                    <div className="hi-text">
                      <span>Shape your body</span>
                      <h1>Be <strong>strong</strong> training hard</h1>
                      <a href="#" className="primary-btn">Get info</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hs-item set-bg" style={{ backgroundImage: `url('/img/hero/hero-2.jpg')` }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 offset-lg-6">
                    <div className="hi-text">
                      <span>Shape your body</span>
                      <h1>Be <strong>strong</strong> training hard</h1>
                      <a href="#" className="primary-btn">Get info</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Header;

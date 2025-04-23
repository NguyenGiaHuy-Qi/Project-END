document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    const userList = JSON.parse(localStorage.getItem("users")) || [];
  
    const user = userList.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      alert("Đăng nhập thành công!");
      window.location.href = "dashboard.html";
    } else {
      alert("Email hoặc mật khẩu không chính xác!");
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector(".login-container h1");
    const options = document.querySelector(".options");
    const policy = document.querySelector(".mobile-policy");
    const terms = document.querySelector(".terms");
  
    const handleResponsiveContent = () => {
      const isMobile = window.innerWidth <= 600;
  
      if (title) title.textContent = isMobile ? "Đăng nhập tài khoản" : "Đăng nhập";
      if (options) options.style.display = isMobile ? "none" : "flex";
      if (policy) policy.style.display = isMobile ? "block" : "none";
      if (terms) terms.style.display = isMobile ? "block" : "none";
    };
  
    handleResponsiveContent();
    window.addEventListener("resize", handleResponsiveContent);
  });
  
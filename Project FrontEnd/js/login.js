document.addEventListener("DOMContentLoaded", function () {
  //Ẩn tất cả lỗi khi load lại trang
  document.querySelectorAll(".error").forEach(el => el.style.display = "none");

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset lỗi trước mỗi lần submit
    document.querySelectorAll(".error").forEach(el => el.style.display = "none");

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    let isValid = true;

    if (!email) {
      document.getElementById("loginEmailError").style.display = "block";
      isValid = false;
    }

    if (!password) {
      document.getElementById("loginPasswordError").style.display = "block";
      isValid = false;
    }

    if (!isValid) return;

    const userList = JSON.parse(localStorage.getItem("users")) || [];

    const user = userList.find(
      (u) => u.email.toLowerCase() === email && u.password === password
    );

    if (user) {
      //Lưu trạng thái đăng nhập để sử dụng ở dashboard
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Đăng nhập thành công!");
      window.location.href = "daseboard.html";
    } else {
      document.getElementById("loginInvalid").style.display = "block";
    }
  });

  // hiển thị điều khoản ở mobile
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

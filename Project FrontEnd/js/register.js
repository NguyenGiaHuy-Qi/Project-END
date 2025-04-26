document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset lỗi
    document.querySelectorAll(".error").forEach(el => el.style.display = "none");

    // Lấy lại phần tử thông báo thành công mỗi lần submit để tránh lỗi null
    const successEl = document.getElementById("registerSuccess");
    if (successEl) successEl.style.display = "none";

    // Lấy dữ liệu từ form
    const lastname = document.getElementById("lastname").value.trim();
    const firstname = document.getElementById("firstname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const agree = document.getElementById("agree").checked;

    let isValid = true;

    // Kiểm tra họ và tên
    if (!lastname) {
      document.getElementById("lastnameError").style.display = "block";
      isValid = false;
    }

    if (!firstname) {
      document.getElementById("firstnameError").style.display = "block";
      isValid = false;
    }

    // Kiểm tra email
    if (!email) {
      document.getElementById("emailError").style.display = "block";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      document.getElementById("emailInvalid").style.display = "block";
      isValid = false;
    }

    // Kiểm tra mật khẩu
    if (!password) {
      document.getElementById("passwordError").style.display = "block";
      isValid = false;
    } else if (password.length < 8) {
      document.getElementById("passwordLengthError").style.display = "block";
      isValid = false;
    }

    // Kiểm tra checkbox
    if (!agree) {
      const checkboxError = document.getElementById("checkboxError");
      if (checkboxError) checkboxError.style.display = "block";
      isValid = false;
    }

    if (!isValid) return;

    // Kiểm tra email đã đăng ký
    const userList = JSON.parse(localStorage.getItem("users")) || [];

    if (userList.find(user => user.email === email)) {
      document.getElementById("emailDuplicate").style.display = "block";
      return;
    }

    // Lưu người dùng mới
    userList.push({ lastname, firstname, email, password });
    localStorage.setItem("users", JSON.stringify(userList));

    // Hiển thị thông báo thành công và chuyển hướng
    if (successEl) {
      successEl.style.display = "block";
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    }
  });
});

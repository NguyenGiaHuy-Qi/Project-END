document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Reset lỗi
  document.querySelectorAll(".error").forEach(el => el.style.display = "none");
  document.getElementById("registerSuccess").style.display = "none";

  const lastname = document.getElementById("lastname").value.trim();
  const firstname = document.getElementById("firstname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const agree = document.getElementById("agree").checked;

  let isValid = true;

  // Họ và tên
  if (!lastname) {
    document.getElementById("lastnameError").style.display = "block";
    isValid = false;
  }

  if (!firstname) {
    document.getElementById("firstnameError").style.display = "block";
    isValid = false;
  }

  // Email
  if (!email) {
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    document.getElementById("emailInvalid").style.display = "block";
    isValid = false;
  }

  // Password
  if (!password) {
    document.getElementById("passwordError").style.display = "block";
    isValid = false;
  } else if (password.length < 8) {
    document.getElementById("passwordLengthError").style.display = "block";
    isValid = false;
  }

  // Checkbox
  if (!agree) {
    document.getElementById("checkboxError").style.display = "block";
    isValid = false;
  }

  if (!isValid) return;

  // Kiểm tra trùng email
  const userList = JSON.parse(localStorage.getItem("users")) || [];

  if (userList.find(user => user.email === email)) {
    document.getElementById("emailDuplicate").style.display = "block";
    return;
  }

  // Lưu người dùng
  userList.push({ lastname, firstname, email, password });
  localStorage.setItem("users", JSON.stringify(userList));

  // Hiển thị thông báo thành công và chuyển hướng
  document.getElementById("registerSuccess").style.display = "block";
  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});

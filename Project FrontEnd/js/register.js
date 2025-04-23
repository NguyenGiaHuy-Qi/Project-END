document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const lastname = document.getElementById("lastname").value.trim();
    const firstname = document.getElementById("firstname").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const agree = document.getElementById("agree").checked;
  
    if (!agree) {
      alert("Bạn cần đồng ý với điều khoản và chính sách!");
      return;
    }
  
    const userList = JSON.parse(localStorage.getItem("users")) || [];
  
    if (userList.find(user => user.email === email)) {
      alert("Email này đã được đăng ký.");
      return;
    }
  
    userList.push({ lastname, firstname, email, password });
    localStorage.setItem("users", JSON.stringify(userList));
  
    alert("Đăng ký thành công!");
    window.location.href = "login.html";
  });
  
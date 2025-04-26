window.addEventListener("DOMContentLoaded", () => {
  // Đếm số liệu dashboard
  const subjectList = JSON.parse(localStorage.getItem("subjects")) || [];
  const lessonList = JSON.parse(localStorage.getItem("lessons")) || [];

  const subjectCount = document.getElementById("subjectCount");
  const lessonCount = document.getElementById("lessonCount");
  const doneCount = document.getElementById("doneCount");

  if (subjectCount) subjectCount.textContent = subjectList.length;
  if (lessonCount) lessonCount.textContent = lessonList.length;

  const done = lessonList.filter(lesson => lesson.status === "done").length;
  if (doneCount) doneCount.textContent = done;

  // Xử lý dropdown avatar
  const avatarIcon = document.getElementById('avatar-icon');
  const dropdownMenu = document.getElementById('dropdown-menu');
  const logoutBtn = document.getElementById('logout-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  const confirmLogout = document.getElementById('confirm-logout');
  const cancelLogout = document.getElementById('cancel-logout');

  if (avatarIcon) {
    avatarIcon.addEventListener('click', () => {
      dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      modalOverlay.style.display = 'flex';
      dropdownMenu.style.display = 'none';
    });
  }

  if (confirmLogout) {
    confirmLogout.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'login.html';
    });
  }

  if (cancelLogout) {
    cancelLogout.addEventListener('click', () => {
      modalOverlay.style.display = 'none';
    });
  }

  // Auto ẩn dropdown khi click ra ngoài
  window.addEventListener('click', function (e) {
    if (!e.target.closest('.avatar-dropdown')) {
      dropdownMenu.style.display = 'none';
    }
  });
});

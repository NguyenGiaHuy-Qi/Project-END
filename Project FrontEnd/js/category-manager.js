// Xử lý sidebar menu chuyển trang
window.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".menu li");
  const currentPage = location.pathname.split("/").pop();

  menuItems.forEach(item => {
    const target = item.getAttribute("data-page");
    if (target === currentPage) {
      item.classList.add("active");
    }

    item.addEventListener("click", () => {
      window.location.href = target;
    });
  });
});

let subjects = JSON.parse(localStorage.getItem("subjects")) || [
  { name: "Lập trình C", status: "active" },
  { name: "Toán cao cấp", status: "inactive" },
];

let selectedSubjectIndex = -1;
const pageSize = 8;
let currentPage = 1;

function renderSubjects() {
  const tbody = document.getElementById('subjectTableBody');
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const statusFilter = document.getElementById('filterStatus').value;

  const filtered = subjects
    .map((subject, index) => ({ ...subject, originalIndex: index }))
    .filter(subject => {
      return subject.name.toLowerCase().includes(keyword)
        && (statusFilter === "" || subject.status === statusFilter);
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const start = (currentPage - 1) * pageSize;
  const pageSubjects = filtered.slice(start, start + pageSize);

  tbody.innerHTML = "";
  pageSubjects.forEach(subject => {
    const statusClass = subject.status === "active" ? "active" : "inactive";
    const statusLabel = subject.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${subject.name}</td>
      <td><span class="status ${statusClass}">${statusLabel}</span></td>
      <td>
        <i class="fa-solid fa-pencil edit-btn" data-index="${subject.originalIndex}" title="Chỉnh sửa" style="cursor: pointer; margin-right: 10px;"></i>
        <i class="fa-solid fa-trash-can delete-btn" data-index="${subject.originalIndex}" title="Xoá" style="cursor: pointer;"></i>
      </td>
    `;
    tbody.appendChild(row);
  });

  renderPagination(filtered.length);
  addEventListeners();
}

function renderPagination(totalItems) {
  const pagination = document.getElementById("pagination");
  const pageCount = Math.ceil(totalItems / pageSize);
  pagination.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) {
      btn.classList.add("active");
    }
    btn.addEventListener("click", () => {
      currentPage = i;
      renderSubjects();
    });
    pagination.appendChild(btn);
  }
}

function addEventListeners() {
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const subject = subjects[index];
      selectedSubjectIndex = index;

      document.getElementById("modalTitle").innerText = "Cập nhật môn học";
      document.getElementById("subjectName").value = subject.name;
      document.querySelector(`input[name="subjectStatus"][value="${subject.status}"]`).checked = true;
      document.getElementById("modalForm").style.display = "flex";
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      selectedSubjectIndex = e.target.dataset.index;
      document.getElementById("modalConfirm").style.display = "flex";
    });
  });
}

document.getElementById("saveBtn").addEventListener("click", () => {
  const nameInput = document.getElementById("subjectName");
  const nameError = document.getElementById("nameError");
  const name = nameInput.value.trim();
  const status = document.querySelector('input[name="subjectStatus"]:checked').value;

  if (name === "") {
    nameInput.classList.add("error");
    nameError.style.display = "block";
    return;
  } else {
    nameInput.classList.remove("error");
    nameError.style.display = "none";
  }

  if (selectedSubjectIndex >= 0) {
    subjects[selectedSubjectIndex] = { name, status };
  } else {
    subjects.push({ name, status });
  }

  saveSubjects();
  closeModal();
  renderSubjects();
});

document.getElementById("confirmDelete").addEventListener("click", () => {
  if (selectedSubjectIndex >= 0) {
    subjects.splice(selectedSubjectIndex, 1);
    selectedSubjectIndex = -1;
    saveSubjects();
    closeModal();
    renderSubjects();
  }
});

document.getElementById("cancelDelete").addEventListener("click", closeModal);
document.getElementById("cancelBtn").addEventListener("click", closeModal);

document.getElementById("addSubjectBtn").addEventListener("click", () => {
  selectedSubjectIndex = -1;
  document.getElementById("modalTitle").innerText = "Thêm môn học";
  document.getElementById("subjectName").value = "";
  document.querySelector('input[name="subjectStatus"][value="active"]').checked = true;
  document.getElementById("nameError").style.display = "none";
  document.getElementById("subjectName").classList.remove("error");
  document.getElementById("modalForm").style.display = "flex";
});

document.getElementById("searchInput").addEventListener("input", () => {
  currentPage = 1;
  renderSubjects();
});

document.getElementById("filterStatus").addEventListener("change", () => {
  currentPage = 1;
  renderSubjects();
});

function closeModal() {
  document.getElementById("modalForm").style.display = "none";
  document.getElementById("modalConfirm").style.display = "none";
}

function saveSubjects() {
  localStorage.setItem("subjects", JSON.stringify(subjects));
}

// Khởi tạo ban đầu
renderSubjects();

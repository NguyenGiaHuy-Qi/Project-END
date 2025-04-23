// category-management.js

let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
let editingId = null;

const tableBody = document.getElementById("subjectTableBody");
const pagination = document.getElementById("pagination");
const filterStatus = document.getElementById("filterStatus");
const searchInput = document.getElementById("searchInput");

const modalForm = document.getElementById("modalForm");
const modalTitle = document.getElementById("modalTitle");
const subjectName = document.getElementById("subjectName");
const subjectStatus = document.getElementById("subjectStatus");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

const modalConfirm = document.getElementById("modalConfirm");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

const addBtn = document.getElementById("addSubjectBtn");

let deleteId = null;
let currentPage = 1;
const limit = 5;

function renderSubjects() {
  let filtered = subjects.filter(sub => {
    const keyword = searchInput.value.toLowerCase();
    return sub.name.toLowerCase().includes(keyword) &&
      (filterStatus.value === "" || sub.status === filterStatus.value);
  });

  const totalPages = Math.ceil(filtered.length / limit);
  const start = (currentPage - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  tableBody.innerHTML = paginated.map((sub, index) => `
    <tr>
      <td>${sub.name}</td>
      <td><span class="status ${sub.status}">${sub.status === "active" ? "Đang hoạt động" : "Ngừng hoạt động"}</span></td>
      <td>
        <i class="fas fa-edit" style="color: orange" onclick="editSubject(${sub.id})"></i>
        <i class="fas fa-trash" style="color: red" onclick="deleteSubject(${sub.id})"></i>
      </td>
    </tr>
  `).join("");

  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.onclick = () => {
      currentPage = i;
      renderSubjects();
    };
    pagination.appendChild(btn);
  }
}

addBtn.onclick = () => {
  editingId = null;
  modalTitle.textContent = "Thêm môn học";
  subjectName.value = "";
  subjectStatus.value = "active";
  modalForm.style.display = "flex";
};

cancelBtn.onclick = () => modalForm.style.display = "none";

saveBtn.onclick = () => {
  const name = subjectName.value.trim();
  const status = subjectStatus.value;

  if (!name) return alert("Tên môn học không được để trống");

  const isDuplicate = subjects.some(s => s.name.toLowerCase() === name.toLowerCase() && s.id !== editingId);
  if (isDuplicate) return alert("Tên môn học không được trùng");

  if (editingId) {
    const sub = subjects.find(s => s.id === editingId);
    sub.name = name;
    sub.status = status;
  } else {
    subjects.push({ id: Date.now(), name, status });
  }

  localStorage.setItem("subjects", JSON.stringify(subjects));
  modalForm.style.display = "none";
  renderSubjects();
};

function editSubject(id) {
  editingId = id;
  const sub = subjects.find(s => s.id === id);
  subjectName.value = sub.name;
  subjectStatus.value = sub.status;
  modalTitle.textContent = "Cập nhật môn học";
  modalForm.style.display = "flex";
}

function deleteSubject(id) {
  deleteId = id;
  modalConfirm.style.display = "flex";
}

confirmDelete.onclick = () => {
  subjects = subjects.filter(s => s.id !== deleteId);
  localStorage.setItem("subjects", JSON.stringify(subjects));
  modalConfirm.style.display = "none";
  renderSubjects();
};

cancelDelete.onclick = () => modalConfirm.style.display = "none";

searchInput.oninput = () => renderSubjects();
filterStatus.onchange = () => renderSubjects();

window.addEventListener("DOMContentLoaded", renderSubjects);
const menuItems = document.querySelectorAll(".menu li");
const iframe = document.querySelector(".main-frame");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    const page = item.dataset.page;
    iframe.src = page;

    menuItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});

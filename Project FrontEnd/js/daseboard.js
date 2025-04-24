window.addEventListener("DOMContentLoaded", () => {
    const subjectList = JSON.parse(localStorage.getItem("subjects")) || [];
    const lessonList = JSON.parse(localStorage.getItem("lessons")) || [];
  
    const subjectCount = document.getElementById("subjectCount");
    const lessonCount = document.getElementById("lessonCount");
    const doneCount = document.getElementById("doneCount");
  
    subjectCount.textContent = subjectList.length;
    lessonCount.textContent = lessonList.length;
  
    const done = lessonList.filter(lesson => lesson.status === "done").length;
    doneCount.textContent = done;
  });
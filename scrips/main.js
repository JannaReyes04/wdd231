// Responsive Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Dynamic Year
document.getElementById("year").textContent = new Date().getFullYear();

// Last Modified Date
document.getElementById("lastModified").textContent = document.lastModified;

// Course List Array
const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 3, completed: true },
  { code: "WDD131", name: "Responsive Web Design", credits: 3, completed: false },
  { code: "CSE110", name: "Programming Basics", credits: 3, completed: true },
  { code: "CSE210", name: "Programming with Classes", credits: 3, completed: false }
];

// Display Courses
function displayCourses(filter = "all") {
  const container = document.getElementById("courses");
  container.innerHTML = "";

  let filtered = courses;
  if (filter === "wdd") filtered = courses.filter(c => c.code.startsWith("WDD"));
  if (filter === "cse") filtered = courses.filter(c => c.code.startsWith("CSE"));

  filtered.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card";
    if (course.completed) card.classList.add("completed");

    card.innerHTML = `
      <h3>${course.code} - ${course.name}</h3>
      <p>Credits: ${course.credits}</p>
    `;
    container.appendChild(card);
  });

  // Total Credits
  const total = filtered.reduce((sum, c) => sum + c.credits, 0);
  document.getElementById("totalCredits").textContent = total;
}

// Event Listeners for Buttons
document.getElementById("allBtn").addEventListener("click", () => displayCourses("all"));
document.getElementById("wddBtn").addEventListener("click", () => displayCourses("wdd"));
document.getElementById("cseBtn").addEventListener("click", () => displayCourses("cse"));

// Initial Load
displayCourses();

// Responsive Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

hamburger.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("show");

  hamburger.setAttribute("aria-expanded", isOpen);
});


// Dynamic Year
document.getElementById("year").textContent = new Date().getFullYear();


// Last Modified Date
document.getElementById("lastModified").textContent = document.lastModified;


// Course List Array
const courses = [
  {
    code: "WDD130",
    name: "Web Fundamentals",
    credits: 3,
    completed: true
  },
  {
    code: "WDD131",
    name: "Responsive Web Design",
    credits: 3,
    completed: false
  },
  {
    code: "CSE110",
    name: "Programming Basics",
    credits: 3,
    completed: true
  },
  {
    code: "CSE210",
    name: "Programming with Classes",
    credits: 3,
    completed: false
  }
];


// Display Courses
function displayCourses(filter = "all") {
  const container = document.getElementById("courses");

  container.innerHTML = "";

  let filteredCourses = courses;

  if (filter === "wdd") {
    filteredCourses = courses.filter(course =>
      course.code.startsWith("WDD")
    );
  }

  if (filter === "cse") {
    filteredCourses = courses.filter(course =>
      course.code.startsWith("CSE")
    );
  }

  filteredCourses.forEach(course => {
    const card = document.createElement("div");

    card.className = "course-card";

    if (course.completed) {
      card.classList.add("completed");
    }

    card.innerHTML = `
            <h3>${course.code} - ${course.name}</h3>
            <p>Credits: ${course.credits}</p>
            <p>${course.completed ? "Completed" : "Not Completed"}</p>
        `;

    container.appendChild(card);
  });


  // Calculate Total Credits using reduce()
  const totalCredits = filteredCourses.reduce(
    (total, course) => total + course.credits,
    0
  );

  document.getElementById("totalCredits").textContent = totalCredits;
}


// Course Filter Buttons
document.getElementById("allBtn").addEventListener("click", () => {
  displayCourses("all");
});

document.getElementById("wddBtn").addEventListener("click", () => {
  displayCourses("wdd");
});

document.getElementById("cseBtn").addEventListener("click", () => {
  displayCourses("cse");
});


// Initial Course Display
displayCourses();
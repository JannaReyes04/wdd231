// ==============================
// RESPONSIVE NAVIGATION
// ==============================

const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("show");

    const isOpen = navMenu.classList.contains("show");

    menuButton.setAttribute("aria-expanded", isOpen);
});


// ==============================
// FOOTER DATE INFORMATION
// ==============================

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;


// ==============================
// COURSE ARRAY
// ==============================

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call, debug, and test their own functions.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];


// ==============================
// DISPLAY COURSES
// ==============================

function displayCourses(filter = "all") {

    const courseContainer = document.querySelector("#courses");

    courseContainer.innerHTML = "";

    let filteredCourses = courses;

    if (filter === "cse") {
        filteredCourses = courses.filter(course =>
            course.subject === "CSE"
        );
    }

    if (filter === "wdd") {
        filteredCourses = courses.filter(course =>
            course.subject === "WDD"
        );
    }


    filteredCourses.forEach(course => {

        const card = document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {
            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} credits</p>
        `;

        courseContainer.appendChild(card);
    });


    // Calculate total credits using reduce()
    const totalCredits = filteredCourses.reduce(
        (total, course) => total + course.credits,
        0
    );

    document.querySelector("#totalCredits").textContent = totalCredits;
}


// ==============================
// COURSE FILTER BUTTONS
// ==============================

document.querySelector("#allBtn").addEventListener("click", () => {
    displayCourses("all");
});

document.querySelector("#cseBtn").addEventListener("click", () => {
    displayCourses("cse");
});

document.querySelector("#wddBtn").addEventListener("click", () => {
    displayCourses("wdd");
});


// ==============================
// INITIAL DISPLAY
// ==============================

displayCourses();

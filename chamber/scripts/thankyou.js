// ======================================
// RESPONSIVE NAVIGATION
// ======================================

const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");

menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    const isOpen = navMenu.classList.contains("show");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

    menuButton.textContent = isOpen ? "✕" : "☰";
});


// ======================================
// GET FORM INFORMATION
// ======================================

const params =
    new URLSearchParams(window.location.search);


document.querySelector("#displayFirst").textContent =
    params.get("first") || "Not provided";


document.querySelector("#displayLast").textContent =
    params.get("last") || "Not provided";


document.querySelector("#displayEmail").textContent =
    params.get("email") || "Not provided";


document.querySelector("#displayPhone").textContent =
    params.get("phone") || "Not provided";


document.querySelector("#displayOrganization").textContent =
    params.get("organization") || "Not provided";


// ======================================
// FORMAT TIMESTAMP
// ======================================

const submittedTimestamp =
    params.get("timestamp");

let formattedTimestamp =
    "Not available";


if (submittedTimestamp) {

    const submittedDate =
        new Date(submittedTimestamp);

    formattedTimestamp =
        submittedDate.toLocaleString();
}


document.querySelector("#displayTimestamp").textContent =
    formattedTimestamp;


// ======================================
// FOOTER
// ======================================

document.querySelector("#currentYear").textContent =
    new Date().getFullYear();


document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;
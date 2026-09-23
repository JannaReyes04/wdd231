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
// FOOTER
// ======================================

document.querySelector("#currentYear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;


// ======================================
// TIMESTAMP
// ======================================

const timestamp = document.querySelector("#timestamp");

timestamp.value = new Date().toISOString();


// ======================================
// MEMBERSHIP MODALS
// ======================================

const learnMoreButtons =
    document.querySelectorAll(".learn-more");

learnMoreButtons.forEach(button => {

    button.addEventListener("click", () => {

        const dialogId =
            button.dataset.dialog;

        const dialog =
            document.querySelector(`#${dialogId}`);

        dialog.showModal();
    });
});


// ======================================
// CLOSE MODALS
// ======================================

const closeButtons =
    document.querySelectorAll(".close-dialog");

closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const dialog =
            button.closest("dialog");

        dialog.close();
    });
});
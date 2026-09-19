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
// FOOTER INFORMATION
// ======================================

const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();

lastModified.textContent =
    `Last Modification: ${document.lastModified}`;


// ======================================
// GET MEMBER DATA
// ======================================

async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(
                `Unable to load member data: ${response.status}`
            );
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {

        console.error("Error loading members:", error);

        const container = document.querySelector("#members");

        container.innerHTML = `
            <p class="error-message">
                Sorry, the business directory could not be loaded.
                Please try again later.
            </p>
        `;
    }
}


// ======================================
// DISPLAY MEMBERS
// ======================================

function displayMembers(members) {

    const container = document.querySelector("#members");

    container.innerHTML = "";

    members.forEach((member) => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} business logo"
                loading="lazy"
                width="200"
                height="150"
            >

            <div class="member-info">

                <h2>${member.name}</h2>

                <p class="description">
                    ${member.description}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${member.phone}
                </p>

                <p>
                    <strong>Membership:</strong>
                    <span class="membership-level">
                        ${getMembershipLevel(member.membership)}
                    </span>
                </p>

                <a
                    class="website-link"
                    href="${member.website}"
                    target="_blank"
                    rel="noopener noreferrer">
                    Visit Website
                </a>

            </div>
        `;

        container.appendChild(card);
    });
}


// ======================================
// MEMBERSHIP LEVEL
// ======================================

function getMembershipLevel(level) {

    switch (level) {

        case 3:
            return "Gold";

        case 2:
            return "Silver";

        default:
            return "Member";
    }
}


// ======================================
// GRID / LIST VIEW
// ======================================

const gridButton = document.querySelector("#gridButton");
const listButton = document.querySelector("#listButton");
const membersContainer = document.querySelector("#members");


// GRID VIEW

gridButton.addEventListener("click", () => {

    membersContainer.classList.add("member-grid");
    membersContainer.classList.remove("member-list");

    gridButton.classList.add("active-view");
    listButton.classList.remove("active-view");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
});


// LIST VIEW

listButton.addEventListener("click", () => {

    membersContainer.classList.add("member-list");
    membersContainer.classList.remove("member-grid");

    listButton.classList.add("active-view");
    gridButton.classList.remove("active-view");

    gridButton.setAttribute("aria-pressed", "false");
    listButton.setAttribute("aria-pressed", "true");
});


// ======================================
// INITIALIZE DIRECTORY
// ======================================

getMembers();
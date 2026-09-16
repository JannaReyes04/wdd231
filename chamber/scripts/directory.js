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
// FOOTER INFORMATION
// ==============================

document.querySelector("#currentYear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;


// ==============================
// GET MEMBERS FROM JSON
// ==============================

async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member data.");
        }

        const members = await response.json();

        displayMembers(members);

    } catch (error) {

        console.error("Error loading members:", error);

    }
}


// ==============================
// DISPLAY MEMBERS
// ==============================

function displayMembers(members) {

    const container = document.querySelector("#members");

    container.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
                width="200"
                height="150"
            >

            <div class="member-info">

                <h3>${member.name}</h3>

                <p>${member.description}</p>

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
                    ${getMembershipLevel(member.membership)}
                </p>

                <a
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


// ==============================
// MEMBERSHIP LEVEL
// ==============================

function getMembershipLevel(level) {

    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    return "Member";
}


// ==============================
// GRID / LIST VIEW
// ==============================

const gridButton = document.querySelector("#gridButton");
const listButton = document.querySelector("#listButton");
const members = document.querySelector("#members");

gridButton.addEventListener("click", () => {

    members.classList.add("member-grid");
    members.classList.remove("member-list");

    gridButton.classList.add("active-view");
    listButton.classList.remove("active-view");
});


listButton.addEventListener("click", () => {

    members.classList.add("member-list");
    members.classList.remove("member-grid");

    listButton.classList.add("active-view");
    gridButton.classList.remove("active-view");
});


// ==============================
// INITIALIZE
// ==============================

getMembers();
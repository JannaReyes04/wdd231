// Import the place data from places.mjs
import { places } from "../data/places.mjs";


// ==========================================
// DISCOVER CARDS
// ==========================================

const discoverGrid = document.querySelector("#discover-grid");

function displayPlaces(placeList) {

    discoverGrid.innerHTML = "";

    placeList.forEach((place) => {

        const card = document.createElement("article");
        card.classList.add("discover-card");


        // Place title
        const title = document.createElement("h2");
        title.textContent = place.name;


        // Figure
        const figure = document.createElement("figure");


        // Image
        const image = document.createElement("img");

        image.src = `images/${place.image}`;
        image.alt = place.name;
        image.loading = "lazy";
        image.width = 300;
        image.height = 200;

        figure.appendChild(image);


        // Address
        const address = document.createElement("address");
        address.textContent = place.address;


        // Description
        const description = document.createElement("p");
        description.textContent = place.description;


        // Learn More button
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = "Learn More";
        button.classList.add("learn-more");

        button.setAttribute(
            "aria-label",
            `Learn more about ${place.name}`
        );


        // Add everything to the card
        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);


        // Add card to the page
        discoverGrid.appendChild(card);

    });

}


// Display all eight places
displayPlaces(places);


// ==========================================
// VISITOR MESSAGE
// ==========================================

const visitMessage = document.querySelector("#visit-message");

const currentVisit = Date.now();

const previousVisit = Number(
    localStorage.getItem("lastVisit")
);

const millisecondsPerDay =
    1000 * 60 * 60 * 24;


if (!previousVisit) {

    // First visit
    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";

} else {

    const timeDifference =
        currentVisit - previousVisit;

    const daysDifference =
        Math.floor(
            timeDifference / millisecondsPerDay
        );


    if (daysDifference < 1) {

        visitMessage.textContent =
            "Back so soon! Awesome!";

    } else if (daysDifference === 1) {

        visitMessage.textContent =
            "You last visited 1 day ago.";

    } else {

        visitMessage.textContent =
            `You last visited ${daysDifference} days ago.`;

    }

}


// Store today's visit
localStorage.setItem(
    "lastVisit",
    currentVisit
);


// ==========================================
// FOOTER INFORMATION
// ==========================================

const currentYear =
    document.querySelector("#currentYear");

const lastModified =
    document.querySelector("#lastModified");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


if (lastModified) {

    lastModified.textContent =
        `Last Modified: ${document.lastModified}`;

}


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuButton =
    document.querySelector("#menuButton");

const navMenu =
    document.querySelector("#navMenu");


if (menuButton && navMenu) {

    menuButton.addEventListener("click", () => {

        navMenu.classList.toggle("show");

        const isOpen =
            navMenu.classList.contains("show");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        menuButton.textContent =
            isOpen ? "✕" : "☰";

    });

}
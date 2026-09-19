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


//
// ======================================
// OPENWEATHERMAP
// ======================================
//

const apiKey = "0a540877a76a77dc29e9e83a98c754c2";


// Meycauayan City coordinates

const latitude = 14.7369;
const longitude = 120.9608;


// Current weather

const currentWeatherURL =
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;


// Forecast

const forecastURL =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;


//
// ======================================
// CURRENT WEATHER
// ======================================
//

async function getCurrentWeather() {

    try {

        const response = await fetch(currentWeatherURL);

        if (!response.ok) {
            throw new Error("Unable to retrieve current weather.");
        }

        const data = await response.json();

        displayCurrentWeather(data);

    } catch (error) {

        console.error(error);

        document.querySelector("#weatherDescription").textContent =
            "Weather information unavailable.";
    }
}


function displayCurrentWeather(data) {

    const temperature =
        document.querySelector("#currentTemp");

    const description =
        document.querySelector("#weatherDescription");

    const icon =
        document.querySelector("#weatherIcon");


    temperature.textContent =
        Math.round(data.main.temp);


    description.textContent =
        capitalizeWords(data.weather[0].description);


    const iconCode =
        data.weather[0].icon;


    icon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    icon.alt =
        data.weather[0].description;
}


//
// ======================================
// THREE-DAY FORECAST
// ======================================
//

async function getForecast() {

    try {

        const response = await fetch(forecastURL);

        if (!response.ok) {
            throw new Error("Unable to retrieve forecast.");
        }

        const data = await response.json();

        displayForecast(data.list);

    } catch (error) {

        console.error(error);

        document.querySelector("#forecastContainer").innerHTML =
            "<p>Forecast unavailable.</p>";
    }
}


function displayForecast(forecastList) {

    const container =
        document.querySelector("#forecastContainer");

    container.innerHTML = "";


    /*
        OpenWeatherMap returns forecasts every
        three hours.

        We select approximately noon for each
        of the next three days.
    */

    const dailyForecasts =
        forecastList.filter(item =>
            item.dt_txt.includes("12:00:00")
        );


    dailyForecasts
        .slice(0, 3)
        .forEach(item => {

            const date =
                new Date(item.dt_txt);

            const dayName =
                date.toLocaleDateString(
                    "en-US",
                    { weekday: "long" }
                );


            const forecastItem =
                document.createElement("div");

            forecastItem.classList.add("forecast-day");


            forecastItem.innerHTML = `
                <strong>${dayName}</strong>

                <span>
                    ${Math.round(item.main.temp)}°C
                </span>
            `;


            container.appendChild(forecastItem);
        });
}


//
// ======================================
// BUSINESS SPOTLIGHTS
// ======================================
//

async function getSpotlights() {

    try {

        const response =
            await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.");
        }

        const members =
            await response.json();


        /*
            Only Silver (2) and Gold (3)
            members qualify.
        */

        const qualifiedMembers =
            members.filter(member =>
                member.membership === 2 ||
                member.membership === 3
            );


        /*
            Shuffle the qualifying members.
        */

        qualifiedMembers.sort(
            () => Math.random() - 0.5
        );


        /*
            Display three random members.
        */

        const selectedMembers =
            qualifiedMembers.slice(0, 3);


        displaySpotlights(selectedMembers);

    } catch (error) {

        console.error(
            "Error loading spotlights:",
            error
        );
    }
}


//
// ======================================
// DISPLAY SPOTLIGHTS
// ======================================
//

function displaySpotlights(members) {

    const container =
        document.querySelector("#spotlights");

    container.innerHTML = "";


    members.forEach(member => {

        const card =
            document.createElement("article");

        card.classList.add("spotlight-card");


        card.innerHTML = `

            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
                width="160"
                height="120">

            <h3>${member.name}</h3>

            <p>
                <strong>Address:</strong><br>
                ${member.address}
            </p>

            <p>
                <strong>Phone:</strong><br>
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
        `;


        container.appendChild(card);
    });
}


//
// ======================================
// MEMBERSHIP
// ======================================
//

function getMembershipLevel(level) {

    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    return "Member";
}


//
// ======================================
// HELPER
// ======================================
//

function capitalizeWords(text) {

    return text.replace(
        /\b\w/g,
        letter => letter.toUpperCase()
    );
}


//
// ======================================
// INITIALIZE
// ======================================
//

getCurrentWeather();
getForecast();
getSpotlights();
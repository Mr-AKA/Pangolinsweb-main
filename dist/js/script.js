const navbarToggler = document.querySelector(".navbar-toggler");
const teamDisplay = document.querySelector(".team-container");
const closePopup = document.querySelector(".close-popup");
const rtoPopup = document.querySelector(".rto-popup");
const popupMain = document.querySelector(".popup-main");

navbarToggler.onclick = () => {
    if (navbarToggler.firstElementChild.classList.contains("bi-list")) {
        navbarToggler.firstElementChild.classList.remove("bi-list");
        navbarToggler.firstElementChild.classList.add("bi-x-lg");
    } else {
        navbarToggler.firstElementChild.classList.add("bi-list");
        navbarToggler.firstElementChild.classList.remove("bi-x-lg");
    }
};

function togglePopup() {
    rtoPopup.style.opacity = 1;

    setTimeout(() => {
        popupMain.style.top = "0";
    }, 200);
}

if (!sessionStorage.getItem("popupDisplayed")) {
    rtoPopup.style.display = "flex";

    rtoPopup.style.opacity = "1";

    setTimeout(() => {
        popupMain.style.top = "0";
    }, 200);
}

closePopup.onclick = () => {
    popupMain.style.top = "100%";

    setTimeout(() => {
        rtoPopup.style.opacity = "0";
    }, 200);

    setTimeout(() => {
        rtoPopup.style.display = "none";
        sessionStorage.setItem("popupDisplayed", "true");
    }, 250);
};

function getTeam() {
    fetch("team.csv")
        .then((response) => response.text())
        .then((data) => {
            let team = Papa.parse(data, { header: true }).data;

            filterteam(team);
        });
}

function filterteam(team) {
    teamDisplay.innerHTML = "";

    for (let i = 0; i < team.length; i++) {
        let theTeam = team[i];

        let newTeam = document.createElement("div");
        newTeam.classList.add("team-member");
        newTeam.classList.add("col-md-4");
        newTeam.classList.add("col-sm-6");
        newTeam.classList.add("mb-5");
        newTeam.setAttribute("data-scroll-reveal", "enter bottom move 24px");

        if (theTeam.name !== "Vacant Position") {
            newTeam.innerHTML = `
                <img loading="lazy" src="../../assets/img/images/jpg/${theTeam.name}.${theTeam.format}"
                    class="bg-dark rounded-circle mb-3" width="140" height="140" role="img"
                    aria-label="Team Member" preserveAspectRatio="xMidYMid slice" focusable="false">
                <h2 class="fs-4">${theTeam.name}</h2>
                <p class="fw-light">(${theTeam.position})</p>
            `;
        } else {
            newTeam.innerHTML = `
                <img loading="lazy" src="../../assets/img/images/jpg/${theTeam.name}.${theTeam.format}"
                    class="bg-dark rounded-circle mb-3" width="140" height="140" role="img"
                    aria-label="Team Member" preserveAspectRatio="xMidYMid slice" focusable="false">
                <h2 class="fs-4">${theTeam.name}</h2>
                <span class="service-buttons mt-2 vacancy-details">
                    <button class="btn btn-primary get-rto-form-home">Download Details</button>
                </span>
            `;

            newTeam.id = 'vacancy';
        }

        teamDisplay.appendChild(newTeam);
    }

    downloadVacancyDetails();
}

function downloadVacancyDetails() {
    const vacancyDetails = document.querySelector(".vacancy-details");

    vacancyDetails.onclick = () => {
        const link = document.createElement("a");
        link.setAttribute(
            "href",
            "../../assets/data/Vacancy Details.zip"
        );
        link.download = "Vacancy Details.zip";
        link.href = "../../assets/data/Vacancy Details.zip";
        link.click();
    }
}
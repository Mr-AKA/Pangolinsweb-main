const newsDisplay = document.querySelector(".news-container");

function loadScrollReveal() {
  let config = {
    after: "0s",
    enter: "bottom",
    move: "24px",
    over: ".66s",
    easing: "ease-in-out",
    viewportFactor: 0.33,
    reset: false,
    init: false,
  };

  window.scrollReveal = new scrollReveal(config);
  scrollReveal.init();
}

function getNews() {
  fetch("news.csv")
    .then((response) => response.text())
    .then((data) => {
      let news = Papa.parse(data, { header: true }).data;

      filterNews(news);
    });
}

function filterNews(news) {
  newsDisplay.innerHTML = "";

  for (let i = news.length; i > 0; i--) {
    let theNews = news[i - 1];
    let tag = "old";

    if (theNews.date == "new") {
      tag = "new";
    }

    let newNews = document.createElement("div");
    newNews.classList.add("news-item");
    newNews.classList.add("shadow");
    newNews.classList.add("text-center");
    newNews.classList.add(tag);
    newNews.setAttribute("data-scroll-reveal", "enter bottom move 24px");
    newNews.innerHTML = `
                            <a title="News Image" class="newsImage" href="./assets/img/picture/${theNews.name}.${theNews.format}" data-lightbox="news${theNews.index}"
                                data-title="${theNews.headline}">
                                <img width="100%" loading="lazy" src="./assets/img/picture/${theNews.name}.${theNews.format}" alt="News Image ${theNews.index}">
                            </a>
                            <div class="news-details mt-3">
                                <h4>${theNews.headline}</h4>
                                <p>
                                    ${theNews.body}
                                </p>
                                <a href="${theNews.link}"
                                    class="mb-3 news-link btn btn-light px-4 text-dark gap-3 shadow-sm">
                                    Learn more
                                </a>
                            </div>
        `;

    newsDisplay.appendChild(newNews);
  }

  tagNew();
}

function tagNew() {
  const newsItems = document.querySelectorAll(".news-item");

  newsItems.forEach((newsItem) => {
    if (newsItem.classList.contains("new")) {
      let newTag = document.createElement("span");
      newTag.classList.add("newTag");
      newTag.innerHTML = `
                <p>New</p>
                <i class="bi bi-fire"></i>
            `;
      newsItem.querySelector(".newsImage").appendChild(newTag);
    }
  });
}

const getFormRTOHome = document.querySelector(".get-rto-form-home");
const getCharterRTOHome = document.querySelector(".get-rto-charter-home");

getFormRTOHome.onclick = () => {
  const link = document.createElement("a");
  link.setAttribute(
    "href",
    "./assets/data/pdf/Rent to Own - Application Form.pdf"
  );
  link.download = "Rent to Own - Application Form.pdf";
  link.href = "./assets/data/pdf/Rent to Own - Application Form.pdf";
  link.click();
};

getCharterRTOHome.onclick = () => {
  const link = document.createElement("a");
  link.setAttribute(
    "href",
    "./assets/data/pdf/Rent to Own - Service Charter.pdf"
  );
  link.download = "Rent to Own - Service Charter.pdf";
  link.href = "./assets/data/pdf/Rent to Own - Service Charter.pdf";
  link.click();
};

// FOR IMPACT ANIMATION

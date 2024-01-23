const BASE_URL = "http://localhost:8080";
const cardsData = document.querySelector(".cards-page");
const header = document.querySelector("header");
let id = new URLSearchParams(window.location.search).get("id");

async function getData() {
  const response = await axios(`${BASE_URL}/products`);
  arr = response.data;
  //   console.log(arr);
  drawCards(arr);
}
getData();

function drawCards(data) {
  cardsData.innerHTML = "";
  data.forEach((element) => {
    cardsData.innerHTML += `
       <div class="card-page">
              <div class="img">
                <img src="${element.image}" alt="">
              </div>
              <div class="text">
                <h3>${element.title}</h3>
                <div class="icon-text">
                  <div class="icon">
                    <i class="fa-solid fa-star"></i>
                    <p>4.9</p>
                  </div>
                  <div class="icon">
                    <i class="fa-regular fa-heart"></i>
                    <p>29</p>
                  </div>
                </div>
                <p>${element.description}</p>
                <a href="./detail.html?id=${element.id}">VIEW DETAILS...</a>
              </div>
            </div>
    `;
  });
}

window.addEventListener("scroll", function () {
  header.classList.toggle("header-scroll", window.scrollY > 0);
});


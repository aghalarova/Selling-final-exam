const BASE_URL = "http://localhost:8080";
let id = new URLSearchParams(window.location.search).get("id");
const detailCard = document.querySelector(".detail-section");

async function getData() {
  const response = await axios(`${BASE_URL}/products/${id}`);
  detailCard.innerHTML = `
          <div class="left">
            <img src="${response.data.image}" alt="" />
          </div>
          <div class="right">
             <h2>${response.data.title}</h2>
             <p>${response.data.description}</p>
          </div>
          `;
}
getData();

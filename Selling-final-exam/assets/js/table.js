const BASE_URL = "http://localhost:8080";
const tBody = document.querySelector("tbody");
const form = document.querySelector("form");
const allInputs = document.querySelectorAll("input");
const searchInput = document.querySelector("#search-input");
const header = document.querySelector("header");

async function getData(data) {
  const response = await axios(`${BASE_URL}/products`);
  arr = response.data;
  console.log(arr);
  drawCards(arr);
}
getData();

function drawCards(data) {
  tBody.innerHTML = "";
  data.forEach((element) => {
    tBody.innerHTML += `
                <tr>
                    <td>${element.id}</td>
                    <td>${element.title}</td>
                    <td><img src="${element.image}" alt=""></td>
                    <td>${element.description}</td>
                    <td><i class="fa-solid fa-trash" onclick=deleteCard("${element.id}",this)></i></td>
                </tr>
        `;
  });
}

searchInput.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered = arr.filter((item) =>
    item.description
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  drawCards(filtered);
});

window.addEventListener("scroll", function () {
  header.classList.toggle("header-scroll-table", window.scrollY > 0);
});

async function deleteCard(id, btn) {
  if (confirm("?")) {
    await axios.delete(`${BASE_URL}/products/${id}`);
    btn.parentElement.remove();
  }
}

form.addEventListener("submit", async function (event) {
  event.preventDefault();
  try {
    if (
      allInputs[0].value.trim() &&
      allInputs[1].value.trim() &&
      allInputs[2].value.trim()
    ) {
      let user = {
        title: allInputs[0].value,
        description: allInputs[1].value,
        image: allInputs[2].value,
      };
      await axios.post(`${BASE_URL}/products`, user);
    } else {
      window.alert("!!!");
    }
  } catch (error) {
    console.log(error);
  }
});

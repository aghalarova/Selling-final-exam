const BASE_URL = "http://localhost:8080";
const tBody = document.querySelector("tbody");
const form = document.querySelector("form");
const allInputs = document.querySelectorAll("input");
const searchInput = document.querySelector("#search-input");

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
                    <td><i class="fa-regular fa-trash-can" onclick=deleteCard("${element.id}",this)></i></td> 
                </tr>
        `;
  });
}

searchInput.addEventListener("input", function (e) {
  e.preventDefault();
  let filtered = arr.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  drawCards(filtered);
});

async function deleteCard(id, btn) {
  if (confirm("are you sure?")) {
    await axios.delete(`${BASE_URL}/products/${id}`);
    btn.parentElement.remove();
  }
}

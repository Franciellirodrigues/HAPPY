//create map
const map = L.map("mapid").setView([-23.7087165, -46.4183779], 13);

// create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// create icon
const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

// create and add marker
map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector("[name=lat]").value = lat;
  document.querySelector("[name=lng]").value = lng;

  // remove icon
  marker && map.removeLayer(marker);

  // add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

// adicionar fotos
function addPhotoField() {
  // pegar o container fotos #images
  const container = document.querySelector("#images");
  // pegar o container para duplicar .new-image
  const fieldsContainer = document.querySelectorAll(".new-upload");
  // realizar o clone da útlima imagem adicionada
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);

  // verificar se o campo está vazio
  const input = newFieldContainer.children[0];
  if (input.value == "") {
    return;
  }

  // limpar campo
  input.value = "";

  //  adicionar o clone ao container de #images
  container.appendChild(newFieldContainer);
}

function deleteField(event) {
  const span = event.currentTarget;
  const fieldsContainer = document.querySelectorAll(".new-upload");
  if (fieldsContainer.length <= 1) {
    // limpar o campo
    span.parentNode.children[0].value = "";
    return;
  }

  // deletar o campo
  span.parentNode.remove();
}

// seleção sim ou não
function toggleSelect(event) {
  // retirar a class .active
  document
    .querySelectorAll(".button-select button")
    .forEach((button) => button.classList.remove("active"));
  // colocar a class .active no botão clicado
  const button = event.currentTarget;
  button.classList.add("active");
  // atualizar o input com o valor selecionado
  const input = document.querySelector('[name="open_on_weekends"]');
  // verificar o valor
  input.value = button.dataset.value;
}

function validate(event) {
  // validar se lat e lng estão preenchidos
  const needsLatAndLng = false;
  if (needsLatAndLng) {
    event.preventDefault();
    alert("Selecione um ponto no mapa");
  }
}

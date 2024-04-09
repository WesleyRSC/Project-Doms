const itens = [];

var page = 1;

const tableHeaders = ["Item", "Quantidade", "Medida"];

//form - step 1
const personalInfoForm = document.getElementById("personalInfoForm");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const cepInput = document.getElementById("cep");
const promoCheckbox = document.getElementById("promoCheckbox");

//form - step 2
const peopleCountForm = document.getElementById("peopleCountForm");
const homensInput = document.getElementById("homens");
const mulheresInput = document.getElementById("mulheres");
const criancasInput = document.getElementById("criancas");
const alcoolicasInput = document.getElementById("alcoolicas");

//table - step 3
const tableContainer = document.getElementById("table-container");

hidePreviousButton();

document
  .getElementById("btn-previous")
  .addEventListener("click", function (event) {
    event.preventDefault();
    returnStep();
  });

//send form - 1
personalInfoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(event.target);
  if (validatePersonalInfo()) {
    let user = {
      name: nomeInput.value,
      email: emailInput.value,
      cep: cepInput.value,
      acceptPromo: promoCheckbox.checked,
    };
    sessionStorage.setItem("user", JSON.stringify(user));
    advanceStep();
  }
});

peopleCountForm.addEventListener("submit", function (event) {
  event.preventDefault();
  calculateItems();
});

peopleCountForm.addEventListener("change", (event) => {
  event.preventDefault();
  validatePeopleCount();
});

function hidePreviousButton() {
  if (page === 1) {
    verifyUserSaved();
    document.getElementById("btn-previous").hidden = true;
    document
      .getElementsByTagName("header")
      .item(0)
      .children.item(1).style.textAlign = "center";
    document
      .getElementsByTagName("header")
      .item(0)
      .children.item(1).style.width = "100%";
  } else document.getElementById("btn-previous").hidden = false;
}

function verifyUserSaved() {
  let userString = sessionStorage.getItem("user");

  if (userString) {
    user = JSON.parse(userString);
    nomeInput.value = user.name;
    emailInput.value = user.email;
    cepInput.value = user.cep;
    promoCheckbox.checked = user.acceptPromo;
  }
}

function advanceStep() {
  page = 2;
  hidePreviousButton();
  document.getElementById("step1").style.display = "none";
  document.getElementById("step3").style.display = "none";
  document.getElementById("step2").style.display = "block";
}

function returnStep() {
  page = 1;
  hidePreviousButton();
  document.getElementById("step2").style.display = "none";
  document.getElementById("step3").style.display = "none";
  document.getElementById("step1").style.display = "block";
}

function validatePersonalInfo() {
  let valid = true;
  if (!nomeInput.value.trim()) {
    nomeInput.classList.add("error");
    valid = false;
  } else {
    nomeInput.classList.remove("error");
  }

  if (!validateEmail(emailInput.value.trim())) {
    emailInput.classList.add("error");
    valid = false;
  } else {
    emailInput.classList.remove("error");
  }

  if (!cepInput.value.trim()) {
    cepInput.classList.add("error");
    valid = false;
  } else {
    cepInput.classList.remove("error");
  }

  return valid;
}

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePeopleCount() {
  let adultos = parseInt(homensInput.value) + parseInt(mulheresInput.value);

  if (parseInt(alcoolicasInput.value) > adultos) {
    alcoolicasInput.classList.add("error");
    document.getElementById("step3").style.display = "none";
    return false;
  }
  alcoolicasInput.classList.remove("error");
  //   document.getElementById("step3").style.display = "block";
  return true;
}

async function getItensInformation() {
  let itens = [];

  return await fetch("./menu.json")
    .then((response) => response.json())
    .then((data) => {
      return data.itens;
    })
    .catch((err) => console.log(err));
}

async function calculateItems() {
  if (itens.length == 0) {
    let dados = await getItensInformation();
    itens.push(...dados);
  }

  document.getElementById("step3").style.display = "block";

  tableContainer.innerHTML = "";
  var table = document.createElement("table");
  table.id = "itens-table";

  let header = table.createTHead();
  let row = header.insertRow();
  tableHeaders.forEach((element) => {
    let th = document.createElement("th");
    th.innerHTML = element.toUpperCase();
    row.appendChild(th);
  });

  var body = table.createTBody();
  itens.forEach((item) => {
    var row = body.insertRow();

    var nameCell = row.insertCell();
    nameCell.innerHTML = item.Nome;

    var quantityCell = row.insertCell();
    quantityCell.innerHTML = calculaTotalPorItem(item);

    var measureCell = row.insertCell();
    measureCell.innerHTML = item.Medida;

    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(measureCell);

    body.appendChild(row);
  });

  console.log(table);
  tableContainer.appendChild(table);
}

function calculaTotalPorItem(item) {
  let homens = parseInt(homensInput.value);
  let mulheres = parseInt(mulheresInput.value);
  let criancas = parseInt(criancasInput.value);
  let alcoolicos = parseInt(alcoolicasInput.value);

  let total = 0;

  switch (item.Nome) {
    case "Carne":
      debugger;
      total = Math.round(
        homens * item.QtdHomem +
          mulheres * item.QtdMulher +
          criancas * item.QtdCrianca
      );
      break;
    case "Pão de Alho":
      total = Math.round(
        homens * item.QtdHomem +
          mulheres * item.QtdMulher +
          criancas * item.QtdCrianca
      );
      break;
    case "Carvão":
      total = Math.round(
        homens * item.QtdHomem +
          mulheres * item.QtdMulher +
          criancas * item.QtdCrianca
      );
      break;
    case "Gelo":
      total = Math.round(
        homens * item.QtdHomem +
          mulheres * item.QtdMulher +
          criancas * item.QtdCrianca
      );
      break;
    case "Refrigerante":
      total = Math.round(
        homens * item.QtdHomem +
          mulheres * item.QtdMulher +
          criancas * item.QtdCrianca
      );
      break;
    case "Sal":
      total = Math.round(
        homens * item.QtdHomem +
          mulheres * item.QtdMulher +
          criancas * item.QtdCrianca
      );
      break;
    case "Agua":
      total = Math.round(
        homens * item.QtdHomem +
          mulheres * item.QtdMulher +
          criancas * item.QtdCrianca
      );
      break;
    case "Cerveja":
      total = alcoolicos * 3;
      break;

    default:
      break;
  }
  return total;
}

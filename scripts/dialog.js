function openDialog(pokeIndex, array) {
  let dialogContainerRef = document.getElementById("dialogContainer");
  dialogContainerRef.classList.toggle("dNone");
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
  let arrayToUse;
  let arrayToToggle;
  if (array === "p") {
    arrayToUse = pokemonData;
    arrayToToggle = "p";
  } else if (array === "s") {
    arrayToUse = searchedPokemonData;
    arrayToToggle = "s";
  }
  renderDetailCard(pokeIndex, arrayToUse, arrayToToggle);
}

function renderDetailCard(pokeIndex, pokemonData, arrayToToggle) {
  let dialogContainerRef = document.getElementById("dialogContainer");
  dialogContainerRef.innerHTML = getDetailCardTemplate(
    pokeIndex,
    pokemonData,
    arrayToToggle
  );
  intialRenderMainInfoOfCard(pokeIndex, pokemonData);
}

function intialRenderMainInfoOfCard(pokeIndex, array) {
  let detailCardContentRef = document.getElementById("detailCardContent");
  detailCardContentRef.innerHTML = getMainInfoTemplate(pokeIndex, array);
}

function renderMainInfoOfCard(pokeIndex, array) {
  let arrayToUse;
  if (array === "p") {
    arrayToUse = pokemonData;
  } else if (array === "s") {
    arrayToUse = searchedPokemonData;
  }
  let detailCardContentRef = document.getElementById("detailCardContent");
  detailCardContentRef.innerHTML = getMainInfoTemplate(pokeIndex, arrayToUse);
}

function closeDialog(event) {
  let closeDialogRef = document.getElementById("dialogContainer");
  closeDialogRef.classList.toggle("dNone");
  document.getElementsByTagName("body")[0].style.overflow = "auto";
  event.stopPropagation();
}

function stayOpen(event) {
  event.stopPropagation(event);
}

function getAbilities(pokeIndex, dataArray) {
  let abilitiesText = "";
  for (let i = 0; i < dataArray[pokeIndex].abilities.length; i++) {
    let ability = dataArray[pokeIndex].abilities[i].ability.name;
    abilitiesText += ability + ", ";
  }
  abilitiesText = abilitiesText.slice(0, -2);
  return abilitiesText;
}

function getWeight(pokeIndex, dataArray) {
  let weight = dataArray[pokeIndex].weight;
  weight /= 10;
  weight = String(weight);
  weight = weight.replace(".", ",");
  weight += " kg";
  return weight;
}

function getHeight(pokeIndex, dataArray) {
  let height = dataArray[pokeIndex].height;
  height /= 10;
  height = String(height);
  height = height.replace(".", ",");
  height += " m";
  return height;
}

function renderStats() {
  let detailCardContentRef = document.getElementById("detailCardContent");
  detailCardContentRef.innerHTML = "";
}

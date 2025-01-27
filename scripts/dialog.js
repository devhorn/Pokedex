function openDialog(pokeIndex, array) {
  let dialogContainerRef = document.getElementById("dialogContainer");
  dialogContainerRef.classList.toggle("dNone");
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
  let arrayToUse = getNeededPokemonArr(array);
  let arrayToTrigger = getArrayToTrigger(array);
  document.getElementById("search").disabled = true;
  renderDetailCard(pokeIndex, arrayToUse, arrayToTrigger);
}

function renderDetailCard(pokeIndex, arrayToUse, arrayToTrigger) {
  let dialogContainerRef = document.getElementById("dialogContainer");
  dialogContainerRef.innerHTML = getDetailCardTemplate(
    pokeIndex,
    arrayToUse,
    arrayToTrigger
  );
  intialRenderMainInfoOfCard(pokeIndex, arrayToUse);
}

function intialRenderMainInfoOfCard(pokeIndex, array) {
  let detailCardContentRef = document.getElementById("detailCardContent");
  detailCardContentRef.innerHTML = getMainInfoTemplate(pokeIndex, array);
}

function renderMainInfoOfCard(pokeIndex, array) {
  let arrayToUse = getNeededPokemonArr(array);
  let detailCardContentRef = document.getElementById("detailCardContent");
  detailCardContentRef.innerHTML = getMainInfoTemplate(pokeIndex, arrayToUse);
}

function closeDialog(event) {
  let closeDialogRef = document.getElementById("dialogContainer");
  closeDialogRef.classList.toggle("dNone");
  document.getElementsByTagName("body")[0].style.overflow = "auto";
  document.getElementById("search").disabled = false;
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

function renderStats(pokeIndex, array) {
  let arrayToUse = getNeededPokemonArr(array);
  let detailCardContentRef = document.getElementById("detailCardContent");
  detailCardContentRef.innerHTML = "";
  for (let i = 0; i < arrayToUse[pokeIndex].stats.length; i++) {
    let statName = arrayToUse[pokeIndex].stats[i].stat.name;
    let statValue = arrayToUse[pokeIndex].stats[i].base_stat;
    detailCardContentRef.innerHTML += getStatBarTemplate(statName, statValue);
  }
}

function getNeededPokemonArr(array) {
  let arrayToUse;
  if (array === "p") {
    arrayToUse = pokemonData;
  } else if (array === "s") {
    arrayToUse = searchedPokemonData;
  }
  return arrayToUse;
}

function getArrayToTrigger(array) {
  let arrayToTrigger;
  if (array === "p") {
    arrayToTrigger = "p";
  } else if (array === "s") {
    arrayToTrigger = "s";
  }
  return arrayToTrigger;
}

function pokemonForward(pokeIndex, array, event) {
  let nextIndex = pokeIndex + 1;
  let dialogContainerRef = document.getElementById("dialogContainer");
  let arrayToUse = getNeededPokemonArr(array);
  let arrayToTrigger = getArrayToTrigger(array);
  dialogContainerRef.innerHTML = "";
  if (nextIndex <= arrayToUse.length - 1) {
    renderDetailCard(nextIndex, arrayToUse, arrayToTrigger);
  } else {
    nextIndex = 0;
    renderDetailCard(nextIndex, arrayToUse, arrayToTrigger);
  }
  event.stopPropagation(event);
}

function pokemonBackward(pokeIndex, array, event) {
  let nextIndex = pokeIndex - 1;
  let dialogContainerRef = document.getElementById("dialogContainer");
  let arrayToUse = getNeededPokemonArr(array);
  let arrayToTrigger = getArrayToTrigger(array);
  dialogContainerRef.innerHTML = "";
  if (nextIndex >= 0) {
    renderDetailCard(nextIndex, arrayToUse, arrayToTrigger);
  } else {
    nextIndex = arrayToUse.length - 1;
    renderDetailCard(nextIndex, arrayToUse, arrayToTrigger);
  }
  event.stopPropagation(event);
}

function openDialog(pokeIndex, array) {
  let dialogContainerRef = document.getElementById("dialogContainer");
  dialogContainerRef.classList.toggle("dNone");
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
  let arrayToUse = getNeededPokemonArr(array);
  let arrayToToggle = getArrayToToggle(array);
  renderDetailCard(pokeIndex, arrayToUse, arrayToToggle);
}

function renderDetailCard(pokeIndex, arrayToUse, arrayToToggle) {
  let dialogContainerRef = document.getElementById("dialogContainer");
  dialogContainerRef.innerHTML = getDetailCardTemplate(
    pokeIndex,
    arrayToUse,
    arrayToToggle
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

function renderEvoChain(pokeIndex) {
  let detailCardContentRef = document.getElementById("detailCardContent");
  detailCardContentRef.innerHTML = "";
  /* firstEvolution = evolutionChains[pokeIndex].chain.species.name; */
  detailCardContentRef.innerHTML = getEvoChainTemplate(pokeIndex);
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

function getArrayToToggle(array) {
  let arrayToToggle;
  if (array === "p") {
    arrayToToggle = "p";
  } else if (array === "s") {
    arrayToToggle = "s";
  }
  return arrayToToggle;
}

function pokemonForward(pokeIndex, array, event) {
  let nextIndex = pokeIndex + 1;
  let dialogContainerRef = document.getElementById("dialogContainer");
  let arrayToUse = getNeededPokemonArr(array);
  let arrayToToggle = getArrayToToggle(array);
  dialogContainerRef.innerHTML = "";
  if (nextIndex <= arrayToUse.length - 1) {
    renderDetailCard(nextIndex, arrayToUse, arrayToToggle);
  } else {
    nextIndex = 0;
    renderDetailCard(nextIndex, arrayToUse, arrayToToggle);
  }
  event.stopPropagation(event);
}

function pokemonBackward(pokeIndex, array, event) {
  let nextIndex = pokeIndex - 1;
  let dialogContainerRef = document.getElementById("dialogContainer");
  let arrayToUse = getNeededPokemonArr(array);
  let arrayToToggle = getArrayToToggle(array);
  dialogContainerRef.innerHTML = "";
  if (nextIndex >= 0) {
    renderDetailCard(nextIndex, arrayToUse, arrayToToggle);
  } else {
    nextIndex = arrayToUse.length - 1;
    renderDetailCard(nextIndex, arrayToUse, arrayToToggle);
  }
  event.stopPropagation(event);
}

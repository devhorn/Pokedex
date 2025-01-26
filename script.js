BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0";
let amountOfRendertPokemons = 20;
let amountOfLoad = 20;
let loadedPokemons = [];
let pokemonData = [];
let evolutionChains = [];

async function init() {
  openLoadingOverlay();
  await initialLoadPokemons();
  await getInitialPokemonData();
  await getEvolutionChains();
  closeLoadingOverlay();
  initialRenderingOfPokemons();
  renderTypes();
}

async function initialLoadPokemons() {
  let pokemonContentRef = document.getElementById("pokemonContent");
  try {
    let response = await fetch(BASE_URL);
    let responseAsJson = await response.json();
    loadedPokemons = responseAsJson.results;
  } catch (error) {
    pokemonContentRef.innerHTML = getLoadDataErrorMessage(error);
  }
}

async function getInitialPokemonData() {
  let pokemonContentRef = document.getElementById("pokemonContent");
  for (let i = 0; i < amountOfRendertPokemons; i++) {
    try {
      let response = await fetch(loadedPokemons[i].url);
      let responseAsJson = await response.json();
      pokemonData.push(responseAsJson);
    } catch (error) {
      pokemonContentRef.innerHTML = getLoadDataErrorMessage(error);
    }
  }
}

function initialRenderingOfPokemons() {
  let pokemonContentRef = document.getElementById("pokemonContent");
  for (let pokeIndex = 0; pokeIndex < pokemonData.length; pokeIndex++) {
    pokemonContentRef.innerHTML += getPokemonCardTemplate(
      pokeIndex,
      pokemonData,
      "p"
    );
  }
}

function renderTypes() {
  for (let pokeIndex = 0; pokeIndex < pokemonData.length; pokeIndex++) {
    let typeContentRef = document.getElementById(`typeContent${pokeIndex}`);
    for (let i = 0; i < pokemonData[pokeIndex].types.length; i++) {
      let typeName = pokemonData[pokeIndex].types[i].type.name;
      typeContentRef.innerHTML += getTypeTemplate(typeName);
    }
  }
}

function openLoadingOverlay() {
  let loadingOverlayRef = document.getElementById("loadingOverlay");
  loadingOverlayRef.classList.toggle("dNone");
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
  document.getElementById("loadMoreButton").disabled = true;
}

function closeLoadingOverlay() {
  let loadingOverlayRef = document.getElementById("loadingOverlay");
  loadingOverlayRef.classList.toggle("dNone");
  document.getElementsByTagName("body")[0].style.overflow = "auto";
  document.getElementById("loadMoreButton").disabled = false;
}

async function getEvolutionChains() {
  let url = "https://pokeapi.co/api/v2/pokemon-species/";
  let id = 1;
  for (let pokeIndex = 0; pokeIndex < pokemonData.length; pokeIndex++) {
    try {
      await fillEvoChainArr(url, id);
    } catch (error) {
      pokemonContentRef.innerHTML = getLoadDataErrorMessage(error);
    }
    id++;
  }
}

async function fillEvoChainArr(url, id) {
  let response = await fetch(url + `${id}`);
  let responseAsJson = await response.json();
  let responseEvolutionChain = await fetch(responseAsJson.evolution_chain.url);
  let evolutionChainAsJson = await responseEvolutionChain.json();
  evolutionChains.push(evolutionChainAsJson);
}

async function buildEvoChain(pokeIndex, arrayToTrigger) {
  if (arrayToTrigger === "p") {
    await buildEvoChainForPokemonDataArr(pokeIndex);
  }
  if (arrayToTrigger === "s") {
    await buildEvoChainForSearchedPokemonDataArr(pokeIndex);
  }
}

async function buildEvoChainForPokemonDataArr(pokeIndex) {
  let evoChainNames = [];
  let firstEvo = evolutionChains[pokeIndex].chain.species.name;
  evoChainNames.push(firstEvo);
  if (evolutionChains[pokeIndex].chain.evolves_to.length > 0) {
    let secondEvo = evolutionChains[pokeIndex].chain.evolves_to[0].species.name;
    evoChainNames.push(secondEvo);
  }
  if (evolutionChains[pokeIndex].chain.evolves_to[0].evolves_to.length > 0) {
    let thirdEvo =
      evolutionChains[pokeIndex].chain.evolves_to[0].evolves_to[0].species.name;
    evoChainNames.push(thirdEvo);
  }
  let evoChainImgUrls = await getEvoChainImgArr(evoChainNames);
  renderEvoChain(pokeIndex, evoChainImgUrls, evoChainNames);
}

function renderEvoChain(pokeIndex, imgUrls, names) {
  let detailCardContentRef = document.getElementById("detailCardContent");
  detailCardContentRef.innerHTML = "";
  detailCardContentRef.innerHTML = getEvoChainContentTemplate(pokeIndex);
  let chainRef = document.getElementById(`chainContent${pokeIndex}`);
  for (let i = 0; i < imgUrls.length; i++) {
    chainRef.innerHTML += getEvoImgTemplate(imgUrls[i], names[i]);
  }
}

async function getEvoChainImgArr(namesArr) {
  let detailCardContentRef = document.getElementById("detailCardContent");
  let url = "https://pokeapi.co/api/v2/pokemon/";
  let evoChainImgUrls = [];
  for (let nameIndex = 0; nameIndex < namesArr.length; nameIndex++) {
    try {
      let response = await fetch(url + `${namesArr[nameIndex]}`);
      let responseAsJson = await response.json();
      evoChainImgUrls.push(responseAsJson.sprites.other.home.front_default);
    } catch (error) {
      detailCardContentRef.innerHTML = "";
      detailCardContentRef.innerHTML = "<p>Fehler beim Laden der Daten</p>";
    }
  }
  return evoChainImgUrls;
}

BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0";
let amountOfRendertPokemons = 8;
let amountOfLoad = 8;
let toggleSearchContent = true;
let loadedPokemons = [];
let pokemonData = [];
let searchedPokemonData = [];

async function init() {
  await initialLoadPokemons();
  await getInitialPokemonData();
  initialRenderingOfPokemons();
}

async function initialLoadPokemons() {
  let pokemonContentRef = document.getElementById("pokemenContent");
  try {
    let response = await fetch(BASE_URL);
    let responseAsJson = await response.json();
    loadedPokemons = responseAsJson.results;
  } catch (error) {
    pokemonContentRef.innerHTML = getLoadDataErrorMessage(error);
  }
}

async function getInitialPokemonData() {
  let pokemonContentRef = document.getElementById("pokemenContent");
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
  let pokemonContentRef = document.getElementById("pokemenContent");
  for (let pokeIndex = 0; pokeIndex < pokemonData.length; pokeIndex++) {
    pokemonContentRef.innerHTML += getPokemonCardTemplate(
      pokeIndex,
      pokemonData
    );
  }
}

async function loadMorePokemons() {
  await getMorePokemonData();
  renderMorePokemons();
  amountOfRendertPokemons += amountOfLoad;
}

async function getMorePokemonData() {
  let currentIndex = amountOfRendertPokemons;
  let pokemonContentRef = document.getElementById("pokemenContent");
  for (let i = currentIndex; i < amountOfRendertPokemons + amountOfLoad; i++) {
    try {
      let response = await fetch(loadedPokemons[i].url);
      let responseAsJson = await response.json();
      pokemonData.push(responseAsJson);
    } catch (error) {
      pokemonContentRef.innerHTML = getLoadDataErrorMessage(error);
    }
  }
}

function renderMorePokemons() {
  let startIndex = amountOfRendertPokemons;
  let pokemonContentRef = document.getElementById("pokemenContent");
  for (
    let pokeIndex = startIndex;
    pokeIndex < pokemonData.length;
    pokeIndex++
  ) {
    pokemonContentRef.innerHTML += getPokemonCardTemplate(
      pokeIndex,
      pokemonData
    );
  }
}

function showInputWarning() {
  document.getElementById("warning").innerHTML =
    "Mindestens 3 Buchstaben eingeben...";
}

async function searchPokemons() {
  searchInputRef = document.getElementById("search");
  searchInput = searchInputRef.value;
  if (searchInput.length < 3) {
    showInputWarning();
    return;
  }
  document.getElementById("warning").innerHTML = "";
  searchResultArr = getSearchedPokemons(searchInput);
  await getSearchedPokemonData(searchResultArr);
  renderSearchedPokemons();
  toggleSearchContent = false;
}

function getSearchedPokemons(searchInput) {
  filteredPokemons = loadedPokemons.filter(pokemon =>
    pokemon.name.toLowerCase().startsWith(searchInput.toLowerCase())
  );
  filteredPokemons = filteredPokemons.filter(
    pokemon => !pokemon.name.includes("-")
  );
  return filteredPokemons;
}

async function getSearchedPokemonData(searchedPokemonArr) {
  searchedPokemonData = [];
  for (let i = 0; i < searchedPokemonArr.length; i++) {
    try {
      let response = await fetch(searchedPokemonArr[i].url);
      let responseAsJson = await response.json();
      searchedPokemonData.push(responseAsJson);
    } catch (error) {
      document.getElementById("warning").innerHTML =
        "Fehler beim Laden der Daten...";
    }
  }
}

function renderSearchedPokemons() {
  let searchedContentRef = document.getElementById("searchedPokemonContent");
  if (toggleSearchContent) {
    toggleContent();
  }
  console.log(searchedPokemonData);
  searchedContentRef.innerHTML = "";
  for (let pokeIndex = 0; pokeIndex < searchedPokemonData.length; pokeIndex++) {
    searchedContentRef.innerHTML += getPokemonCardTemplate(
      pokeIndex,
      searchedPokemonData
    );
  }
}

function clearSearchWarningMessage() {
  document.getElementById("warning").innerHTML = "";
  let searchInputRef = document.getElementById("search");
  searchInputRef.value = "";
}

function toggleContent() {
  document.getElementById("pokemenContent").innerHTML = "";
  document.getElementById("loadMoreButton").innerHTML = "";
  document.getElementById("backButton").classList.toggle("dNone");
  document.getElementById("searchedPokemonContent").classList.toggle("dNone");
}

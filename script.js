BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0";
let amountOfRendertPokemons = 20;
let amountOfLoad = 20;

let loadedPokemons = [];
let pokemonData = [];

async function init() {
  await initialLoadPokemons();
  await getInitialPokemonData();
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
      pokemonData
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

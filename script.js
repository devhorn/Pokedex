BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0";
let amountOfRendertPokemons = 24;
let loadedPokemons = [];
let pokemonData = [];

async function init() {
  await loadPokemons();
  await getPokemondata();
  renderPokemons();
}

async function loadPokemons() {
  let pokemonContentRef = document.getElementById("pokemenContent");
  try {
    let response = await fetch(BASE_URL);
    let responseAsJson = await response.json();
    loadedPokemons = responseAsJson.results;
    console.log(loadedPokemons);
  } catch (error) {
    pokemonContentRef.innerHTML = getLoadDataErrorMessage(error);
  }
}

async function getPokemondata() {
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
  console.log(pokemonData);
}

function renderPokemons() {
  let pokemonContentRef = document.getElementById("pokemenContent");
  for (let pokeIndex = 0; pokeIndex < pokemonData.length; pokeIndex++) {
    pokemonContentRef.innerHTML += getPokemonCardTemplate(pokeIndex);
  }
}

/* function loadMorePokemons() {

} */

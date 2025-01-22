BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0";
let loadedPokemons = [];
let pokemonData = [];

async function init() {
  await loadPokemons();
  await getPokemondata();
}

async function loadPokemons() {
  pokemonContentRef = document.getElementById("pokemenContent");
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
  for (let i = 0; i < loadedPokemons.length; i++) {
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

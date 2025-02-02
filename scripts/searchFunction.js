let searchedPokemonData = [];
let evoChainSearchedPokemon = [];
let toggleSearchContent = true;

function showInputWarning() {
  document.getElementById("warning").innerHTML =
    "Mindestens 3 Buchstaben eingeben...";
}

function clearInputWarning() {
  document.getElementById("warning").innerHTML = "";
}

async function searchPokemons() {
  clearInputWarning();
  evoChainSearchedPokemon = [];
  searchInputRef = document.getElementById("search");
  searchInput = searchInputRef.value;
  if (searchInput.length < 3) {
    showInputWarning();
    return;
  }
  searchResultArr = getSearchedPokemons(searchInput);
  await getSearchDataAndEvoChain(searchResultArr);
  renderSearchedPokemons();
  document.getElementById("search").focus();
  toggleSearchContent = false;
}

async function getSearchDataAndEvoChain(searchResultArr) {
  openLoadingOverlay();
  await getSearchedPokemonData(searchResultArr);
  await getSearchedEvolutionChains();
  closeLoadingOverlay();
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
  searchedContentRef.innerHTML = "";
  if (searchedPokemonData.length == 0) {
    searchedContentRef.innerHTML = getNoSearchResultTemplate();
  } else {
    for (
      let pokeIndex = 0;
      pokeIndex < searchedPokemonData.length;
      pokeIndex++
    ) {
      searchedContentRef.innerHTML += getPokemonCardTemplate(
        pokeIndex,
        searchedPokemonData,
        "s"
      );
    }
    renderSearchedTypes();
  }
}

function renderSearchedTypes() {
  for (let pokeIndex = 0; pokeIndex < searchedPokemonData.length; pokeIndex++) {
    let typeContentRef = document.getElementById(`typeContent${pokeIndex}`);
    for (let i = 0; i < searchedPokemonData[pokeIndex].types.length; i++) {
      let typeName = searchedPokemonData[pokeIndex].types[i].type.name;
      typeContentRef.innerHTML += getTypeTemplate(typeName);
    }
  }
}

function toggleContent() {
  document.getElementById("pokemonContent").innerHTML = "";
  document.getElementById("loadMoreButton").classList.toggle("dNone");
  document.getElementById("backButton").classList.toggle("dNone");
  document.getElementById("searchedPokemonContent").classList.toggle("dNone");
}

function backToOverview() {
  document.getElementById("searchedPokemonContent").innerHTML = "";
  document.getElementById("backButton").classList.toggle("dNone");
  document.getElementById("searchedPokemonContent").classList.toggle("dNone");
  document.getElementById("loadMoreButton").classList.toggle("dNone");
  toggleSearchContent = true;
  let searchInputRef = document.getElementById("search");
  searchInputRef.value = "";
  clearInputWarning();
  initialRenderingOfPokemons();
  renderTypes();
}

async function getSearchedEvolutionChains() {
  let url = "https://pokeapi.co/api/v2/pokemon-species/";
  for (let pokeIndex = 0; pokeIndex < searchedPokemonData.length; pokeIndex++) {
    try {
      let id = searchedPokemonData[pokeIndex].id;
      await fillSearchEvoChainArr(url, id);
    } catch (error) {
      pokemonContentRef.innerHTML = getLoadDataErrorMessage(error);
    }
  }
}

async function fillSearchEvoChainArr(url, id) {
  let response = await fetch(url + `${id}`);
  let responseAsJson = await response.json();
  let responseEvolutionChain = await fetch(responseAsJson.evolution_chain.url);
  let evolutionChainAsJson = await responseEvolutionChain.json();
  evoChainSearchedPokemon.push(evolutionChainAsJson);
}

async function buildEvoChainForSearchedPokemonDataArr(pokeIndex) {
  let evoChainNames = getEvoChainNamesForSearchedPokemon(pokeIndex);
  openLoadingOverlay();
  let evoChainImgUrls = await getEvoChainImgArr(evoChainNames);
  closeLoadingOverlay();
  renderEvoChain(pokeIndex, evoChainImgUrls, evoChainNames);
}

function getEvoChainNamesForSearchedPokemon(pokeIndex) {
  let evoChainNames = [];
  let firstEvo = evoChainSearchedPokemon[pokeIndex].chain.species.name;
  evoChainNames.push(firstEvo);
  let evoKey = evoChainSearchedPokemon[pokeIndex].chain.evolves_to;
  if (evoKey.length > 0) {
    let secondEvo = evoKey[0].species.name;
    evoChainNames.push(secondEvo);
  }
  if (evoKey[0] != undefined && evoKey[0].evolves_to.length > 0) {
    let thirdEvo = evoKey[0].evolves_to[0].species.name;
    evoChainNames.push(thirdEvo);
  }
  return evoChainNames;
}

function clearSearchWarningMessage(id) {
  document.getElementById(id).innerHTML = "";
}

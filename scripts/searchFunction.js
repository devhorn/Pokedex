let searchedPokemonData = [];
let toggleSearchContent = true;

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
  openLoadingOverlay();
  await getSearchedPokemonData(searchResultArr);
  closeLoadingOverlay();
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
  searchedContentRef.innerHTML = "";
  for (let pokeIndex = 0; pokeIndex < searchedPokemonData.length; pokeIndex++) {
    searchedContentRef.innerHTML += getPokemonCardTemplate(
      pokeIndex,
      searchedPokemonData,
      "s"
    );
  }
  renderSearchedTypes();
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

function clearSearchWarningMessage() {
  document.getElementById("warning").innerHTML = "";
  let searchInputRef = document.getElementById("search");
  searchInputRef.value = "";
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
  initialRenderingOfPokemons();
  renderTypes();
}

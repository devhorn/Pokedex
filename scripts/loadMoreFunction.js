async function loadMorePokemons() {
  openLoadingOverlay();
  await getMorePokemonData();
  closeLoadingOverlay();
  renderMorePokemons();
  renderMoreTypes();
  amountOfRendertPokemons += amountOfLoad;
}

async function getMorePokemonData() {
  let currentIndex = amountOfRendertPokemons;
  let pokemonContentRef = document.getElementById("pokemonContent");
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
  let pokemonContentRef = document.getElementById("pokemonContent");
  for (
    let pokeIndex = startIndex;
    pokeIndex < pokemonData.length;
    pokeIndex++
  ) {
    pokemonContentRef.innerHTML += getPokemonCardTemplate(
      pokeIndex,
      pokemonData,
      "p"
    );
  }
}

function renderMoreTypes() {
  let startIndex = amountOfRendertPokemons;
  for (
    let pokeIndex = startIndex;
    pokeIndex < pokemonData.length;
    pokeIndex++
  ) {
    let typeContentRef = document.getElementById(`typeContent${pokeIndex}`);
    for (let i = 0; i < pokemonData[pokeIndex].types.length; i++) {
      let typeName = pokemonData[pokeIndex].types[i].type.name;
      typeContentRef.innerHTML += getTypeTemplate(typeName);
    }
  }
}

function getLoadDataErrorMessage(error) {
  return `  <div class="alert alert-danger" role="alert">
                <p>Fehler beim Laden der Daten. ${error}</p>
            </div>`;
}

function getPokemonCardTemplate(pokeIndex) {
  return `<div class="card pokemonCard ${
    pokemonData[pokeIndex].types[0].type.name
  }">
            <div class="d-flex justify-content-between p-3 cardHead">
                <h5 class="card-title">${fristLetterUpperCase(
                  pokemonData[pokeIndex].name
                )}</h5>
                <h5 class="card-title">#${pokemonData[pokeIndex].id}</h5>
            </div>
            <img src="${
              pokemonData[pokeIndex].sprites.other.home.front_default
            }" class="card-img-top"/>
            <div class="card-body">
              
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>`;
}

function fristLetterUpperCase(word) {
  let firstLetter = word[0];
  let firstLetterCap = firstLetter.toUpperCase();
  let remainingLetters = word.slice(1);
  return (capitalizedWord = firstLetterCap + remainingLetters);
}

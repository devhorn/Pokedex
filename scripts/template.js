function getLoadDataErrorMessage(error) {
  return `  <div class="alert alert-danger" role="alert">
                <p>Fehler beim Laden der Daten. ${error}</p>
            </div>`;
}

function getPokemonCardTemplate(pokeIndex, dataArray) {
  return `<div class="card pokemonCard ${
    dataArray[pokeIndex].types[0].type.name
  }">
            <div class="d-flex justify-content-between p-3 cardHead">
                <h5 class="card-title">${fristLetterUpperCase(
                  dataArray[pokeIndex].name
                )}</h5>
                <h5 class="card-title">#${dataArray[pokeIndex].id}</h5>
            </div>
            <img src="${
              dataArray[pokeIndex].sprites.other.home.front_default
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

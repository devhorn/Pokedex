function getLoadDataErrorMessage(error) {
  return `  <div class="alert alert-danger" role="alert">
                <p>Fehler beim Laden der Daten. ${error}</p>
            </div>`;
}

function getPokemonCardTemplate(pokeIndex) {
  return `<div class="card pokemonCard">
            <img src="${pokemonData[pokeIndex].sprites.other.home.front_default}" class="card-img-top"/>
            <div class="card-body">
              <h5 class="card-title">${pokemonData[pokeIndex].name}</h5>
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>`;
}

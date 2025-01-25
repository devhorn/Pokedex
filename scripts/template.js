function getLoadDataErrorMessage(error) {
  return `  <div class="alert alert-danger" role="alert">
                <p>Fehler beim Laden der Daten. ${error}</p>
            </div>`;
}

function getPokemonCardTemplate(pokeIndex, dataArray, array) {
  return `  <div onclick="openDialog(${pokeIndex}, '${array}')" class="card pokemonCard ${
    dataArray[pokeIndex].types[0].type.name
  }">
              <div class="d-flex justify-content-between p-3 cardHead">
                <h5 class="card-title">${fristLetterUpperCase(
                  dataArray[pokeIndex].name
                )}</h5>
                <h5 class="card-title">#${dataArray[pokeIndex].id}</h5>
              </div>
              <div class="pokemonImg d-flex justify-content-center">
                <img src="${
                  dataArray[pokeIndex].sprites.other.home.front_default
                }" />
              </div>
              <div id="typeContent${pokeIndex}" class="card-body d-flex gap-3 justify-content-center cardBody"></div>
          </div>`;
}

function getTypeTemplate(typeName) {
  return `<div class="type">${typeName}</div>`;
}

function getDetailCardTemplate(pokeIndex, dataArray, arrayToToggle) {
  return `<div class="arrowButtons">
            <img onclick="pokemonBackward(${pokeIndex}, '${arrayToToggle}', event)" class="arrow" src="./assets/icons/arrow_back_w.png">
            <div onclick="stayOpen(event)" class="pokemonDetailCard ${
              dataArray[pokeIndex].types[0].type.name
            }">
            <div class="detailCardHalfOne">
            <div class="detailCardHead">
              <h5>${fristLetterUpperCase(dataArray[pokeIndex].name)}</h5>
            </div>
            <div class="detailCardImg">
              <img src="${
                dataArray[pokeIndex].sprites.other.home.front_default
              }"/>
            </div>
            </div>
            <div class="detailCardHalfTwo">
              <div class="detailCardButtons">
                <div onclick="renderMainInfoOfCard(${pokeIndex}, '${arrayToToggle}')" class="button main">main</div>
                <div onclick="renderStats(${pokeIndex}, '${arrayToToggle}')" class="button stats">stats</div>
                <div onclick="renderEvoChain()" class="button evoChain">evoChain</div>
              </div>
            <div id="detailCardContent" class="detailCardContent"></div>            
          </div>
        </div>
              <img onclick="pokemonForward(${pokeIndex}, '${arrayToToggle}', event)" class="arrow" src="./assets/icons/arrow_forw_w.png">
        </div>`;
}

function getMainInfoTemplate(pokeIndex, dataArray) {
  return `  <div class="mainInfoCard">
                <div class="mainInfo">
                  <p>Height:</p>
                  <p>Weight:</p>
                  <p>Base experience:</p>
                  <p>Abilities:</p>
                </div>
                <div class="mainInfoValues">
                  <p>${getHeight(pokeIndex, dataArray)}</p>
                  <p>${getWeight(pokeIndex, dataArray)}</p>
                  <p>${dataArray[pokeIndex].base_experience}</p>
                  <p>${getAbilities(pokeIndex, dataArray)}</p>
                </div>
            </div>`;
}

function getStatBarTemplate(statName, statValue) {
  return `<div class="stat">
            <label>${fristLetterUpperCase(statName)}: ${statValue}</label>
            <div class="statBarContainer">
              <div class="statBar" style="width:${statValue * 2}px;"></div>
            </div>
          </div>`;
}

function fristLetterUpperCase(word) {
  let firstLetter = word[0];
  let firstLetterCap = firstLetter.toUpperCase();
  let remainingLetters = word.slice(1);
  return (capitalizedWord = firstLetterCap + remainingLetters);
}

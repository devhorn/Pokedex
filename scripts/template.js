function getLoadDataErrorMessage(error) {
  return `  <div class="alert alert-danger" role="alert">
                <p>Fehler beim Laden der Daten. ${error}</p>
            </div>`;
}

function getPokemonCardTemplate(pokeIndex, dataArray, arrayToTrigger) {
  return `  <div onclick="openDialog(${pokeIndex}, '${arrayToTrigger}')" class="card pokemonCard ${
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
              <div id="typeContent${pokeIndex}" class="card-body d-flex justify-content-center cardBody"></div>
          </div>`;
}

function getTypeTemplate(typeName) {
  return `<div class="type">${typeName}</div>`;
}

function getDetailCardTemplate(pokeIndex, dataArray, arrayToTrigger) {
  return `<div class="arrowButtons">
            <img onclick="pokemonBackward(${pokeIndex}, '${arrayToTrigger}', event)" class="arrow" src="./assets/icons/arrow_back_w.png">
            <div onclick="stayOpen(event)" class="pokemonDetailCard ${
              dataArray[pokeIndex].types[0].type.name
            }">
            <div class="detailCardHalfOne">
            <div class="closingButton">
              <img onclick="closeDialog(event)" src="./assets/icons/close.png">
            </div>
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
                <div onclick="renderMainInfoOfCard(${pokeIndex}, '${arrayToTrigger}')" class="button main">main</div>
                <div onclick="renderStats(${pokeIndex}, '${arrayToTrigger}')" class="button stats">stats</div>
                <div onclick="buildEvoChain(${pokeIndex}, '${arrayToTrigger}')" class="button evoChain">evoChain</div>
              </div>
            <div id="detailCardContent" class="detailCardContent"></div>            
          </div>
        </div>
              <img onclick="pokemonForward(${pokeIndex}, '${arrayToTrigger}', event)" class="arrow" src="./assets/icons/arrow_forw_w.png">
            <div class="arrowButtonsResp">
              <img onclick="pokemonBackward(${pokeIndex}, '${arrayToTrigger}', event)" class="arrowResp" src="./assets/icons/arrow_back_w.png">
              <img onclick="pokemonForward(${pokeIndex}, '${arrayToTrigger}', event)" class="arrowResp" src="./assets/icons/arrow_forw_w.png">
            </div>
        </div>
        
        `;
}

function getMainInfoTemplate(pokeIndex, dataArray) {
  return `  <div class="mainInfoCard">
                <div class="mainInfo">
                  <div class="mainInfoRow">
                    <p>Height:</p>
                    <p>${getHeight(pokeIndex, dataArray)}</p>
                  </div>
                  <div class="mainInfoRow">
                    <p>Weight:</p>
                    <p>${getWeight(pokeIndex, dataArray)}</p>
                  </div>
                  <div class="mainInfoRow">
                    <p>Base-Exp:</p>
                    <p>${dataArray[pokeIndex].base_experience}</p>
                  </div>
                  <div class="mainInfoRow">
                    <p>Abilities:</p>
                    <p>${getAbilities(pokeIndex, dataArray)}</p>
                  </div>
                </div>
            </div>`;
}

function getStatBarTemplate(statName, statValue) {
  return `<div class="stat">
            <label class="statLabel">${fristLetterUpperCase(
              statName
            )}: ${statValue}</label>
            <label class="statLabelResp">${fristLetterUpperCase(
              statName
            )}: ${statValue}</label>
            <div class="statBarContainer">
              <div class="statBar" style="width:${statValue * 2}px;"></div>
            </div>
          </div>`;
}

function getEvoChainContentTemplate(pokeIndex) {
  return `<div id="chainContent${pokeIndex}" class="evoChainContainer"></div>`;
}

function getEvoImgTemplate(url, name) {
  return `<div class="evoImgWithText">
            <img class="evoChainImg" src="${url}"/>
            <p>${fristLetterUpperCase(name)}</p>
          </div>`;
}

function getNoSearchResultTemplate() {
  return `<h3 class="searchErrorMessage">Es wurden keine passenden Pokemons zu deiner Eingabe gefunden</h3>`;
}

function fristLetterUpperCase(word) {
  let firstLetter = word[0];
  let firstLetterCap = firstLetter.toUpperCase();
  let remainingLetters = word.slice(1);
  return (capitalizedWord = firstLetterCap + remainingLetters);
}

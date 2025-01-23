function openDialog(pokeIndex) {
  let dialogContainerRef = document.getElementById("dialogContainer");
  dialogContainerRef.classList.toggle("dNone");
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
  renderDetailCard(pokeIndex);
}

function renderDetailCard(pokeIndex) {
  let dialogContainerRef = document.getElementById("dialogContainer");
  dialogContainerRef.innerHTML = getDetailCardTemplate(pokeIndex, pokemonData);
}

function closeDialog(event) {
  let closeDialogRef = document.getElementById("dialogContainer");
  closeDialogRef.classList.toggle("dNone");
  document.getElementsByTagName("body")[0].style.overflow = "auto";
  event.stopPropagation();
}

function stayOpen(event) {
  event.stopPropagation(event);
}

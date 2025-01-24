/* let filteredNames = [];

function searchNames() {
  searchInputRef = document.getElementById("nameInput");
  searchInput = searchInputRef.value;
  if (searchInput.length < 3) {
    document.getElementById("warning").innerHTML =
      "Mindestens 3 Buchstaben eingeben...";
    return;
  }
  filteredNames = names.filter(name =>
    name.toLowerCase().startsWith(searchInput.toLowerCase())
  );

  console.log("Gefilterte Namen:", filteredNames);
}

// Buchstabe für Buchstabe prüfen

let test = "bana-bana";

console.log(test.includes("ana")); */

let test = "Hase,,";

console.log(test);

test = test.slice(0, -2);

console.log(test);

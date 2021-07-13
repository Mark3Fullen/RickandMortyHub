document.addEventListener('DOMContentLoaded', () => {
    parseCharacters();
})

function parseCharacters() {
    fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function 
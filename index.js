document.addEventListener('DOMContentLoaded', () => {
    parseCharacters();
})

function parseCharacters() {
    fetch('https://rickandmortyapi.com/api/character/1')
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function renderCharacter(character) {
    let divFrame = document.createElement('div');
    let divImage = document.createElement('div');
    let image = docuemtn.createElement('img');
    
    divFrame.className = 'character-frame'
}

function searchCharacter(form) {
    
}
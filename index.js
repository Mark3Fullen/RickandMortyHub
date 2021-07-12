document.addEventListener('DOMContentLoaded', () => {
    console.log("Bruh Moment")
    fetchAPI()
})

function fetchAPI() {
    fetch('https://rickandmortyapi.com/api/character/1')
    .then(res => res.json())
    .then(json => renderCharacters(json))
}

function renderCharacters(data) {
    console.log(data)
}
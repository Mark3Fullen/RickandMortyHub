document.addEventListener('DOMContentLoaded', () => {
    console.log("Bruh Moment")
    fetchAPI()
})

function fetchAPI() {
    fetch('https://rickandmortyapi.com/api/character/')
    .then(res => res.json())
    .then(json => renderCharacters(json.results))
}

function renderCharacters(data){
    data.forEach(renderCharacter)
}

function renderCharacter(data) {
    let container = document.querySelector('.container')
    // let card = document.querySelector('.card')
    // let frame = document.querySelector('.frame')
    // let img = document.querySelector('#char-pic')
    let card = document.createElement('div')
    let frame = document.createElement('div')
    let img = document.createElement('img')
    let characterName = document.createElement('h2')
    // let characterUl = document.querySelector('#character-list')
    // let characterLi = document.createElement('li')

    card.className = 'card'
    frame.className = 'frame'
    img.id = 'char-pic'
    characterName.id = 'character-name'

    img.src = data.image
    characterName.textContent = data.name

    // characterUl.append(characterLi)
    frame.append(characterName, img)
    card.append(frame)
    container.append(card)
}

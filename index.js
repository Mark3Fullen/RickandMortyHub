document.addEventListener('DOMContentLoaded', () => {
    console.log("Bruh Moment")
    fetchAPI(); returnToPage()
})

function fetchAPI() {
    fetch('https://rickandmortyapi.com/api/character/')
    .then(res => res.json())
    .then(json => renderCharacters(json.results))
}

function renderCharacters(data){
    data.forEach(renderCharacter);
}

function renderCharacter(data) {
    let container = document.querySelector('.card-container')
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

    card.addEventListener('click', () => showCharacterDetail(data.id))

}

function returnToPage(){
    let title = document.querySelector('.logo')
    title.addEventListener('click', () => {
        window.location.reload()
    })
}

function showCharacterDetail(id){
    console.log(id)
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json())
    .then(json => {
        document.querySelector('.card-container').innerHTML = '';
        characterDetail(json)
    })
}

function characterDetail(char){
    let infoContainer = document.querySelector('.info-container')
    let infoAside = document.createElement('aside')
    let infoMain = document.createElement('main')
    let name = document.createElement('h3')
    let statusDiv = document.createElement('div')
    let status = document.createElement('h3')
    let statusButton = document.createElement('button')
    let img = document.createElement('img')
    let locationName = document.createElement('p')
    let info = document.createElement('div')
    let gender = document.createElement('p')
    let species = document.createElement('p')
    let episodes = document.createElement('ul')
    let commentForm = document.createElement('form')

    statusDiv.className = 'spoiler'
    name.textContent = char.name
    img.src = char.image
    status.textContent = `Status: ${char.status}`
    statusButton.textContent = 'Show Spoiler'
    statusButton.id = 'spoilerButton'
    revealSpoiler(statusButton)
    locationName.textContent = `Location: ${char.location.name}`
    gender.textContent = `Gender: ${char.gender}`
    species.textContent = `Species: ${char.species}`
    episodes.textContent = 'Episodes seen in:'
    episodes.className = 'episode-list'
    console.log(char.episode)
    renderEpisodes(char.episode)

    statusDiv.append(status)
    statusButton.append(statusDiv)
    infoAside.append(name, img, statusButton)
    info.append(gender, species)
    if (char.type !== "") {
        let type = document.createElement('p')
        type.textContent = `Type: ${char.type}`
        info.append(gender, species, type)
    }
    infoMain.append(locationName, info, episodes)
    infoContainer.append(infoAside, infoMain, commentForm)

}

function revealSpoiler(statusButton){
    statusButton.addEventListener('click', () => {
        let spoilerButton = document.querySelector('.spoiler')
        if (spoilerButton.style.display === 'none') {
            spoilerButton.style.display = 'block';
        } else {
            spoilerButton.style.display = 'none';
        }
    })
}

function renderEpisodes(episode){
    // if statement to run for loop only if multiple episodes
    for (let i=0; i<5; i++){
        fetch(episode[i])
        .then(res => res.json())
        .then(json => {
            let episodeList = document.querySelector('.episode-list')
            let episodeName = document.createElement('li')
            episodeName.textContent = json.name
            episodeList.append(episodeName)
        })
}}

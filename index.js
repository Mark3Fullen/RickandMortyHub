//This event listener calls all the functions that make the website only when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    returnToPage();
    searchForCharacter();
    fetchRandoChar();
    fetchRandoLocation();
})

//Runs a forEach loop on the data sent from fetchRandoChar function
function renderCharacters(data){
    data.forEach(renderCharacter);
}

//Fethces 12 random characters to display on the 'Home' page and calls the renderCharacter function after it gets a response
function fetchRandoChar() {
    for (i=0; i<12; i++) {
        id = Math.floor(Math.random() * 672)
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(renderCharacter)
    }
}

//Renders the 12 random characters to the screen and puts them in cards.
function renderCharacter(data) {
    let container = document.querySelector('.card-container')
    let card = document.createElement('div')
    let frame = document.createElement('div')
    let img = document.createElement('img')
    let characterName = document.createElement('h2')

    card.className = 'card'
    frame.className = 'frame'
    img.id = 'char-pic'
    characterName.id = 'character-name'

    img.src = data.image
    characterName.textContent = data.name

    frame.append(characterName, img)
    card.append(frame)
    container.append(card)

    //Adds an event listener to each character card and waits for a click event
    card.addEventListener('click', () => showCharacterDetail(data.id))

}

//Refreshes the page once the Logo is clicked
function returnToPage(){
    let title = document.querySelector('.logo')
    title.addEventListener('click', () => {
        window.location.reload()
    })
}

//This function is called once a charatcer card is selected and will fetch that individual character from the API. It will also clear the DOM
function showCharacterDetail(id){
    if(document.querySelector('#locationDetailPage h1')) {
        document.querySelector('#locationDetailPage h1').innerHTML = '';
    }
    console.log(id)
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json())
    .then(json => {
        document.querySelector('#mainpage aside').innerHTML = '';
        document.querySelector('.card-container').innerHTML = '';
        characterDetail(json)
    })
}

//This function is called once the clicked charatcer is successfully fetched and displays all the information for that character
function characterDetail(char) {
    console.log(char)
    let infoContainer = document.querySelector('.info-container')
    let infoAside = document.createElement('aside')
    let infoMain = document.createElement('main')
    let name = document.createElement('h3')
    let statusDiv = document.createElement('div')
    let status = document.createElement('h3')
    let statusButton = document.createElement('button')
    let img = document.createElement('img')
    let info = document.createElement('div')
    let originName = document.createElement('p')
    let originSpan = document.createElement('span')
    let locationName = document.createElement('p')
    let locationSpan = document.createElement('span')
    let gender = document.createElement('p')
    let genderSpan = document.createElement('span')
    let species = document.createElement('p')
    let speciesSpan = document.createElement('span')
    let episodes = document.createElement('ul')
    let episodesSpan = document.createElement('span')

    statusDiv.className = 'spoiler'
    name.textContent = char.name
    img.src = char.image
    status.textContent = `Status: ${char.status}`
    statusButton.textContent = 'Show Spoiler'
    statusButton.id = 'spoilerButton'
    revealSpoiler(statusButton)
    originSpan.textContent = `Origin: ${char.origin.name}`
    locationSpan.textContent = `Last known location: ${char.location.name}`
    genderSpan.textContent = `Gender: ${char.gender}`
    speciesSpan.textContent = `Species: ${char.species}`
    episodesSpan.textContent = 'Episodes seen in:'
    episodes.className = 'episode-list'
    infoAside.className = 'info-list'
    infoMain.className = 'info-main'
    console.log(char.episode)
    renderEpisodes(char.episode)


    statusDiv.append(status)
    statusButton.append(statusDiv)
    infoAside.append(name, img, statusButton)
    gender.append(genderSpan)
    species.append(speciesSpan)
    originName.append(originSpan)
    locationName.append(locationSpan)
    episodes.append(episodesSpan)
    info.append(gender, species)
    if (char.type !== "") {
        let type = document.createElement('p')
        let typeSpan = document.createElement('span')
        typeSpan.textContent = `Type: ${char.type}`
        type.append(typeSpan)
        info.append(gender, species, type)
    }
    infoMain.append(originName, locationName, info, episodes)
    infoContainer.append(infoAside, infoMain)

}

//This function fetches 10 random loactions seen on Rick and Morty and will then display those locations to a side bar on the main page. It adds an event listener to each Li
function fetchRandoLocation() {
    for (i=0; i<10; i++) {
        id = Math.floor(Math.random() * 108)
        fetch(`https://rickandmortyapi.com/api/location/${id}`)
        .then(res => res.json())
        .then(data => {
            const mainLocLi = document.createElement('li')
            mainLocLi.textContent = data.name
            mainLocLi.className = 'mainLoc'
            document.querySelector('#mainLocationList').append(mainLocLi)
            mainLocLi.addEventListener('click', () => {
                document.querySelector('#mainpage aside').innerHTML = '';
                document.querySelector('#mainpage main').innerHTML = '';
                renderLocDetails(data);
            })
        })
    }
}

//Once a location is clicked, the DOM will be cleared and a list of Characters that showed up on that location will be diplayed.
function renderLocDetails(data) {
    const residents = data.residents;
    let locDiv = document.createElement('div')
    let location = document.createElement('h1')
    let locationSpan = document.createElement('span')
    let mainDiv = document.createElement('div')
    mainDiv.className = 'card-container'
    console.log(data.name)
    locationSpan.textContent = `Characters Seen on ${data.name}`
    location.style.textAlign = 'center'
    location.append(locationSpan)
    locDiv.append(location)
    document.querySelector('#locationDetailPage').append(locDiv, mainDiv)

    if(residents.length === 0) {
        locationSpan.textContent = `No characters on ${data.name}. Please select a different location.`
    }

    residents.forEach(resident => {
        fetch(resident)
        .then(resp => resp.json())
        .then(data => {
            renderCharacter(data)
        })
    })

    locDiv.className = 'location-div'
}

//A search function that will display all the characters that contain the string inputted. IT IS NOT AN EXACT MATCH SEARCH.
function searchForCharacter () {
    document.querySelector('#char-form').addEventListener('submit', e => {
        e.preventDefault();
        let character = e.target.nameOfChar.value
        if(document.querySelector('#locationDetailPage h1')) {
            document.querySelector('#locationDetailPage h1').innerHTML = '';
        }
        document.querySelector('div.info-container').innerHTML = ''
        document.querySelector('.card-container').innerHTML = ''
        fetch(`https://rickandmortyapi.com/api/character/?name=${character}`)
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
            document.querySelector('#char-form').reset();
            json.results.forEach(char => renderCharacter(char))
        })
    })
}

//Adds an event listener to the status info. If clicked, will reveal if the character is dead, alive, or unknown
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

//Renders the first 5 episodes the character appeared in. If they did not appear in five episodes, it will display ALL of the episodes they appeared in
function renderEpisodes(episode){
    if (episode.length > 5){
        for (let i=0; i<5; i++){
            fetch(episode[i])
            .then(res => res.json())
            .then(json => {
                let episodeName = document.createElement('li')
                let episodeSpan = document.createElement('span')
                episodeSpan.textContent = json.name
                episodeName.append(episodeSpan)
                document.querySelector('.episode-list').append(episodeName)
            })
        }
    } else {
        episode.forEach(currentEp => {
            fetch(currentEp)
            .then(res => res.json())
            .then(json => {
                let episodeList = document.querySelector('.episode-list')
                let episodeName = document.createElement('li')
                let episodeSpan = document.createElement('span')
                episodeSpan.textContent = json.name
                episodeName.append(episodeSpan)
                episodeList.append(episodeName)
            })
        })
    }
}

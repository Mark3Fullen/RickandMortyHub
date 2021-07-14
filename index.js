document.addEventListener('DOMContentLoaded', () => {
    console.log("Bruh Moment")
    // fetchAPI(); 
    returnToPage();
    searchForCharacter();
    // searchForCharacter();
    // renderAsideBar();
    fetchRandoChar();
    fetchRandoLocation();
})

// function fetchAPI() {
//     fetch('https://rickandmortyapi.com/api/character/')
//     .then(res => res.json())
//     .then(json => renderCharacters(json.results))
// }

    function renderCharacters(data){
        data.forEach(renderCharacter);
    }

function fetchRandoChar() {
    for (i=0; i<20; i++) {
        id = Math.floor(Math.random() * 672)
        fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then(res => res.json())
        .then(renderCharacter)
    }
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
        document.querySelector('#mainpage').innerHTML = '';
        document.querySelector('#locationDetailPage').innerHTML = '';
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
    let info = document.createElement('div')
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
    locationSpan.textContent = `Location: ${char.location.name}`
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
    infoMain.append(locationName, info, episodes)
    infoContainer.append(infoAside, infoMain)
}

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
                document.querySelector('#mainpage').innerHTML = '';
                renderLocDetails(data);
                // figure out how to filter when clicked
            })
        })
    }
}

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
            console.log(data)
            renderCharacter(data)
        })
    })

    locDiv.className = 'location-div'
}

// function renderAsideBar() {
//     fetch('https://rickandmortyapi.com/api/location/')
//     .then(resp => resp.json())
//     .then(data => {
//         for(let i=0; i<10;  i++){
//             const mainLocLi = document.createElement('li')
//             mainLocLi.textContent = data.results[i].name
//             console.log(data.results[i].name)
//             mainLocLi.className = 'mainLoc'
//             document.querySelector('#mainLocationList').append(mainLocLi)
//             mainLocLi.addEventListener('click', (e) => {
//                 console.log(e.target)
//             })
//         }
//     })
// }

function searchForCharacter () {
    document.querySelector('#char-form').addEventListener('submit', e => {
        document.querySelector('div.card-container').innerHTML = ''
        document.querySelector('div.info-container').innerHTML = ''
        e.preventDefault();
        let character = e.target.nameOfChar.value;
        debugger
        console.log(character)
        debugger
        fetch(`https://rickandmortyapi.com/api/character/?name=${character}`)
        .then(resp => resp.json())
        .then(json => {
            renderCharacters(json.results)
        })
        document.querySelector('#char-form').reset();
    })
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

// function searchForCharacter () {
//     document.querySelector('#char-form').addEventListener('submit', e => {
//         document.querySelector('div.card-container').innerHTML = ''
//         e.preventDefault();
//         let character = e.target.nameOfChar.value;
//         console.log(character)
//         fetch(`https://rickandmortyapi.com/api/character/?name=${character}`)
//         .then(resp => resp.json())
//         .then(json => {
//             renderCharacters(json.results)
//         })
//     })
// }
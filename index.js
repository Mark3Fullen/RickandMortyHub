document.addEventListener('DOMContentLoaded', () => {
    console.log("Bruh Moment")
    fetchAPI();
    returnToPage();
})

    function fetchAPI() {
        fetch('https://rickandmortyapi.com/api/character/')
        .then(res => res.json())
        .then(json => renderCharacters(json.results))
    }

    function renderCharacters(data){
        data.forEach(renderCharacter);
        renderAsideBar(data);
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
        let status = document.createElement('h3')
        let img = document.createElement('img')
        let locationName = document.createElement('p')
        let info = document.createElement('div')
        let gender = document.createElement('p')
        let species = document.createElement('p')
        let episodes = document.createElement('div')
        let episodeNames =  document.createElement('p')
        let commentForm = document.createElement('form')

        name.textContent = char.name
        img.src = char.image
        status.textContent = char.status
        locationName.textContent = `Location: ${char.location.name}`
        gender.textContent = `Gender: ${char.gender}`
        species.textContent = `Species: ${char.species}`
        episodes.textContent = 'Episodes seen in:'
        console.log(char.episode)
        episodeNames.textContent = char.episode
        // need to render episodes onto page
        
        infoAside.append(name, img, status)
        info.append(gender, species)
        if (char.type !== "") {
            let type = document.createElement('p')
            type.textContent = `Type: ${char.type}`
            info.append(gender, species, type)
        }
        infoMain.append(locationName, info, episodes)
        infoContainer.append(infoAside, infoMain, commentForm)

    }

function renderAsideBar(data) {
    for (i=0; i<19; i++) {
        const mainCharLi = document.createElement('li')
        mainCharLi.textContent = data[i].name
        mainCharLi.class = 'mainChar'
        document.querySelector('#mainCharList').append(mainCharLi)
        mainCharLi.addEventListener('click', (e) => {
            console.log(e.target)
        })
    }
}

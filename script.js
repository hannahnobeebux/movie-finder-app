const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '591950c54bmsh971da8756a9c91bp155940jsn7aa65193a364',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

function createPosters(title,description,service,posterURL){
    //console.log(title)
    let poster = document.createElement('div')
    poster.classList.add('newPoster')

    let titleTag = document.createElement('h2')
    titleTag.innerHTML = title
    titleTag.classList.add('poster-title')

    let imageTag = document.createElement('img') //creating an image element to add the poster image to
    imageTag.src = posterURL
    imageTag.classList.add('poster-image') 

    

    let countryTag = document.createElement('p')
    countryTag.innerHTML = currentCountry
    countryTag.classList.add('poster-country')

    let serviceTag = document.createElement('p')
    serviceTag.innerHTML = currentService
    serviceTag.classList.add('poster-service')


    poster.append(titleTag,imageTag,countryTag,serviceTag)
    document.getElementById('poster-section').append(poster)
}

async function getMovie(movieName){
    //console.log(currentCountry)
    //console.log(currentService)
    //console.log(movieName)
    const response = await fetch(`https://streaming-availability.p.rapidapi.com/search/basic?country=${countriesAbv[currentCountry]}&service=${currentService}&type=movie&keyword=${movieName}&page=1&output_language=en&language=en`, options)
    const data = await response.json()

    
    let section = document.querySelector(".cards")
    section.innerHTML = "" // clearing card section for new search or error

    if (data.results.length === 0) {
        const errorMessage = document.createElement('h2')
        const sadImage = document.createElement("img")
        const sadImageCat = document.createElement("img")
        errorMessage.innerHTML = "Sorry guys, that movie doesn't exist :("; 
        errorMessage.classList.add('error-message')
        sadImage.setAttribute("src", "https://media.tenor.com/6CujUsC1CIkAAAAd/crying-black-guy-meme50fps-interpolated-interpolated.gif")
        sadImage.classList.add("sad-image")

        sadImageCat.setAttribute("src", "https://media.tenor.com/qRqm8fsbFjoAAAAd/cry-cat.gif")
        sadImageCat.classList.add("sad-image-cat")

        
        section.append(errorMessage, sadImage, sadImageCat)
          
    }

    //console.log(data)
    let keys = Object.keys(data.results) //loop through the returned data.results object's keys, returned data is weirdly formatted
    document.getElementById('popular-releases').style.display = 'none';
    document.getElementById('posterTitle').style.display = 'none';
    for (let key of keys){
		let title = data.results[key].title  //each movie is stored as on object with its key as an integer e.g data.results[0] = {title: 'finding nemo', country: [us,uk] ....}
		let description = data.results[key].overview
        let posterURL = data.results[key].posterURLs['original']
        createPosters(title,description,currentService,posterURL)
	}
}

document.getElementById('search-button').addEventListener('click', () => {
    //getting search filters from the form to pass to the fetch request
    let movieName = document.getElementById('movie-name').value
    getMovie(movieName)
})

// funciton to add countries to dropdown menu
currentCountry = 'United Kingdom' //set default as uk
function addCountries(countriesAbv){
    const dropdown = document.getElementById('country-dropdown')
    let keys = Object.keys(countriesAbv)
    for (let key of keys){ //loop through country object keys: object keys = country name, key value = country abbreviation
        let listItem = document.createElement('li') //adding a list item which will contain a button which can be clicked to select service
        let countryButton = document.createElement('button') 
        countryButton.innerHTML = key //set button text to country name

        countryButton.classList.add('country-button')
        countryButton.type = 'button' //stops button from reloading page when clicked

        countryButton.addEventListener('click', () => { //adding event listener to the button so country can be changed
            currentCountry = key
            document.getElementById('dropdown-country-button').innerHTML = `Country: ${key}` //change dropdown menu text to show what is selected
        })

        listItem.append(countryButton)
        dropdown.append(listItem) //add element to dropdown menu
    }

}


currentService = 'disney' //sets the default service if none is selected with the button
function addServices(services){ //adds all the available services to the dropdown
    const dropdown = document.getElementById('service-dropdown')
    for (let service of services){
        let listItem = document.createElement('li') //adding a list item which will contain a button which can be clicked to select country
        let serviceButton = document.createElement('button')
        serviceButton.innerHTML = service.charAt(0).toUpperCase() + service.slice(1)

        serviceButton.classList.add('country-button')
        serviceButton.type = 'button' //stops button from reloading page when clicked

        serviceButton.addEventListener('click', () => { //adding event listener to the button so service can be changed
            currentService = service
            document.getElementById('dropdown-service-button').innerHTML = `Service: ${service}` //change dropdown menu text to show what is selected
        })

        listItem.append(serviceButton)
        dropdown.append(listItem)
    }
}

services = ['netflix', 'prime', 
    'disney', 'hbo', 
    'hulu', 'peacock', 
    'paramount', 'starz', 
    'showtime', 'apple', 
    'mubi']

countriesAbv = {
    "Argentina":"ar", "Australia":"au", "Austria":"at",
    "Azerbaijan":"az", "Belgium":"be", "Brazil":"br",
    "Bulgaria":"bg", "Canada":"ca", "Chile":"cl",
    'Colombia':'co', 'Croatia':'hr', 'Cyprus':'cy',
    'Czech Republic':'cz', 'Denmark':'dk', 'Ecuador':'ec',
    'Estonia':'ee', 'Finland':'fi', 'France':'fr',
    'Germany':'de', 'Greece':'gr', 'Hong Kong':'hk',
    'Hungary':'hu', 'Iceland':'is', 'India':'in',
    'Indonesia':'id','Ireland':'ie','Israel':'il',
    'Italy':'it', 'Japan':'jp', 'Lithuania':'lt',
    'Malaysia':'my', 'Mexico':'mx', 'Moldova':'md',
    'Netherlands':'nl', 'New Zealand':'nz', 'North Macedonia':'mk',
    'Norway':'no', 'Panama':'pa',
    'Peru':'pe', 'Philippines':'ph', 'Poland':'pl',
    'Portugal':'pt', 'Romania':'ro', 'Russia':'ru',
    'Serbia':'se', 'Singapore':'sg', 'South Africa':'sa',
    'South Korea':'sk', 'Spain':'sp', 'Sweden':'se',
    'Switzerland':'sz', 'Thailand':'th', 'Turkey':'tr',
    'Ukraine':'ua' , 'United Emirates':'ae', 'United Kingdom':'gb',
    'United States':'us', 'Vietnam':'vn',
    }
addCountries(countriesAbv)
addServices(services)

// Displaying movie info searching for user


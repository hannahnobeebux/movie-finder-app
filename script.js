const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3349e34336mshbb3e5a86990215fp1e2e62jsn598d9dbc447e',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

function createPosters(title,description,service,posterURL){
    let poster = document.createElement('div')

    let titleTag = document.createElement('h2')
    titleTag.innerHTML = title

    let imageTag = document.createElement('img') //creating an image element to add the poster image to
    imageTag.src = posterURL

    poster.append(titleTag,imageTag)
}

async function getMovie(movieName, country, service){
    //const response = await fetch(`https://streaming-availability.p.rapidapi.com/search/basic?country=${countriesAbv[country]}&service=${service}&type=movie&keyword=${movieName}&page=1&output_language=en&language=en`, options)
    const response = await fetch(`https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=${service}&type=movie&keyword=${movieName}&page=1&output_language=en&language=en`, options)
    const data = await response.json()
    let keys = Object.keys(data.results) //loop through the returned data.results object's keys, returned data is weirdly formatted
    for (let key of keys){
		let title = data.results[key].title  //each movie is stored as on object with its key as an integer e.g data.results[0] = {title: 'finding nemo', country: [us,uk] ....}
		let description = data.results[key].overview
        let posterURL = data.results[key].posterURLs['original']
        createCards(title,description,service,posterURL)

	}
}

document.getElementById('search-button').addEventListener('click', () => {
    //getting search filters from the form to pass to the fetch request
    let movieName = document.getElementById('movie-name').value
    let service = document.getElementById('service-dropdown').value
    getMovie(movieName,currentCountry,service)
})

// funciton to add countries to dropdown menu
currentCountry = 'United Kingdom' //set default as uk
function addCountries(countriesAbv){
    const dropdown = document.getElementById('country-dropdown')
    let keys = Object.keys(countriesAbv)
    for (let key of keys){ //loop through country object keys: object keys = country name, key value = country abbreviation
        let listItem = document.createElement('li')
        let countryButton = document.createElement('button') //create dropdown menu item element
        countryButton.innerHTML = key //set elements text to country name

        countryButton.classList.add('country-button')
        countryButton.type = 'button'

        countryButton.addEventListener('click', () => {
            document.getElementById('dropdown-country-button').innerHTML = `Country: ${key}`
        })

        listItem.append(countryButton)
        dropdown.append(listItem) //add element to dropdown menu
    }

}

function addServices(services){
    const dropdown = document.getElementById('service-dropdown')
    for (let service of services){
        let newService = document.createElement('option')
        newService.value = service
        newService.innerHTML = service.charAt(0).toUpperCase() + service.slice(1)
        if (service === 'netflix'){
            newService.selected = true
        }
        dropdown.append(newService)
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


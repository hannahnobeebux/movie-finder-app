const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'afdcdda00amsh2752c90f576065fp19e940jsn2cf71a54bb53',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

async function getMovie(movieName, country){
    const response = await fetch(`https://streaming-availability.p.rapidapi.com/search/basic?country=${countriesAbv.country}}&service=netflix&type=movie&keyword=${movieName}&page=1&output_language=en&language=en`, options)
    const data = await response.json()
    console.log(data)
    let keys = Object.keys(data.results)
    for (let key of keys){
		console.log(data.results[key].title)
		console.log(data.results[key].overview)
	}
}

document.getElementById('search-button').addEventListener('click', () => {
    let movieName = document.getElementById('movie-name').value
    let country = document.getElementById("country-dropdown").value
    console.log(country)
    getMovie(movieName,country)
})

function addCountries(countriesAbv){
    const dropdown = document.getElementById('country-dropdown')
    let keys = Object.keys(countriesAbv)
    for (let key of keys){
        let newCountry = document.createElement('option')
        newCountry.value = key
        newCountry.innerHTML = key
        dropdown.append(newCountry)
        
    }
}

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
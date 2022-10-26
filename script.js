const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'afdcdda00amsh2752c90f576065fp19e940jsn2cf71a54bb53',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

async function getMovie(movieName){
    const response = await fetch(`https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&keyword=${movieName}&page=1&output_language=en&language=en`, options)
    const data = await response.json()
    console.log(data)
}

document.getElementById('search-button').addEventListener('click', () => {
    let movieName = document.getElementById('movie-name').value
    getMovie(movieName)
})
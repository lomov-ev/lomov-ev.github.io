const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

async function getJokes() {
	let joke = "";
	const apiUrl = "https://v2.jokeapi.dev/joke/Programming";
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.joke) joke = data.joke;
		else if (data.setup) joke = data.setup + "..." + data.delivery;
		tellMe(joke);
		button.disabled = true;
 	} catch (error) {
 		console.log("whoops", error);
 	}
}

function tellMe(joke) {
	console.log(joke);
	VoiceRSS.speech({
	            key: 'a18a1335fdb4423c9393b641d655637a',
	            src: joke,
	            hl: 'en-us',
	            v: 'Linda',
	            r: 0, 
	            c: 'mp3',
	            f: '44khz_16bit_stereo',
	            ssml: false
	        });	
}


button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", () => { button.disabled = false; })
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementsByClassName("loader")[0];

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}

function newQuote(response) {
	quote = response[Math.floor(Math.random() * Object.keys(response).length)];
	quote.text.length > 50 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
	quoteText.textContent = quote.text;
	authorText.textContent = quote.author ?? "Anonymous";
}

async function getQuoteFromAPI() {
	const apiUrl = "https://type.fit/api/quotes";
	try {
		showLoadingSpinner()
		const response = await fetch(apiUrl);
		newQuote(await response.json());
		setTimeout(removeLoadingSpinner, 150);
	} catch (error) {
		// Catch Error Here
	}
}

function tweetQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener("click", getQuoteFromAPI);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuoteFromAPI();

// // Local Quotes
// const q = (() => { return Math.floor(Math.random() * localQuotes.length) })();
// document.getElementById("quote").textContent = localQuotes[q].text;
// document.getElementById("author").textContent = localQuotes[q].author;
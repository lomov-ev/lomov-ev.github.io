const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const audio = document.getElementById("audio");
const duration = document.getElementById("duration");
const currentTime = document.getElementById("current-time");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const image = document.getElementById("image");

const songs = [
	{
		name: "jacinto-1",
		displayName: "Electric Chill Machine",
		artist: "JD"
	},
		{
		name: "jacinto-2",
		displayName: "Seven Nation Army (Remix)",
		artist: "JD"
	},
		{
		name: "jacinto-3",
		displayName: "saadasdas",
		artist: "JD"
	},
		{
		name: "metric-1",
		displayName: "asdasdsadas",
		artist: "JD"
	}
]

let songIndex = 0;

function nextSong() {
	songIndex++;
	if (songIndex === songs.length-1) songIndex = 0;
	loadSong(songs[songIndex]);
	playSong();
}

function prevSong() {
	song--;
	if (songIndex === 0) songIndex = songs.length-1;
	loadSong(songs[songIndex]);
	playSong();
}

function dur() {
	duration.textContent = audio.duration;
};

function cur() {
	currentTime.textContent = audio.currentTime;
}

function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	audio.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;
}

function playSong() {
	if (audio.paused) {
		audio.play();
		playButton.setAttribute("title","Pause");
		playButton.classList.replace("fa-play", "fa-pause");
	} else {
		audio.pause();
		playButton.setAttribute("title","Play");
		playButton.classList.replace("fa-pause", "fa-play");
	}
}

playButton.addEventListener('click', playSong);

nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);

audio.addEventListener('canplay', dur);
audio.addEventListener('playing', cur);

//on load
loadSong(songs[songIndex]);
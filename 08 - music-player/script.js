const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const music = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const image = document.getElementById("image");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

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

let isPlaying = false;

function nextSong() {
	songIndex++;
	if (songIndex === songs.length) songIndex = 0;
	loadSong(songs[songIndex]);
	playSong();
}

function prevSong() {
	songIndex--;
	if (songIndex <= 0) songIndex = songs.length-1;
	loadSong(songs[songIndex]);
	playSong();
}

// function dur() {
// 	duration.textContent = Math.floor(music.duration) / 60;
// };

function updateProgressBar(e) {
	if (isPlaying) {
		const { duration, currentTime } = e.srcElement;
		//Update progress bar width
		const progressPercent = (currentTime / duration) * 100;
		progress.style.width = `${progressPercent}%`;
		//Calculate display for duration
		const durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);
		if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
		if (durationSeconds) {
			durationEl.textContent = `${durationMinutes}:${durationSeconds}`;			
		}
		//Calculate display for current time
		const currentTimeMinutes = Math.floor(currentTime / 60);
		let currentTimeSeconds = Math.floor(currentTime % 60);
		if (currentTimeSeconds < 10) currentTimeSeconds = `0${currentTimeSeconds}`;
		if (currentTimeSeconds) {
			currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;			
		}
	}
}

function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;
}

// Play
function playSong() {
  isPlaying = true;
  playButton.classList.replace('fa-play', 'fa-pause');
  playButton.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playButton.classList.replace('fa-pause', 'fa-play');
  playButton.setAttribute('title', 'Play');
  music.pause();
}

function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const { duration } = music;
	music.currentTime = (clickX / width) * duration;
	playSong();
}

// Event Listeners
playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);

music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);

progressContainer.addEventListener('click', setProgressBar);

//on load
loadSong(songs[songIndex]);
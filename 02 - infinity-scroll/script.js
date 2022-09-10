const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;
const initialCount = 5;

let cameraModels = {};

//Helper functon to set attributes on DOM elements
function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

function updateAPIURLWithNewCount (picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}&orientation=portrait`;
}

function imageLoaded() {
	imagesLoaded++;
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
	}
}

//Unsplash API
const apiKey = "NUPU5LuBg7m_MgdMymLs17pUIgorRWCAdWSKz5gsy0c";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

//Get photo
async function getPhotosFromAPI() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
		if (isInitialLoad) {
				updateAPIURLWithNewCount(30);
				isInitialLoad = false;
		}
	} catch(err) {

	}
}

function camerasByAmmount() {
	return Object.entries(cameraModels).sort((a, b) => b[1] - a[1]);
}

function cameraByModel() {
	return Object.entries(cameraModels).sort();
}

function displayPhotos() {
	//send statistics
	imagesLoaded = 0;
	totalImages = photosArray.length;
	photosArray.forEach(photo => {
			const camera = photo.exif.name;
			//add camera to database
			camera in cameraModels ? cameraModels[camera]++ : cameraModels[camera] = 1;
			//Create <a>
			const item = document.createElement("a");
			setAttributes(item, {
				href: photo.links.html,
				target: "_blank"
			});
			//Create <img>
			const img = document.createElement("img");
			setAttributes(img, {
				src: photo.urls.regular,
				alt: photo.alt_description,
				title: camera
			});
			img.addEventListener("load", imageLoaded)
			//Put elements into place
			item.appendChild(img);
			imageContainer.appendChild(item);
	})
};


//Event Listeners
window.addEventListener("scroll", () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
		ready = false;
		getPhotosFromAPI();
	}
})

//On load
getPhotosFromAPI();
displayPhotos();
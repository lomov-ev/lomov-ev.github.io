const videoElement = document.getElementById('video');
const button = document.getElementById('button');
 
// async function selectMediaStream() {
// 	try {
// 		const mediaStream = await navigator.mediaDevices.getDisplayMedia();
// 		videoElement.srcObject = mediaStream;
// 		videoElement.onloadedmetadata = () => {
// 			videoElement.play();
// 		}
// 	} catch (err) {
// 		//Catch errors
// 	}
// }

// button.addEventListener("click", async () => {
// 	//Disable the buton
// 	button.disabled = true;
// 	//Start picture in picture
// 	await videoElement.requestPictureInPicture();
// 	//Reset button
// 	button.disabled = false;
// });

// selectMediaStream();

button.addEventListener('click', async () => {
  videoElement.muted = true;
  videoElement.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
  videoElement.play();
  video.addEventListener('loadedmetadata', () => {
    videoElement.requestPictureInPicture()
    .catch(console.error)
  });
});
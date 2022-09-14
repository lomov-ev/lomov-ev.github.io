const overlay = document.getElementById("overlay");
const slider = document.getElementById("slider");
const file = document.getElementById("file");
const change = document.getElementById("change");

overlay.style.opacity = slider.value / 100; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = () => {
    overlay.style.opacity = slider.value / 100;
}

change.onclick = () => {
  overlay.src = file.value;
}
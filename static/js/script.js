const uploadBtn = document.getElementById('upload-btn');
const pictureContainer = document.getElementById('picture-container');
const uploadLabel = document.getElementById('upload-label');
const submitContainer = document.getElementById('submit-container');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');

uploadBtn.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadstart = function() {
    // Show loading effect
    pictureContainer.style.backgroundImage = "none";
    pictureContainer.innerHTML = "Uploading...";
  };

  reader.onload = function(e) {
    pictureContainer.innerHTML = '';
    pictureContainer.style.backgroundImage = `url(${e.target.result})`;
    uploadLabel.style.display = 'none';
    pictureContainer.style.opacity = '1';
    submitContainer.style.display = 'block';
  };

  reader.readAsDataURL(file);
});

resetBtn.addEventListener('click', resetPage);

function resetPage() {
  uploadBtn.value = ''; // Reset the file input value
  pictureContainer.innerHTML = ''; // Clear the image container
  pictureContainer.style.opacity = '0';
  uploadLabel.style.display = 'flex';
  submitContainer.style.display = 'none';
}
window.onbeforeunload = function() {
  // Clear the file input value and image container on browser reload
  uploadBtn.value = '';
  pictureContainer.innerHTML = '';
};
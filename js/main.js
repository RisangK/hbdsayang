// 'js/mian.js'
const audio = document.getElementById('myAudio');
const toggleButton = document.getElementById('toggleButton');

toggleButton.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        toggleButton.textContent = 'Pause';
    } else {
        audio.pause();
        toggleButton.textContent = 'Play';
    }
});

var slider_img = document.querySelector('.slider-img');
var images = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg'];
var i = 0;

function prev(){
	if(i <= 0) i = images.length;	
	i--;
	return setImg();			 
}

function next(){
	if(i >= images.length-1) i = -1;
	i++;
	return setImg();			 
}

function setImg(){
	return slider_img.setAttribute('src', "images/"+images[i]);
	
}

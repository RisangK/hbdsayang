// 'js/mian.js'
window.addEventListener("load", () => {
  Swal.fire({
    title: "Mau sambil dengerin musik engga sayang ?",
    // text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Mau",
    cancelButtonText: "Gamau",
  }).then((result) => {
    if (result.isConfirmed) {
      document.querySelector(".song").play();
      animationTimeline();
    } else {
      animationTimeline();
    }
  });
});

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
const sliderTrack = document.querySelector('.slider-track');
const sliderItems = document.querySelectorAll('.slider-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
let startPos = 0;
let isDragging = false;

function updateSlider() {
    sliderTrack.style.transform = `translateX(${-currentIndex * sliderItems[0].clientWidth}px)`;

    // Mengelola pemutaran video
    sliderItems.forEach((item, index) => {
        if (item.tagName === 'VIDEO') {
            if (index === currentIndex) {
                item.play();
            } else {
                item.pause();
                item.currentTime = 0; // Atur ulang video ke awal saat di luar tampilan
            }
        }
    });
}

// Navigasi dengan tombol
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : sliderItems.length - 1;
    updateSlider();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < sliderItems.length - 1) ? currentIndex + 1 : 0;
    updateSlider();
});

// Fitur Swipe (geser)
sliderTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startPos = e.pageX;
    sliderTrack.style.transition = 'none';
});

sliderTrack.addEventListener('mouseup', (e) => {
    isDragging = false;
    const endPos = e.pageX;
    const diff = endPos - startPos;
    sliderTrack.style.transition = 'transform 0.5s ease-in-out';
    
    if (diff > 50) { // Geser ke kanan (prev)
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : sliderItems.length - 1;
    } else if (diff < -50) { // Geser ke kiri (next)
        currentIndex = (currentIndex < sliderItems.length - 1) ? currentIndex + 1 : 0;
    }
    updateSlider();
});

sliderTrack.addEventListener('touchstart', (e) => {
    isDragging = true;
    startPos = e.touches[0].clientX;
    sliderTrack.style.transition = 'none';
});

sliderTrack.addEventListener('touchend', (e) => {
    isDragging = false;
    const endPos = e.changedTouches[0].clientX;
    const diff = endPos - startPos;
    sliderTrack.style.transition = 'transform 0.5s ease-in-out';
    
    if (diff > 50) {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : sliderItems.length - 1;
    } else if (diff < -50) {
        currentIndex = (currentIndex < sliderItems.length - 1) ? currentIndex + 1 : 0;
    }
    updateSlider();
});

// Responsif saat ukuran jendela berubah
window.addEventListener('resize', updateSlider);
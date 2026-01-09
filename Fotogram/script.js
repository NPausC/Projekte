
//#region Images

let images = [
    'Property 1=alaska-810433_1280.jpg', 
    'Property 1=anime-8788959_1280.jpg',
    'Property 1=blue-tit-8521052_1280.jpg',
    'Property 1=hurricane-92968_1280.jpg',
    'Property 1=lake-2896379_1280.jpg',
    'Property 1=moorente-8783210_1280.jpg',
    'Property 1=sea-2563389_1280.jpg',
    'Property 1=snow-bunting-6781122_1280.jpg',
    'Property 1=snow-leopard-cubs-8039138_1280.jpg',
    'Property 1=travel-8785493_1280.jpg',
    'Property 1=winter-1675197_1280.jpg'
];

//#endregion

let currentIndex = 0;

function render() {
    let container = document.getElementById('image-gallery');
    container.innerHTML = '';

for (let i = 0; i < images.length; i++) {
        container.innerHTML += `
            <img src="img/${images[i]}" 
                class="thumbnail" 
                onclick="openImage(${i})"
                alt="Foto ${i + 1}">`;
    }
}

//#region open Dialog

function openImage(i) {
    currentIndex = i;
    let overlay = document.getElementById('overlay');
    let fullImg = document.getElementById('full-image');
    let title = document.getElementById('image-title');
    let counter = document.getElementById('image-counter');

    // hebt Display: none vor dem Schließen wieder auf
    overlay.style.display = 'flex'; 
    
    // die d-none Klasse entferne ich damit ebenfalls
    overlay.classList.remove('d-none');

    // ich lade Bilder und Texte
    fullImg.src = `img/${images[i]}`;
    title.innerText = images[i].replace('Property 1=', '').split('.')[0];
    counter.innerText = `${i + 1} / ${images.length}`;

    // verhindert ein scrollen auf der Hauptseite
    document.body.style.overflow = 'hidden';
}

//#endregion 

//#region schliesst den Dialog

function closeImage() {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'none'; 
    overlay.classList.add('d-none');
    document.body.style.overflow = 'auto';
}
//#endregion

//#region Navigation

function nextImage() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    openImage(currentIndex);
}

function prevImage() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    openImage(currentIndex);
}

//#endregion

window.addEventListener('keydown', (e) => {
    if (document.getElementById('overlay').classList.contains('d-none')) return;
    if (e.key === 'Escape') closeImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// region WCAG

function trapFocus(e) {
    const overlay = document.getElementById('overlay');
    if (overlay.classList.contains('d-none')) return;

    const focusableElements = overlay.querySelectorAll('button, [tabindex="0"]');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
    if (e.shiftKey) {
    if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
    }
    } 
    else {
    if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
    }
    }
}
}

//#endregion

//# region Even listener

window.addEventListener('keydown', trapFocus);

//#endregion
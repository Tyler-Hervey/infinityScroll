const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let photosArray = [];

//  Unsplash API
const count = 10;
const apiKey = 'QqTzCpg7CBElN7jLrYyFUsfyxb5QCUCXk8wtoOnIliA';
const apiUrl=`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;

    if(imagesLoaded%count === 0 ) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, add to DOM
function displayPhotos() {
    totalImages = photosArray.length;
    photosArray.forEach((photo)=>{
        //  Creacte <a> to lin kti Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        //  Create <img> for photo
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // Event listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // put <img> inside <a>, the put both insdie imageContainer div
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// Get photos fron Unsplash API
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(e) {
        console.log(e);
    }
}

// Check to see if scrolling near bottom of page, if so load more photos

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }

})

// fire on load
getPhotos();
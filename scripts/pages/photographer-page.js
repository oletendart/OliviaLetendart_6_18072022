// DOM
const rotateButton = document.querySelector('.fa-angle-down');
const hiddenActive = document.querySelectorAll(".hidden");
const button = document.querySelector('#name_select');
let lightbox = document.querySelector('#lightbox_modal');
const popularity = document.querySelector('#popularity');
const date = document.querySelector('#date');
const title = document.querySelector('#title');
const mediaSection = document.querySelector("#grid_card");

let currentElement;
let mediaModel;
let close, nextElement;
let totalLikes = 0;
let totalPrice = 0;

let params = (new URL(document.location)).searchParams;
const photographerId = params.get('id');

button.addEventListener('click', () => {

    for (const active of hiddenActive) {
        active.classList.toggle('active');
    }
    button.classList.toggle('activeButton');
    rotateButton.classList.toggle('rotate-active');
});


async function getMedia() {
    fetch('./data/photographers.json')
        .then(response => response.json())
        .then(data => {

            const photographer = data.photographers.find((photographer) => {

                return photographer.id == photographerId;
            });

            const medias = data.media.filter((media) => {
                    if (media.photographerId === photographer.id) {
                        return media;
                    }
                }
            );

            displayData(photographer, medias);

        })
        .catch(error => console.log("Erreur : " + error));
}


async function displayData(photographer, medias) {
    const mainHeader = document.querySelector('#main');
    const photographerModel = photographerFactory(photographer);
    const userHeaderDOM = photographerModel.getHeader();
    mainHeader.appendChild(userHeaderDOM);
    const mainLikes = document.querySelector('#footer');


    // function à appeller (updateGrid)
    updateGrid(medias);

    const likeDOM = mediaModel.displayLikes(totalLikes, totalPrice);
    mainLikes.appendChild(likeDOM);

    return medias;

}

function updateGrid(data) {
    data.forEach((media) => {
        mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
        mediaCardDOM.addEventListener('click', (event) => {
            currentElement = media.id;

            lightbox.classList.toggle('activeLightbox');
            let click = event.target.parentNode;

            let div = mediaModel.createLightbox();
            lightbox.appendChild(div);
            div = mediaModel.updateLightbox(div, click.dataset.title, click.dataset.url, click.dataset.type);
            lightbox.appendChild(div);

            nextElement = document.querySelector("#next");
            nextElement.addEventListener('click', () => {
                let index = data.findIndex(element => element.id === currentElement);
                let nextItem = data[mediaModel.calculateIndex(index, data.length, true)];
                currentElement = nextItem.id;
                let url, type;

                if (nextItem.image) {
                    url = nextItem.image;
                    type = "img";
                } else if (nextItem.video) {
                    url = nextItem.video;
                    type = "video";
                }

                div = mediaModel.updateLightbox(div, nextItem.title, url, type);
                lightbox.appendChild(div);

            });

            let previous = document.querySelector('#previous');
            previous.addEventListener('click', () => {
                let index = data.findIndex(element => element.id === currentElement);
                let previousItem = data[mediaModel.calculateIndex(index, data.length, false)];
                currentElement = previousItem.id;
                let url, type;

                if (previousItem.image) {
                    url = previousItem.image;
                    type = "img";
                } else if (previousItem.video) {
                    url = previousItem.video;
                    type = "video";
                }

                div = mediaModel.updateLightbox(div, previousItem.title, url, type);
                lightbox.appendChild(div);
            })

            close = document.querySelector('#close');
            close.addEventListener('click', () => {
                lightbox.innerHTML = "";
                lightbox.classList.toggle('activeLightbox');
            });

        });

        totalLikes += mediaModel.getLikes();
        totalPrice += mediaModel.getPrice();
    });
}

popularity.addEventListener('click', () => {
    console.log('trier par : popularité (likes)');
    console.log(medias.sort((a, b) => a.likes - b.likes));
    // appeler la function updateGrid, en lui donnant la ligne précedente
});

date.addEventListener('click', () => {
    console.log("trier par : date (date)");
    console.log(medias.sort((a,b) => ('' + a.date).localeCompare(b.date)));
    // appeler la function updateGrid, en lui donnant la ligne précedente
});

title.addEventListener('click' , () => {
    console.log("trier par : titre (title)");
    console.log(medias.sort((a,b) => ('' + a.title).localeCompare(b.title)));
    // mettre à jour displayData
});


async function init() {
    await getMedia();
}

init();

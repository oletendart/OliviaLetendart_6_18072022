// DOM
const rotateButton = document.querySelector('.fa-angle-down');
const hiddenActive = document.querySelectorAll(".hidden");
const button = document.querySelector('#name_select');

let params = (new URL(document.location)).searchParams;
const photographerId = params.get('id');

button.addEventListener('click', () => {

    for (const active of hiddenActive) {
        active.classList.toggle('active');
    }
    button.classList.toggle('activeButton');
    rotateButton.classList.toggle('rotate-active');
})

async function getMedia() {
    fetch('./data/photographers.json')
        .then(response => response.json())
        .then(data => {

            const photographer = data.photographers.find((photographer) => {

                return photographer.id == photographerId;
            });

            const medias = data.media.filter((media) => {
                    if(media.photographerId === photographer.id) {
                       return media;
                    } else {
                        console.log("erreur");
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

    const mediaSection = document.querySelector("#grid_card");
    const mainLikes = document.querySelector('#footer');
    let mediaModel;
    let totalLikes = 0;
    let totalPrice = 0;

    medias.forEach((media) => {
        mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);

        totalLikes += mediaModel.getLikes();
        totalPrice += mediaModel.getPrice();
    });

    const likeDOM = mediaModel.displayLikes(totalLikes, totalPrice);
    mainLikes.appendChild(likeDOM);
}

async function init() {
    await getMedia();
}

init();

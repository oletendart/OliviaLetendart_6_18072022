// DOM
const rotateButton = document.querySelector('.fa-angle-down');
const hiddenActive = document.querySelectorAll(".hidden");
const button = document.querySelector('#name_select');
let lightbox = document.querySelector('#lightbox_modal');

let currentElement;

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

    const mediaSection = document.querySelector("#grid_card");
    const mainLikes = document.querySelector('#footer');
    let mediaModel;
    let totalLikes = 0;
    let totalPrice = 0;
    let close;
    let nextElement;

    console.log(medias);

    medias.forEach((media) => {
        mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);
        mediaCardDOM.addEventListener('click', (event) => {
            currentElement = media.id;

            lightbox.classList.toggle('activeLightbox');
            console.log(event.target.parentNode)
            let click = event.target.parentNode;

            // l'id actuel au click data-id
            //let idCurrent = click.dataset.id;
            element = click.dataset.id;
            console.log(element);
            let index = medias.findIndex(p => p.id == element);
            console.log(index);

            // on cherche l'id dans medias pour récupérer


            console.log(click.dataset.type, click.dataset.url, click.dataset.title);
            lightbox.appendChild(mediaModel.showLightbox(click.dataset.title, click.dataset.url, click.dataset.type));

            //let index = medias.find(element => element.id === nextElement);
            //console.log(index);

            let next = document.querySelector("#next");
            next.addEventListener('click', (event) => {
                console.log('suivant');

                /*let nextIndex = index + 1;
                console.log(nextIndex);*/
                console.log(click);

                let nextIndex = index + 1;
                console.log(nextIndex);


                let nextItem = medias[index + 1];
                console.log(nextItem);

                //lightbox.appendChild(mediaModel.showLightbox(next.title, url, type));
                console.log(next);

                /* let index = medias.findIndex(element => element.id === currentElement);
                 next = medias[index + 1];
                 currentElement = next.id;
                 console.log(next);

                 if (next.image) {
                     url = next.image;
                     type = "img";
                 } else if (next.video) {
                     url = "tata";
                     type = "video";
                 }
                 document.getElementById("lightbox_modal").innerHTML = "";
                 lightbox.appendChild(mediaModel.showLightbox(next.title, url, type));*/
            });

            let previous = document.querySelector('#previous');
            previous.addEventListener('click', () => {
                console.log('précedent');

                let previousIndex = index - 1;
                console.log(previousIndex)
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

    const likeDOM = mediaModel.displayLikes(totalLikes, totalPrice);
    mainLikes.appendChild(likeDOM);

}


async function init() {
    await getMedia();
}

init();

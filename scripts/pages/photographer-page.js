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
    let close, nextElement;

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
            let element = click.dataset.id;
            console.log(element);
            let index = medias.findIndex(p => p.id == element);
            console.log(index);

            // on cherche l'id dans medias pour récupérer


            console.log(click.dataset.type, click.dataset.url, click.dataset.title);
            let div = mediaModel.createLightbox(click.dataset.title, click.dataset.url, click.dataset.type);
            lightbox.appendChild(div);
            div = mediaModel.updateLightbox(div, click.dataset.title, click.dataset.url, click.dataset.type);
            lightbox.appendChild(div);

            //let index = medias.find(element => element.id === nextElement);
            //console.log(index);

            nextElement = document.querySelector("#next");
            nextElement.addEventListener('click', () => {

                let index = medias.findIndex(element => element.id === currentElement);
                let nextItem = medias[index + 1];
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

               /* let index = medias.findIndex(element => element.id === currentElement);
                 let nextItem = medias[index + 1];
                 currentElement = nextItem.id;
                 console.log(nextItem);
                 let url, type;

                 if (nextItem.image) {
                     url = nextItem.image;
                     type = "img";
                 } else if (nextItem.video) {
                     url = nextItem.video;
                     type = "video";
                 }
                 lightbox.innerHTML = "";
                 lightbox.appendChild(mediaModel.showLightbox(nextItem.title, url, type));
*/
            });

           /*let previous = document.querySelector('#previous');
            previous.addEventListener('click', () => {
                console.log('précedent');

                let previousIndex = index - 1;
                console.log(previousIndex)
            })*/

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

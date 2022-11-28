// DOM
const rotateButton = document.querySelector('.fa-angle-down');
const hiddenActive = document.querySelectorAll(".hidden");
const button = document.querySelector('#name_select');
let lightbox = document.querySelector('#lightbox_modal');
const popularity = document.querySelector('#popularity');
const date = document.querySelector('#date');
const title = document.querySelector('#title');
const mediaSection = document.querySelector("#grid_card");
const mainLikes = document.querySelector('#footer');
const mainHeader = document.querySelector('#main');

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
    let fetchData = await fetch('./data/photographers.json')
    let data = await fetchData.json()

    let photoId = data.photographers.find((photographer) => {

        return photographer.id == photographerId;
    });

    let medias = data.media.filter((media) => {
            if (media.photographerId === photoId.id) {
                return media;
            }
        }
    );

    return {medias,photoId};
}


async function displayData(photographer, medias) {
    const photographerModel = photographerFactory(photographer);
    const userHeaderDOM = photographerModel.getHeader();
    mainHeader.appendChild(userHeaderDOM);

    updateGrid(medias);

    const likeDOM = mediaModel.displayLikes(totalLikes, totalPrice);
    mainLikes.appendChild(likeDOM);

}

function updateGrid(data) {
    mediaSection.innerHTML = "";
    data.forEach((media) => {
        mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);

        let mediaCard;
        let titleCard = mediaCardDOM.querySelector('h3');
        let likeIcon = mediaCardDOM.querySelector('i');

        if(media.image) {
            mediaCard = mediaCardDOM.querySelector('img');
        } else if (media.video) {
            mediaCard = mediaCardDOM.querySelector('video');
        }

        mediaCard.addEventListener('click', (event) => {

            currentElement = media.id;

            let click = event.target.parentNode;
            let title,url,type;

            title = click.dataset.title;
            url = click.dataset.url;
            type = click.dataset.type;

            lightbox.classList.toggle('activeLightbox');
            let div = mediaModel.createLightbox();
            lightbox.appendChild(div);
            div = mediaModel.updateLightbox(div, title, url, type);
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

        titleCard.addEventListener('click', (event) => {
            currentElement = media.id;

            let click = event.target.parentNode;
            let title,url,type;

            let parentClick = click.parentNode;
            title = parentClick.dataset.title;
            url = parentClick.dataset.url;
            type = parentClick.dataset.type;

            lightbox.classList.toggle('activeLightbox');
            let div = mediaModel.createLightbox();
            lightbox.appendChild(div);
            div = mediaModel.updateLightbox(div, title, url, type);
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

        likeIcon.addEventListener('click', (event) => {

            let click = event.target.parentNode;

            const i = click.querySelector('i');
            let idI = parseInt(i.dataset.id);
            let span = click.querySelector('span');


            if (data.some(media => media.id === idI)) {

                data = data.map(media => {
                    if (media.id === idI) {
                        media.likes++;
                        span.innerText = media.likes;
                        i.classList.add('activeLove');
                    }
                    return media;
                })
            }

            let likesTotal = 0;

            data.forEach(element => {
                likesTotal += element.likes;
            });

            const likes = document.querySelector('#likesTotal');

            likes.innerText = likesTotal;

        })

        totalLikes += mediaModel.getLikes();
        totalPrice += mediaModel.getPrice();
    });
}


async function init() {
    let {medias,photoId} = await getMedia();

    await displayData(photoId, medias);
    popularity.addEventListener('click', () => {
        updateGrid(medias.sort((a, b) => a.likes - b.likes));
    });

    date.addEventListener('click', () => {
        updateGrid(medias.sort((a,b) => ('' + a.date).localeCompare(b.date)));
        date.classList.remove("hidden");
        popularity.classList.add('hidden');
    });

    title.addEventListener('click' , () => {
        updateGrid(medias.sort((a,b) => ('' + a.title).localeCompare(b.title)));
        title.classList.remove('hidden');
        popularity.classList.add('hidden');
    });

}

init();

// DOM
const rotateButton = document.querySelector('.fa-angle-down');
const button = document.querySelector('#name_select');
const arrow = document.getElementById("arrow");
let lightbox = document.querySelector('#lightbox_modal');
const popularity = document.querySelector('#popularity');
const date = document.querySelector('#date');
const title = document.querySelector('#title');
const mediaSection = document.querySelector("#grid_card");
const mainLikes = document.querySelector('#footer');
const mainHeader = document.querySelector('#main');
const name = document.querySelector('.modal');
const formModal = name.querySelector('form');
const openModal = document.querySelector('#contact_modal');
const sendData = document.querySelector('#send_data');
const closeModalForm = document.querySelector('#closeModal');
const inputFirstname = document.querySelector('#firstname');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const inputText = document.querySelector('#text');

let currentElement;
let mediaModel;
let close, nextElement;
let totalLikes = 0;
let totalPrice = 0;

let params = (new URL(document.location)).searchParams;
const photographerId = params.get('id');

arrow.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    const hiddenAll = document.querySelectorAll('.hidden');
    hiddenAll.forEach( (hidden) => {
        hidden.classList.remove('hidden');
    });
    button.classList.toggle('activeButton');
    rotateButton.classList.toggle('rotate-active');
});

arrow.addEventListener('keypress', (e) => {
    if(e.key === "Enter") {
        e.stopImmediatePropagation();
        const hiddenAll = document.querySelectorAll('.hidden');
        hiddenAll.forEach( (hidden) => {
            hidden.classList.remove('hidden');
        });
        button.classList.toggle('activeButton');
        rotateButton.classList.toggle('rotate-active');
    }
})

closeModalForm.addEventListener('click', () => {
    openModal.style.display = "none";
});

closeModalForm.addEventListener('keypress', (e) => {
    if(e.key === "Enter") {
        openModal.style.display = "none";
        const allTabindex0 = document.querySelectorAll('[tabindex="0"]');
        const allTabindexLess3 = document.querySelectorAll('[tabindex="-3"]');

        allTabindex0.forEach((element) => {
            element.setAttribute("tabindex", '-1');
        });

        allTabindexLess3.forEach((element) => {
            element.setAttribute("tabindex", "0");
        })

        openForm.focus();

    }
})

sendData.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Firstname : ", inputFirstname.value);
    console.log("Name : ", inputName.value);
    console.log('Email : ', inputEmail.value);
    console.log('Text : ', inputText.value);
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

    return {medias, photoId};
}

async function displayData(photographer, medias) {
    const photographerModel = photographerFactory(photographer);
    const userHeaderDOM = photographerModel.getHeader();
    const namePhotographer = photographerModel.namePhotographer();
    mainHeader.appendChild(userHeaderDOM);
    name.insertBefore(namePhotographer, formModal);

    const openForm = mainHeader.querySelector('#openForm');

    openForm.addEventListener('keypress', (e) => {
        if(e.key === "Enter") {
            openModal.style.display = "block";
            const h2Form = name.querySelector('h2');
            console.log(h2Form)
            h2Form.focus();

            const allTabindex0 = document.querySelectorAll('[tabindex="0"]');
            const allTabindexLess1 = document.querySelectorAll('[tabindex="-1"]');
            allTabindex0.forEach((element) => {
                element.setAttribute('tabindex', '-3');
            });
            allTabindexLess1.forEach((element) => {
                element.setAttribute('tabindex', '0');
            });
        }
    })

    openForm.addEventListener('click', () => {
        openModal.style.display = "block";
    });

    updateGrid(medias);

    const likeDOM = mediaModel.displayLikes(totalLikes, totalPrice);
    mainLikes.appendChild(likeDOM);

    return openForm;
}

function updateGrid(data) {
    mediaSection.innerHTML = "";
    data.forEach((media) => {
        function openLightboxMedia(event) {
            currentElement = media.id;

            let click = event.target.parentNode;
            let title, url, type;

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

        }

        function openLightboxTitle(event) {
            currentElement = media.id;

            let click = event.target.parentNode;
            let title, url, type;

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


        }

        function addLikes(event) {
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
        }

        mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaSection.appendChild(mediaCardDOM);

        let mediaCard;
        let titleCard = mediaCardDOM.querySelector('h3');
        let likeIcon = mediaCardDOM.querySelector('i');

        if (media.image) {
            mediaCard = mediaCardDOM.querySelector('img');
        } else if (media.video) {
            mediaCard = mediaCardDOM.querySelector('video');
        }

        mediaCard.addEventListener('click', (e) => {
            openLightboxMedia(e);
        });

        mediaCard.addEventListener('keypress', (e) => {
            if(e.key === "Enter") {
                openLightboxMedia(e);

                const allTabindex0 = document.querySelectorAll('[tabindex="0"]');
                const allTabIndexLess2 = document.querySelectorAll('[tabindex="-2"]');

                allTabindex0.forEach((element) => {
                    element.setAttribute('tabindex', '-3');
                });
                allTabIndexLess2.forEach((element) => {
                    element.setAttribute('tabindex', '0');
                });
            }
        });

        titleCard.addEventListener('click', (e) => {
           openLightboxTitle(e)
        });

        titleCard.addEventListener('keypress', (e) => {
            if(e.key === "Enter") {
                openLightboxTitle(e)
            }
        })

        likeIcon.addEventListener('keypress', (e) => {
            if(e.key === "Enter") {
                addLikes(e)
            }
        })

        likeIcon.addEventListener('click', (e) => {
            addLikes(e)

        })

        totalLikes += mediaModel.getLikes();
        totalPrice += mediaModel.getPrice();
    });
}

async function init() {
    let {medias, photoId} = await getMedia();
    await displayData(photoId, medias);
    popularity.addEventListener('click', () => {
        updateGrid(medias.sort((a, b) => a.likes - b.likes));
        date.classList.toggle('hidden');
        title.classList.toggle('hidden');
        button.classList.toggle('activeButton');
        rotateButton.classList.toggle('rotate-active');
    });

    popularity.addEventListener('keypress', (e) => {
        if(e.key === "Enter") {
            updateGrid(medias.sort((a, b) => a.likes - b.likes));
            date.classList.toggle('hidden');
            title.classList.toggle('hidden');
            button.classList.toggle('activeButton');
            rotateButton.classList.toggle('rotate-active');
        }
    });

    date.addEventListener('click', () => {
        updateGrid(medias.sort((a, b) => ('' + a.date).localeCompare(b.date)));
        popularity.classList.toggle('hidden');
        title.classList.toggle('hidden');
        button.classList.toggle('activeButton');
        rotateButton.classList.toggle('rotate-active');
    });

    date.addEventListener('keypress', (e) => {
        if(e.key === "Enter") {
            updateGrid(medias.sort((a, b) => ('' + a.date).localeCompare(b.date)));
            popularity.classList.toggle('hidden');
            title.classList.toggle('hidden');
            button.classList.toggle('activeButton');
            rotateButton.classList.toggle('rotate-active');
        }
    });

    title.addEventListener('click', () => {
        updateGrid(medias.sort((a, b) => ('' + a.title).localeCompare(b.title)));
        popularity.classList.toggle('hidden');
        date.classList.toggle('hidden');
        button.classList.toggle('activeButton');
        rotateButton.classList.toggle('rotate-active');
    });

    title.addEventListener('keypress', (e) => {
        if(e.key === "Enter") {
            updateGrid(medias.sort((a, b) => ('' + a.title).localeCompare(b.title)));
            popularity.classList.toggle('hidden');
            date.classList.toggle('hidden');
            button.classList.toggle('activeButton');
            rotateButton.classList.toggle('rotate-active');
        }
    });

}

init();

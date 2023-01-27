function mediaFactory(data) {

    const {title, image, photographerId, id, video, likes, price} = data;

    const urlImg = 'assets/photographers/' + photographerId + '/';

    function getMediaCardDOM() {
        const div = document.createElement('div');
        div.setAttribute("class", "card");
        const img = document.createElement('img');
        const videoContainer = document.createElement('video');
        const source = document.createElement("source");
        const divLikes = document.createElement('div');
        if (image) {
            img.setAttribute("src", urlImg + image)
            img.setAttribute("alt", title);
            img.setAttribute('tabindex', '0');
            div.setAttribute('data-url', image);
            div.setAttribute('data-type', 'img');
            div.setAttribute('data-title', title);
            div.appendChild(img);
        } else {
            source.setAttribute("src", urlImg + video);
            source.setAttribute('type', "video/mp4");
            source.setAttribute('alt', title);
            div.setAttribute('data-url', video);
            div.setAttribute('data-type', 'video');
            div.setAttribute('data-title', title);
            videoContainer.setAttribute('tabindex', '0');
            videoContainer.appendChild(source);
            div.appendChild(videoContainer);
        }
        div.setAttribute('data-id', id);
        const flex = document.createElement('div');
        flex.setAttribute("class", "flex");
        const titleCard = document.createElement('h3');
        titleCard.textContent = title;
        titleCard.setAttribute('tabindex', '0');
        const numberLikes = document.createElement('span');
        numberLikes.setAttribute('id', 'media-' + id)
        const heartIcon = document.createElement('i');
        heartIcon.setAttribute("class", "far fa-heart icon_love");
        heartIcon.setAttribute('data-id', id);
        heartIcon.setAttribute('tabindex', '0');
        numberLikes.textContent = likes;
        numberLikes.setAttribute('tabindex', '0');
        divLikes.appendChild(numberLikes);
        divLikes.appendChild(heartIcon);
        flex.appendChild(titleCard);
        flex.appendChild(divLikes);
        div.appendChild(flex);
        return (div)
    }

    function displayLikes(totalLikes, totalPrice) {
        const div = document.createElement('div');
        const h4One = document.createElement('h4');
        const span = document.createElement('span');
        const h4Two = document.createElement('h4');
        const i = document.createElement('i');

        i.setAttribute("aria-label", "likes");
        i.setAttribute("class", "fas fa-heart icon_love");
        span.textContent = totalLikes;
        span.setAttribute('id', "likesTotal");
        h4One.setAttribute('tabindex', '0');
        h4One.appendChild(span);
        h4One.appendChild(i);
        h4Two.textContent = totalPrice + " € / jour";
        h4Two.setAttribute('tabindex', '0');
        div.appendChild(h4One);
        div.appendChild(h4Two);
        return (div)
    }

    function getLikes() {
        return likes;
    }

    function getPrice() {
        return price;
    }

    function createLightbox() {
        const div = document.createElement('div');
        div.setAttribute('class', 'lightbox');
        const media = document.createElement('div');
        media.setAttribute('id', 'toggleMedia');
        const previous = document.createElement('i');
        previous.setAttribute('class', 'fas fa-angle-left icon_lightbox');
        previous.setAttribute('id', 'previous');
        const next = document.createElement('i');
        next.setAttribute('class', 'fas fa-angle-right icon_lightbox');
        next.setAttribute('id', 'next');
        const close = document.createElement('i');
        close.setAttribute('class', 'fas fa-times icon_lightbox');
        close.setAttribute('id', 'close');
        const h5 = document.createElement('h5');
        h5.setAttribute('id', 'h5Text');
        div.appendChild(media);
        div.appendChild(previous);
        div.appendChild(close);
        div.appendChild(next);
        div.appendChild(h5);
        return (div)

    }

    function updateLightbox(div, title, url, type) {
        let media = document.querySelector("#toggleMedia");
        media.innerHTML = "";
        if (type === 'img') {
            let img = document.createElement('img');
            img.setAttribute('src', urlImg + url);
            img.setAttribute('alt', title);
            media.appendChild(img);
            div.appendChild(media);
        } else if (type === 'video') {
            const videoContainer = document.createElement('video');
            const source = document.createElement("source");
            videoContainer.setAttribute('id', 'toggleMedia');
            videoContainer.setAttribute('controls', '');
            source.setAttribute("src", urlImg + url);
            source.setAttribute('type', "video/mp4");
            source.setAttribute('alt', title);
            videoContainer.appendChild(source);
            media.appendChild(videoContainer);
            div.appendChild(media);
        } else {
            // afficher une photo ou un texte pour l'erreur
        }
        let h5 = document.querySelector("#h5Text");
        h5.textContent = title;
        div.appendChild(h5);
        return (div)
    }

    function calculateIndex(index, length, sens) {
        if (sens === true) {
            if ((index + 1) < length) {
                return index + 1;
            } else {
                return 0;
            }
        } else {
            if ((index - 1) > 0) {
                return index - 1;
            } else {
                return length - 1;
            }
        }
    }


    return {getMediaCardDOM, displayLikes, getLikes, getPrice, createLightbox, updateLightbox, calculateIndex}
}

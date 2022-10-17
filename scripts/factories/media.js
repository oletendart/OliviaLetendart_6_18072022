function mediaFactory(data) {

    const {title, image, photographerId, id, video, likes, price} = data;

    const urlImg = 'assets/photographers/' + photographerId + '/';

    function getMediaCardDOM() {
        const div = document.createElement('div');
        div.setAttribute("class", "card");
        const img = document.createElement('img');
        const videoContainer = document.createElement('video');
        const source = document.createElement("source");
        const divI = document.createElement('div');
        if (image) {
            img.setAttribute("src", urlImg + image)
            img.setAttribute("alt", title);
            div.setAttribute('data-url', image);
            div.setAttribute('data-type', 'img');
            div.setAttribute('data-title', title);
            div.appendChild(img);
        } else {
            source.setAttribute("src", urlImg + video);
            source.setAttribute('type', "video/mp4");
            source.setAttribute('alt', title);
            div.setAttribute('data-url',  video);
            div.setAttribute('data-type', 'video');
            div.setAttribute('data-title', title);
            videoContainer.appendChild(source);
            div.appendChild(videoContainer);
        }
        div.setAttribute('data-id', id);
        const flex = document.createElement('div');
        flex.setAttribute("class", "flex");
        const h3 = document.createElement('h3');
        h3.textContent = title;
        const h4 = document.createElement('h4');
        const i = document.createElement('i');
        i.setAttribute("class", "far fa-heart icon_love");
        h4.textContent = likes;
        divI.appendChild(h4);
        divI.appendChild(i);
        flex.appendChild(h3);
        flex.appendChild(divI);
        div.appendChild(flex);
        return (div)
    }

    function displayLikes(totalLikes, totalPrice) {
        const div = document.createElement('div');
        const h4One = document.createElement('h4');
        const h4Two = document.createElement('h4');
        const i = document.createElement('i');

        i.setAttribute("aria-label", "likes");
        i.setAttribute("class", "fas fa-heart icon_love");
        h4One.textContent = totalLikes;
        h4One.appendChild(i);
        h4Two.textContent = totalPrice + " € / jour";
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
        // Create the div
        const div = document.createElement('div');
        div.setAttribute('class', 'lightbox');
        // Create the media
        const media = document.createElement('img');
        media.setAttribute('id', 'toggleMedia');
        // Create previous/next/close
        const previous = document.createElement('i');
        previous.setAttribute('class', 'fas fa-angle-left icon_lightbox');
        previous.setAttribute('id', 'previous');
        const next = document.createElement('i');
        next.setAttribute('class', 'fas fa-angle-right icon_lightbox');
        next.setAttribute('id', 'next');
        const close = document.createElement('i');
        close.setAttribute('class', 'fas fa-times icon_lightbox');
        close.setAttribute('id', 'close');
        //Create the title h5
        const h5 = document.createElement('h5');
        h5.setAttribute('id', 'h5Text');
        // Adding to div
        div.appendChild(media);
        div.appendChild(previous);
        div.appendChild(close);
        div.appendChild(next);
        div.appendChild(h5);
        return (div)

    }

    function updateLightbox(div, title, url, type) {
        let media = document.querySelector("#toggleMedia");
        const videoContainer = document.createElement('video');
        const source = document.createElement("source");
        if (type === 'img') {
            media.setAttribute('src', urlImg + url);
            media.setAttribute('alt', title);
            div.appendChild(media);
        } else {
            videoContainer.setAttribute('id', 'toggleMedia');
            source.setAttribute("src", urlImg + url);
            source.setAttribute('type', "video/mp4");
            source.setAttribute('alt', title);
            videoContainer.appendChild(source);
            media.appendChild(videoContainer);
            div.appendChild(media);
        }
        let h5 = document.querySelector("#h5Text");
        h5.textContent = title;
        div.appendChild(h5);
        return (div)
    }

    return {getMediaCardDOM, displayLikes, getLikes, getPrice, createLightbox,updateLightbox}
}

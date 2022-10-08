function mediaFactory(data) {

    const { title, image, photographerId, id, video, likes, date, price } = data;

    function getMediaCardDOM() {
        const div = document.createElement('div');
        div.setAttribute("class", "card");
        const img = document.createElement('img');
        const videoContainer = document.createElement('video');
        const source = document.createElement("source");
        const divI = document.createElement('div');
        if(image) {
            img.setAttribute("src",`assets/photographers/${photographerId}/` + image)
            img.setAttribute("alt", title);
            div.setAttribute('data-url', `assets/photographers/${photographerId}/` + image);
            div.setAttribute('data-type', 'img');
            div.setAttribute('data-title', title);
            div.appendChild(img);
        } else {
            source.setAttribute("src", `assets/photographers/${photographerId}/` + video);
            source.setAttribute('type', "video/mp4");
            source.setAttribute('alt', title);
            div.setAttribute('data-url', `assets/photographers/${photographerId}/` + video);
            div.setAttribute('data-type', 'video');
            div.setAttribute('data-title', title);
            videoContainer.appendChild(source);
            div.appendChild(videoContainer);
        }
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

    function showLightbox(title, url, type) {
        const div = document.createElement('div');
        div.setAttribute('class', 'lightbox');
        const img = document.createElement('img');
        const videoContainer = document.createElement('video');
        const source = document.createElement("source");
        if(type === 'img') {
            img.setAttribute('src', url);
            img.setAttribute('alt', title);
            div.appendChild(img);
        } else {
            videoContainer.setAttribute('controls', '');
            source.setAttribute("src", url);
            source.setAttribute('type', "video/mp4");
            source.setAttribute('alt', title);
            videoContainer.appendChild(source);
            div.appendChild(videoContainer);
        }
        const previous = document.createElement('i');
        const next = document.createElement('i');
        const close = document.createElement('i');
        const h5 = document.createElement('h5');
        previous.setAttribute('class', 'fas fa-angle-left icon_lightbox');
        next.setAttribute('class', 'fas fa-angle-right icon_lightbox');
        next.setAttribute('id', 'next');
        close.setAttribute('class', 'fas fa-times icon_lightbox');
        close.setAttribute('id', 'close');
        h5.textContent = title;
        div.appendChild(previous);
        div.appendChild(close);
        div.appendChild(next);
        div.appendChild(h5);
        return (div)

    }

    function nextImage() {

    }

    function previousImage() {

    }

    return { getMediaCardDOM, displayLikes, getLikes, getPrice, showLightbox }
}

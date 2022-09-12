function mediaFactory(data) {

    const { title, image, photographerId, id, video, likes, date, price } = data;

    function getMediaCardDOM() {
        const div = document.createElement('div');
        div.setAttribute("class", "card");
        const a = document.createElement('a');
        a.setAttribute('onclick', 'displayLightbox()');
        a.href = "#";
        const img = document.createElement('img');
        const videoContainer = document.createElement('video');
        const source = document.createElement("source");
        if(image) {
            img.setAttribute("src",`assets/photographers/${photographerId}/` + image)
            img.setAttribute("alt", "#");
            a.appendChild(img);
        } else {
            source.setAttribute("src", `assets/photographers/${photographerId}/` + video);
            source.setAttribute('type', "video/mp4");
            videoContainer.setAttribute("controls", "");
            videoContainer.appendChild(source);
            a.appendChild(videoContainer);
        }
        const flex = document.createElement('div');
        flex.setAttribute("class", "flex");
        const h3 = document.createElement('h3');
        h3.textContent = title;
        const divI = document.createElement('div');
        const h4 = document.createElement('h4');
        const i = document.createElement('i');
        i.setAttribute("class", "far fa-heart icon_love");
        h4.textContent = likes;
        divI.appendChild(h4);
        divI.appendChild(i);
        flex.appendChild(h3);
        flex.appendChild(divI);
        div.appendChild(a);
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

    return { getMediaCardDOM, displayLikes, getLikes, getPrice }
}

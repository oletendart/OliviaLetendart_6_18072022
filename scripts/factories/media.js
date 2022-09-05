function mediaFactory(data) {

    const { title, image, photographerId, id, video, likes, date, price } = data;

    function getMediaCardDOM() {
        const div = document.createElement('div');
        div.setAttribute("class", "card");
        const a = document.createElement('a');
        a.setAttribute('onclick', 'displayLightbox()');
        a.href = "#";
        const img = document.createElement('img');
        img.setAttribute("src", `assets/photographers/${photographerId}/` + image);
        img.setAttribute("alt", "#");
        const flex = document.createElement('div');
        flex.setAttribute("class", "flex");
        const h3 = document.createElement('h3');
        h3.textContent = title;
        const i = document.createElement('i');
        i.setAttribute("class", "far fa-heart icon_love");
        flex.appendChild(h3);
        flex.appendChild(i);
        a.appendChild(img);
        div.appendChild(a);
        div.appendChild(flex);
        return (div)
    }

    return { getMediaCardDOM}
}

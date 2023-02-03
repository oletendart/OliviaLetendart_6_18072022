function photographerFactory(data) {
    const {name, id, portrait, city, country, tagline, price} = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const urlString = (new URL(document.location)).searchParams;
        let newUrl = urlString.hash = `${id}`;

        const article = document.createElement('article');
        const a = document.createElement('a');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute('tabindex', '0');
        const h2 = document.createElement('h2');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        const h4 = document.createElement('h4');
        h2.textContent = name;
        h2.setAttribute('tabindex', '0');
        h3.textContent = `${city}, ${country}`;
        h3.setAttribute('tabindex', '0');
        p.textContent = tagline;
        p.setAttribute('tabindex', '0');
        h4.textContent = `${price}/jour`;
        h4.setAttribute('tabindex', '0');
        a.href = `photographer-page.html?id=${newUrl}`;
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(a);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(h4);
        return (article);
    }

    function getHeader() {
        const div = document.createElement('div');
        div.setAttribute('class', 'photograph-header');
        const secondDiv = document.createElement('div');
        secondDiv.setAttribute('id', 'photograph-header');
        const h1 = document.createElement('h1');
        h1.textContent = name;
        h1.setAttribute('tabindex', '0');
        const h2 = document.createElement('h2');
        h2.textContent = `${city}, ${country}`;
        h2.setAttribute('tabindex', '0');
        const p = document.createElement('p');
        p.textContent = tagline;
        p.setAttribute('tabindex', '0');
        secondDiv.appendChild(h1);
        secondDiv.appendChild(h2);
        secondDiv.appendChild(p);
        const button = document.createElement('button');
        button.setAttribute('id', 'openForm');
        button.setAttribute('class', 'contact_button');
        button.textContent = "Contactez-moi";
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "#");
        img.setAttribute('tabindex', '0');
        div.appendChild(secondDiv);
        div.appendChild(button);
        div.appendChild(img);
        return (div);
    }

    function namePhotographer() {
        const h3 = document.createElement('h3');
        h3.textContent = name;
        h3.setAttribute('tabindex', '2');
        return (h3);
    }

    return {getUserCardDOM, getHeader, namePhotographer}
}

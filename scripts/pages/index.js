async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    fetch('./data/photographers.json')
        .then(response => response.json())
        .then(data => {

            displayData(data.photographers);

        })
        .catch(error => console.log("Erreur : " + error));
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    await getPhotographers();
}

init();

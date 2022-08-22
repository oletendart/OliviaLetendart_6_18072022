    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        fetch('./data/photographers.json')
            .then(response => response.json())
            .then(data => {
                for(let i = 0; i < data.photographers.length; i++) {
                    const photographers = [
                        {
                            "name": data.photographers[i].name,
                            "id": data.photographers[i].id,
                            "city": data.photographers[i].city,
                            "country": data.photographers[i].country,
                            "tagline": data.photographers[i].tagline,
                            "price": data.photographers[i].price,
                            "portrait": data.photographers[i].portrait
                        }
                    ];
                    displayData(photographers);
                }
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
    };

    async function init() {
        // Récupère les datas des photographes
        await getPhotographers();
    };

    init();

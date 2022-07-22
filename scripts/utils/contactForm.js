function displayModal() {
    const modal = document.getElementById("contact_modal");
    const body = document.body;
	modal.style.display = "block";
    console.log(body);
    body.style.backgroundColor = "#C4C4C466";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    const body = document.body;
    modal.style.display = "none";
    body.style.backgroundColor = "transparent";
}

function displayLightbox() {
    const modal = document.getElementById("lightbox_modal");
    modal.style.display = "block";
}
function closeLightbox() {
    const modal = document.getElementById("lightbox_modal");
    modal.style.display = "none";
}

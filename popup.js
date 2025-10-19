document.addEventListener("DOMContentLoaded", () => {
    const popupOverlay = document.getElementById("popup-overlay");
    const closeButton = document.querySelector(".close-popup");

    closeButton.addEventListener("click", () => {
        popupOverlay.classList.add("hidden");
    });
});
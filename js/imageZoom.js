let currentIndex = 0;
const images = document.querySelectorAll(".gallery img");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

function openModal(index) {
    currentIndex = index;
    modalImg.src = images[index].src;
    modal.classList.add("show");
    modal.classList.remove("hide");
}

function closeModal() {
    modal.classList.add("hide");
    setTimeout(() => {
        modal.classList.remove("show");
    }, 300);
}

document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("show")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") changeImage(-1, e);
    if (e.key === "ArrowRight") changeImage(1, e);
});

function changeImage(direction, event) {
    if (event) event.stopPropagation();
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;
    modalImg.src = images[currentIndex].src;
}
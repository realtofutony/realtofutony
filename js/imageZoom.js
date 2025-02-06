let currentIndex = 0;
const images = document.querySelectorAll("img[data-zoom]"); // Select all images with 'data-zoom' attribute
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

if (images.length === 0) {
    console.warn("No images found with 'data-zoom' attribute.");
}

function openModal(index) {
    if (index < 0 || index >= images.length) return; // Prevent out-of-bounds errors
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
    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    if (images[newIndex]) {
        currentIndex = newIndex;
        modalImg.src = images[currentIndex].src;
    }
}

// Attach event listeners dynamically to any image with 'data-zoom'
images.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
});
    
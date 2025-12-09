// modal.js — работает с компонентной системой

let dishModal,
    modalBackdrop,
    modalClose,
    modalImage,
    modalTitle,
    modalDescription,
    modalPrice,
    modalWeight,
    modalAllergens,
    modalLabels,
    modalIcons,
    imgWrap;

const fallbackImg = "resources/assets/images/image-fallback.png";

/* --------------------------------------------------
   INIT — вызывается ТОЛЬКО после загрузки modal.html
-----------------------------------------------------*/
export function initModal() {

    // Теперь элементы ЕСТЬ в DOM
    dishModal = document.getElementById("dishModal");
    modalBackdrop = document.getElementById("dishModalBackdrop");
    modalClose = document.getElementById("dishModalClose");

    modalImage = document.getElementById("dishModalImage");
    modalTitle = document.getElementById("dishModalTitle");
    modalDescription = document.getElementById("dishModalDescription");
    modalPrice = document.getElementById("dishModalPrice");
    modalWeight = document.getElementById("dishModalWeight");
    modalAllergens = document.getElementById("dishModalAllergens");
    modalLabels = document.getElementById("dishModalLabels");
    modalIcons = document.getElementById("dishModalIcons");

    imgWrap = document.getElementById("dishModalImageWrap");

    // Если по какой-то причине компонент не загрузился
    if (!dishModal) {
        console.warn("Modal not initialized — component not loaded yet.");
        return;
    }

    modalBackdrop.addEventListener("click", closeModal);
    modalClose.addEventListener("click", closeModal);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });

    console.log("Modal initialized");
}

/* --------------------------------------------------
   ОТКРЫТИЕ МОДАЛКИ
-----------------------------------------------------*/
export function openDishModal(meta, text) {

    // Фоллбек
    imgWrap.style.backgroundImage = `url('${fallbackImg}')`;
    modalImage.style.display = "none";

    if (meta.image && meta.image.trim() !== "") {
        const testImg = new Image();
        testImg.onload = () => {
            modalImage.src = meta.image;
            modalImage.style.display = "block";
            imgWrap.style.backgroundImage = "none";
        };
        testImg.onerror = () => {
            modalImage.style.display = "none";
            imgWrap.style.backgroundImage = `url('${fallbackImg}')`;
        };
        testImg.src = meta.image;
    }

    modalTitle.textContent = text.name;
    modalDescription.textContent = text.description;
    modalPrice.textContent = text.price;
    modalWeight.textContent = text.weight || "–";
    modalAllergens.textContent = (text.allergens || []).join(", ") || "–";

    modalLabels.innerHTML = renderLabels(meta);
    modalIcons.innerHTML = renderIcons(meta);

    dishModal.classList.add("active");
}

/* --------------------------------------------------
   ЗАКРЫТИЕ МОДАЛКИ
-----------------------------------------------------*/
export function closeModal() {
    if (dishModal) dishModal.classList.remove("active");
}

/* --------------------------------------------------
   LABELS / ICONS
-----------------------------------------------------*/
function renderLabels(meta) {
    let html = "";
    (meta.labels || []).forEach((label) => {
        if (label === "new") html += `<span class="label">NEW</span>`;
        if (label === "bestseller") html += `<span class="label">BESTSELLER</span>`;
    });
    return html;
}

function renderIcons(meta) {
    return [
        meta.spicy ? "🌶️" : "",
        meta.vegetarian ? "🥦" : "",
        meta.vegan ? "🌱" : ""
    ].join(" ");
}

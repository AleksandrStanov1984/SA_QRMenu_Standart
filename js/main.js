// main.js
import { initLanguageSwitcher } from "./language.js";
import { loadCategories, renderAll } from "./render.js";
import { initModal } from "./modal.js";
import "./theme.js"; // только подключаем

export async function initApp() {

    // Модалка
    initModal();
    initBurger();

    // Загружаем категории и рендерим всё
    await loadCategories();
    await renderAll();

    // Переключение языка
    initLanguageSwitcher(async () => {
        await renderAll();
    });
}

/* ---------- Burger ---------- */

function initBurger() {
    const btn = document.getElementById("burgerBtn");
    const drawer = document.getElementById("drawer");
    const backdrop = document.getElementById("drawerBackdrop");
    const close = document.getElementById("drawerClose");

    // Если компонент ещё не загружен → ждём
    if (!btn || !drawer || !backdrop) {
        console.warn("Burger not ready, retrying...");
        setTimeout(initBurger, 100);
        return;
    }

    btn.onclick = () => {
        drawer.classList.add("active");
        backdrop.classList.add("active");
    };

    close.onclick = backdrop.onclick = () => {
        drawer.classList.remove("active");
        backdrop.classList.remove("active");
    };
}




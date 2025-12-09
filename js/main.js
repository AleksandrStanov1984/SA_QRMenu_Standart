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

    if (!btn || !drawer || !backdrop || !close) {
        console.warn("Burger not ready, retrying...");
        setTimeout(initBurger, 120);
        return;
    }

    const openDrawer = () => {
        drawer.classList.add("active");
        backdrop.classList.add("active");
    };

    const closeDrawer = () => {
        drawer.classList.remove("active");
        backdrop.classList.remove("active");
    };

    btn.onclick = openDrawer;
    close.onclick = closeDrawer;
    backdrop.onclick = closeDrawer;
}







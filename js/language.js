// language.js

let currentLang = localStorage.getItem("lang") || "de";

export function getCurrentLang() {
    return currentLang;
}

export function initLanguageSwitcher(onChange) {
    const langButtons = document.querySelectorAll(".lang-btn");

    // Активируем текущую кнопку при загрузке
    langButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });

    langButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            if (lang === currentLang) return;

            currentLang = lang;

            // Сохраняем язык между сессиями
            localStorage.setItem("lang", currentLang);

            // Переключаем активную кнопку
            langButtons.forEach((b) =>
                b.classList.toggle("active", b.dataset.lang === currentLang)
            );

            // Вызываем обновление рендера
            if (typeof onChange === "function") {
                onChange(currentLang);
            }
        });
    });
}

// Загрузка переводов категорий
export async function loadCategoryTranslations(lang) {
    return fetchJSON(`data/lang/${lang}/categories.json`);
}

// Загрузка переводов блюд по категории
export async function loadItemTranslations(lang, categoryId) {
    return fetchJSON(`data/lang/${lang}/${categoryId}.json`);
}

// Универсальный загрузчик JSON
async function fetchJSON(path) {
    const res = await fetch(`${path}?v=${Date.now()}`);
    if (!res.ok) throw new Error(`Language load failed: ${path}`);
    return res.json();
}

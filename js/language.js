// language.js

// language.js

let currentLang = localStorage.getItem("lang") || "de";

export function getCurrentLang() {
    return currentLang;
}

export function initLanguageSwitcher(onChange) {
    const dropdownBtn = document.getElementById("langDropdownBtn");
    const dropdownList = document.getElementById("langDropdownList");
    const langOptions = document.querySelectorAll(".lang-option");

    // Активируем язык при загрузке
    langOptions.forEach(option => {
        option.classList.toggle("active", option.dataset.lang === currentLang);
    });

    // Открыть / закрыть список
    dropdownBtn.addEventListener("click", () => {
        dropdownList.style.display =
            dropdownList.style.display === "block" ? "none" : "block";
    });

    // Закрытие при клике вне списка
    document.addEventListener("click", (e) => {
        if (!dropdownBtn.contains(e.target) && !dropdownList.contains(e.target)) {
            dropdownList.style.display = "none";
        }
    });

    // Выбор языка
    langOptions.forEach(option => {
        option.addEventListener("click", () => {
            const lang = option.dataset.lang;
            if (lang === currentLang) return;

            currentLang = lang;

            // Подсветка активного языка
            langOptions.forEach(o =>
                o.classList.toggle("active", o.dataset.lang === lang)
            );

            // Сохраняем выбор
            localStorage.setItem("lang", currentLang);

            // Обновляем меню
            if (typeof onChange === "function") {
                onChange(currentLang);
            }

            dropdownList.style.display = "none";
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

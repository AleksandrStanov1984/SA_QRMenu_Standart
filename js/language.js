// language.js
let currentLang = "de";

export function getCurrentLang() {
    return currentLang;
}

export function initLanguageSwitcher(onChange) {
    const langButtons = document.querySelectorAll(".lang-btn");

    langButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            if (lang === currentLang) return;

            currentLang = lang;

            langButtons.forEach((b) =>
                b.classList.toggle("active", b.dataset.lang === currentLang)
            );

            if (typeof onChange === "function") {
                onChange(currentLang);
            }
        });
    });
}

export async function loadCategoryTranslations(lang) {
    return fetchJSON(`data/lang/${lang}/categories.json`);
}

export async function loadItemTranslations(lang, categoryId) {
    return fetchJSON(`data/lang/${lang}/${categoryId}.json`);
}

async function fetchJSON(path) {
    const res = await fetch(`${path}?v=${Date.now()}`);
    if (!res.ok) throw new Error(`Language load failed: ${path}`);
    return res.json();
}

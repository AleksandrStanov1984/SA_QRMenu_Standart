// theme.js — корректная версия для компонентной архитектуры

const THEME_KEY = "sa_qrmenu_theme";

export function initTheme() {
    const toggleBtn = document.getElementById("themeToggle");
    if (!toggleBtn) {
        console.warn("Theme init skipped — toggle not found");
        return;
    }

    applyInitialTheme();

    toggleBtn.addEventListener("click", () => {
        const newTheme = document.body.classList.contains("theme-light")
            ? "theme-dark"
            : "theme-light";

        applyTheme(newTheme);
        saveTheme(newTheme);
    });
}

/* ----------------------------------- */
/*             HELPERS                 */
/* ----------------------------------- */

function applyInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);

    if (saved) {
        applyTheme(saved);
    } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        applyTheme(prefersDark ? "theme-dark" : "theme-light");
    }
}

function applyTheme(theme) {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(theme);
    updateThemeIcon(theme);
}

function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
}

function updateThemeIcon(theme) {
    const toggleBtn = document.getElementById("themeToggle");
    if (!toggleBtn) return;

    toggleBtn.innerHTML = theme === "theme-dark" ? "🌙" : "☀️";
}

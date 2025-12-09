// ui-loader.js
// Загружает HTML-компоненты, а затем запускает все JS-модули.

async function loadComponent(id, path) {
    const container = document.getElementById(id);
    if (!container) return;

    const html = await fetch(path).then(r => r.text());
    container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([
        loadComponent("header", "components/header.html"),
        loadComponent("drawer", "components/drawer.html"),
        loadComponent("modalContainer", "components/modal.html"),
        loadComponent("footer", "components/footer.html")
    ]);

    // Теперь DOM полностью собран
    const main = await import("./main.js");
    const theme = await import("./theme.js");
    const modal = await import("./modal.js");
    const lang = await import("./language.js");
    const render = await import("./render.js");

    // ИНИЦИАЛИЗАЦИЯ ПОСЛЕ ЗАГРУЗКИ КОМПОНЕНТОВ
    theme.initTheme();
    modal.initModal();
    main.initApp();
});


import { getCurrentLang, loadCategoryTranslations, loadItemTranslations } from "./language.js";
import { openDishModal } from "./modal.js";

/* ==============================
   GLOBAL
============================== */

let categoriesConfig = null;
let categoriesLang = null;

export async function loadCategories() {
    categoriesConfig = await fetchJSON("data/categories/categories.json");
}

export async function renderAll() {
    const lang = getCurrentLang();

    categoriesLang = await loadCategoryTranslations(lang);

    if (!document.getElementById("categoryNav")) {
        console.warn("Components not loaded yet — render postponed");
        return;
    }

    renderCategoryNav();
    renderDrawer();
    renderContent();
}

/* ==============================
   ICONS + LABELS ( MISSING BEFORE! )
============================== */

function renderIcons(meta) {
    return `
        ${meta.spicy ? "🌶️" : ""}
        ${meta.vegetarian ? "🥦" : ""}
        ${meta.vegan ? "🌱" : ""}
    `;
}

function renderLabels(meta) {
    let html = "";
    (meta.labels || []).forEach((l) => {
        if (l === "new") html += `<span class="label label--new">NEW</span>`;
        if (l === "bestseller") html += `<span class="label label--bestseller">BESTSELLER</span>`;
    });
    return html;
}

/* ==============================
   CATEGORY NAV (TOP)
============================== */

function renderCategoryNav() {
    const nav = document.getElementById("categoryNav");
    if (!nav) return;

    nav.innerHTML = "";

    categoriesConfig.categories.forEach((cat, i) => {
        const btn = document.createElement("a");
        btn.className = "category-nav-btn" + (i === 0 ? " active" : "");
        btn.dataset.target = cat.id;

        const title = categoriesLang.categories[cat.id]?.name || cat.id;

        btn.innerHTML = `
            <i class="ri-${cat.icon}-line category-icon"></i>
            <span>${title}</span>
        `;

        btn.addEventListener("click", () => {
            scrollToCategory(cat.id);
            nav.querySelectorAll("a").forEach((x) => x.classList.remove("active"));
            btn.classList.add("active");
        });

        nav.appendChild(btn);
    });
}

/* ==============================
   DRAWER SIDE MENU
============================== */

function renderDrawer() {
    const drawerBody = document.getElementById("drawerBody");
    if (!drawerBody) return;

    drawerBody.innerHTML = "";

    categoriesConfig.categories.forEach((cat) => {
        const name = categoriesLang.categories[cat.id]?.name || cat.id;

        const btn = document.createElement("a");
        btn.className = "drawer-item";
        btn.innerHTML = `<span>${name}</span>`;

        btn.addEventListener("click", () => {
            scrollToCategory(cat.id);
            closeDrawer();
        });

        drawerBody.appendChild(btn);

        if (cat.id === "bar") {
            const sublist = document.createElement("div");
            sublist.className = "drawer-sublist";

            cat.subcategories.forEach((subId) => {
                const subBtn = document.createElement("a");
                subBtn.className = "drawer-subitem";
                subBtn.textContent = categoriesLang.barSubcategories[subId];

                subBtn.addEventListener("click", () => {
                    scrollToSubcategory(subId);
                    closeDrawer();
                });

                sublist.appendChild(subBtn);
            });

            drawerBody.appendChild(sublist);
        }
    });
}

function closeDrawer() {
    document.getElementById("drawer")?.classList.remove("active");
    document.getElementById("drawerBackdrop")?.classList.remove("active");
}

/* ==============================
          MAIN CONTENT
============================== */

async function renderContent() {
    const container = document.getElementById("menuContainer");
    if (!container) return;

    container.innerHTML = "";

    for (const cat of categoriesConfig.categories) {
        if (cat.type === "food") {
            await renderFoodCategory(cat);
        } else if (cat.type === "bar") {
            await renderBarCategory(cat);
        }
    }
}

/* ==============================
      FOOD CATEGORY
============================== */

async function renderFoodCategory(cat) {
    const section = document.createElement("section");
    section.className = "category-section";
    section.dataset.id = cat.id;

    const title = document.createElement("h2");
    title.className = "menu-category-title";
    title.textContent = categoriesLang.categories[cat.id].name;
    section.appendChild(title);

    const meta = await fetchJSON(`data/items/${cat.id}.json`);
    const lang = getCurrentLang();
    const translations = await loadItemTranslations(lang, cat.id);

    meta.items.forEach((item) => {
        const t = translations[item.id];
        if (!t) return;

        const card = createDishCard(item, t);
        section.appendChild(card);
    });

    document.getElementById("menuContainer").appendChild(section);
}

/* ==============================
      BAR CATEGORY
============================== */

async function renderBarCategory(cat) {
    const section = document.createElement("section");
    section.className = "category-section";
    section.dataset.id = cat.id;

    const title = document.createElement("h2");
    title.className = "menu-category-title";
    title.textContent = categoriesLang.categories[cat.id].name;
    section.appendChild(title);

    const meta = await fetchJSON("data/items/bar.json");
    const langObj = await loadItemTranslations(getCurrentLang(), "bar");

    meta.groups.forEach((group) => {

        // Корневой блок аккордиона
        const wrap = document.createElement("div");
        wrap.className = "bar-accordion";
        wrap.dataset.subid = group.id;

        // Заголовок
        const header = document.createElement("button");
        header.className = "bar-accordion__header";

        header.innerHTML = `
            <span>${categoriesLang.barSubcategories[group.id]}</span>
            <i class="ri-arrow-down-s-line arrow"></i>
        `;

        // Контент
        const body = document.createElement("div");
        body.className = "bar-accordion__body";

        group.items.forEach((item) => {
            const li = document.createElement("div");
            li.className = "bar-item";

            li.innerHTML = `
                <span>${langObj[item.id]?.name || item.id}</span>
                <span>${item.price}</span>
            `;

            body.appendChild(li);
        });

        // toggle logic
        header.addEventListener("click", () => {
            wrap.classList.toggle("open");
        });

        wrap.appendChild(header);
        wrap.appendChild(body);
        section.appendChild(wrap);
    });

    document.getElementById("menuContainer").appendChild(section);
}


/* ==============================
            DISH CARD
============================== */

function createDishCard(meta, text) {
    const card = document.createElement("div");
    card.className = "dish-card";

    const wrap = document.createElement("div");
    wrap.className = "dish-card__image-wrap";

    if (meta.image) {
        const img = document.createElement("img");
        img.src = meta.image;
        img.className = "dish-card__image";

        img.onerror = () => {
            wrap.classList.add("fallback");
            wrap.innerHTML = `<span class="fallback-icon">🍽️</span>`;
        };

        wrap.appendChild(img);
    } else {
        wrap.classList.add("fallback");
        wrap.innerHTML = `<span class="fallback-icon">🍽️</span>`;
    }

    const content = document.createElement("div");
    content.className = "dish-card__content";

    const shortText = text.short || (text.description?.split(".")[0] + ".");

    content.innerHTML = `
    <h3 class="dish-card__title">${text.name}</h3>
    <p class="dish-card__description">${shortText}</p>
    <div class="dish-card__meta">${renderIcons(meta)}</div>
    <div class="dish-card__price">${text.price}</div>
`;

    card.appendChild(wrap);
    card.appendChild(content);

    card.addEventListener("click", () => openDishModal(meta, text));

    return card;
}

/* ==============================
          HELPERS
============================== */

function scrollToCategory(id) {
    setTimeout(() => {
        const sec = document.querySelector(`.category-section[data-id="${id}"]`);
        if (!sec) return;
        const y = sec.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
    }, 50);
}

function scrollToSubcategory(id) {
    setTimeout(() => {
        const sec = document.querySelector(`[data-subid="${id}"]`);
        if (!sec) return;
        const y = sec.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
    }, 50);
}

async function fetchJSON(path) {
    const r = await fetch(`${path}?v=${Date.now()}`);
    if (!r.ok) throw new Error(`Failed: ${path}`);
    return r.json();
}

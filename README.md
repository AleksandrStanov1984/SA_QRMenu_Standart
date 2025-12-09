
<p align="center">
  <img src="https://img.shields.io/badge/HTML-5-E34F26?logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS-3-1572B6?logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Data-JSON-000000?logo=json&logoColor=white">
  <img src="https://img.shields.io/badge/UI-Components-4A90E2">
  <img src="https://img.shields.io/badge/Theme-Light%20%7C%20Dark-111111">
  <img src="https://img.shields.io/badge/Languages-DE%20%7C%20EN-1E90FF">
  <img src="https://img.shields.io/badge/Responsive-Mobile--First-28A745">
  <img src="https://img.shields.io/badge/Local%20Server-Python%203.11-blue?logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/Status-Active-brightgreen">
  <img src="https://img.shields.io/badge/License-Private-red">
</p>

# SA Digital Menus — Standard Version

Interactive multilingual QR-menu for restaurants.

## 📌 Overview
SA Digital Menus is a modern, mobile‑optimized QR-menu system designed for restaurants.  
It supports dynamic UI components, dark/light themes, multilingual content (DE/EN), modal windows, structured categories, and fully JSON-driven menu data.

The application works entirely on the client side and can run on any static hosting or a local Python server.

---

## 📁 Project Structure

```
/components
    header.html
    drawer.html
    modal.html
    footer.html

/styles
    base.css
    layout.css
    header.css
    categories.css
    menu.css
    drawer.css
    modal.css
    footer.css
    theme-dark.css

/js
    ui-loader.js
    main.js
    render.js
    modal.js
    language.js
    theme.js

/data
    /categories
        categories.json

    /items
        cold.json
        salads.json
        meat.json
        fish.json
        desserts.json
        bar.json

    /lang
        /de
            categories.json
            cold.json
            salads.json
            meat.json
            fish.json
            desserts.json
            cocktails.json

        /en
            categories.json
            cold.json
            salads.json
            meat.json
            fish.json
            desserts.json
            cocktails.json
```

---

## 🌐 Multilingual System (DE/EN)

Language switching works entirely through `/data/lang/{LANG}/`, where each category and item has its own translated JSON file.

Example item format:

```json
{
  "salad_caesar": {
    "name": "Caesar Salad with Chicken",
    "short": "Roman lettuce, chicken breast, parmesan, croutons.",
    "description": "Classic Caesar salad with fresh vegetables and parmesan.",
    "price": "11,90 €",
    "weight": "320 g",
    "allergens": ["A", "C", "G"]
  }
}
```

---

## 🧩 Component-Based UI

The HTML layout is dynamically loaded through `ui-loader.js`:

```js
loadComponent("header", "components/header.html");
```

After all UI components load, the app initializes:

```js
loadUI().then(() => main.initApp());
```

---

## 🌗 Theme System (Light / Dark)

Themes are managed in `theme.js` and stored in `localStorage`.

Dark theme styles: `/styles/theme-dark.css`.

---

## 🍔 Drawer / Burger Menu

The drawer menu is controlled via:

```html
<button id="burgerBtn"></button>
```

JavaScript logic in `main.js`:

```js
burger.onclick = () => drawer.classList.add("open");
```

Drawer works only after components are fully loaded, otherwise the DOM element does not exist.

---

## 💾 Local Python Server

To run locally:

```
python server.py
```

The server:

- hosts the menu on http://<LAN-IP>:8765
- generates a QR code for easy access
- supports opening from mobile devices on the same network

---

## 📱 Mobile-First UI

The interface is optimized primarily for mobile devices used in restaurants.  
Fully responsive layout adapts to all screen sizes.

---

## 🔧 Development Notes

- JSON is the single source of truth for menu content.
- UI is modular and dynamically injected.
- Project does not require backend logic.
- All assets are kept inside resources/assets/images (if used).

---

## 📄 License
The project belongs to Aleksandr Stanov.  
All rights reserved unless explicitly stated otherwise.

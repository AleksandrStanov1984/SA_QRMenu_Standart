// status.js

export async function initRestaurantStatus() {
    const schedule = await fetch("data/settings/schedule.json")
        .then(res => res.json());

    function updateStatus() {
        const el = document.getElementById("restaurant-status");
        console.log("STATUS ELEM:", el); // <-- FIXED

        if (!el) return;

        const now = new Date();
        const weekday = ["sun","mon","tue","wed","thu","fri","sat"][now.getDay()];
        const intervals = schedule.schedule[weekday];

        const currentMins = now.getHours() * 60 + now.getMinutes();

        let isOpen = false;
        let minutesToClose = null;

        intervals.forEach(interval => {
            const [oh, om] = interval.open.split(":").map(Number);
            const [ch, cm] = interval.close.split(":").map(Number);

            const openM = oh * 60 + om;
            const closeM = ch * 60 + cm;

            if (currentMins >= openM && currentMins < closeM) {
                isOpen = true;
                minutesToClose = closeM - currentMins;
            }
        });

        el.classList.remove("status-open", "status-warning", "status-closed");

        if (isOpen) {
            if (minutesToClose <= 30) {
                el.classList.add("status-closed"); // красный
            } else if (minutesToClose <= 60) {
                el.classList.add("status-warning"); // жёлтый
            } else {
                el.classList.add("status-open"); // зелёный
            }
        } else {
            el.classList.add("status-closed");
        }
    }

    updateStatus();
    setInterval(updateStatus, 60000);
}


/* =========================================
   REXMARKET NOTIFICATION SYSTEM
========================================= */

(() => {
    "use strict";

    if (window.RexNotify) return;

    const root = document.getElementById("rexNotifyRoot");

    if (!root) {
        console.warn("[Rexmarket] rexNotifyRoot tidak ditemukan.");
        return;
    }

    function show({
        type = "success",
        title = "Login berhasil!",
        message = "Selamat datang di Rexmarket.",
        duration = 5000
    } = {}) {
        const card = document.createElement("div");
        card.className = "rex-notify";
        card.setAttribute(
            "role",
            type === "error" ? "alert" : "status"
        );

        const icon = document.createElement("div");
        icon.className = "rex-notify-icon";

        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2.2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");

        const path = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
        );

        if (type === "error") {
            path.setAttribute("d", "M18 6 6 18 M6 6l12 12");
        } else {
            path.setAttribute("d", "M20 7 10 17l-5-5");
        }

        svg.appendChild(path);
        icon.appendChild(svg);

        const content = document.createElement("div");
        content.className = "rex-notify-content";

        const brand = document.createElement("div");
        brand.className = "rex-notify-brand";
        brand.textContent = "REXMARKET";

        const heading = document.createElement("div");
        heading.className = "rex-notify-title";
        heading.textContent = title;

        const text = document.createElement("div");
        text.className = "rex-notify-message";
        text.textContent = message;

        content.append(brand, heading, text);
        card.append(icon, content);

        root.appendChild(card);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                card.classList.add("rex-notify-show");
            });
        });

        const timeout = Math.max(0, Number(duration) || 5000);

        setTimeout(() => {
            card.classList.remove("rex-notify-show");
            card.classList.add("rex-notify-hide");

            setTimeout(() => card.remove(), 450);
        }, timeout);
    }

    window.RexNotify = { show };

    // Ambil notifikasi login setelah pindah halaman.
    try {
        const raw = sessionStorage.getItem("rexmarketLoginNotif");

        if (raw) {
            sessionStorage.removeItem("rexmarketLoginNotif");

            const data = JSON.parse(raw);

            if (
                data &&
                data.type === "success" &&
                typeof data.time === "number" &&
                Date.now() - data.time < 60000 &&
                typeof data.title === "string" &&
                typeof data.message === "string"
            ) {
                show({
                    type: "success",
                    title: data.title,
                    message: data.message,
                    duration: 5000
                });
            }
        }
    } catch (error) {
        console.warn("[Rexmarket] Data notifikasi tidak valid.");
    }
})();
   

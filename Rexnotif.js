
/* =========================================
   REXMARKET NOTIFICATION
========================================= */

(() => {
    "use strict";

    if (window.RexNotify) return;

    const root = document.getElementById("rexNotifyRoot");

    if (!root) {
        console.warn("Wadah notifikasi Rexmarket tidak ditemukan.");
        return;
    }

    const icons = {
        success: `
            <path d="m5 12 4 4L19 6"/>
        `,
        error: `
            <circle cx="12" cy="12" r="9"/>
            <path d="m9 9 6 6m0-6-6 6"/>
        `,
        info: `
            <path d="M12 16v-4m0-4h.01"/>
            <circle cx="12" cy="12" r="9"/>
        `
    };

    let notificationId = 0;

    function show({
        type = "info",
        title = "Informasi Rexmarket",
        message = "",
        duration = 5000
    } = {}) {
        const itemId = ++notificationId;

        const card = document.createElement("div");
        card.className = "rex-notify";
        card.setAttribute("role", "status");

        const icon = document.createElement("div");
        icon.className = "rex-notify-icon";

        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        );

        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2.3");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");

        const group = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        );

        group.innerHTML = icons[type] || icons.info;
        svg.appendChild(group);
        icon.appendChild(svg);

        const content = document.createElement("div");
        content.className = "rex-notify-content";

        const heading = document.createElement("div");
        heading.className = "rex-notify-heading";

        const brand = document.createElement("span");
        brand.className = "rex-notify-brand";
        brand.textContent = "REXMARKET";

        const time = document.createElement("span");
        time.className = "rex-notify-time";
        time.textContent = "sekarang";

        heading.append(brand, time);

        const titleElement = document.createElement("p");
        titleElement.className = "rex-notify-title";
        titleElement.textContent = title;

        const messageElement = document.createElement("p");
        messageElement.className = "rex-notify-message";
        messageElement.textContent = message;

        content.append(heading, titleElement, messageElement);

        const close = document.createElement("button");
        close.className = "rex-notify-close";
        close.type = "button";
        close.textContent = "×";
        close.setAttribute("aria-label", "Tutup notifikasi");

        let removed = false;
        let timer;

        function dismiss() {
            if (removed) return;
            removed = true;

            clearTimeout(timer);

            card.classList.remove("rex-notify-show");
            card.classList.add("rex-notify-hide");

            setTimeout(() => card.remove(), 450);
        }

        close.addEventListener("click", dismiss);

        card.append(icon, content, close);
        root.appendChild(card);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                if (card.isConnected) {
                    card.classList.add("rex-notify-show");
                }
            });
        });

        timer = setTimeout(dismiss, duration);

        return itemId;
    }

    window.RexNotify = { show };

    // Tampilkan pesan login setelah berpindah halaman.
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
        console.warn("Notifikasi login tidak dapat ditampilkan.", error);
    }
})();
                  

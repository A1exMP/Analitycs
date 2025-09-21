// Generar un event_id único
function generateEventId(payload) {
    const id = btoa(JSON.stringify(payload)).substring(0, 12);
    return id;
}

// Espera promesa de la petición
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Request con timeout
async function fetchWithTimeout(url, options, timeoutMs = 3000) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeout);
        return res;
    } catch (err) {
        clearTimeout(timeout);
        throw err;
    }
}

// Dispatcher principal
async function addToCartDispatcher(eventData) {
    try {
        const payload = {
            event_name: "add_to_cart",
            client_ts: new Date().toISOString(),
            event_id: generateEventId(eventData),
            items: [
                {
                    item_id: "SKU-123",
                    item_name: "Camiseta Oversize",
                    item_price: 59.9,
                }
            ]
        };
        //console.log(" Payload listo para enviar:", payload);

        const url = "http://localhost:3000/collect";
        const maxRetries = 1;
        let attempt = 0;

        while (attempt <= maxRetries) {
            try {
                const response = await fetchWithTimeout(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                }, 3000);

                if (!response.ok) throw new Error("HTTP " + response.status);

                console.log("add_to_cart enviado con éxito", payload);
                return;

            } catch (err) {
                attempt++;
                console.warn(`Error en intento ${attempt}:`, err.message);

                if (attempt > maxRetries) {
                    console.error("Falló el envío de add_to_cart tras reintentos", payload);
                    break;
                }

                await delay(500 * attempt);
            }
        }

    } catch (error) {
        console.error("Error inesperado en addToCartDispatcher:", error);
    }
}

// Hook para escuchar dataLayer.push
(function () {
    const eventPush = window.dataLayer.push;
    window.dataLayer.push = function () {
        const args = Array.prototype.slice.call(arguments);

        args.forEach(event => {
            if (event && event.event === "add_to_cart") {
                addToCartDispatcher(event);
            }
        });

        return eventPush.apply(window.dataLayer, args);
    };
})();

// Export para tests
//module.exports = { addToCartDispatcher };

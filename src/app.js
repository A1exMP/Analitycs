// Inicializar dataLayer
window.dataLayer = window.dataLayer || [];

// Helper: push al dataLayer con log
function pushDataLayer(payload) {
    window.dataLayer.push(payload);
    console.log("dataLayer.push:", payload);
}

// Prevención de duplicados 
function oncePerClick(element, callback) {
    if (element.disabled) return;
    element.disabled = true;
    callback();
    setTimeout(() => {
        element.disabled = false;
    }, 500); 
}

// Delegación de eventos
document.addEventListener("click", function (e) {
    const target = e.target;

    // Evento sign_up_click
    if (target.id === "cta-signup") {
        oncePerClick(target, () => {
            pushDataLayer({
                event: "sign_up_click",
            });
        });
    }

    // Evento add_to_cart
    if (target.classList.contains("add-to-cart")) {
        oncePerClick(target, () => {
            const product = e.target.closest(".product");
            const sku = product.dataset.sku;
            const name = product.dataset.name;
            const price = parseFloat(product.dataset.price);

            pushDataLayer({
                event: "add_to_cart",
                ecommerce: {
                    item_id: sku,
                    item_name: name,
                    item_price: price
                }
            });
        });
    }


    // Evento begin_checkout
    if (target.id === "cta-checkout") {
        oncePerClick(target, () => {
            pushDataLayer({
                event: "begin_checkout",
                ecommerce: {
                    currency: "PEN",
                    value: 149.40,
                    items: [
                        {
                            item_id: "SKU-123",
                            item_name: "Camiseta Oversize",
                            item_price: 59.90,
                        }
                    ]
                }
            });
        });
    }
});


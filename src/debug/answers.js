/*
¿Qué está mal o inconsistente?
    Evento add_to_cart
        Formato de precio mal: "59,90" usa coma decimal, GA espera punto (59.90) y tipo numérico, no string.
        Estructura inconsistente: en GA ecommerce los items deben ir dentro de ecommerce.items, no sueltos.
        Consent mode: "Blocked by Consent (analytics_storage='denied')" GA no se dispara porque la etiqueta depende del consentimiento de analytics_storage
    Evento begin_checkout
        El evento tiene datos incompletos no se sabe la pertenencia son datos sueltos
        Custom HTML no disparó: está diseñado para escuchar solo add_to_cart, no begin_checkout

¿Qué corregirías en dataLayer y configuración de Tags/Triggers?

Yo lo manejaria de la siguiente estructura corrigiendo lo mencionado anteriormente
    Evento add_to_cart
            dataLayer({
                event: "add_to_cart",
                ecommerce: {
                    currency: "PEN",
                    items: [{
                    item_id: "SKU-123",
                    item_name: "Camiseta Oversize",
                    price: 59.90
                    }]
                }
            });

    Evento begin_checkout
            dataLayer({
                event: "begin_checkout",
                ecommerce: {
                    currency: "PEN",
                    value: 149.40,
                    items: [{
                    item_id: "SKU-123",
                    item_name: "Camiseta Oversize",
                    price: 59.90
                    }]
                }
            });

    Con respecto a GTM 
        Crear Tag - Add to cart que escuche evento add_to_cart.
        Crear Tag - Begin checkout que escuche evento begin_checkout.
        Revisar la configuración de Consent Mode → habilitar analytics_storage='granted' al menos en entorno de pruebas.

Riesgos de datos incompletos o mal formateados.

    Precios con coma → GA4 ignora el valor o lo convierte en string → métricas de revenue erróneas.
    Faltan items en begin_checkout → sin datos de productos, GA4 no podrá atribuir qué se está comprando.
    Eventos fuera del objeto ecommerce → GA4 no procesa las dimensiones → eventos aparecen sin datos útiles.
    Consent Mode → si analytics_storage está en denied, GA4 no recibirá eventos → dataset parcial.
*/
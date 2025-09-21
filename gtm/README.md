# GTM Setup - InsideOut Store

Este documento describe la configuración de **Google Tag Manager (GTM)** para InsideOut Store, incluyendo variables, triggers y tags utilizados para eventos clave del e-commerce.


## Variables

Se utilizan **Data Layer Variables (DLV)** y **Query Variables** para capturar información dinámica de la página:

| Nombre de variable    | Tipo | Descripción |
|-----------------------|------|-------------|
| `DLV - item_id`       | Data Layer Variable | Captura el ID del producto      |
| `DLV - item_name`     | Data Layer Variable | Captura el nombre del producto  |
| `DLV - item_price`    | Data Layer Variable | Captura el precio del producto  |
| `DLV - currency`      | Data Layer Variable | Captura la moneda               |
| `DLV - value`         | Data Layer Variable | Captura el precio total         |
| `Query - utm_source`  | URL Query Variable  | Captura el parámetro `utm_source` de la URL para atribución de marketing.|

## Triggers

Se definen triggers de tipo **Custom Event** para escuchar eventos específicos en el `dataLayer`:

| Nombre del Trigger              | Tipo         | Evento asociado | Descripción                                                |
|---------------------------------|--------------|-----------------|------------------------------------------------------------|
| `Custom Event - add_to_cart`    | Custom Event | `add_to_cart`   | Se dispara cuando un usuario añade un producto al carrito. |
| `Custom Event - begin_checkout` | Custom Event | `begin_checkout`| Se dispara al iniciar el proceso de checkout.              |
| `Custom Event - sign_up_click`  | Custom Event | `sign_up_click` | Se dispara al hacer clic en “Crear cuenta”.                |


## Tags

Se configuran tags para enviar datos a **GA** y para manejar eventos de manera personalizada:

| Nombre del Tag                      | Tipo | Trigger | Descripción |
|-------------------------------------|------|---------|-------------|
| `GA4 - Add to cart`                 | GA4 Event   | `Custom Event - add_to_cart`    | Envía evento `add_to_cart` a GA4 con los parámetros: `item_id`, `item_name`, `price`. |
| `GA4 - Begin checkout`              | GA4 Event   | `Custom Event - begin_checkout` | Envía evento `begin_checkout` a GA4 con los parámetros: `value`, `currency`. |
| `Custom HTML - AddToCartDispatcher` | Custom HTML | `Custom Event - add_to_cart`    | Captura el evento `add_to_cart` y envía un POST al endpoint `/collect` con payload JSON. Incluye manejo de retries y idempotencia. |

---

## Notas importantes

- Todas las variables DLV deben estar **bien tipadas** y coincidir con los nombres usados en el `dataLayer`.  
- Los triggers de tipo Custom Event solo escuchan eventos **exactamente iguales** al nombre definido en el push.   
- Se recomienda probar todos los triggers y tags usando el **modo preview de GTM** antes de publicar.  


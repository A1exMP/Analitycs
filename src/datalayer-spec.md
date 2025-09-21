# InsideOut Store – Especificación de dataLayer

Este documento define los eventos de e-commerce instrumentados para Google Analytics

---

## 1. Evento `sign_up_click`
### Descripción
Se envía cuando el usuario desea inscribirse en la web

### Parámetros

| Nombre            | Tipo     | Descripción                         | Obligatorio |
|-------------------|----------|-------------------------------------|-------------|
| event             | string   | Nombre del evento                   | Sí          |

### Ejemplo de payload

<pre>{ "event": "sign_up_click" } </pre>

## 2. Evento `add_to_cart`

### Descripción
Se envía cuando el usuario agrega un producto al carrito desde la página de producto o listado.

### Parámetros
| Nombre               | Tipo     | Descripción                         | Obligatorio |
|----------------------|----------|-------------------------------------|-------------|
| event                | string   | Nombre del evento                   | Sí          |
| ecommerce            | object   | Objeto de e-commerce                | Sí          |
| ecommerce.item_id    | string   | ID del producto                     | Sí          |
| ecommerce.item_name  | string   | Nombre del producto                 | Sí          |
| ecommerce.item_price | number   | Precio unitario del producto        | Sí          |

### Ejemplo de payload

<pre>{ 
    "event": "add_to_cart", 
    "ecommerce":{
        "item_id":"Prd1",
        "item_name":"Product 1",
        "item_price" 15.66
}}  </pre>



## 3. Evento `begin_checkout `

### Descripción
Se envía cuando el usuario se dirige a la vista de pago

### Parámetros
| Nombre            | Tipo     | Descripción                         | Obligatorio |
|-------------------|----------|-------------------------------------|-------------|
| event             | string   | Nombre del evento                   | Sí          |
| ecommerce         | object   | Objeto de e-commerce                | Sí          |
| ecommerce.currency| string   | Moneda en formato ISO               | Sí          |
| ecommerce.value   | number   | Valor total                         | Sí          |
| ecommerce.items   | array    | Lista de productos                  | Sí          |
| item_id           | string   | ID del producto                     | Sí          |
| item_name         | string   | Nombre del producto                 | Sí          |
| price             | number   | Precio unitario del producto        | Sí          |

### Ejemplo de payload
<pre> {
  "event": "begin_checkout",
  "ecommerce": {
    "currency": "PEN",
    "value": 59.90,
    "items": [
      {
        "item_id": "SKU-123",
        "item_name": "Camiseta Oversize",
        "item_price": 59.90,
      }
    ]
  }
} </pre>
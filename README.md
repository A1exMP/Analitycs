# InsideOut Store – GA4 Technical Test

Este proyecto implementa la instrumentación de eventos de GA usando **dataLayer**, **Google Tag Manager (GTM)** y un servidor local para pruebas.  
Incluye ejemplos de **Custom HTML Tags**, **Custom Variables** y **scripts en JavaScript**.

---

## Requisitos previos

- **Node.js v20.16.0** (recomendado por ser la version utilizada en desarrollo). 
- **Servidor Apache y/o similar**  



## Clonacion del proyecto
git clone https://github.com/<tu-repo>/insideout-store-ga4.git
cd insideout-store-ga4

## Instalar dependencias:
npm install

## Instalar dependencias:
node server.js

## Ejecucion
Copie la carpeta clonada en su servidor apache carpeta www, html o public segun servidor que utilice, adicional los puertos utilizados para este proyecto son para la funcionalidad de GTM 5500 y Servidor 3000


## Ejecucion de pruebas unitarias 
npm test
npm test -t filename.js

# Observacion 
Para ejecutar las pruebas del addToCartDispatcher 
Descomentar la siguiente linea //module.exports = { addToCartDispatcher };

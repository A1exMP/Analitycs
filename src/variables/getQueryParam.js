/**
 * Extrae el valor de un query param desde una URL.
 * 
 * @param {string} url - URL completa o relativa con parámetros.
 * @param {string} name - Nombre del parámetro a buscar.
 * @returns {string|null} - Valor decodificado del parámetro o null si no existe.
 */
function getQueryParam(url, name) {
  try {
    const parsedUrl = new URL(url, "http://dummy-base");
    const value = parsedUrl.searchParams.get(name);

    if (value === null) return null;

    return decodeURIComponent(value);
  } catch (err) {
    console.error("❌ Error en getQueryParam:", err);
    return null;
  }
}

// Export para GTM Custom Variable
if (typeof module !== "undefined") {
  module.exports = getQueryParam;
}

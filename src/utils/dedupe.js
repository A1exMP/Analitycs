const lastEvents = {};

/**
 * Prevenir múltiples add_to_cart en < 500 ms
 */
function preventRapidAddToCart(key) {
  const now = Date.now();
  if (lastEvents[key] && now - lastEvents[key] < 500) {
    return false; // bloqueado por duplicado
  }
  lastEvents[key] = now;
  return true;
}

/**
 * Ejecutar solo una vez por sesión
 */
function oncePerSession(key) {
  try {
    if (typeof sessionStorage === "undefined") {
      global.sessionStorage = {
        store: {},
        getItem(k) { return this.store[k]; },
        setItem(k, v) { this.store[k] = v; },
        clear() { this.store = {}; }
      };
    }
    const flag = sessionStorage.getItem(`once_${key}`);
    if (flag) return false;
    sessionStorage.setItem(`once_${key}`, "1");
    return true;
  } catch (e) {
    return true; // fallback seguro
  }
}


module.exports = {
  preventRapidAddToCart,
  oncePerSession
};

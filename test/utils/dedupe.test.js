// test/utils/dedupe.test.js

const { preventRapidAddToCart, oncePerSession } = require("../../src/utils/dedupe");

// Mock de sessionStorage para Jest (porque Node no lo trae por defecto)
beforeEach(() => {
  const store = {};
  global.sessionStorage = {
    getItem: (key) => (key in store ? store[key] : null),
    setItem: (key, value) => { store[key] = value; },
    removeItem: (key) => { delete store[key]; },
    clear: () => { Object.keys(store).forEach(k => delete store[k]); }
  };
});

describe("preventRapidAddToCart", () => {
  test("permite el primer evento", () => {
    expect(preventRapidAddToCart("test")).toBe(true);
  });

  test("bloquea eventos en menos de 500ms", () => {
    preventRapidAddToCart("test");
    expect(preventRapidAddToCart("test")).toBe(false);
  });

  test("permite eventos después de 500ms", (done) => {
    preventRapidAddToCart("test");

    setTimeout(() => {
      expect(preventRapidAddToCart("test")).toBe(true);
      done();
    }, 600); 
  });
});

describe("oncePerSession", () => {
  test("permite el primer evento en sesión", () => {
    expect(oncePerSession("signup")).toBe(true);
  });

  test("bloquea el mismo evento dentro de la sesión", () => {
    oncePerSession("signup");
    expect(oncePerSession("signup")).toBe(false);
  });

  test("permite un evento distinto en la misma sesión", () => {
    oncePerSession("signup");
    expect(oncePerSession("checkout")).toBe(true);
  });
});

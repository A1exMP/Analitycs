const getQueryParam = require("../../src/variables/getQueryParam");


describe("getQueryParam", () => {
  test("devuelve valor de un parámetro simple", () => {
    const url = "https://localhost:5500?user=alex";
    expect(getQueryParam(url, "user")).toBe("alex");
  });

  test("maneja múltiples parámetros", () => {
    const url = "https://localhost:5500?user=alex&id=123&lang=es";
    expect(getQueryParam(url, "id")).toBe("123");
    expect(getQueryParam(url, "lang")).toBe("es");
  });

  test("devuelve null si parámetro no existe", () => {
    const url = "https://localhost:5500?user=alex";
    expect(getQueryParam(url, "missing")).toBeNull();
  });

  test("decodifica caracteres escapados", () => {
    const url = "https://localhost:5500?search=camiseta%20oversize";
    expect(getQueryParam(url, "search")).toBe("camiseta oversize");
  });

  test("soporta URLs relativas", () => {
    const url = "/checkout?currency=PEN";
    expect(getQueryParam(url, "currency")).toBe("PEN");
  });

  test("maneja valores vacíos", () => {
    const url = "https://localhost:5500?debug=";
    expect(getQueryParam(url, "debug")).toBe("");
  });
});

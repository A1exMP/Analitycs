/**
 * @jest-environment jsdom
 */
window.dataLayer = []
const { addToCartDispatcher } = require("../../src/tags/addToCartDispatcher");

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ status: "ok" }),
  })
);

beforeEach(() => {
  window.dataLayer = [];
  fetch.mockClear();
});

describe("addToCartDispatcher", () => {
  const payload = {
    ecommerce: {
      item_id: "SKU-123",
      item_name: "Camiseta Oversize",
      item_price: 59.9,
    },
  };

  test("envía payload correctamente al llamar dispatcher directamente", async () => {
    await addToCartDispatcher(payload);

  
    expect(fetch).toHaveBeenCalledTimes(1);

    const sentBody = JSON.parse(fetch.mock.calls[0][1].body);
    expect(sentBody.items[0].item_id).toBe(payload.ecommerce.item_id);
    expect(sentBody.items[0].item_name).toBe(payload.ecommerce.item_name);
    expect(sentBody.items[0].item_price).toBe(payload.ecommerce.item_price);
    expect(sentBody.event_id).toBeDefined();
  });

   test("dispatcher se ejecuta al hacer dataLayer.push", async () => {

    const event = {
      event: "add_to_cart",
      ecommerce: {
        item_id: "SKU-123",
        item_name: "Camiseta Oversize",
        item_price: 59.9,
      },
    };


    const promise = addToCartDispatcher(event);
    window.dataLayer.push(event);

    await promise;

    expect(fetch).toHaveBeenCalledTimes(1);

    const sentBody = JSON.parse(fetch.mock.calls[0][1].body);
    expect(sentBody.items[0].item_id).toBe("SKU-123");
    expect(sentBody.items[0].item_name).toBe("Camiseta Oversize");
    expect(sentBody.items[0].item_price).toBe(59.9);
    expect(sentBody.event_name).toBe("add_to_cart");
    expect(sentBody.event_id).toBeDefined();
  });
});

import { renderOrderSummary } from "./checkout/orderSummery.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { loadProducts } from "../data/products.js";
// import "../data/back-end-practice.js";

loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

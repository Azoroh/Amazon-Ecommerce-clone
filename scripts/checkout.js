import { renderOrderSummary } from "./checkout/orderSummery.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import "../data/cart-oop.js";

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();

import { getProduct, loadProductsFetch } from "../data/products.js";
import { orders } from "../data/ordrs.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

const url = new URL(window.location.href);
// console.log(url.searchParams.get("orderId"));
// console.log(url.searchParams.get("productId"));


async function renderTrackingPage() {
  await loadProductsFetch();

  

  const product = getProduct(url.searchParams.get("productId"));
  const order = orders.find((order) => order.id === url.searchParams.get("orderId"));
  const deliveryDate = dayjs(order.estimatedDeliveryTime).format("dddd, MMMM D");
  
  console.log(product);
  console.log(order);
  

  const trackingPageHTML = `
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${deliveryDate}
      </div>

      <div class="product-info">
        Black and Gray Athletic Cotton Socks - 6 Pairs
      </div>

      <div class="product-info">
        Quantity: 1
      </div>

      <img class="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg">

      <div class="progress-labels-container">
        <div class="progress-label">
          Preparing
        </div>
        <div class="progress-label current-status">
          Shipped
        </div>
        <div class="progress-label">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
  `;

  document.querySelector(".js-order-tracking").innerHTML = trackingPageHTML;
}

renderTrackingPage();

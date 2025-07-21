import { orders } from "../data/ordrs.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

async function loadPage() {
  await loadProductsFetch();
  renderOrderPage();
}

loadPage();

export function renderOrderPage() {
  let orderPageHTML = "";

  orders.forEach((order) => {
    //CALCULATE TOTALCOST OF ORDER
    const totalCostCents = order.totalCostCents;
    const orderDate = dayjs(order.orderTime).format("MMMM D, YYYY");

    orderPageHTML += `
        <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

      <div class="order-details-grid">
    `;

    // Loop through each product in the order
    // and create a product container
    order.products.forEach((orderProduct) => {
      const product = getProduct(orderProduct.productId);
      // console.log(product);

      const deliveryDate = dayjs(orderProduct.estimatedDeliveryTime).format(
        "dddd, MMMM D"
      );

      orderPageHTML += `
        
          <div class="product-image-container">
            <img src="${product.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${deliveryDate}
            </div>
            <div class="product-quantity">
              Quantity: ${orderProduct.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${product.id}" data-it='${product.id}'>
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
      `;
    });

    // Close the order container
    orderPageHTML += `
        </div>
      </div>
    `;
  });
  document.querySelector(".js-order-grid").innerHTML = orderPageHTML;

  
}

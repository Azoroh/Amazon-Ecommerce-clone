import {
  cart,
  calculateCartQuantity,
  updateQuantity,
  removeFromCart,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartSummaryHTML;

updateCartQuantity();

function updateCartQuantity() {
  //add total number of items to cartquantity variable
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  //render cartQuantity to the page
  document.querySelector(
    ".return-to-home-link"
  ).innerHTML = `${cartQuantity} items`;
}

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  console.log(cartItem.quantity);

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  // console.log(matchingProduct);

  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${
      matchingProduct.id
    }">
      <div class="delivery-date">
        Delivery date: Wednesday, June 15
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id='${
              matchingProduct.id
            }' data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input quantity-input-${
              matchingProduct.id
            }" data-product-id="${matchingProduct.id}">
            <span class="save-link link-primary js-save-link" data-product-id='${
              matchingProduct.id
            }'>Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id='${
              matchingProduct.id
            }'>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>

          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${
              matchingProduct.id
            }">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option-${
              matchingProduct.id
            }">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${
              matchingProduct.id
            }">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;

    removeFromCart(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.remove();
    updateCartQuantity();
  });
});

document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
  link.addEventListener("click", () => {
    const { productId } = link.dataset;
    console.log(productId);

    const container = document.querySelector(
      `.js-cart-item-container-${productId}`
    );
    container.classList.add("is-editing-quantity");
  });
});

document.querySelectorAll(".js-save-link").forEach((link) => {
  link.addEventListener("click", () => {
    // const inputQuantity = Number(
    //   document.querySelector(`.quantity-input-${productId}`).value
    // );
    // console.log(inputQuantity);

    // updateQuantity(productId, inputQuantity);

    // const container = document.querySelector(
    //   `.js-cart-item-container-${productId}`
    // );
    // container.classList.remove("is-editing-quantity");
    // document.querySelector(`.quantity-input-${productId}`).value = "";
    // updateCartQuantity();

    const { productId } = link.dataset;
    saveNewQuantity(productId);
  });
});

function saveNewQuantity(productId) {
  const container = document.querySelector(
    `.js-cart-item-container-${productId}`
  );

  const inputElement = document.querySelector(`.quantity-input-${productId}`);
  const inputQuantity = Number(inputElement.value);

  if (inputQuantity > 0 && inputQuantity < 1000) {
    updateQuantity(productId, inputQuantity);
    container.querySelector(".quantity-label").innerHTML = inputQuantity;
    // cartItem.quantity = newQuantity;
  } else {
    if (inputQuantity === 0) {
      removeFromCart(productId);
      container.remove();
    } else {
      return;
    }
  }

  container.classList.remove("is-editing-quantity");
  updateCartQuantity();
}

document.querySelectorAll(".quantity-input").forEach((input) => {
  input.addEventListener("keydown", (event) => {
    console.log(event.key);
    if (event.key === "Enter") {
      const { productId } = input.dataset;
      saveNewQuantity(productId);
    }
  });
});

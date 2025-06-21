//to avoid naming conflicts with javascript modules. we can simply rename imported modules. e.g: {cart as myCart}
import { cart, addToCart } from "../data/cart.js";
import { products } from "../data/products.js";

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="images/ratings/rating-${
            product.rating.stars * 10
          }.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${(product.priceCents / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
    </div>
  `;
});

//render to page
document.querySelector(".js-products-grid").innerHTML = productsHTML;

function updateCartQuantity() {
  //add total number of items to cartquantity variable
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  //render cartQuantity to the page
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}

//loop through the products add to cart buttons
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  //clicking the add to cart button adds the particular product to the cart
  button.addEventListener("click", () => {
    const productContainer = button.closest(".product-container");
    const addedToCartDiv = productContainer.querySelector(".added-to-cart");

    let timeOutId;
    let addedAlert;

    if (!addedAlert) {
      addedToCartDiv.classList.add("js-added");
      addedAlert = true;
    }
    clearTimeout(timeOutId);

    timeOutId = setTimeout(() => {
      if (addedAlert) {
        addedToCartDiv.classList.remove("js-added");
      }
    }, 2000);

    //grab each items product id from the dataset in the generated html
    const { productId } = button.dataset;
    console.log(productId);

    addToCart(productId);

    updateCartQuantity();
  });
});

// console.log(document.querySelector(".js-quantity-selector-${product.id}"));

export const cart = [];

export function addToCart(productId) {
  let selectedQuantity = Number(
    document.querySelector(`.js-quantity-selector-${productId}`).value
  );

  let matchingItem;

  //loop through the cart, if item match assign it to matchingItem variable
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // check if matchItem is true (not empty), then increase the quantity is true or push new item to the cart
  if (matchingItem) {
    matchingItem.quantity += selectedQuantity;
  } else {
    cart.push({ productId, quantity: selectedQuantity });
  }
}
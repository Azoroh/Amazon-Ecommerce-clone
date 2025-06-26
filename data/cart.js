export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
}

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

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

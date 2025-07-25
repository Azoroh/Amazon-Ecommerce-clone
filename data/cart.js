export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
}

// export function updateQuantity(productId, newQuantity) {
//   let matchingItem;

//   cart.forEach((cartItem) => {
//     if (cartItem.productId === productId) {
//       matchingItem = cartItem;
//     }
//   });

//   matchingItem.quantity = newQuantity;

//   saveToStorage();
// }

export function calculateCartQuantity() {
  //add total number of items to cartquantity variable
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  //render cartQuantity to the page
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
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
    cart.push({ productId, quantity: selectedQuantity, deliveryOptionId: "1" });
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

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

/*
export function loadCart(func) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);
    func();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}
  */

export async function loadCartFetch(func) {
  const res = await fetch("https://supersimplebackend.dev/cart");
  const message = await res.text();
  console.log(message);
  if (typeof func === "function") {
    func();
  }
  return message;
}

import { renderOrderSummary } from "./checkout/orderSummery.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/back-end-practice.js";

// JAVASCRIPT PROMISES
// new Promise((resolve) => {
//   //we set the promise
//   console.log("start promise");
//   loadProducts(() => {
//     //we run this asynchronous code and wait for it to finish
//     console.log("finished loading");
//     resolve(); // and then we run resolve. resolve() makes it to go to the next step
//   });
// }).then(() => {
//   console.log("next step");
// });
// let array = [1,2,3,4,5,6,7,8,9]
// let newArray = [... array.map(num => num * 2)]
// console.log(newArray);

//ASYNC
async function loadPage() {
  // await loadProductsFetch();

  // await new Promise((resolve) => {
  //   loadCart(() => {
  //     resolve();
  //   });
  // });

  await Promise.all([
    loadProductsFetch(),

    new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    }),
  ]);

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

//PROMISE.ALL
/*
Promise.all([
  loadProductsFetch(),

  new Promise((resolve) => {
    loadCart(() => {
      resolve("allow");
    });
  }),
]).then((values) => {
  console.log(values); //logs an array on values we gave to the resolves

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve("hey you!");
//   });
// })

//   .then((greet) => {
//     console.log(greet);

//     return new Promise((resolve) => {
//       loadCart(() => {
//         resolve();
//       });
//     });
//   })

//   .then(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
//   });

// OUR PREVIOUS CALLBACK. NOW REPLACED BY THE PROMISE ABOVE
// loadProducts(() => {
//   loadCart(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });

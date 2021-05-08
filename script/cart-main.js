let carts = document.querySelectorAll(".add-cart");
console.log("carts :>> ", carts);

const products = [
  {
    name: "LINEN WORKER JACKET",
    price: 100.99,
    quantity: 0,
  },
  {
    name: "BEIGE LINEN JACKET",
    price: 129.99,
    quantity: 0,
  },
  {
    name: "BLACK RIDER JACKET",
    price: 250.99,
    quantity: 0,
  },
  {
    name: "BLACK WORKER JACKET",
    price: 129.99,
    quantity: 0,
  },
];

carts.forEach((cart, index) =>
  cart.addEventListener("click", () => {
    cartNumbers(products[index]);
  })
);

function cartNumbers() {
  let cartTotalNumbers = parseInt(localStorage.getItem("cartTotalNumbers"));

  cartTotalNumbers
    ? (localStorage.setItem("cartTotalNumbers", cartTotalNumbers + 1),
      (document.getElementById("basket-number").textContent = cartTotalNumbers))
    : localStorage.setItem("cartTotalNumbers", 1);

  console.log("cartTotalNumbers :>> ", cartTotalNumbers);
}

const cartNumberOnload = () => {
  let cartTotalNumbers = parseInt(localStorage.getItem("cartTotalNumbers"));
  console.log("basketNumer :>> ", cartTotalNumbers);

  cartTotalNumbers
    ? (document.getElementById("basket-number").textContent = cartTotalNumbers)
    : (document.getElementById("basket-number").textContent = 0);
};

cartNumberOnload();

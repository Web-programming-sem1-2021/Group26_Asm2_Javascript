let carts = document.querySelectorAll(".add-cart");
console.log("carts :>> ", carts);

const products = [
  {
    name: "LINEN WORKER JACKET",
    price: 100.99,
    tag: "jacket1",
    quantity: 0,
  },
  {
    name: "BEIGE LINEN JACKET",
    price: 129.99,
    tag: "jacket2",

    quantity: 0,
  },
  {
    name: "BLACK RIDER JACKET",
    price: 250.99,
    tag: "jacket3",
    quantity: 0,
  },
  {
    name: "BLACK WORKER JACKET",
    price: 129.99,
    tag: "jacket4",
    quantity: 0,
  },
];

carts.forEach((cart, index) =>
  cart.addEventListener("click", () => {
    cartNumbers(products[index]);
    totalCost(products[index]);
  })
);

function cartNumbers(product) {
  console.log("product :>> ", product);
  let cartTotalNumbers = parseInt(localStorage.getItem("cartTotalNumbers"));

  cartTotalNumbers
    ? (localStorage.setItem("cartTotalNumbers", cartTotalNumbers + 1),
      (document.getElementById("basket-number").textContent = cartTotalNumbers))
    : localStorage.setItem("cartTotalNumbers", 1);

  setItems(product);

  console.log("cartTotalNumbers :>> ", cartTotalNumbers);
}

const setItems = (product) => {
  let { name, price, quantity, tag } = product;

  let cartItems = localStorage.getItem("productsInCart");

  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
  } else {
    (product.quantity = 1), (cartItems = { [product.tag]: product });
  }

  console.log("cartsItem :>> ", cartItems);

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
};

const cartNumberOnload = () => {
  let cartTotalNumbers = parseInt(localStorage.getItem("cartTotalNumbers"));
  console.log("basketNumer :>> ", cartTotalNumbers);

  cartTotalNumbers
    ? (document.getElementById("basket-number").textContent = cartTotalNumbers)
    : (document.getElementById("basket-number").textContent = 0);
};

const totalCost = (product) => {
  let total = localStorage.getItem("totalCost");

  console.log("parseInt(total) :>> ", typeof parseFloat(total));

  if (total != null) {
    total = parseFloat(total);
    localStorage.setItem("totalCost", total + product.price);
    console.log("total :>> ", total);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
};

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector
    (".products");
    let total = localStorage.getItem("totalCost");

    console.log(cartItems);
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(Item=>{
            productContainer.innerHTML += '<div class="product"><ion-icon name="close-circle"></ion-icon><img src="../storepages/images/Jacket/${item.tag}.jpeg"><span>${item.name}</span></div><div class="price">$${item.price},00</div><div class="quantity"><ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon><span>${item.inCart}</span><ion-icon class="increase" name="arrow-dropright-circle"></ion-icon></div><div class="total">$${item.inCart * item.price},00</div>'
        });
        productContainerinnerHTMl +='<div class="basketTotalContainer"><h4 class="basketTotal">Basket Total</h4><h4 class"basketTotal">$${cartCost},00</h4>'

    }
}

cartNumberOnload();
displayCart();
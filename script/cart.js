//TODO: Jeong-hyeon


if (document.readyState == 'loading'){
  document.addEventListener('DOMContentLoaded',ready)
} else{
  ready()
}

function ready(){
      var removeProduct = document.getElementsByClassName('delete')
      for (var i = 0; i<removeProduct.length; i++){
        var button = removeProduct[i]
        button.addEventListener('click', removeCartItem) 
  }

  var quantityInputs= document.getElementsByClassName('quantity-input')
  for (var i=0; i<quantityInputs.length; i++){
    var input = quantityInputs[i]
    input.addEventListener('change',quantityChanged)
}
  var addToCartButtons = document.getElementsByName("addToCartButton")
      for (var i=0; i<addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click',addToCartClicked)
}
}

function removeCartItem() {
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotal()
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value=1
  }
  updateCartTotal()
}

function addToCartClicked(event){
  var button = event.target
  var shopItem = button.parentElement.parentElement.parentElement
  var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
  var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
  console.log(title,price,imageSrc)
  addItemToCart(title, price, imageSrc)
}
function getElements(){
 var div = $('#cart-row')
  $.get( "../storepages/product-1.html", function(response) {
    for(var i = 0; i < data.length; i++){
      div.append($(response));
    }

  });
}
function addItemToCart(title, price, imageSrc){
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart-row')
  var cartItems = document.getElementsByClassName('cart-row')[0]
  var cartRowContents = "<div class='item'><div class='product_image'><img src='${imageSrc}' /></div><div class='description'><h1 class='cart-title'>${title}</H1><h2>Out of Stock - Ships in 1-3 Weeks</h2><h3 class='delete'>Delete</h3><h3 class='save'>Save</h3></div><div class='product_quantity'><div class='quantity_button'><span class='stepper'><input class='quantity-input' type='number' value='1'></span></div></div><div class='price'>${price}</div> </div>"
  cartRow.innerHTML=cartRowContents
  var div = $('#cart')
  $.get( "../storepages/product-1.html", function(response) {
    for(var i = 0; i < cartRow.length; i++){
      div.append($(cartRow));
    }

  });
}

function updateCartTotal(){
  var cartItemContainer = document.getElementsByClassName('cart')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var total = 0
    for (var i=0; i<cartRows.length; i++){
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('price')[0]
      var quantityElement = cartRow.getElementsByClassName('quantity-input')[0]
      var quantity = quantityElement.value
      var price = parseFloat(priceElement.innerText.replace('$',''))
      total = total + price * quantity
    }
    total = Math.round(total*100) / 100
    document.getElementsByClassName('totalPrice')[0].innerText = '$' + total
  }


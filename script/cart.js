//TODO: Jeong-hyeon


// if (document.readyState == 'loading'){
//   document.addEventListener('DOMContentLoaded',ready)
// } else{
//   ready()
// }

// function ready(){
//       var removeProduct = document.getElementsByClassName('delete')
//       for (var i = 0; i<removeProduct.length; i++){
//         var button = removeProduct[i]
//         button.addEventListener('click', removeCartItem) 
//   }

//   var quantityInputs= document.getElementsByClassName('quantity-input')
//   for (var i=0; i<quantityInputs.length; i++){
//     var input = quantityInputs[i]
//     input.addEventListener('change',quantityChanged)
// }
//   var addToCartButtons = document.getElementsByName("addToCartButton")
//       for (var i=0; i<addToCartButtons.length; i++){
//         var button = addToCartButtons[i]
//         button.addEventListener('click',addToCartClicked)
// }
// }

// function removeCartItem() {
//   var buttonClicked = event.target
//   buttonClicked.parentElement.parentElement.remove()
//   updateCartTotal()
// }

// function quantityChanged(event) {
//   var input = event.target
//   if (isNaN(input.value) || input.value <= 0) {
//     input.value=1
//   }
//   updateCartTotal()
// }

// function addToCartClicked(event){
//   var button = event.target
//   var shopItem = button.parentElement.parentElement.parentElement
//   var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
//   var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
//   var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
//   console.log(title,price,imageSrc)
//   addItemToCart(title, price, imageSrc)
// }
// function getElements(){
//  var div = $('#cart-row')
//   $.get( "../storepages/product-1.html", function(response) {
//     for(var i = 0; i < data.length; i++){
//       div.append($(response));
//     }

//   });
// }
// function addItemToCart(title, price, imageSrc){
//   var cartRow = document.createElement('div')
//   cartRow.classList.add('cart-row')
//   var cartItems = document.getElementsByClassName('cart-row')[0]
//   var cartRowContents = "<div class='item'><div class='product_image'><img src='${imageSrc}' /></div><div class='description'><h1 class='cart-title'>${title}</H1><h2>Out of Stock - Ships in 1-3 Weeks</h2><h3 class='delete'>Delete</h3><h3 class='save'>Save</h3></div><div class='product_quantity'><div class='quantity_button'><span class='stepper'><input class='quantity-input' type='number' value='1'></span></div></div><div class='price'>${price}</div> </div>"
//   cartRow.innerHTML=cartRowContents
//   var div = $('#cart')
//   $.get( "../storepages/product-1.html", function(response) {
//     for(var i = 0; i < cartRow.length; i++){
//       div.append($(cartRow));
//     }

//   });
// }

// function updateCartTotal(){
//   var cartItemContainer = document.getElementsByClassName('cart')[0]
//   var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//   var total = 0
//     for (var i=0; i<cartRows.length; i++){
//       var cartRow = cartRows[i]
//       var priceElement = cartRow.getElementsByClassName('price')[0]
//       var quantityElement = cartRow.getElementsByClassName('quantity-input')[0]
//       var quantity = quantityElement.value
//       var price = parseFloat(priceElement.innerText.replace('$',''))
//       total = total + price * quantity
//     }
//     total = Math.round(total*100) / 100
//     document.getElementsByClassName('totalPrice')[0].innerText = '$' + total
//   }










  (function( $ ) {
    $.Shop = function( element ) {
      this.$element = $( element );
      this.init();
    };
    
    $.Shop.prototype = {
      init: function() {
      
          // Properties
      
        this.cartPrefix = "winery-"; // Prefix string to be prepended to the cart's name in the session storage
        this.cartName = this.cartPrefix + "cart"; // Cart name in the session storage
        this.shippingRates = this.cartPrefix + "shipping-rates"; // Shipping rates key in the session storage
        this.total = this.cartPrefix + "total"; // Total key in the session storage
        this.storage = sessionStorage; // shortcut to the sessionStorage object
        
        
        this.$formAddToCart = this.$element.find( "form.add-to-cart" ); // Forms for adding items to the cart
        this.$formCart = this.$element.find( "#shopping-cart" ); // Shopping cart form
        this.$checkoutCart = this.$element.find( "#checkout-cart" ); // Checkout form cart
        this.$checkoutOrderForm = this.$element.find( "#checkout-order-form" ); // Checkout user details form
        this.$shipping = this.$element.find( "#sshipping" ); // Element that displays the shipping rates
        this.$subTotal = this.$element.find( "#stotal" ); // Element that displays the subtotal charges
        this.$shoppingCartActions = this.$element.find( "#shopping-cart-actions" ); // Cart actions links
        this.$updateCartBtn = this.$shoppingCartActions.find( "#update-cart" ); // Update cart button
        this.$emptyCartBtn = this.$shoppingCartActions.find( "#empty-cart" ); // Empty cart button
        this.$userDetails = this.$element.find( "#user-details-content" ); // Element that displays the user information
        this.$paypalForm = this.$element.find( "#paypal-form" ); // PayPal form
        
        
        this.currency = "&euro;"; // HTML entity of the currency to be displayed in the layout
        this.currencyString = "€"; // Currency symbol as textual string
        this.paypalCurrency = "EUR"; // PayPal's currency code
        this.paypalBusinessEmail = "yourbusiness@email.com"; // Your Business PayPal's account email address
        this.paypalURL = "https://www.sandbox.paypal.com/cgi-bin/webscr"; // The URL of the PayPal's form
        
        // Object containing patterns for form validation
        this.requiredFields = {
          expression: {
            value: /^([\w-\.]+)@((?:[\w]+\.)+)([a-z]){2,4}$/
          },
          
          str: {
            value: ""
          }
          
        };
        
        // Method invocation
        
        this.createCart();
        this.handleAddToCartForm();
        this.handleCheckoutOrderForm();
        this.emptyCart();
        this.updateCart();
        this.displayCart();
        this.deleteProduct();
        this.displayUserDetails();
        this.populatePayPalForm();
        
        
      },
      
      // Public methods
      
      // Creates the cart keys in the session storage
      
      createCart: function() {
        if( this.storage.getItem( this.cartName ) == null ) {
        
          var cart = {};
          cart.items = [];
        
          this.storage.setItem( this.cartName, this._toJSONString( cart ) );
          this.storage.setItem( this.shippingRates, "0" );
          this.storage.setItem( this.total, "0" );
        }
      },
      
      // Appends the required hidden values to the PayPal's form before submitting
      
      populatePayPalForm: function() {
        var self = this;
        if( self.$paypalForm.length ) {
          var $form = self.$paypalForm;
          var cart = self._toJSONObject( self.storage.getItem( self.cartName ) );
          var shipping = self.storage.getItem( self.shippingRates );
          var numShipping = self._convertString( shipping );
          var cartItems = cart.items; 
          var singShipping = Math.floor( numShipping / cartItems.length );
          
          $form.attr( "action", self.paypalURL );
          $form.find( "input[name='business']" ).val( self.paypalBusinessEmail );
          $form.find( "input[name='currency_code']" ).val( self.paypalCurrency );
          
          for( var i = 0; i < cartItems.length; ++i ) {
            var cartItem = cartItems[i];
            var n = i + 1;
            var name = cartItem.product;
            var price = cartItem.price;
            var qty = cartItem.qty;
            
            $( "<div/>" ).html( "<input type='hidden' name='quantity_" + n + "' value='" + qty + "'/>" ).
            insertBefore( "#paypal-btn" );
            $( "<div/>" ).html( "<input type='hidden' name='item_name_" + n + "' value='" + name + "'/>" ).
            insertBefore( "#paypal-btn" );
            $( "<div/>" ).html( "<input type='hidden' name='item_number_" + n + "' value='SKU " + name + "'/>" ).
            insertBefore( "#paypal-btn" );
            $( "<div/>" ).html( "<input type='hidden' name='amount_" + n + "' value='" + self._formatNumber( price, 2 ) + "'/>" ).
            insertBefore( "#paypal-btn" );
            $( "<div/>" ).html( "<input type='hidden' name='shipping_" + n + "' value='" + self._formatNumber( singShipping, 2 ) + "'/>" ).
            insertBefore( "#paypal-btn" );
            
          }
          
          
          
        }
      },
      
      // Displays the user's information
      
      displayUserDetails: function() {
        if( this.$userDetails.length ) {
          if( this.storage.getItem( "shipping-name" ) == null ) {
            var name = this.storage.getItem( "billing-name" );
            var email = this.storage.getItem( "billing-email" );
            var city = this.storage.getItem( "billing-city" );
            var address = this.storage.getItem( "billing-address" );
            var zip = this.storage.getItem( "billing-zip" );
            var country = this.storage.getItem( "billing-country" );
            
            var html = "<div class='detail'>";
              html += "<h2>Billing and Shipping</h2>";
              html += "<ul>";
              html += "<li>" + name + "</li>";
              html += "<li>" + email + "</li>";
              html += "<li>" + city + "</li>";
              html += "<li>" + address + "</li>";
              html += "<li>" + zip + "</li>";
              html += "<li>" + country + "</li>";
              html += "</ul></div>";
              
            this.$userDetails[0].innerHTML = html;
          } else {
            var name = this.storage.getItem( "billing-name" );
            var email = this.storage.getItem( "billing-email" );
            var city = this.storage.getItem( "billing-city" );
            var address = this.storage.getItem( "billing-address" );
            var zip = this.storage.getItem( "billing-zip" );
            var country = this.storage.getItem( "billing-country" );
            
            var sName = this.storage.getItem( "shipping-name" );
            var sEmail = this.storage.getItem( "shipping-email" );
            var sCity = this.storage.getItem( "shipping-city" );
            var sAddress = this.storage.getItem( "shipping-address" );
            var sZip = this.storage.getItem( "shipping-zip" );
            var sCountry = this.storage.getItem( "shipping-country" );
            
            var html = "<div class='detail'>";
              html += "<h2>Billing</h2>";
              html += "<ul>";
              html += "<li>" + name + "</li>";
              html += "<li>" + email + "</li>";
              html += "<li>" + city + "</li>";
              html += "<li>" + address + "</li>";
              html += "<li>" + zip + "</li>";
              html += "<li>" + country + "</li>";
              html += "</ul></div>";
              
              html += "<div class='detail right'>";
              html += "<h2>Shipping</h2>";
              html += "<ul>";
              html += "<li>" + sName + "</li>";
              html += "<li>" + sEmail + "</li>";
              html += "<li>" + sCity + "</li>";
              html += "<li>" + sAddress + "</li>";
              html += "<li>" + sZip + "</li>";
              html += "<li>" + sCountry + "</li>";
              html += "</ul></div>";
              
            this.$userDetails[0].innerHTML = html;	
          
          }
        }
      },
  
      // Delete a product from the shopping cart
  
      deleteProduct: function() {
        var self = this;
        if( self.$formCart.length ) {
          var cart = this._toJSONObject( this.storage.getItem( this.cartName ) );
          var items = cart.items;
  
          $( document ).on( "click", ".pdelete a", function( e ) {
            e.preventDefault();
            var productName = $( this ).data( "product" );
            var newItems = [];
            for( var i = 0; i < items.length; ++i ) {
              var item = items[i];
              var product = item.product;	
              if( product == productName ) {
                items.splice( i, 1 );
              }
            }
            newItems = items;
            var updatedCart = {};
            updatedCart.items = newItems;
  
            var updatedTotal = 0;
            var totalQty = 0;
            if( newItems.length == 0 ) {
              updatedTotal = 0;
              totalQty = 0;
            } else {
              for( var j = 0; j < newItems.length; ++j ) {
                var prod = newItems[j];
                var sub = prod.price * prod.qty;
                updatedTotal += sub;
                totalQty += prod.qty;
              }
            }
  
            self.storage.setItem( self.total, self._convertNumber( updatedTotal ) );
            self.storage.setItem( self.shippingRates, self._convertNumber( self._calculateShipping( totalQty ) ) );
  
            self.storage.setItem( self.cartName, self._toJSONString( updatedCart ) );
            $( this ).parents( "tr" ).remove();
            self.$subTotal[0].innerHTML = self.currency + " " + self.storage.getItem( self.total );
          });
        }
      },
      
      // Displays the shopping cart
      
      displayCart: function() {
        if( this.$formCart.length ) {
          var cart = this._toJSONObject( this.storage.getItem( this.cartName ) );
          var items = cart.items;
          var $tableCart = this.$formCart.find( ".shopping-cart" );
          var $tableCartBody = $tableCart.find( "tbody" );
  
          if( items.length == 0 ) {
            $tableCartBody.html( "" );	
          } else {
          
          
            for( var i = 0; i < items.length; ++i ) {
              var item = items[i];
              var product = item.product;
              var price = this.currency + " " + item.price;
              var qty = item.qty;
              var html = "<tr><td class='pname'>" + product + "</td>" + "<td class='pqty'><input type='text' value='" + qty + "' class='qty'/></td>";
                  html += "<td class='pprice'>" + price + "</td><td class='pdelete'><a href='' data-product='" + product + "'>&times;</a></td></tr>";
            
              $tableCartBody.html( $tableCartBody.html() + html );
            }
  
          }
  
          if( items.length == 0 ) {
            this.$subTotal[0].innerHTML = this.currency + " " + 0.00;
          } else {	
          
            var total = this.storage.getItem( this.total );
            this.$subTotal[0].innerHTML = this.currency + " " + total;
          }
        } else if( this.$checkoutCart.length ) {
          var checkoutCart = this._toJSONObject( this.storage.getItem( this.cartName ) );
          var cartItems = checkoutCart.items;
          var $cartBody = this.$checkoutCart.find( "tbody" );
  
          if( cartItems.length > 0 ) {
          
            for( var j = 0; j < cartItems.length; ++j ) {
              var cartItem = cartItems[j];
              var cartProduct = cartItem.product;
              var cartPrice = this.currency + " " + cartItem.price;
              var cartQty = cartItem.qty;
              var cartHTML = "<tr><td class='pname'>" + cartProduct + "</td>" + "<td class='pqty'>" + cartQty + "</td>" + "<td class='pprice'>" + cartPrice + "</td></tr>";
            
              $cartBody.html( $cartBody.html() + cartHTML );
            }
          } else {
            $cartBody.html( "" );	
          }
  
          if( cartItems.length > 0 ) {
          
            var cartTotal = this.storage.getItem( this.total );
            var cartShipping = this.storage.getItem( this.shippingRates );
            var subTot = this._convertString( cartTotal ) + this._convertString( cartShipping );
          
            this.$subTotal[0].innerHTML = this.currency + " " + this._convertNumber( subTot );
            this.$shipping[0].innerHTML = this.currency + " " + cartShipping;
          } else {
            this.$subTotal[0].innerHTML = this.currency + " " + 0.00;
            this.$shipping[0].innerHTML = this.currency + " " + 0.00;	
          }
        
        }
      },
      
      // Empties the cart by calling the _emptyCart() method
      // @see $.Shop._emptyCart()
      
      emptyCart: function() {
        var self = this;
        if( self.$emptyCartBtn.length ) {
          self.$emptyCartBtn.on( "click", function() {
            self._emptyCart();
          });
        }
      },
      
      // Updates the cart
      
      updateCart: function() {
        var self = this;
        if( self.$updateCartBtn.length ) {
        self.$updateCartBtn.on( "click", function() {
          var $rows = self.$formCart.find( "tbody tr" );
          var cart = self.storage.getItem( self.cartName );
          var shippingRates = self.storage.getItem( self.shippingRates );
          var total = self.storage.getItem( self.total );
          
          var updatedTotal = 0;
          var totalQty = 0;
          var updatedCart = {};
          updatedCart.items = [];
          
          $rows.each(function() {
            var $row = $( this );
            var pname = $.trim( $row.find( ".pname" ).text() );
            var pqty = self._convertString( $row.find( ".pqty > .qty" ).val() );
            var pprice = self._convertString( self._extractPrice( $row.find( ".pprice" ) ) );
            
            var cartObj = {
              product: pname,
              price: pprice,
              qty: pqty
            };
            
            updatedCart.items.push( cartObj );
            
            var subTotal = pqty * pprice;
            updatedTotal += subTotal;
            totalQty += pqty;
          });
          
          self.storage.setItem( self.total, self._convertNumber( updatedTotal ) );
          self.storage.setItem( self.shippingRates, self._convertNumber( self._calculateShipping( totalQty ) ) );
          self.storage.setItem( self.cartName, self._toJSONString( updatedCart ) );
          
        });
        }
      },
      
      // Adds items to the shopping cart
      
      handleAddToCartForm: function() {
        var self = this;
        self.$formAddToCart.each(function() {
          var $form = $( this );
          var $product = $form.parent();
          var price = self._convertString( $product.data( "price" ) );
          var name =  $product.data( "name" );
          
          $form.on( "submit", function() {
            var qty = self._convertString( $form.find( ".qty" ).val() );
            var subTotal = qty * price;
            var total = self._convertString( self.storage.getItem( self.total ) );
            var sTotal = total + subTotal;
            self.storage.setItem( self.total, sTotal );
            self._addToCart({
              product: name,
              price: price,
              qty: qty
            });
            var shipping = self._convertString( self.storage.getItem( self.shippingRates ) );
            var shippingRates = self._calculateShipping( qty );
            var totalShipping = shipping + shippingRates;
            
            self.storage.setItem( self.shippingRates, totalShipping );
          });
        });
      },
      
      // Handles the checkout form by adding a validation routine and saving user's info into the session storage
      
      handleCheckoutOrderForm: function() {
        var self = this;
        if( self.$checkoutOrderForm.length ) {
          var $sameAsBilling = $( "#same-as-billing" );
          $sameAsBilling.on( "change", function() {
            var $check = $( this );
            if( $check.prop( "checked" ) ) {
              $( "#fieldset-shipping" ).slideUp( "normal" );
            } else {
              $( "#fieldset-shipping" ).slideDown( "normal" );
            }
          });
          
          self.$checkoutOrderForm.on( "submit", function() {
            var $form = $( this );
            var valid = self._validateForm( $form );
            
            if( !valid ) {
              return valid;
            } else {
              self._saveFormData( $form );
            }
          });
        }
      },
      
      // Private methods
      
      
      // Empties the session storage
      
      _emptyCart: function() {
        this.storage.clear();
      },
      
      /* Format a number by decimal places
       * @param num Number the number to be formatted
       * @param places Number the decimal places
       * @returns n Number the formatted number
       */
       
       
      
      _formatNumber: function( num, places ) {
        var n = num.toFixed( places );
        return n;
      },
      
      /* Extract the numeric portion from a string
       * @param element Object the jQuery element that contains the relevant string
       * @returns price String the numeric string
       */
      
      
      _extractPrice: function( element ) {
        var self = this;
        var text = element.text();
        var price = text.replace( self.currencyString, "" ).replace( " ", "" );
        return price;
      },
      
      /* Converts a numeric string into a number
       * @param numStr String the numeric string to be converted
       * @returns num Number the number
       */
      
      _convertString: function( numStr ) {
        var num;
        if( /^[-+]?[0-9]+\.[0-9]+$/.test( numStr ) ) {
          num = parseFloat( numStr );
        } else if( /^\d+$/.test( numStr ) ) {
          num = parseInt( numStr, 10 );
        } else {
          num = Number( numStr );
        }
        
        if( !isNaN( num ) ) {
          return num;
        } else {
          console.warn( numStr + " cannot be converted into a number" );
          return false;
        }
      },
      
      /* Converts a number to a string
       * @param n Number the number to be converted
       * @returns str String the string returned
       */
      
      _convertNumber: function( n ) {
        var str = n.toString();
        return str;
      },
      
      /* Converts a JSON string to a JavaScript object
       * @param str String the JSON string
       * @returns obj Object the JavaScript object
       */
      
      _toJSONObject: function( str ) {
        var obj = JSON.parse( str );
        return obj;
      },
      
      /* Converts a JavaScript object to a JSON string
       * @param obj Object the JavaScript object
       * @returns str String the JSON string
       */
      
      
      _toJSONString: function( obj ) {
        var str = JSON.stringify( obj );
        return str;
      },
      
      
      /* Add an object to the cart as a JSON string
       * @param values Object the object to be added to the cart
       * @returns void
       */
      
      
      _addToCart: function( values ) {
        var cart = this.storage.getItem( this.cartName );
        
        var cartObject = this._toJSONObject( cart );
        var cartCopy = cartObject;
        var items = cartCopy.items;
        items.push( values );
        
        this.storage.setItem( this.cartName, this._toJSONString( cartCopy ) );
      },
      
      /* Custom shipping rates calculation based on the total quantity of items in the cart
       * @param qty Number the total quantity of items
       * @returns shipping Number the shipping rates
       */
      
      _calculateShipping: function( qty ) {
        var shipping = 0;
        if( qty >= 6 ) {
          shipping = 10;
        }
        if( qty >= 12 && qty <= 30 ) {
          shipping = 20;	
        }
        
        if( qty >= 30 && qty <= 60 ) {
          shipping = 30;	
        }
        
        if( qty > 60 ) {
          shipping = 0;
        }
        
        return shipping;
      
      },
      
      /* Validates the checkout form
       * @param form Object the jQuery element of the checkout form
       * @returns valid Boolean true for success, false for failure
       */
       
       
      
      _validateForm: function( form ) {
        var self = this;
        var fields = self.requiredFields;
        var $visibleSet = form.find( "fieldset:visible" );
        var valid = true;
        
        form.find( ".message" ).remove();
        
        $visibleSet.each(function() {
        
        $( this ).find( ":input" ).each(function() {
          var $input = $( this );
          var type = $input.data( "type" );
          var msg = $input.data( "message" );
          
          if( type == "string" ) {
            if( $input.val() == fields.str.value ) {
              $( "<span class='message'/>" ).text( msg ).
              insertBefore( $input );
              
              valid = false;
            }
          } else {
            if( !fields.expression.value.test( $input.val() ) ) {
              $( "<span class='message'/>" ).text( msg ).
              insertBefore( $input );
              
              valid = false;
            }
          }
          
        });
        });
        
        return valid;
      
      },
      
      /* Save the data entered by the user in the ckeckout form
       * @param form Object the jQuery element of the checkout form
       * @returns void
       */
      
      
      _saveFormData: function( form ) {
        var self = this;
        var $visibleSet = form.find( "fieldset:visible" );
        
        $visibleSet.each(function() {
          var $set = $( this );
          if( $set.is( "#fieldset-billing" ) ) {
            var name = $( "#name", $set ).val();
            var email = $( "#email", $set ).val();
            var city = $( "#city", $set ).val();
            var address = $( "#address", $set ).val();
            var zip = $( "#zip", $set ).val();
            var country = $( "#country", $set ).val();
            
            self.storage.setItem( "billing-name", name );
            self.storage.setItem( "billing-email", email );
            self.storage.setItem( "billing-city", city );
            self.storage.setItem( "billing-address", address );
            self.storage.setItem( "billing-zip", zip );
            self.storage.setItem( "billing-country", country );
          } else {
            var sName = $( "#sname", $set ).val();
            var sEmail = $( "#semail", $set ).val();
            var sCity = $( "#scity", $set ).val();
            var sAddress = $( "#saddress", $set ).val();
            var sZip = $( "#szip", $set ).val();
            var sCountry = $( "#scountry", $set ).val();
            
            self.storage.setItem( "shipping-name", sName );
            self.storage.setItem( "shipping-email", sEmail );
            self.storage.setItem( "shipping-city", sCity );
            self.storage.setItem( "shipping-address", sAddress );
            self.storage.setItem( "shipping-zip", sZip );
            self.storage.setItem( "shipping-country", sCountry );
          
          }
        });
      }
    };
    
    $(function() {
      var shop = new $.Shop( "#site" );
    });
  
  })( jQuery );


//   (function(){
//     // Add to Cart Interaction - by CodyHouse.co
//     var cart = document.getElementsByClassName('js-cd-cart');
//     if(cart.length > 0) {
//       var cartAddBtns = document.getElementsByClassName('js-cd-add-to-cart'),
//         cartBody = cart[0].getElementsByClassName('cd-cart__body')[0],
//         cartList = cartBody.getElementsByTagName('ul')[0],
//         cartListItems = cartList.getElementsByClassName('cd-cart__product'),
//         cartTotal = cart[0].getElementsByClassName('cd-cart__checkout')[0].getElementsByTagName('span')[0],
//         cartCount = cart[0].getElementsByClassName('cd-cart__count')[0],
//         cartCountItems = cartCount.getElementsByTagName('li'),
//         cartUndo = cart[0].getElementsByClassName('cd-cart__undo')[0],
//         productId = 0, //this is a placeholder -> use your real product ids instead
//         cartTimeoutId = false,
//         animatingQuantity = false;
//       initCartEvents();
  
  
//       function initCartEvents() {
//         // add products to cart
//         for(var i = 0; i < cartAddBtns.length; i++) {(function(i){
//           cartAddBtns[i].addEventListener('click', addToCart);
//         })(i);}
  
//         // open/close cart
//         cart[0].getElementsByClassName('cd-cart__trigger')[0].addEventListener('click', function(event){
//           event.preventDefault();
//           toggleCart();
//         });
        
//         cart[0].addEventListener('click', function(event) {
//           if(event.target == cart[0]) { // close cart when clicking on bg layer
//             toggleCart(true);
//           } else if (event.target.closest('.cd-cart__delete-item')) { // remove product from cart
//             event.preventDefault();
//             removeProduct(event.target.closest('.cd-cart__product'));
//           }
//         });
  
//         // update product quantity inside cart
//         cart[0].addEventListener('change', function(event) {
//           if(event.target.tagName.toLowerCase() == 'select') quickUpdateCart();
//         });
  
//         //reinsert product deleted from the cart
//         cartUndo.addEventListener('click', function(event) {
//           if(event.target.tagName.toLowerCase() == 'a') {
//             event.preventDefault();
//             if(cartTimeoutId) clearInterval(cartTimeoutId);
//             // reinsert deleted product
//             var deletedProduct = cartList.getElementsByClassName('cd-cart__product--deleted')[0];
//             Util.addClass(deletedProduct, 'cd-cart__product--undo');
//             deletedProduct.addEventListener('animationend', function cb(){
//               deletedProduct.removeEventListener('animationend', cb);
//               Util.removeClass(deletedProduct, 'cd-cart__product--deleted cd-cart__product--undo');
//               deletedProduct.removeAttribute('style');
//               quickUpdateCart();
//             });
//             Util.removeClass(cartUndo, 'cd-cart__undo--visible');
//           }
//         });
//       };
  
//       function addToCart(event) {
//         event.preventDefault();
//         if(animatingQuantity) return;
//         var cartIsEmpty = Util.hasClass(cart[0], 'cd-cart--empty');
//         //update cart product list
//         addProduct(this);
//         //update number of items 
//         updateCartCount(cartIsEmpty);
//         //update total price
//         updateCartTotal(this.getAttribute('data-price'), true);
//         //show cart
//         Util.removeClass(cart[0], 'cd-cart--empty');
//       };
  
//       function toggleCart(bool) { // toggle cart visibility
//         var cartIsOpen = ( typeof bool === 'undefined' ) ? Util.hasClass(cart[0], 'cd-cart--open') : bool;
      
//         if( cartIsOpen ) {
//           Util.removeClass(cart[0], 'cd-cart--open');
//           //reset undo
//           if(cartTimeoutId) clearInterval(cartTimeoutId);
//           Util.removeClass(cartUndo, 'cd-cart__undo--visible');
//           removePreviousProduct(); // if a product was deleted, remove it definitively from the cart
  
//           setTimeout(function(){
//             cartBody.scrollTop = 0;
//             //check if cart empty to hide it
//             if( Number(cartCountItems[0].innerText) == 0) Util.addClass(cart[0], 'cd-cart--empty');
//           }, 500);
//         } else {
//           Util.addClass(cart[0], 'cd-cart--open');
//         }
//       };
  
//       function addProduct(target) {
//         // this is just a product placeholder
//         // you should insert an item with the selected product info
//         // replace productId, productName, price and url with your real product info
//         // you should also check if the product was already in the cart -> if it is, just update the quantity
//         productId = productId + 1;
//         var productAdded = '<li class="cd-cart__product"><div class="cd-cart__image"><a href="#0"><img src="assets/img/product-preview.png" alt="placeholder"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#0">Product Name</a></h3><span class="cd-cart__price">$25.99</span><div class="cd-cart__actions"><a href="#0" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="cd-product-'+ productId +'">Qty</label><span class="cd-cart__select"><select class="reset" id="cd-product-'+ productId +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select><svg class="icon" viewBox="0 0 12 12"><polyline fill="none" stroke="currentColor" points="2,4 6,8 10,4 "/></svg></span></div></div></div></li>';
//         cartList.insertAdjacentHTML('beforeend', productAdded);
//       };
  
//       function removeProduct(product) {
//         if(cartTimeoutId) clearInterval(cartTimeoutId);
//         removePreviousProduct(); // prduct previously deleted -> definitively remove it from the cart
        
//         var topPosition = product.offsetTop,
//           productQuantity = Number(product.getElementsByTagName('select')[0].value),
//           productTotPrice = Number((product.getElementsByClassName('cd-cart__price')[0].innerText).replace('$', '')) * productQuantity;
  
//         product.style.top = topPosition+'px';
//         Util.addClass(product, 'cd-cart__product--deleted');
  
//         //update items count + total price
//         updateCartTotal(productTotPrice, false);
//         updateCartCount(true, -productQuantity);
//         Util.addClass(cartUndo, 'cd-cart__undo--visible');
  
//         //wait 8sec before completely remove the item
//         cartTimeoutId = setTimeout(function(){
//           Util.removeClass(cartUndo, 'cd-cart__undo--visible');
//           removePreviousProduct();
//         }, 8000);
//       };
  
//       function removePreviousProduct() { // definitively removed a product from the cart (undo not possible anymore)
//         var deletedProduct = cartList.getElementsByClassName('cd-cart__product--deleted');
//         if(deletedProduct.length > 0 ) deletedProduct[0].remove();
//       };
  
//       function updateCartCount(emptyCart, quantity) {
//         if( typeof quantity === 'undefined' ) {
//           var actual = Number(cartCountItems[0].innerText) + 1;
//           var next = actual + 1;
          
//           if( emptyCart ) {
//             cartCountItems[0].innerText = actual;
//             cartCountItems[1].innerText = next;
//             animatingQuantity = false;
//           } else {
//             Util.addClass(cartCount, 'cd-cart__count--update');
  
//             setTimeout(function() {
//               cartCountItems[0].innerText = actual;
//             }, 150);
  
//             setTimeout(function() {
//               Util.removeClass(cartCount, 'cd-cart__count--update');
//             }, 200);
  
//             setTimeout(function() {
//               cartCountItems[1].innerText = next;
//               animatingQuantity = false;
//             }, 230);
//           }
//         } else {
//           var actual = Number(cartCountItems[0].innerText) + quantity;
//           var next = actual + 1;
          
//           cartCountItems[0].innerText = actual;
//           cartCountItems[1].innerText = next;
//           animatingQuantity = false;
//         }
//       };
  
//       function updateCartTotal(price, bool) {
//         cartTotal.innerText = bool ? (Number(cartTotal.innerText) + Number(price)).toFixed(2) : (Number(cartTotal.innerText) - Number(price)).toFixed(2);
//       };
  
//       function quickUpdateCart() {
//         var quantity = 0;
//         var price = 0;
  
//         for(var i = 0; i < cartListItems.length; i++) {
//           if( !Util.hasClass(cartListItems[i], 'cd-cart__product--deleted') ) {
//             var singleQuantity = Number(cartListItems[i].getElementsByTagName('select')[0].value);
//             quantity = quantity + singleQuantity;
//             price = price + singleQuantity*Number((cartListItems[i].getElementsByClassName('cd-cart__price')[0].innerText).replace('$', ''));
//           }
//         }
  
//         cartTotal.innerText = price.toFixed(2);
//         cartCountItems[0].innerText = quantity;
//         cartCountItems[1].innerText = quantity+1;
//       };
//     }
//   })();



//   // Utility function
// function Util () {};

// /* 
// 	class manipulation functions
// */
// Util.hasClass = function(el, className) {
// 	if (el.classList) return el.classList.contains(className);
// 	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
// };

// Util.addClass = function(el, className) {
// 	var classList = className.split(' ');
//  	if (el.classList) el.classList.add(classList[0]);
//  	else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
//  	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
// };

// Util.removeClass = function(el, className) {
// 	var classList = className.split(' ');
// 	if (el.classList) el.classList.remove(classList[0]);	
// 	else if(Util.hasClass(el, classList[0])) {
// 		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
// 		el.className=el.className.replace(reg, ' ');
// 	}
// 	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
// };

// Util.toggleClass = function(el, className, bool) {
// 	if(bool) Util.addClass(el, className);
// 	else Util.removeClass(el, className);
// };

// Util.setAttributes = function(el, attrs) {
//   for(var key in attrs) {
//     el.setAttribute(key, attrs[key]);
//   }
// };

// /* 
//   DOM manipulation
// */
// Util.getChildrenByClassName = function(el, className) {
//   var children = el.children,
//     childrenByClass = [];
//   for (var i = 0; i < el.children.length; i++) {
//     if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
//   }
//   return childrenByClass;
// };

// /* 
// 	Animate height of an element
// */
// Util.setHeight = function(start, to, element, duration, cb) {
// 	var change = to - start,
// 	    currentTime = null;

//   var animateHeight = function(timestamp){  
//     if (!currentTime) currentTime = timestamp;         
//     var progress = timestamp - currentTime;
//     var val = parseInt((progress/duration)*change + start);
//     // console.log(val);
//     element.setAttribute("style", "height:"+val+"px;");
//     if(progress < duration) {
//         window.requestAnimationFrame(animateHeight);
//     } else {
//     	cb();
//     }
//   };
  
//   //set the height of the element before starting animation -> fix bug on Safari
//   element.setAttribute("style", "height:"+start+"px;");
//   window.requestAnimationFrame(animateHeight);
// };

// /* 
// 	Smooth Scroll
// */

// Util.scrollTo = function(final, duration, cb) {
//   var start = window.scrollY || document.documentElement.scrollTop,
//       currentTime = null;
      
//   var animateScroll = function(timestamp){
//   	if (!currentTime) currentTime = timestamp;        
//     var progress = timestamp - currentTime;
//     if(progress > duration) progress = duration;
//     var val = Math.easeInOutQuad(progress, start, final-start, duration);
//     window.scrollTo(0, val);
//     if(progress < duration) {
//         window.requestAnimationFrame(animateScroll);
//     } else {
//       cb && cb();
//     }
//   };

//   window.requestAnimationFrame(animateScroll);
// };

// /* 
//   Focus utility classes
// */

// //Move focus to an element
// Util.moveFocus = function (element) {
//   if( !element ) element = document.getElementsByTagName("body")[0];
//   element.focus();
//   if (document.activeElement !== element) {
//     element.setAttribute('tabindex','-1');
//     element.focus();
//   }
// };

// /* 
//   Misc
// */

// Util.getIndexInArray = function(array, el) {
//   return Array.prototype.indexOf.call(array, el);
// };

// Util.cssSupports = function(property, value) {
//   if('CSS' in window) {
//     return CSS.supports(property, value);
//   } else {
//     var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();});
//     return jsProperty in document.body.style;
//   }
// };

// /* 
// 	Polyfills
// */
// //Closest() method
// if (!Element.prototype.matches) {
// 	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
// }

// if (!Element.prototype.closest) {
// 	Element.prototype.closest = function(s) {
// 		var el = this;
// 		if (!document.documentElement.contains(el)) return null;
// 		do {
// 			if (el.matches(s)) return el;
// 			el = el.parentElement || el.parentNode;
// 		} while (el !== null && el.nodeType === 1); 
// 		return null;
// 	};
// }

// //Custom Event() constructor
// if ( typeof window.CustomEvent !== "function" ) {

//   function CustomEvent ( event, params ) {
//     params = params || { bubbles: false, cancelable: false, detail: undefined };
//     var evt = document.createEvent( 'CustomEvent' );
//     evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
//     return evt;
//    }

//   CustomEvent.prototype = window.Event.prototype;

//   window.CustomEvent = CustomEvent;
// }

// /* 
// 	Animation curves
// */
// Math.easeInOutQuad = function (t, b, c, d) {
// 	t /= d/2;
// 	if (t < 1) return c/2*t*t + b;
// 	t--;
// 	return -c/2 * (t*(t-2) - 1) + b;
// };
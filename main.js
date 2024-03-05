// Cart
let cartIcon  = document.querySelector("#cart-icon");
let cart      = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");


// Open Cart
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

// Close Cart
closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});


// Cart Working JS
if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}


// Making function

function ready() {
    // Remove Items from Cart
    const removeCartButtons = document.querySelectorAll(".cart-remove");
    for(let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Quantity Changes
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for(let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // Add to Cart
    let addCart = document.getElementsByClassName("add-cart");
    for(let i = 0; i < addCart.length; i++) {
        let button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);
}

// Buy button
function buyButtonClicked() {
    alert('Vaša porudžbina je postavljena!');
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

// Add to Cart 

function addCartClicked(e) {
    let button = e.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}


function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for(let i = 0; i < cartItemsNames.length; i++) {
      if(cartItemsNames[i].innerText == title) {
        alert('Već ste dodali ovaj artikal u svoju korpu');
        return;
      }
    }
    let cartBoxContent = `<img src="${productImg}" alt="" class="cart-img">
<div class="detail-box">
    <div class="cart-product-title">
        <p class="title">${title}</p>
        <div class="cart-price">${price}rsd</div>
        <input type="number" value="1" class="cart-quantity">
    </div>
</div>
<i class='bx bx-trash cart-remove'></i>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}





// Remove Items from Cart

function removeCartItem(e) {
    let buttonClicked = e.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}


function quantityChanged(e) {
    let input = e.target;
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}


// Update Total Cart

function updateTotal() {
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    let total = 0;
    for(let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("rsd", ""));
        let quantity = quantityElement.value;
        total = total + price * quantity;
    }
        // If price Contain some Cents value
        total = Math.round(total * 100) / 100;

        document.getElementsByClassName('total-price')[0].innerText = total + ' rsd';
}



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
    console.log(removeCartButtons);
    for(let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener("click", removeCarItem);
    }
    // Quantity Changes
    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for(let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
}

// Remove Items from Cart

function removeCarItem(e) {
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

        document.getElementsByClassName('total-price')[0].innerText = total + ' rsd';
    }
}




let cart = {};


const cartContainer = document.getElementById('cart-container');
const toggleCartButton = document.getElementById('toggle-cart');
const hideCartButton = document.getElementById('hide-cart');
const cartItemCount = document.getElementById('cart-item-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');


function updateCartCount() {
    let count = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    cartItemCount.textContent = count;
}


toggleCartButton.addEventListener('click', () => {
    cartContainer.classList.toggle('show-cart');
});


hideCartButton.addEventListener('click', () => {
    cartContainer.classList.remove('show-cart');
});


function updateCartDisplay() {
    cartItems.innerHTML = ''; 
    let total = 0; 

    
    for (const [productName, { price, quantity }] of Object.entries(cart)) {
       
        const li = document.createElement('li');
        li.innerHTML = `${productName} - 
            <button class="remove-one" data-name="${productName}">-</button>
            <span>${quantity}</span>
            <button class="add-one" data-name="${productName}">+</button> 
            - Total: LKR ${(price * quantity).toFixed(2)}
            <button class="delete-item" data-name="${productName}">Delete</button>`;
        cartItems.appendChild(li); 
        total += price * quantity; 
    }

  
    cartTotal.textContent = total.toFixed(2);
    updateCartCount(); 
}


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        cart[name] = {
            price: price,
            quantity: cart[name]?.quantity + 1 || 1
        };
        updateCartDisplay(); 
    });
});


clearCartBtn.addEventListener('click', () => {
    cart = {}; 
    updateCartDisplay(); 
});


cartItems.addEventListener('click', event => {
    const target = event.target;
    const name = target.getAttribute('data-name');

    if (target.classList.contains('add-one')) {
        cart[name].quantity++;
    } else if (target.classList.contains('remove-one')) {
        if (cart[name].quantity > 1) {
            cart[name].quantity--;
        } else {
            delete cart[name];
        }
    } else if (target.classList.contains('delete-item')) {
        delete cart[name];
    }
    updateCartDisplay(); 
});

updateCartDisplay();

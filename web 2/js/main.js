// Cart functionality
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function setCart(items) {
    localStorage.setItem('cart', JSON.stringify(items));
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const cart = getCart();
        cartCount.textContent = cart.length;
    }
}

function addToCart(productName, price, image = '👟') {
    console.log('Adding to cart:', productName, price, image);
    const cart = getCart();
    const item = {
        id: Date.now(),
        name: productName,
        price: parseFloat(price),
        image: image || '👟',
        quantity: 1
    };
    cart.push(item);
    setCart(cart);
    console.log('Cart after adding:', cart);
    updateCartCount();
}

function removeFromCart(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    setCart(cart);
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    alert('Thank you for subscribing with ' + email + '!');
    event.target.reset();
}

// Contact form submission
function submitContactForm(event) {
    event.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
}

// Navigate to cart page
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    const cartIcon = document.getElementById('cartIcon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    }
});

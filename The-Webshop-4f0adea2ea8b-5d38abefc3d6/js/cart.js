// Functie om de producten op te halen in elke page //
function getProducts() {
    const localProducts = localStorage.getItem('products');
    if (localProducts) {
        return JSON.parse(localProducts);
    } else {
        return fetch('products.json').then(res => res.json());
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");
    let productsCache = null;

    async function loadProducts() {
        try {
            if (!productsCache) {
                const localProducts = JSON.parse(localStorage.getItem('products'));
                if (localProducts && localProducts.length > 0) {
                    productsCache = localProducts;
                } else {
                    const response = await fetch("products.json");
                    productsCache = await response.json();
                }
            }
            renderCart(productsCache);
        } catch (error) {
            console.error("Fout bij laden producten:", error);
        }
    }

    function renderCart(products) {
        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        cartContainer.innerHTML = "";
        let subtotal = 0;
        let hasItems = false;

        Object.keys(cart).forEach(productId => {
            const quantity = cart[productId];
            if (quantity <= 0) return;

            const product = products.find(p => p.id == productId);
            if (!product) return;

            const itemTotal = product.price * quantity;
            subtotal += itemTotal;
            hasItems = true;

            const item = document.createElement("div");
            item.className = "cart-item-line";
            item.innerHTML = `
                <div class="cart-line-left">
                    <h4>${product.name}</h4>
                    <p>€${product.price.toFixed(2)} x ${quantity}</p>
                </div>
                <div class="cart-line-right">
                    <button onclick="updateQuantity(${product.id}, -1)">-</button>
                    <span>${quantity}</span>
                    <button onclick="updateQuantity(${product.id}, 1)">+</button>
                </div>
            `;
            cartContainer.appendChild(item);
        });

        if (!hasItems) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fa fa-shopping-cart"></i>
                    <p>Uw winkelwagen is leeg</p>
                    <button id="Cnt-shopping"><a href='index.html'>Ga verder met winkelen</a></button>
                </div>
            `;
        }

        subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
        totalEl.textContent = `€${subtotal.toFixed(2)}`;
    }

    window.updateQuantity = function(productId, change) {
        let cart = JSON.parse(localStorage.getItem("cart")) || {};
        const currentQuantity = cart[productId] || 0;
        const newQuantity = currentQuantity + change;

        if (newQuantity <= 0) {
            delete cart[productId];
        } else {
            cart[productId] = newQuantity;
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        const cartCounter = document.getElementById("cart-count");
        if (cartCounter) {
            const count = Object.values(cart).reduce((acc, val) => acc + val, 0);
            cartCounter.textContent = count;
            cartCounter.style.display = count > 0 ? "inline-block" : "none";
        }

        if (productsCache) {
            renderCart(productsCache);
        } else {
            loadProducts();
        }
    };

    window.addEventListener('storage', (e) => {
        if (e.key === 'products') {
            productsCache = null;
            loadProducts();
        }
    });

    loadProducts();

document.getElementById("checkout-btn").addEventListener("click", function() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (Object.keys(cart).length === 0) {
        alert("Je winkelwagen is leeg!");
        return;
    }
    
    alert("Bedankt voor uw bestelling!");
    localStorage.removeItem("cart");
    
    if (productsCache) {
        renderCart(productsCache);
    }
    
    // Teller erbij gezet als cart leeg blijft met een gevoegd product //
    const cartCounter = document.getElementById("cart-count");
    if (cartCounter) {
        cartCounter.textContent = "0";
        cartCounter.style.display = "none";
    }
});
});
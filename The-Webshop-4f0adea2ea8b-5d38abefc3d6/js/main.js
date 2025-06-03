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
    const productContainer = document.getElementById("product-container");
    const cartCounter = document.getElementById("cart-count");
    let allProducts = [];

    async function loadProducts() {
    try {
        // Ik kijk eerst of er producten zijn die al aangepast zijn op een eerder moment //
        const localProducts = localStorage.getItem('products');
        if (localProducts) {
            allProducts = JSON.parse(localProducts);
        } else {
            // Als dit niet zo is laat die hier de standaardproducten zien vanuit de json //
            const response = await fetch("products.json");
            allProducts = await response.json();
        }
        renderProducts(allProducts);
        setupFilterButtons();
    } catch (error) {
        console.error("Fout bij laden producten:", error);
        productContainer.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p>Fout bij laden van producten. Probeer de pagina te vernieuwen.</p>
            </div>
        `;
    }
    }

    function renderProducts(products) {
        if (!productContainer) return;

        productContainer.innerHTML = "";

        if (!products || products.length === 0) {
            productContainer.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <p>Geen producten beschikbaar.</p>
                </div>
            `;
            return;
        }

        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="product-sort sort-${product.sort.toLowerCase()}">${product.sort}</p>
                <p class="product-price">€${product.price.toFixed(2)}</p>
                <p class="product-stock">Voorraad: ${product.stock}</p>
                <button class="add-to-cart" data-id="${product.id}" ${product.stock <= 0 ? 'disabled' : ''}>
                    ${product.stock <= 0 ? 'Uitverkocht' : 'Toevoegen'}
                </button>
            `;
            productContainer.appendChild(card);
        });

        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", () => {
                const productId = parseInt(button.dataset.id);
                addToCart(productId, allProducts);
            });
        });
    }

    function setupFilterButtons() {
        const filterBtn = document.querySelector(".filter");
        const resetBtn = document.querySelector(".reset");

        if (filterBtn) {
            filterBtn.addEventListener("click", () => {
                const filterDropdown = document.createElement("div");
                filterDropdown.className = "filter-dropdown";
                filterDropdown.innerHTML = `
                    <button data-sort="Standard" class="sort-standard">Standard</button>
                    <button data-sort="Vega" class="sort-vega">Vega</button>
                    <button data-sort="Halal" class="sort-halal">Halal</button>
                `;
                
                document.querySelector(".filter-buttons").appendChild(filterDropdown);

                filterDropdown.querySelectorAll("button").forEach(btn => {
                    btn.addEventListener("click", (e) => {
                        const sortType = e.target.dataset.sort;
                        const filtered = allProducts.filter(p => p.sort === sortType);
                        renderProducts(filtered);
                        filterDropdown.remove();
                    });
                });

                // Mijn dropdown bleef na het openen op de page staan, d.m.v. de volgende stuk code zal die weggaan als je ergens anders op de page klikt //
                document.addEventListener("click", (e) => {
                    if (!e.target.closest(".filter")) {
                        filterDropdown.remove();
                    }
                }, { once: true });
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                renderProducts(allProducts);
            });
        }
    }

    function addToCart(productId, products) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        const currentQuantity = cart[productId] || 0;

        // Checkt en geeft melding bij niet genoeg voorraad //
        if (currentQuantity >= product.stock) {
            alert("Niet genoeg voorraad beschikbaar");
            return;
        }

        cart[productId] = currentQuantity + 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        if (!cartCounter) return;

        const cart = JSON.parse(localStorage.getItem("cart")) || {};
        const count = Object.values(cart).reduce((acc, val) => acc + val, 0);
        cartCounter.textContent = count;
        cartCounter.style.display = count > 0 ? "inline-block" : "none";
    }

    loadProducts();
    updateCartCount();

    // Dit staat ook in elke page om de producten te updated in de storage //
    window.addEventListener('storage', (e) => {
    if (e.key === 'products-updated' || e.key === 'force-refresh') {
        loadProducts();
    }
});

});
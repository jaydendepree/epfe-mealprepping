// Functie om de producten op te halen in elke page //
function getProducts() {
    const localProducts = localStorage.getItem('products');
    if (localProducts) {
        return JSON.parse(localProducts);
    } else {
        return fetch('products.json').then(res => res.json());
    }
}

let products = [];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    document.getElementById('add-form').addEventListener('submit', addProduct);
    document.getElementById('edit-form').addEventListener('submit', saveEdit);
});

function loadProducts() {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    } else {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                products = data;
                saveProducts();
            });
    }
    showProducts();
}

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('products-updated', Date.now());
    products.forEach(product => {
        localStorage.setItem(`product-${product.id}`, JSON.stringify(product));
    });
}

function showProducts() {
    const container = document.getElementById('products-list');
    container.innerHTML = '';
    
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `
            <div>
                <strong>${product.name}</strong> 
                (${product.sort}) - 
                €${product.price.toFixed(2)} - 
                Voorraad: ${product.stock}
            </div>
            <div>
                <button onclick="openEditModal(${product.id})">Bewerk</button>
                <button class="delete" onclick="deleteProduct(${product.id})">Verwijder</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function addProduct(e) {
    e.preventDefault();
    
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name: document.getElementById('name').value,
        sort: document.getElementById('type').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        image: document.getElementById('image').value
    };
    
    products.push(newProduct);
    saveProducts();
    
    // Hier refresh ik de page om alles gelijk gewijzigd te houden zonder delay //
    localStorage.setItem('force-refresh', Date.now());
    
    e.target.reset();
    showTab('products');
    alert('Product toegevoegd!');
}

function openEditModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    document.getElementById('edit-id').value = product.id;
    document.getElementById('edit-name').value = product.name;
    document.getElementById('edit-type').value = product.sort;
    document.getElementById('edit-price').value = product.price;
    document.getElementById('edit-stock').value = product.stock;
    document.getElementById('edit-image').value = product.image;
    
    document.getElementById('edit-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function saveEdit(e) {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('edit-id').value);
    const product = products.find(p => p.id === id);
    
    if (product) {
        product.name = document.getElementById('edit-name').value;
        product.sort = document.getElementById('edit-type').value;
        product.price = parseFloat(document.getElementById('edit-price').value);
        product.stock = parseInt(document.getElementById('edit-stock').value);
        product.image = document.getElementById('edit-image').value;
        
        saveProducts();
        closeModal();
        showProducts();
    }
}

function deleteProduct(id) {
    if (confirm('Weet je zeker dat je dit product wilt verwijderen?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
    }
}

function resetProducts() {
    if (confirm('Weet je zeker dat je alle producten wilt resetten?')) {
        localStorage.removeItem('products');
        loadProducts();
    }
}

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(`${tabName}-tab`).style.display = 'block';
    event.target.classList.add('active');
}

// Dit staat ook in elke page om de producten te updated in de storage //
window.addEventListener('storage', (e) => {
    if (e.key === 'products-updated') {
        loadProducts();
    }
});
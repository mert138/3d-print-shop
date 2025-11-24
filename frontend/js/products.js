// Ürünler sayfası JavaScript'i
class ProductsApp {
    constructor() {
        this.products = [];
        this.filteredProducts = [];
        this.init();
    }

    async init() {
        await this.loadProducts();
        this.setupEventListeners();
        this.renderProducts();
    }

    async loadProducts() {
        try {
            const response = await fetch('/api/products');
            this.products = await response.json();
            this.filteredProducts = [...this.products];
        } catch (error) {
            console.error('Ürünler yüklenirken hata:', error);
        }
    }

    renderProducts() {
        const container = document.getElementById('productsGrid');
        if (!container) return;

        if (this.filteredProducts.length === 0) {
            container.innerHTML = '<p class="no-products">Ürün bulunamadı.</p>';
            return;
        }

        container.innerHTML = this.filteredProducts.map(product => `
            <div class="product-card">
                <div class="product-image">
                    ${product.images && product.images.length > 0 ? 
                        `<img src="${product.images[0]}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;">` : 
                        '3D Model'
                    }
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description.substring(0, 100)}...</p>
                    <div class="price-section">
                        <span class="product-price">${product.price} TL</span>
                        ${product.discount > 0 ? `
                            <span class="original-price">${product.originalPrice} TL</span>
                            <span class="discount">%${product.discount}</span>
                        ` : ''}
                    </div>
                    <a href="product-detail.html?id=${product._id}" class="btn btn-primary">İncele</a>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProducts(e.target.value, categoryFilter?.value);
            });
        }

        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.filterProducts(searchInput?.value, e.target.value);
            });
        }
    }

    filterProducts(searchTerm = '', category = '') {
        this.filteredProducts = this.products.filter(product => {
            const matchesSearch = !searchTerm || 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesCategory = !category || product.category === category;
            
            return matchesSearch && matchesCategory;
        });

        this.renderProducts();
    }
}

// Ürünler sayfasını başlat
if (window.location.pathname.includes('products.html')) {
    new ProductsApp();
}
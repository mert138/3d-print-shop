// Ana sayfa JavaScript'i
class MainApp {
    constructor() {
        this.featuredProducts = [];
        this.init();
    }

    async init() {
        await this.loadFeaturedProducts();
        this.setupEventListeners();
    }

    async loadFeaturedProducts() {
        try {
            const response = await fetch('/api/products');
            const products = await response.json();
            this.featuredProducts = products.slice(0, 6); // İlk 6 ürünü featured yap
            this.renderFeaturedProducts();
        } catch (error) {
            console.error('Ürünler yüklenirken hata:', error);
        }
    }

    renderFeaturedProducts() {
        const container = document.getElementById('featuredProducts');
        if (!container) return;

        container.innerHTML = this.featuredProducts.map(product => `
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
        // Ana sayfa özel event listener'ları
    }
}

// Uygulamayı başlat
document.addEventListener('DOMContentLoaded', function() {
    new MainApp();
});
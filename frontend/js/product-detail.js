// Ürün detay sayfası JavaScript'i
class ProductDetailApp {
    constructor() {
        this.product = null;
        this.reviews = [];
        this.init();
    }

    async init() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        if (productId) {
            await this.loadProduct(productId);
            await this.loadReviews(productId);
            this.setupEventListeners();
        } else {
            console.error('Ürün ID bulunamadı');
        }
    }

    async loadProduct(productId) {
        try {
            const response = await fetch(`/api/products/${productId}`);
            const data = await response.json();
            this.product = data.product;
            this.renderProduct();
        } catch (error) {
            console.error('Ürün yüklenirken hata:', error);
        }
    }

    async loadReviews(productId) {
        try {
            const response = await fetch(`/api/products/${productId}`);
            const data = await response.json();
            this.reviews = data.reviews || [];
            this.renderReviews();
        } catch (error) {
            console.error('Yorumlar yüklenirken hata:', error);
        }
    }

    renderProduct() {
        if (!this.product) return;

        document.getElementById('productName').textContent = this.product.name;
        document.getElementById('productPrice').textContent = `${this.product.price} TL`;
        document.getElementById('productDescription').textContent = this.product.description;

        const originalPrice = document.getElementById('originalPrice');
        const discountBadge = document.getElementById('discountBadge');
        
        if (this.product.discount > 0) {
            originalPrice.textContent = `${this.product.originalPrice} TL`;
            discountBadge.textContent = `%${this.product.discount}`;
        } else {
            originalPrice.style.display = 'none';
            discountBadge.style.display = 'none';
        }

        const featuresContainer = document.getElementById('productFeatures');
        if (this.product.features && this.product.features.length > 0) {
            featuresContainer.innerHTML = `
                <h3>Özellikler</h3>
                <ul>
                    ${this.product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            `;
        }

        const mainImage = document.getElementById('mainImage');
        if (this.product.images && this.product.images.length > 0) {
            mainImage.innerHTML = `<img src="${this.product.images[0]}" alt="${this.product.name}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;">`;
        } else {
            mainImage.innerHTML = '3D Model Görüntüsü';
        }
    }

    renderReviews() {
        const container = document.getElementById('reviewsList');
        if (!container) return;

        if (this.reviews.length === 0) {
            container.innerHTML = '<p>Henüz yorum yapılmamış.</p>';
            return;
        }

        container.innerHTML = this.reviews.map(review => `
            <div class="review-item">
                <div class="review-header">
                    <span class="review-author">${review.user.username}</span>
                    <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
                </div>
                <p>${review.comment}</p>
                <small>${new Date(review.createdAt).toLocaleDateString('tr-TR')}</small>
            </div>
        `).join('');

        // Yorum formunu göster/gizle
        const addReviewForm = document.getElementById('addReviewForm');
        if (auth.isAuthenticated()) {
            addReviewForm.style.display = 'block';
        }
    }

    setupEventListeners() {
        const reviewForm = document.getElementById('reviewForm');
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => this.handleReviewSubmit(e));
        }

        const addToCartBtn = document.getElementById('addToCart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => this.addToCart());
        }
    }

    async handleReviewSubmit(e) {
        e.preventDefault();
        
        if (!auth.isAuthenticated()) {
            alert('Yorum yapmak için giriş yapmalısınız.');
            return;
        }

        const rating = document.getElementById('rating').value;
        const comment = document.getElementById('comment').value;

        try {
            const response = await fetch(`/api/products/${this.product._id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...auth.getAuthHeader()
                },
                body: JSON.stringify({ rating, comment })
            });

            if (response.ok) {
                alert('Yorumunuz gönderildi ve onay bekliyor.');
                e.target.reset();
                await this.loadReviews(this.product._id);
            } else {
                alert('Yorum gönderilirken hata oluştu.');
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    }

    addToCart() {
        if (!auth.isAuthenticated()) {
            alert('Sepete eklemek için giriş yapmalısınız.');
            return;
        }

        // Basit sepet işlevi - localStorage kullanarak
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.productId === this.product._id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                productId: this.product._id,
                name: this.product.name,
                price: this.product.price,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Ürün sepete eklendi!');
    }
}

// Ürün detay sayfasını başlat
if (window.location.pathname.includes('product-detail.html')) {
    new ProductDetailApp();
}
// Admin ürün yönetimi JavaScript'i
class ProductsAdmin {
    constructor() {
        this.products = [];
        this.init();
    }

    async init() {
        await this.checkAdminAccess();
        await this.loadProducts();
        this.setupEventListeners();
    }

    async checkAdminAccess() {
        if (!auth.isAuthenticated() || !auth.isAdmin()) {
            alert('Bu sayfaya erişim yetkiniz yok.');
            window.location.href = '../../index.html';
            return;
        }
    }

    async loadProducts() {
        try {
            const response = await fetch('/api/products');
            this.products = await response.json();
            this.renderProducts();
        } catch (error) {
            console.error('Ürünler yüklenirken hata:', error);
        }
    }

    renderProducts() {
        const tbody = document.getElementById('productsTable');
        if (!tbody) return;

        tbody.innerHTML = this.products.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price} TL</td>
                <td>${product.discount}%</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn btn-outline btn-edit" data-id="${product._id}">Düzenle</button>
                    <button class="btn btn-admin btn-delete" data-id="${product._id}">Sil</button>
                </td>
            </tr>
        `).join('');

        this.setupTableEvents();
    }

    setupEventListeners() {
        const form = document.getElementById('productForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    setupTableEvents() {
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => this.editProduct(e.target.dataset.id));
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => this.deleteProduct(e.target.dataset.id));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const productData = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            discount: parseFloat(formData.get('discount')) || 0,
            category: formData.get('category'),
            stock: parseInt(formData.get('stock')),
            features: formData.get('features') ? formData.get('features').split(',').map(f => f.trim()) : []
        };

        // İndirimli fiyatı hesapla
        if (productData.discount > 0) {
            productData.originalPrice = productData.price;
            productData.price = productData.price * (1 - productData.discount / 100);
        }

        try {
            const response = await fetch('/api/admin/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...auth.getAuthHeader()
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                alert('Ürün başarıyla eklendi!');
                this.hideProductForm();
                e.target.reset();
                await this.loadProducts();
            } else {
                const error = await response.json();
                alert(error.message || 'Ürün eklenirken hata oluştu');
            }
        } catch (error) {
            console.error('Hata:', error);
            alert('Sunucu hatası');
        }
    }

    async deleteProduct(id) {
        if (!confirm('Bu ürünü silmek istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE',
                headers: auth.getAuthHeader()
            });

            if (response.ok) {
                alert('Ürün başarıyla silindi!');
                await this.loadProducts();
            } else {
                alert('Ürün silinirken hata oluştu');
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    }

    editProduct(id) {
        const product = this.products.find(p => p._id === id);
        if (product) {
            // Düzenleme formunu göster ve verileri doldur
            alert(`"${product.name}" ürününü düzenleme özelliği yakında eklenecek!`);
            // Burada düzenleme formunu açabilirsiniz
        }
    }
}

// Modal fonksiyonları
function showProductForm() {
    document.getElementById('productFormModal').style.display = 'flex';
}

function hideProductForm() {
    document.getElementById('productFormModal').style.display = 'none';
}

// Admin ürün yönetimini başlat
if (window.location.pathname.includes('admin/products.html')) {
    new ProductsAdmin();
}
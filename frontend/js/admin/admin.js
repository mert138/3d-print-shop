// Admin paneli ana JavaScript'i
class AdminApp {
    constructor() {
        this.init();
    }

    init() {
        this.checkAdminAccess();
        this.loadDashboardStats();
        this.setupEventListeners();
    }

    checkAdminAccess() {
        if (!auth.isAuthenticated() || !auth.isAdmin()) {
            alert('Admin paneline erişim yetkiniz yok.');
            window.location.href = '../index.html';
            return;
        }

        this.updateAdminUI();
    }

    updateAdminUI() {
        const adminUsername = document.getElementById('adminUsername');
        if (adminUsername && auth.user) {
            adminUsername.textContent = auth.user.username;
        }
    }

    async loadDashboardStats() {
        try {
            // Toplam ürün sayısı
            const productsResponse = await fetch('/api/products');
            const products = await productsResponse.json();
            document.getElementById('totalProducts').textContent = products.length;

            // Onay bekleyen yorumlar
            const reviewsResponse = await fetch('/api/admin/reviews/pending', {
                headers: auth.getAuthHeader()
            });
            
            if (reviewsResponse.ok) {
                const pendingReviews = await reviewsResponse.json();
                document.getElementById('pendingReviews').textContent = pendingReviews.length;
            }

            // Bu örnekte kullanıcı sayısını sabit gösteriyoruz
            // Gerçek uygulamada API'den çekmelisiniz
            document.getElementById('totalUsers').textContent = 'N/A';

        } catch (error) {
            console.error('Dashboard verileri yüklenirken hata:', error);
        }
    }

    setupEventListeners() {
        // Admin paneli genel event listener'ları
    }
}

// Admin panelini başlat
if (window.location.pathname.includes('/admin/')) {
    new AdminApp();
}
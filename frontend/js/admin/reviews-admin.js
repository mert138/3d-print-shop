// Admin yorum yönetimi JavaScript'i
class ReviewsAdmin {
    constructor() {
        this.pendingReviews = [];
        this.init();
    }

    async init() {
        await this.checkAdminAccess();
        await this.loadPendingReviews();
        this.setupEventListeners();
    }

    async checkAdminAccess() {
        if (!auth.isAuthenticated() || !auth.isAdmin()) {
            alert('Bu sayfaya erişim yetkiniz yok.');
            window.location.href = '../../index.html';
            return;
        }
    }

    async loadPendingReviews() {
        try {
            const response = await fetch('/api/admin/reviews/pending', {
                headers: auth.getAuthHeader()
            });
            
            if (response.ok) {
                this.pendingReviews = await response.json();
                this.renderReviews();
            }
        } catch (error) {
            console.error('Yorumlar yüklenirken hata:', error);
        }
    }

    renderReviews() {
        const tbody = document.getElementById('reviewsTable');
        if (!tbody) return;

        if (this.pendingReviews.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Onay bekleyen yorum bulunmuyor.</td></tr>';
            return;
        }

        tbody.innerHTML = this.pendingReviews.map(review => `
            <tr>
                <td>${review.user?.username || 'Silinmiş Kullanıcı'}</td>
                <td>${review.product?.name || 'Silinmiş Ürün'}</td>
                <td>${review.comment}</td>
                <td>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</td>
                <td>
                    <button class="btn btn-primary btn-approve" data-id="${review._id}">Onayla</button>
                    <button class="btn btn-admin btn-delete" data-id="${review._id}">Sil</button>
                </td>
            </tr>
        `).join('');

        this.setupTableEvents();
    }

    setupEventListeners() {
        this.setupTableEvents();
    }

    setupTableEvents() {
        document.querySelectorAll('.btn-approve').forEach(btn => {
            btn.addEventListener('click', (e) => this.approveReview(e.target.dataset.id));
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => this.deleteReview(e.target.dataset.id));
        });
    }

    async approveReview(id) {
        try {
            const response = await fetch(`/api/admin/reviews/${id}/approve`, {
                method: 'PUT',
                headers: auth.getAuthHeader()
            });

            if (response.ok) {
                alert('Yorum onaylandı!');
                await this.loadPendingReviews();
            } else {
                alert('Yorum onaylanırken hata oluştu');
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    }

    async deleteReview(id) {
        if (!confirm('Bu yorumu silmek istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`/api/admin/reviews/${id}`, {
                method: 'DELETE',
                headers: auth.getAuthHeader()
            });

            if (response.ok) {
                alert('Yorum silindi!');
                await this.loadPendingReviews();
            } else {
                alert('Yorum silinirken hata oluştu');
            }
        } catch (error) {
            console.error('Hata:', error);
        }
    }
}

// Admin yorum yönetimini başlat
if (window.location.pathname.includes('admin/reviews.html')) {
    new ReviewsAdmin();
}
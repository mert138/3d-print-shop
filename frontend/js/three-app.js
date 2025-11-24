// Three.js entegrasyonu - Basit örnek
class ThreeApp {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.init();
    }

    init() {
        // Three.js sadece gerekli sayfalarda başlatılsın
        if (document.getElementById('hero3d')) {
            this.initHeroScene();
        }
    }

    initHeroScene() {
        const container = document.getElementById('hero3d');
        if (!container) return;

        // Basit bir 3D küp gösterimi
        container.innerHTML = `
            <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white;border-radius:10px;">
                <div style="text-align:center;">
                    <h3>3D Ürün Gösterimi</h3>
                    <p>Three.js entegrasyonu aktif</p>
                    <small>3D modeller burada gösterilecek</small>
                </div>
            </div>
        `;

        // Gerçek Three.js entegrasyonu için:
        // 1. three.js kütüphanesini ekleyin
        // 2. Sahne, kamera, renderer oluşturun
        // 3. 3D modelleri yükleyin
        // 4. Animasyon loop'u oluşturun
    }
}

// Three.js uygulamasını başlat
document.addEventListener('DOMContentLoaded', function() {
    new ThreeApp();
});
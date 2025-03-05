  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

// Firebase yapılandırması
const firebaseConfig = {
    apiKey: "API_KEY",  // Firebase API Key'inizi buraya ekleyin
    authDomain: "tremila-shop-133ce.firebaseapp.com",  // Firebase Auth domain
    projectId: "tremila-shop-133ce",  // Firebase Project ID
    storageBucket: "tremila-shop-133ce.appspot.com",  // Firebase Storage Bucket
    messagingSenderId: "249334077736",  // Firebase Sender ID
    appId: "1:249334077736:web:4f9cb53aec4bbf3d17181d",  // Firebase App ID
    measurementId: "G-Q8VN1F66LW"  // Firebase Measurement ID
};

// Firebase başlatma
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Kullanıcı giriş yapmış mı kontrol et
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Eğer giriş yapılmamışsa, login sayfasına yönlendir
        window.location.href = "login.html";  // Login sayfasına yönlendirme
    }
});

// Çıkış yapma işlemi
document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
        alert("Çıkış yapıldı!");
        window.location.href = "login.html"; // Çıkış yapınca login sayfasına yönlendir
    }).catch((error) => {
        console.error("Çıkış hatası: ", error);
    });
});

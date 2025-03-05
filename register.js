import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

// Firebase config bilgilerinizi buraya ekleyin
const firebaseConfig = {
  apiKey: "AIzaSyCEu0jR_Pdru5ry7Gv8I_61ruajssZVm0k",
  authDomain: "tremila-shop-133ce.firebaseapp.com",
  projectId: "tremila-shop-133ce",
  storageBucket: "tremila-shop-133ce.firebasestorage.app",
  messagingSenderId: "249334077736",
  appId: "1:249334077736:web:4f9cb53aec4bbf3d17181d",
  measurementId: "G-Q8VN1F66LW"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Kayıt işlemi
document.getElementById("registerBtn").addEventListener("click", function(e) {
    e.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // E-posta formatı kontrolü
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("errorMessage").textContent = "Geçersiz e-posta adresi.";
        return;
    }

    // Şifre uzunluk kontrolü
    if (password.length < 6) {
        document.getElementById("errorMessage").textContent = "Şifre en az 6 karakter olmalıdır.";
        return;
    }

    // Firebase ile kayıt olma
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Kullanıcı başarıyla kaydedildiğinde
            document.getElementById("errorMessage").textContent = "Kayıt başarılı! Giriş yapabilirsiniz.";
            setTimeout(() => {
                window.location.href = "login.html"; // Kayıt başarılı olduktan sonra login sayfasına yönlendir
            }, 1500);
        })
        .catch((error) => {
            // Hata mesajını logla
            console.log("Hata Detayı: ", error.code, error.message);  // Hata detayını loglamak
            document.getElementById("errorMessage").textContent = "Hata: " + error.message;
        });
});


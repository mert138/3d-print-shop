import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
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

// Giriş işlemi
document.getElementById("loginBtn").addEventListener("click", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    // E-posta formatı kontrolü
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("errorMessage").textContent = "Geçersiz e-posta adresi.";
        return;
    }

    // Firebase ile giriş yapma
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Başarıyla giriş yaptıktan sonra ana sayfaya yönlendir
            window.location.href = "index.html";
        })
        .catch((error) => {
            // Hata mesajı
            document.getElementById("errorMessage").textContent = "Hata: " + error.message;
        });
});


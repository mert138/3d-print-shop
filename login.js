// Firebase SDK'larını içe aktar
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase yapılandırması
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

// Login formunu al ve submit event'ini dinle
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const errorMessage = document.getElementById("loginError");

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Giriş başarılı!");
            window.location.href = "index.html"; // Giriş yaptıktan sonra ana sayfaya yönlendir
        })
        .catch((error) => {
            errorMessage.textContent = "Hata: " + error.message;
        });
});

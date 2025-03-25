// Firebase'i yükle
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase'i başlat
const auth = getAuth();

// Giriş fonksiyonu
function loginUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Giriş başarılı: ", user);
        })
        .catch((error) => {
            console.error("Hata: ", error.message);
        });
}

// Kullanıcı girişini başlatmak için
const email = "example@example.com"; // Kullanıcı email adresi
const password = "password123"; // Kullanıcı şifresi
loginUser(email, password);

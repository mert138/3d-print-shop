import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCEu0jR_Pdru5ry7Gv8I_61ruajssZVm0k",
    authDomain: "tremila-shop-133ce.firebaseapp.com",
    projectId: "tremila-shop-133ce",
    storageBucket: "tremila-shop-133ce.appspot.com",
    messagingSenderId: "249334077736",
    appId: "1:249334077736:web:4f9cb53aec4bbf3d17181d",
    measurementId: "G-Q8VN1F66LW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const errorMessage = document.getElementById("loginError");

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Giriş başarılı!");
            window.location.href = "index.html";
        })
        .catch((error) => {
            errorMessage.textContent = "Hata: " + error.message;
        });
});

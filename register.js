import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCEu0jR_Pdru5ry7Gv8I_61ruajssZVm0k", // Firebase API key'i burada ekle
    authDomain: "your-project-id.firebaseapp.com", // Firebase auth domain
    projectId: "your-project-id", // Firebase project ID
    storageBucket: "your-project-id.appspot.com", // Firebase storage bucket
    messagingSenderId: "your-messaging-sender-id", // Firebase messaging sender ID
    appId: "your-app-id", // Firebase app ID
    measurementId: "your-measurement-id" // Firebase measurement ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const errorMessage = document.getElementById("registerError");

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Kayıt başarılı!");
            window.location.href = "login.html"; // Kayıttan sonra login sayfasına yönlendir
        })
        .catch((error) => {
            errorMessage.textContent = "Hata: " + error.message;
        });
});

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
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

// Giriş formunu dinle
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const errorMessage = document.getElementById("loginError");

            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    alert("Giriş başarılı!");
                    window.location.href = "dashboard.html"; // Kullanıcı giriş yaptıktan sonra yönlendir
                })
                .catch((error) => {
                    errorMessage.textContent = "Hata: " + error.message;
                });
        });
    }
});

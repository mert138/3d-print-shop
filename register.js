// Firebase SDK'yı dinamik olarak yükle
const firebaseConfig = {
    apiKey: "AIzaSyCEu0jR_Pdru5ry7Gv8I_61ruajssZVm0k",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    measurementId: "your-measurement-id"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const errorMessage = document.getElementById("registerError");

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Kayıt başarılı!");
            window.location.href = "login.html"; // Kayıttan sonra giriş sayfasına yönlendir
        })
        .catch((error) => {
            errorMessage.textContent = "Hata: " + error.message;
        });
});

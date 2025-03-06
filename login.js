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

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const errorMessage = document.getElementById("loginError");

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            alert("Giriş başarılı!");
            window.location.href = "index.html"; // Giriş yaptıktan sonra ana sayfaya yönlendir
        })
        .catch((error) => {
            errorMessage.textContent = "Hata: " + error.message;
        });
});

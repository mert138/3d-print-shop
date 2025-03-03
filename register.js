// Daha önce kayıtlı kullanıcıları al (eğer yoksa boş bir dizi başlat)
let users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // Kullanıcıyı listeye ekle
    users.push({ email, username, password });

    // Listeyi localStorage’a kaydet (kalıcı olsun diye)
    localStorage.setItem("users", JSON.stringify(users));

    alert("Kayıt başarılı!");
    window.location.href = "register-data.html"; // Kayıtlı kullanıcıları görme sayfasına yönlendir
});

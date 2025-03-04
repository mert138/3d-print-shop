document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("registerForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Sayfanın yenilenmesini engeller

        // Form verilerini al
        let username = document.getElementById("registerUsername").value;
        let email = document.getElementById("registerEmail").value;
        let password = document.getElementById("registerPassword").value;

        // LocalStorage'dan mevcut kullanıcıları al
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Kullanıcı adının kayıtlı olup olmadığını kontrol et
        let userExists = users.some(user => user.username === username);

        if (userExists) {
            alert("Bu kullanıcı adı zaten alınmış! Lütfen başka bir kullanıcı adı seçin.");
        } else {
            // Yeni kullanıcıyı listeye ekle
            users.push({ username, email, password });

            // Güncellenmiş kullanıcı listesini LocalStorage'a kaydet
            localStorage.setItem("users", JSON.stringify(users));

            alert("Kayıt başarılı! Giriş yapabilirsiniz.");

            // Kullanıcıyı login.html sayfasına yönlendir
            window.location.href = "login.html";
        }
    });
});

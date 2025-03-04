document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("registerForm");

    if (!form) {
        console.error("registerForm bulunamadı!");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Sayfanın yenilenmesini engeller

        let usernameInput = document.getElementById("registerUsername");
        let emailInput = document.getElementById("registerEmail");
        let passwordInput = document.getElementById("registerPassword");

        if (!usernameInput || !emailInput || !passwordInput) {
            console.error("Kayıt formu için gerekli inputlar bulunamadı!");
            return;
        }

        let username = usernameInput.value.trim();
        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();

        if (!username || !email || !password) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

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

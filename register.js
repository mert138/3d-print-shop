document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !password) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    // Kullanıcıyı kaydet (Local listeye ekleyelim)
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz.");
    window.location.href = "login.html"; // Login sayfasına yönlendir
});

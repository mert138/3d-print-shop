document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Sayfanın yenilenmesini engeller

    // Form verilerini al
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    // LocalStorage'dan kullanıcıları al
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Kullanıcıyı bul
    let user = users.find(u => u.username === username && u.password === password);

    // Eğer kullanıcı bulunduysa yönlendirme yap
    if (user) {
        window.location.href = "index.html"; // Başarılı girişte index.html'e yönlendir
    } else {
        // Hatalı giriş durumunda hata mesajı göster
        document.getElementById("errorMessage").textContent = "Kullanıcı adı veya şifre hatalı!";
    }
});

      document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Formun sayfayı yenilemesini engeller.

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Şifreler uyuşmuyor!');
        return;
    }

    // Kullanıcıyı kaydetme işlemi buraya gelecek.
    // Örneğin, API'ye istek gönderebilirsiniz.

    alert('Kayıt başarılı! Lütfen giriş yapın.');
    window.location.href = 'login.html'; // Kayıt olduktan sonra giriş sayfasına yönlendirir.
});

    document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Formun sayfayı yenilemesini engeller.

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Burada backend'den gelen doğrulama işlemi yapılacak.
    // Örnek olarak sabit bir kullanıcı adı ve şifre kontrolü ekliyoruz.
    const storedUsername = 'kullaniciadi'; // Backend'den alınacak değer
    const storedPassword = 'sifre123'; // Backend'den alınacak değer

    if (username === storedUsername && password === storedPassword) {
        alert('Giriş başarılı!');
        window.location.href = 'index.html'; // Ana sayfaya yönlendir
    } else {
        alert('Hatalı kullanıcı adı veya şifre!');
    }
});

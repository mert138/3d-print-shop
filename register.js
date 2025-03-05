document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var username = document.getElementById("registerUsername").value;
    var email = document.getElementById("registerEmail").value;
    var password = document.getElementById("registerPassword").value;

    if (username === "" || email === "" || password === "") {
        document.getElementById("errorMessage").innerText = "Lütfen tüm alanları doldurun!";
        return;
    }

    // Kullanıcı bilgilerini bir JSON nesnesine ekleyelim
    var userData = {
        username: username,
        email: email,
        password: password
    };

    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userData, null, 2));
    var downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "kullanici_bilgileri.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    alert("Kayıt başarılı! Bilgiler JSON dosyası olarak indirildi.");
    window.location.href = "login.html";
});

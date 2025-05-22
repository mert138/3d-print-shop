let cart = [];

function purchase() {
  const cartItems = getCartItems();  // Sepetteki ürünleri al (senin sepet verin nasıl ise ona göre)
  const total = calculateTotal();    // Toplam tutarı hesapla
  
  const data = { items: cartItems, total: total };
  
  // localStorage'a kaydet
  localStorage.setItem('cartData', JSON.stringify(data));
  
  // Sepet detay sayfasına yönlendir
  window.location.href = "sepet.html";
}


// Butonlara tıklanınca modal’ı aç
document.getElementById('signupButton').onclick = () => {
  document.getElementById('signupModal').classList.remove('hidden');
};
document.getElementById('loginButton').onclick = () => {
  document.getElementById('loginModal').classList.remove('hidden');
};

// Kapat butonları
document.getElementById('closeSignupModal').onclick = () => {
  document.getElementById('signupModal').classList.add('hidden');
};
document.getElementById('closeLoginModal').onclick = () => {
  document.getElementById('loginModal').classList.add('hidden');
};

// Form gönderimlerini dinle (örnek işleme)
document.getElementById('signupForm').addEventListener('submit', e => {
  e.preventDefault();
  // Kayıt işlemi...
  alert('Kayıt başarılı!');
  document.getElementById('signupModal').classList.add('hidden');
});
document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  // Giriş işlemi...
  alert('Giriş başarılı!');
  document.getElementById('loginModal').classList.add('hidden');
});


function addToCart(name, price) {
  cart.push({ name, price });
  document.getElementById('cart-count').textContent = cart.length;
  alert(`${name} sepete eklendi!`);
}

function removeItem(index) {
  cart.splice(index, 1);
  document.getElementById('cart-count').textContent = cart.length;
  renderCartItems(); // Sepet listesini güncelle
}

function renderCartItems() {
  const itemsList = document.getElementById('cart-items');
  const totalText = document.getElementById('cart-total');
  itemsList.innerHTML = ''; // Listeyi temizle
  let total = 0;
  
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add("flex", "justify-between", "items-center", "mb-2");
    
    // Ürün adı ve fiyatı için span
    const itemInfo = document.createElement('span');
    itemInfo.textContent = `${item.name} - ${item.price} TL`;
    
    // Çıkarma butonu
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Çıkar";
    removeBtn.classList.add("bg-red-500", "hover:bg-red-600", "text-white", "px-2", "py-1", "rounded", "ml-4");
    removeBtn.onclick = function() { removeItem(index); };
    
    li.appendChild(itemInfo);
    li.appendChild(removeBtn);
    itemsList.appendChild(li);
    
    total += item.price;
  });
  totalText.textContent = total;
}

function toggleCart() {
  const modal = document.getElementById('cart-modal');
  // Sepeti açarken öğeleri render ediyoruz
  if (modal.classList.contains('hidden')) {
    renderCartItems();
  }
  modal.classList.toggle('hidden');
}
// app.js’in sonunda:
window.addToCart    = addToCart;
window.removeItem   = removeItem;
window.toggleCart   = toggleCart;



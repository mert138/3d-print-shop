let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  document.getElementById('cart-count').textContent = cart.length;
  alert(`${name} sepete eklendi!`);
}

function toggleCart() {
  const modal = document.getElementById('cart-modal');
  const itemsList = document.getElementById('cart-items');
  const totalText = document.getElementById('cart-total');

  if (modal.classList.contains('hidden')) {
    itemsList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.price} TL`;
      itemsList.appendChild(li);
      total += item.price;
    });
    totalText.textContent = total;
  }

  modal.classList.toggle('hidden');
}

// auth.js - LocalStorage ile çalışan versiyon
const API_BASE = ''; // Firebase Functions URL'si

// Kullanıcı kayıt (LocalStorage)
async function registerUser(name, email, password) {
  try {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(user => user.email === email)) {
      showAuthMessage('Bu e-posta zaten kullanılıyor!', 'error');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: btoa(password), // Basit encoding (gerçek projede kullanmayın)
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Giriş yap
    const userForSession = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userForSession));
    
    showAuthMessage('Kayıt başarılı! Yönlendiriliyorsunuz...', 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);

  } catch (error) {
    showAuthMessage('Kayıt sırasında hata oluştu!', 'error');
  }
}

// Kullanıcı giriş (LocalStorage)
async function loginUser(email, password) {
  try {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && atob(u.password) === password);
    
    if (user) {
      const userForSession = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userForSession));
      showAuthMessage('Giriş başarılı! Yönlendiriliyorsunuz...', 'success');
      
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    } else {
      showAuthMessage('Geçersiz e-posta veya şifre!', 'error');
    }
  } catch (error) {
    showAuthMessage('Giriş sırasında hata oluştu!', 'error');
  }
}

// Admin kullanıcısını oluştur
function createAdminUser() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const adminExists = users.find(user => user.email === 'mert.isik.2012@gmail.com');
  
  if (!adminExists) {
    const adminUser = {
      id: 'admin-' + Date.now(),
      name: 'Admin User',
      email: 'mert.isik.2012@gmail.com',
      password: btoa('imd161626'),
      role: 'admin',
      createdAt: new Date().toISOString()
    };
    
    users.push(adminUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('Admin kullanıcısı oluşturuldu');
  }
}

// Sayfa yüklendiğinde admin kullanıcısını oluştur
document.addEventListener('DOMContentLoaded', function() {
  createAdminUser();
  updateAuthUI();
});

// Diğer fonksiyonlar aynı kalacak...
function logout() {
  localStorage.removeItem('currentUser');
  updateAuthUI();
  window.location.href = 'index.html';
}

function updateAuthUI() {
  const authButtons = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');
  const userName = document.getElementById('userName');
  const adminMenu = document.getElementById('adminMenu');
  
  const currentUser = getCurrentUser();
  
  if (currentUser) {
    if (authButtons) authButtons.classList.add('hidden');
    if (userMenu) {
      userMenu.classList.remove('hidden');
      userName.textContent = currentUser.name;
      
      if (adminMenu && currentUser.role === 'admin') {
        adminMenu.classList.remove('hidden');
      }
    }
  } else {
    if (authButtons) authButtons.classList.remove('hidden');
    if (userMenu) userMenu.classList.add('hidden');
  }
}

function getCurrentUser() {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
}

function showAuthMessage(message, type) {
  const messageDiv = document.getElementById('authMessage');
  if (messageDiv) {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.classList.remove('hidden');
    
    setTimeout(() => {
      messageDiv.classList.add('hidden');
    }, 5000);
  } else {
    alert(message);
  }
}
// auth.js dosyasına bu fonksiyonu ekle
function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    const adminLink = document.getElementById('adminLink');
    
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        if (authButtons) authButtons.classList.add('hidden');
        if (userMenu) {
            userMenu.classList.remove('hidden');
            userName.textContent = currentUser.name;
            
            // Admin kullanıcısı için admin linkini göster
            if (adminLink && currentUser.role === 'admin') {
                adminLink.classList.remove('hidden');
            }
        }
    } else {
        if (authButtons) authButtons.classList.remove('hidden');
        if (userMenu) userMenu.classList.add('hidden');
    }
}

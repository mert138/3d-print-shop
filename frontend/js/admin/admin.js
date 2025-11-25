// admin.js - LocalStorage ürün yönetimi
function addProduct(productData) {
  try {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    const newProduct = {
      id: Date.now().toString(),
      ...productData,
      createdAt: new Date().toISOString(),
      reviews: []
    };
    
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    
    return { success: true, product: newProduct };
  } catch (error) {
    return { success: false, error: 'Ürün eklenemedi' };
  }
}

function getProducts() {
  return JSON.parse(localStorage.getItem('products')) || [];
}

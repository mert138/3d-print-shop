const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Tüm admin route'ları için auth ve admin middleware'ı
router.use(auth);
router.use(admin);

// Ürün ekle
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Ürün güncelle
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Ürün sil
router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ürün silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Onay bekleyen yorumları getir
router.get('/reviews/pending', async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: false })
      .populate('user', 'username')
      .populate('product', 'name');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Yorum onayla
router.put('/reviews/:id/approve', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Yorum sil
router.delete('/reviews/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Yorum silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
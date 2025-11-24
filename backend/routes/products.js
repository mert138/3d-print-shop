const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

const router = express.Router();

// Tüm ürünleri getir
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Tek ürün getir
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const reviews = await Review.find({ 
      product: req.params.id, 
      isApproved: true 
    }).populate('user', 'username');
    
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }

    res.json({ product, reviews });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Yorum ekle
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    const review = new Review({
      product: req.params.id,
      user: req.user._id,
      rating,
      comment
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

module.exports = router;
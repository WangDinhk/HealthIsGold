const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.post('/add', CartController.addToCart);
router.put('/update', CartController.updateCartItem);
router.get('/:userId', CartController.getUserCart);
router.delete('/remove', CartController.removeFromCart);
router.delete('/delete', CartController.deleteCart);

module.exports = router;

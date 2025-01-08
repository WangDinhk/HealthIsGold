const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController')

// Route xử lý tạo thanh toán
router.post('/create-payment-momo', PaymentController.createPayment);
module.exports = router;

// src/routes/PaymentRouter.js

// const express = require('express');
// const PaymentController = require('../controllers/PaymentController');

// const router = express.Router();

// // POST /api/payments: Tạo thanh toán mới
// router.post('/transfer', PaymentController.createPayment);

// module.exports = router;

const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController')

router.post('/create',OrderController.createOrder);
router.get ('/getAll',OrderController.getAllOrder);
router.get ('/getDetail/:id',OrderController.getDetailOrder);
router.post('/update/:id',OrderController.updateOrder)
module.exports =router;
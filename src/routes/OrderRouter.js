const express = require("express");
const router = express.Router()
const IsAdminMiddleWare = require("../middleware/IsAdminMiddleWare");
const User_AdminMiddleWare =require("../middleware/User_AdminMiddleWare");
const OrderController = require('../controllers/OrderController')

router.post('/create',OrderController.createOrder);
router.get ('/getAll',User_AdminMiddleWare,OrderController.getAllOrder);
router.get ('/getDetail/:id',OrderController.getDetailOrder);
module.exports =router;
const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.use('/create', ProductController.createProduct)
router.put('/update/:id', ProductController.updateProduct)
router.get('/get-details/:id', ProductController.getDetailsProduct)
router.use('/delete/:id', ProductController.deleteProduct)
router.get('/get-all', ProductController.getAllProduct)

module.exports = router
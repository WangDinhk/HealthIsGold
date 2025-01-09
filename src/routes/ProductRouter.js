const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.use('/create', ProductController.createProduct)
router.put('/update/:id', ProductController.updateProduct)
router.get('/get-details/:id', ProductController.getDetailsProduct)
router.use('/delete/:id', ProductController.deleteProduct)
router.get('/get-all', ProductController.getAllProduct)
router.get('/get-by-type/:type', ProductController.getProductsByType)
router.get('/filter-options', ProductController.getFilterOptions)
router.get('/search', ProductController.searchProducts)
router.get('/newest', ProductController.getNewestProducts)

module.exports = router
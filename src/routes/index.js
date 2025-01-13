const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const CartRouter = require('./CartRouter')
const PaymentRouter = require('./PaymentRouter')
const OrderRouter = require('./OrderRouter')
const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/cart', CartRouter)
    app.use('/api/payment', PaymentRouter)
    app.use('/api/order', OrderRouter)
}

module.exports = routes;

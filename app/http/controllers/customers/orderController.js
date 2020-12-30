const Order = require('../../../models/order')
function orderController () {
    return {
        store(req, res) {
            // Validate request
            const { phone, address } = req.body
            if(!phone || !address) {
                   req.flash('error', 'All fields are required')
                   return res.redirect('/cart')
               }

               const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })

               order.save().then(result => {
                   req.flash('success', 'Order placed successfully')
                   return res.redirect('/')
                }).catch(err => {
                   req.flash('error', 'Somthing went wrong')
                   return res.redirect('/cart')
               })
        },

       async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id })
            console.log(orders)
        }
    }
}

module.exports = orderController
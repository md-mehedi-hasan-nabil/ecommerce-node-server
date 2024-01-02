const OrderModel = require("../models/Order.model")
const Format = require('response-format');

async function getOrders(req, res, next) {
    try {
        const orders = await OrderModel.find({}).populate([
            {
                path: "user",
                model: "user"
            },
            {
                path: "cart",
                model: "cart",
                populate: {
                    path: "product",
                    model: "product",
                }
            }
        ])
        res.status(200).json(orders)
    } catch (error) {
        next(error)
    }
}

async function getOrder(req, res, next) {
    try {
        const { orderId } = req.params || {};
        const order = await OrderModel.findById(orderId).populate([
            {
                path: "user",
                model: "user"
            },
            {
                path: "cart",
                model: "cart",
                populate: {
                    path: "product",
                    model: "product",
                }
            }
        ])
        res.status(200).json(order)
    } catch (error) {
        next(error)
    }
}

async function addOrder(req, res, next) {
    try {
        const { user, cart, total_price } = req.body // cart is array

        const newOrder = new OrderModel({
            user, cart, total_price
        })

        await newOrder.save()

        res.status(201).json(Format.success("Order successful.", newOrder))
    } catch (error) {
        console.log(error)
        next(error)
    }
}







module.exports = {
    getOrders, getOrder, addOrder
}
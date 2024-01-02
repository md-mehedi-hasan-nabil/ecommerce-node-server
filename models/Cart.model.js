const { Schema, default: mongoose } = require("mongoose");

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }, 
    product: {
        type: Schema.Types.ObjectId,
        ref: "product"
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const CartModel = mongoose.model("cart", cartSchema);

module.exports = CartModel
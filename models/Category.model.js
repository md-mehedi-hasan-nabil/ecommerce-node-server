const { Schema, default: mongoose } = require("mongoose");

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

const CategoryModel = mongoose.model("category", categorySchema);

module.exports = CategoryModel


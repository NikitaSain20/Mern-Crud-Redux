const mongoose = require("mongoose");

const crudSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("order", crudSchema);
module.exports = Order;

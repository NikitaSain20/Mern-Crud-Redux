const Order = require("../Model/crud");

const addOrder = async (req, res) => {
  try {
    let created_order = await Order.create({
      item: req.body.item,
      price: req.body.price,
      location: req.body.location,
    });
    return res.status(200).json({ success: "true", created_order });
  } catch (err) {
    return res.status(400).json({ success: "false", err });
  }
};

const showOrder = async (req, res) => {
  let allOrders = await Order.find({});
  try {
    if (allOrders) {
      return res.status(200).json({ success: "true", allOrders });
    }
  } catch (err) {
    return res.status(400).json({ success: "false", err });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// updating the order

const updateOrder = async (req, res) => {
  const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  try {
    if (updateOrder) {
      return res.status(200).json({
        success: "true",
        updateOrder,
      });
    }
  } catch (err) {
    return res.status(400).json({ success: "false", err });
  }
};
module.exports = { addOrder, showOrder, deleteOrder, updateOrder };

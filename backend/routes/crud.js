const express = require("express");
const router = express.Router();
const {
  addOrder,
  showOrder,
  deleteOrder,
  updateOrder,
} = require("../Controller/Crud");

router.post("/createOrder", addOrder);
router.get("/order", showOrder);
router.delete("/deleteOrder/:id", deleteOrder);
router.put("/updateOrder/:id", updateOrder);
module.exports = router;

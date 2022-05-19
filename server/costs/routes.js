const express = require("express");
const { createItem, deleteItem } = require("./cost-helper");
const router = express.Router();

router.post("/api/costs/createItem", async (req, res) => {
  try {
    const data = req.body;
    await createItem(data);
    res.status(201).json({ message: "item created" });
  } catch (error) {
    res
      .status(409)
      .json({ message: "cannot create the item" });
  }
});

router.post("/api/costs/deleteItem", async (req, res) => {
  try {
    const data = req.body;
    await deleteItem(data);
    res.status(201).json({ message: "item deleted" });
  } catch (error) {
    res
      .status(409)
      .json({ message: "cannot delete the item" });
  }
});


module.exports = router;

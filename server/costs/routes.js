const express = require("express");
const { createItem, deleteItem, getAllItems } = require("./cost-helper");
const router = express.Router();

router.post("/api/costs/createItem", async (req, res) => {
  try {
    const data = req.body;
    await createItem(data);
    res.status(201).json({ message: "item created" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
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
      .status(400)
      .json({ message: "cannot delete the item" });
  }
});

router.get("/api/costs", async (req, res) => {
  try {
    const items = await getAllItems();
    res.status(200).json({ message: "item fetched", items });
  } catch (error) {
    res
      .status(400)
      .json({ message: "cannot fetch all" });
  }
});


module.exports = router;

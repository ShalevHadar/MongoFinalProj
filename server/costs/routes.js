const express = require("express");
const { createItem, deleteItem, getAllItems, getItemsByDatesAndId } = require("./cost-helper");
const router = express.Router();

router.post("/api/costs/createItem", async (req, res) => {
  try {
    const data = req.body;
    await createItem(data);
    res.status(201).json({ message: "item created" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "cannot create the item" });
  }
});

router.post("/api/costs/deleteItem", async (req, res) => {
  try {
    const data = req.body;
    const {items, user, item} = await deleteItem(data);
    res.status(200).json({ message: "item deleted", items, user, item });
  } catch (error) {
    res
      .status(400)
      .json({ message: "cannot delete the item" });
  }
});

router.get("/api/costs/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const items = await getAllItems(id);
    res.status(200).json({ message: "item fetched", items });
  } catch (error) {
    res
      .status(400)
      .json({ message: "cannot fetch all" });
  }
});

router.post("/api/costs/sortby", async (req, res) => {
  try {
    const {startDate, endDate, id} = req.body;
    const items = await getItemsByDatesAndId(startDate, endDate, id); 
    res.status(200).json({ message: "items  fetched", items });
  } catch (error) {
    res
      .status(400)
      .json({ message: "cannot items by date" });
  }
});


module.exports = router;

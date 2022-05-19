const express = require("express");
const { createUser } = require("./user-helper");
const router = express.Router();

router.post("/api/users/register", async (req, res) => {
  try {
    const data = req.body;
    await createUser(data);
    res.status(201).json({ message: "user created" });
  } catch (error) {
    console.log(error);
    res
      .status(409)
      .json({ message: "cannot create the user" });
  }
});


module.exports = router;

const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

router.post("/tasks", taskController.create);
router.get("/tasks", taskController.findAll);
router.put("/tasks/:id", taskController.update);
router.delete("/tasks/:id", taskController.delete);

module.exports = router;
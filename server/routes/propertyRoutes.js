const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const controller = require("../controllers/propertyController");


router.get("/",controller.getProperties);

router.get("/:id",controller.getProperty);

router.post("/",auth,controller.addProperty);

router.put("/:id",auth,controller.updateProperty);

router.delete("/:id",auth,controller.deleteProperty);

module.exports = router;
const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const controller = require("../controllers/offerController");

router.post("/", auth, controller.sendOffer);

router.get("/", auth, controller.getMyOffers);

router.put("/:id", auth, controller.updateOffer);

module.exports = router;
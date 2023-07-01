const express = require("express");
const router = express.Router();
const commissionedArtworkController = require("../controllers/commissionedArtworkController");

// Routes
router.post("/", commissionedArtworkController.createCommissionedArtwork);
router.get("/", commissionedArtworkController.getAllCommissionedArtworks);
router.get(
  "/seller/:userId",
  commissionedArtworkController.getCommissionedArtworksByUserId
);
router.put("/accept/:orderId", commissionedArtworkController.acceptWork);
router.put("/reject/:orderId", commissionedArtworkController.rejectWork);

module.exports = router;

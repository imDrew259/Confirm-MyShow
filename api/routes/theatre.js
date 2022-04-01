const express = require("express");

const auth = require("../middleware/is-auth");
const theatreController = require("../controllers/theatre.js");

const router = express.Router();

router.put("/post-theatre", auth, theatreController.postTheatre);
router.get("/get-theatre/:showId", auth, theatreController.getTheatre);
router.post("/seats-status", auth, theatreController.seatsStatus);
router.post("/book-ticket", auth, theatreController.bookTicket);
router.post("/generate-razorpayid", auth, theatreController.generateRazorpayId);

module.exports = router;

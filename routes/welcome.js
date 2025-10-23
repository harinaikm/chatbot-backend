const express = require("express");

const router = express.Router();

router.get("/welcome", (req, res) => {
  res.status(200).json({
    message: "How can i help you today.",
    options: [
      {
        id: "orders_related",
        name: "Orders Related",
      },
      {
        id: "offers_coupons",
        name: "Offers/Coupons",
      },
    ],
  });
});

module.exports = router;

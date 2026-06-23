const express = require("express");
const QRCode = require("qrcode");

const router = express.Router();

router.get("/:id", async (req, res) => {
try {
const { id } = req.params;


const qr = await QRCode.toDataURL(
  `ORDER-${id}`
);

res.json({
  qr,
});


} catch (error) {
res.status(500).json({
message: error.message,
});
}
});

module.exports = router;

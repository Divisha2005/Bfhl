import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: "divisha2116.be23@chitkara.edu.in"
  });
});

export default router;
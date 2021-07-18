import express from "express";

import { price, priceTicker } from "../controllers/priceController";

const router = express.Router();

router.get("/", price);
router.get("/ticker", priceTicker);

export { router as priceRoute };

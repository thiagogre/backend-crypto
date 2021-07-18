import express from "express";

import { validateRequest } from "../middleware/validate-request";
import { coins, coinsAll } from "../controllers/coinsController";

const router = express.Router();

router.use(validateRequest);
router.get("/", coins);
router.get("/all", coinsAll);

export { router as coinsRoute };

import express from "express";

import { index } from "../controllers/index";

const router = express.Router();

router.get("/", index);

export { router as indexRoute };

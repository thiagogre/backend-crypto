import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import * as apiSchema from "./docs/schema.json";
import { indexRoute } from "./routes/index";
import { coinsRoute } from "./routes/coinsRoute";
import { priceRoute } from "./routes/priceRoute";

const app = express();

app.use(express.json())
    .use(cors())
    .use("/", indexRoute)
    .use("/docs", swaggerUi.serve, swaggerUi.setup(apiSchema))
    .use("/coins", coinsRoute)
    .use("/price", priceRoute);

export default app;

import type { Express } from "express";
import petRouter from "./petRouter.js";
import adopterRouter from "./adopterRouter.js";

export default function router(app: Express) {
    app.use("/pets", petRouter);
    app.use("/adopter", adopterRouter);
}


//TO DO - create ENUM for ROUTES
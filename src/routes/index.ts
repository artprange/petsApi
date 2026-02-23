import express from "express";
import petRouter from "../routes/petRouter.js"
import adopterRouter from "../routes/adopterRouter.js"

const router = (app: express.Router) => {
    app.use("/pets", petRouter)
    app.use("/adopter", adopterRouter);
}

export default router



//TO DO - create ENUM for ROUTES
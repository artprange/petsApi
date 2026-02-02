import petRouter from "../routes/petRouter.js";
const router = (app) => {
    app.use("/pets", petRouter);
};
export default router;
//TO DO - create ENUM for ROUTES

import express from 'express';
import router from './routes/index.js';
import { AppDataSource } from './config/dataSource.js';
// import "reflect-metadata"
const app = express();
app.use(express.json());
router(app);
AppDataSource.initialize()
    .then(() => {
    console.log('Database connected');
})
    .catch((error) => {
    console.log(error);
});
export default app;

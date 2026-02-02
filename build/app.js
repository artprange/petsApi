import express from "express";
import router from "./routes/index.js";
const app = express();
app.use(express.json());
router(app);
app.get("/", (_, res) => {
    res.send("Bem vindo");
});
function criaPet(id, nome, especie, idade, adotado) {
    return {
        id,
        nome,
        especie,
        idade,
        adotado,
    };
}
let id = 0;
function geraId() {
    id = id + 1;
    return id;
}
app.post("/pets", (_, res) => {
    const pet1 = criaPet(geraId(), "Bolt", "cachorro", 3, false);
    const pet2 = criaPet(geraId(), "Mel", "gato", 2, false);
    res.send([pet1, pet2]);
});
export default app;

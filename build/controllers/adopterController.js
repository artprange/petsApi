import AdopterEntity from "../entities/adopterEntity.js";
export default class AdoptionController {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async generateAdopter(req, res) {
        try {
            const { name, mobile, address, picture, password } = req.body;
            if (!name || !mobile || !address || !picture || !password) {
                return res.status(400).json({
                    error: "Campos obrigatórios: name, mobile, address, picture, password",
                });
            }
            const adopter = new AdopterEntity(name, password, mobile, picture, address);
            const created = await this.repository.generateAdopter(adopter);
            return res.status(201).json(created);
        }
        catch {
            return res.status(500).json({ error: "Erro ao criar o adotante" });
        }
    }
}

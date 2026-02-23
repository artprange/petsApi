import type { Request, Response } from "express";
import AdopterEntity from "../entities/adopterEntity.js";
import type InterfaceAdopterRepository from "../repos/interfaces/InterfaceAdopterRepository.js";
import type { CreateAdopterDTO } from "../dtos/CreateAdopterDTO.js";

export default class AdoptionController {
    constructor(private repository: InterfaceAdopterRepository) { }

    async generateAdopter(req: Request, res: Response) {
        try {
            const { name, mobile, address, picture, password } = req.body as CreateAdopterDTO;

            if (!name || !mobile || !address || !picture || !password) {
                return res.status(400).json({
                    error: "Campos obrigatórios: name, mobile, address, picture, password",
                });
            }

            const adopter = new AdopterEntity(name, password, mobile, picture, address);

            const created = await this.repository.generateAdopter(adopter);

            return res.status(201).json(created);
        } catch {
            return res.status(500).json({ error: "Erro ao criar o adotante" });
        }
    }
}
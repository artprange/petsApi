import AdopterEntity from "../entities/adopterEntity.js";
export default class AdoptionController {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async generateAdopter(req, res) {
        try {
            const { name, mobile, address, picture, password } = req.body;
            if (!name || !mobile || !password) {
                return res.status(400).json({
                    error: "Campos obrigatórios: name, mobile, password",
                });
            }
            const adopter = new AdopterEntity({
                name,
                password,
                mobile,
                picture: picture?.trim() ? picture : null,
                address: address?.trim() ? address : null,
            });
            const created = await this.repository.generateAdopter(adopter);
            return res.status(201).json(created);
        }
        catch (error) {
            console.error("generateAdopter error:", error);
            return res.status(500).json({ error: "Erro ao criar o adotante" });
        }
    }
}
//TODO => IMPLEMENT HASH FOR THE PASSOWRD
// import type { Request, Response } from "express";
// import AdopterEntity from "../entities/adopterEntity.js";
// import type InterfaceAdopterRepository from "../repos/interfaces/InterfaceAdopterRepository.js";
// import type { CreateAdopterDTO } from "../dtos/CreateAdopterDTO.js";
// export default class AdoptionController {
//   constructor(private repository: InterfaceAdopterRepository) {}
//   async generateAdopter(req: Request, res: Response) {
//     try {
//       const { name, mobile, address, picture, password } = req.body as CreateAdopterDTO;
//       if (!name || !mobile || !password) {
//         return res.status(400).json({
//           error: "Campos obrigatórios: name, mobile, password",
//         });
//       }
//       const adopter = new AdopterEntity({
//         name,
//         password,
//         mobile,
//         picture: picture?.trim() ? picture : null,
//         address: address?.trim() ? address : null,
//       });
//       const created = await this.repository.generateAdopter(adopter);
//       // não devolve senha (nem por acidente)
//       const { password: _password, ...safe } = created;
//       return res.status(201).json(safe);
//     } catch (error) {
//       console.error("generateAdopter error:", error);
//       return res.status(500).json({ error: "Erro ao criar o adotante" });
//     }
//   }
// }

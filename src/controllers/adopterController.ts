import type { Request, Response } from "express";
import AdopterEntity from "../entities/adopterEntity.js";
import type InterfaceAdopterRepository from "../repos/interfaces/InterfaceAdopterRepository.js";
import type { CreateAdopterDTO } from "../dtos/CreateAdopterDTO.js";
import { UpdateAdopterDTO } from "../dtos/UpdateDopterDTO.js";


function toSafe(adopter: AdopterEntity) {
    const { password: _password, ...safe } = adopter;
    return safe;
}

export default class AdoptionController {
    constructor(private repository: InterfaceAdopterRepository) { }

    // POST /adopter
    async generateAdopter(req: Request, res: Response) {
        try {
            const { name, mobile, address, picture, password } = req.body as CreateAdopterDTO;

            if (!name || !mobile || !password) {
                return res.status(400).json({ error: "Campos obrigatórios: name, mobile, password" });
            }

            const adopter = new AdopterEntity({
                name,
                password,
                mobile,
                picture: picture?.trim() ? picture : null,
                address: address?.trim() ? address : null,
            });

            const created = await this.repository.generateAdopter(adopter);
            return res.status(201).json(toSafe(created));
        } catch (error) {
            console.error("generateAdopter error:", error);
            return res.status(500).json({ error: "Erro ao criar o adotante" });
        }
    }

    // GET /adopter
    async listAdopters(_req: Request, res: Response) {
        try {
            const list = await this.repository.listAdopters();
            return res.status(200).json(list.map(toSafe));
        } catch (error) {
            console.error("listAdopters error:", error);
            return res.status(500).json({ error: "Erro ao listar adotantes" });
        }
    }

    // GET /adopter/:id
    async getAdopter(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id)) return res.status(400).json({ error: "id inválido" });

            const adopter = await this.repository.getAdopterById(id);
            if (!adopter) return res.status(404).json({ error: "Adotante não encontrado" });

            return res.status(200).json(toSafe(adopter));
        } catch (error) {
            console.error("getAdopter error:", error);
            return res.status(500).json({ error: "Erro ao buscar adotante" });
        }
    }

    // PUT /adopter/:id
    async updateAdopter(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id)) return res.status(400).json({ error: "id inválido" });

            const { name, password, mobile, picture, address } = req.body as UpdateAdopterDTO;

            const patch: Partial<AdopterEntity> = {};

            if (typeof name === "string") patch.name = name;
            if (typeof password === "string") patch.password = password;
            if (typeof mobile === "string") patch.mobile = mobile;

            if (typeof picture === "string") patch.picture = picture.trim() ? picture : null;
            if (picture === null) patch.picture = null;

            if (typeof address === "string") patch.address = address.trim() ? address : null;
            if (address === null) patch.address = null;

            if (Object.keys(patch).length === 0) {
                return res.status(400).json({ error: "Nenhum campo para atualizar" });
            }

            const updated = await this.repository.updateAdopter(id, patch);
            if (!updated) return res.status(404).json({ error: "Adotante não encontrado" });

            return res.status(200).json(toSafe(updated));
        } catch (error) {
            console.error("updateAdopter error:", error);
            return res.status(500).json({ error: "Erro ao atualizar adotante" });
        }
    }

    // DELETE /adopter/:id
    async deleteAdopter(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id)) return res.status(400).json({ error: "id inválido" });

            const ok = await this.repository.deleteAdopter(id);
            if (!ok) return res.status(404).json({ error: "Adotante não encontrado" });

            return res.status(204).send();
        } catch (error) {
            console.error("deleteAdopter error:", error);
            return res.status(500).json({ error: "Erro ao deletar adotante" });
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
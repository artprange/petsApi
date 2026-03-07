import type { Request, Response } from "express";

import type InterfaceAdopterRepository from "../repos/interfaces/InterfaceAdopterRepository.js";
import type { CreateAdopterDTO } from "../dtos/CreateAdopterDTO.js";
import { UpdateAdopterDTO } from "../dtos/UpdateDopterDTO.js";
import AdopterEntity from "../entities/adopterEntity.js";
import { UpdateAdopterAdressDTO } from "../dtos/UpdateAdopterAdressDTO.js";
import AddressEntity from "../entities/adressEntity.js";


function toSafe(adopter: AdopterEntity) {
    const { password: _password, ...safe } = adopter;
    return safe;
}

export default class AdoptionController {
    constructor(private repository: InterfaceAdopterRepository) { }


    async generateAdopter(req: Request, res: Response) {
        try {
            const { name, mobile, picture, password, address } = req.body as CreateAdopterDTO;

            if (!name || !mobile || !password) {
                return res.status(400).json({ error: "Campos obrigatórios: name, mobile, password" });
            }

            // address é objeto opcional
            const addressEntity =
                address && address.city && address.state
                    ? new AddressEntity(address.city.trim(), address.state.trim())
                    : null;

            const adopter = new AdopterEntity({
                name,
                password,
                mobile,
                picture: picture?.trim() ? picture : null,
                address: addressEntity,
            });

            const created = await this.repository.generateAdopter(adopter);
            return res.status(201).json(toSafe(created));
        } catch (error) {
            console.error("generateAdopter error:", error);
            return res.status(500).json({ error: "Erro ao criar o adotante" });
        }
    }


    async listAdopters(_req: Request, res: Response) {
        try {
            const list = await this.repository.listAdopters();
            return res.status(200).json(list.map(toSafe));
        } catch (error) {
            console.error("listAdopters error:", error);
            return res.status(500).json({ error: "Erro ao listar adotantes" });
        }
    }


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


    async updateAdopter(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id)) return res.status(400).json({ error: "id inválido" });

            const { name, password, mobile, picture, address } = req.body as UpdateAdopterDTO;

            const patch: Partial<AdopterEntity> = {};

            // campos simples
            if (typeof name === "string") patch.name = name;
            if (typeof password === "string") patch.password = password;
            if (typeof mobile === "string") patch.mobile = mobile;

            // picture: string | null | undefined
            if (typeof picture === "string") patch.picture = picture.trim() ? picture : null;
            if (picture === null) patch.picture = null;

            // address: {city,state} | null | undefined
            if (address === null) {
                patch.address = null;
            } else if (typeof address === "object" && address !== null) {
                const city = typeof address.city === "string" ? address.city.trim() : "";
                const state = typeof address.state === "string" ? address.state.trim() : "";

                if (!city || !state) {
                    return res.status(400).json({ error: "Campos obrigatórios em address: city, state" });
                }

                patch.address = new AddressEntity(city, state);
            }

            if (Object.keys(patch).length === 0) {
                return res.status(400).json({ error: "Nenhum campo para atualizar" });
            }

            const updated = await this.repository.updateAdopter(id, patch);
            if (!updated) return res.status(404).json({ error: "Adotante não encontrado" });

            // não devolve senha
            const { password: _password, ...safe } = updated;
            return res.status(200).json(safe);
        } catch (error) {
            console.error("updateAdopter error:", error);
            return res.status(500).json({ error: "Erro ao atualizar adotante" });
        }
    }


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
    async updateAdopterAddress(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            if (!Number.isFinite(id)) return res.status(400).json({ error: "id inválido" });

            // permite remover endereço também
            if (req.body?.address === null) {
                const updated = await this.repository.updateAdopter(id, { address: null });
                if (!updated) return res.status(404).json({ error: "Adotante não encontrado" });

                const { password: _password, ...safe } = updated;
                return res.status(200).json(safe);
            }

            const { city, state } = req.body as UpdateAdopterAdressDTO;

            if (!city || !state) {
                return res.status(400).json({ error: "Campos obrigatórios: city, state" });
            }

            const address = new AddressEntity(city.trim(), state.trim());

            const updated = await this.repository.updateAdopter(id, { address });
            if (!updated) return res.status(404).json({ error: "Adotante não encontrado" });

            const { password: _password, ...safe } = updated;
            return res.status(200).json(safe);
        } catch (error) {
            console.error("updateAdopterAddress error:", error);
            return res.status(500).json({ error: "Erro ao atualizar endereço" });
        }
    }
}

//TODO => IMPLEMENT HASH FOR THE PASSOWRD


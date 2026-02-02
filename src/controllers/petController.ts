import {Request,Response} from 'express'
import { PetType } from '../types/petType.js'

    let petList: PetType[] = []

export default class PetController{
    generatePet(req: Request, res: Response){
        const {id, adopted, species, age, name} =<PetType> req.body 
        const newPet:PetType = {id, adopted, species, age, name}
        petList.push(newPet)
        return res.status(201).json(newPet)
    }
}
let petList = [];
export default class PetController {
    generatePet(req, res) {
        const { id, adopted, species, age, name } = req.body;
        const newPet = { id, adopted, species, age, name };
        petList.push(newPet);
        return res.status(201).json(newPet);
    }
}

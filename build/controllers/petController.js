let petList = [];
export default class PetController {
    generatePet(req, res) {
        const newPet = req.body;
        petList.push(newPet);
        return res.status(201).json(newPet);
    }
}

const Animal = require('../models/Animal');

const AnimalController = {
    getAllAnimals() {
        return Animal.findAll();
    },

    getAnimal(id) {
        return Animal.findByPk(id).then(animal => {
            if (animal == null) {
                throw new Error("Animal not found.");
            }

            return animal;
        });
    },

    async insertAnimal(body) {
        if (!body.name || !body.species || !body.speed) {
            throw new Error("Bad request.");
        }

        return Animal.create({
            name: body.name,
            species: body.species,
            speed: body.speed,
        });
    },

    updateAnimal(id, body) {
        return Animal.findByPk(id).then(animal => {
            if (animal == null) {
                throw new Error("Animal not found.");
            }

            if (id != body.id || !body.id || !body.name || !body.species || !body.speed) {
                throw new Error("Bad request.");
            }

            return Animal.update({
                name: body.name,
                species: body.species,
                speed: body.speed,
            }, { where: { id: animal.id }});
        });
    },

    deleteAnimal(id) {
        return Animal.findByPk(id).then(animal => {
            if (animal == null) {
                throw new Error("Animal not found.");
            }

            return Animal.destroy({
                where: { id: animal.id },
            });
        });
    }
}

module.exports = AnimalController;

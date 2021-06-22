const express = require('express');
const AnimalController = require('../controllers/AnimalController');
const error = require('../error');
const router = express.Router();

router.get('/', (_req, res) => {
    AnimalController.getAllAnimals()
        .then(animals => res.send(animals))
        .catch(_ => res.status(500).json(
            error(500, e.message)
        ));
});

router.post('/', (req, res) => {
    AnimalController.insertAnimal(req.body)
        .then(animal => res.send(animal))
        .catch(e => {
            if (e.message == "Bad request.") {
                res.status(400).json(
                    error(400, e.message)
                );
            }

            else {
                res.status(500).json(
                    error(500, e.message)
                );
            }
        });
});

router.get('/:id', (req, res) => {
    AnimalController.getAnimal(req.params.id)
        .then(animal => res.send(animal))
        .catch(e => {
            if (e.message == "Animal not found.") {
                res.status(404).json(
                    error(404, e.message)
                );
            }

            else {
                res.status(500).json(
                    error(500, e.message)
                );
            }
        });
});

router.put('/:id', (req, res) => {
    AnimalController.updateAnimal(req.params.id, req.body)
        .then(result => res.send(result))
        .catch(e => {
            if (e.message == "Bad request.") {
                res.status(400).json(
                    error(400, e.message)
                );
            }

            else if (e.message == "Animal not found.") {
                res.status(404).json(
                    error(404, e.message)
                );
            }

            else {
                res.status(500).json(
                    error(500, e.message)
                );
            }
        });
});

router.delete('/:id', (req, res) => {
    AnimalController.deleteAnimal(req.params.id)
        .then(result => res.send({ deleted: result }))
        .catch(e => {
            if (e.message == "Animal not found.") {
                res.status(404).json(
                    error(404, e.message)
                );
            }

            else {
                res.status(500).json(
                    error(500, e.message)
                );
            }
        });
});

module.exports = router;

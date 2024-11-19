import { Router } from 'express';
import { createAndSave, personRepository } from '../om/person.js';

export const router = Router();

router.put('/', async (req, res) => {
  try {
    const person = await createAndSave(req.body);
    console.log('Created person:', person);
    res.status(201).json(person);
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Getting a person by ID
router.get('/:id', async (req, res, next) => {
  try {
    const person = await personRepository.fetch(req.params.id);
    console.log('Fetched person:', person);
    res.json(person);
  } catch (error) {
    console.error(`Failed to fetch person ${req.params.id}:`, error);
    next(error);
  }
});

// Updating a person by ID
router.post('/:id', async (req, res, next) => {
  try {
    const person = await personRepository.fetch(req.params.id);
    if (!person) {
      res.status(404).json({ error: 'Person not found' });
      return;
    }

    // Manually update the properties of the person object
    person.firstName = req.body.firstName ?? person.firstName;
    person.lastName = req.body.lastName ?? person.lastName;
    person.age = req.body.age ?? person.age;
    person.verified = req.body.verified ?? person.verified;
    person.location = req.body.location ?? person.location;
    person.locationUpdated = req.body.locationUpdated ?? person.locationUpdated;
    person.skills = req.body.skills ?? person.skills;
    person.personalStatement = req.body.personalStatement ?? person.personalStatement;

    await personRepository.save(person);
    console.log('Updated person:', person);
    res.json(person);
  } catch (error) {
    console.error(`Failed to update person ${req.params.id}:`, error);
    next(error);
  }
});

// Deleting a person by ID
router.delete('/:id', async (req, res) => {
  try {
    await personRepository.remove(req.params.id);
    console.log('Deleted person:', req.params.id);
    res.send({ entityId: req.params.id })
  }
  catch (error) {
    console.error(`Failed to delete person ${req.params.id}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
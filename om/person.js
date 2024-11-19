import client from '../client.js';
import { Entity, Schema } from 'redis-om';

// Define a schema for the person entity
class Person extends Entity {}
const personSchema = new Schema(Person, {
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  age: { type: 'number' },
  verified: { type: 'boolean' },
  location: { type: 'point' },
  locationUpdated: { type: 'date' },
  skills: { type: 'string[]' },
  personalStatement: { type: 'text' }
});

// Create a repository for the person entity
export const personRepository = client.fetchRepository(personSchema);

// Implement the createAndSave method
export const createAndSave = async (personData) => {
  // Create a new person entity
  const person = personRepository.createEntity(personData);

  // Save the person entity to Redis
  const id = await personRepository.save(person);

  // Fetch the saved person entity
  const savedPerson = await personRepository.fetch(id);

  // Return the saved person entity
  return savedPerson;
};

// Create the index for Person
await personRepository.createIndex();
import { Router } from 'express'
import { personRepository } from '../om/person.js'

export const router = Router()

// Search all keys
router.get('/all', async (req, res) => {
    const persons = await personRepository.search().return.all()
    res.send(persons)
  })
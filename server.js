import 'dotenv/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { router as personRouter } from './routers/person-router.js'
import { router as searchRouter } from './routers/search-router.js'

/* create an express app and use JSON */
const app = express();
app.use(express.json());

/* set up swagger in the root */
try {
  const swaggerDocument = YAML.load('api.yaml');
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log('Swagger loaded');
} catch (error) {
  console.error('Failed to load Swagger document:', error);
}

app.use('/person', personRouter)
app.use('/persons', searchRouter)

/* 404 handler */
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

/* global error handler */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

/* start the server */
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
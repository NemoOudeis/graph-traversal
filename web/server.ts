import express from "express"
import * as OpenApiValidator from 'express-openapi-validator'
import { graphTraversalHandler } from "./request-handler"
import { Request, Response, NextFunction } from "express"

const app = express()
const port = 3000

app.use(express.json())

app.use(
  OpenApiValidator.middleware({
    apiSpec: './web/graph-traversal.yml',
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  }),
);

app.post('/:algo', graphTraversalHandler)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(port, () => {
  console.log(`Running app on http://localhost:${port}`)
})
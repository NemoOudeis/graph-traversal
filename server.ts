import express from "express"
import { dfs } from "./dfs"
import { graph, Graph } from "./graph"
import { log } from "./log"
import * as OpenApiValidator from 'express-openapi-validator'

const app = express()
const port = 3000

app.use(express.json())

app.use(
  OpenApiValidator.middleware({
    apiSpec: './graph-traversal.yml',
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  }),
);

app.post('/dfs', (req, res) => {
  validate(req)
  const graph = parseGraph(req.body.graph)
  const start = req.body.start || '1'
  
  const result = dfs(graph, start)

  const distances = Object.entries(result).map(it => {
    return {
      destination: it[0],
      distance: it[1]
    }
  })

  res.send({
    start, 
    graph: {
      nodes: Array.from(graph.nodes),
      edges: graph.edges,
    },
    distances
  })
})

app.use((err: any, req: any, res: any, next: any) => {
  // log(err)
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

interface GraphRequest {
  edges: string[][]
}

const validate = (_req: any): void => {}
const parseGraph = (input: GraphRequest): Graph<string> => {
  const edges = input.edges.map(it => {
    return {
      src: it[0],
      dst: it[1],
      weight: Number(it[2]) || 1
    }
  })
  
  return graph(edges)
}
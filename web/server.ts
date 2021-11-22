import express from "express"
import { dfs } from "../core/dfs"
import { bfs } from "../core/bfs"
import { dijkstra } from "../core/dijkstra"
import { graph, Graph } from "../core/graph"
import { log } from "../core/log"
import * as OpenApiValidator from 'express-openapi-validator'

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

const algos = {
  dfs,
  bfs,
  dijkstra
}

app.post('/:algo', (req, res) => {
  const graph = parseGraph(req.body.graph)
  const start = req.body.start
  
  const algo: string = req.params.algo
  const fun = (algos as any)[algo]

  const result = fun(graph, start)

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
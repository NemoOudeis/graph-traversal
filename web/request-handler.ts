import { dfs } from "../core/dfs"
import { bfs } from "../core/bfs"
import { dijkstra } from "../core/dijkstra"
import { graph, Graph } from "../core/graph"
import { log } from "../core/log"
import { Request, Response } from "express"

const algos = {
  dfs,
  bfs,
  dijkstra
}

export const graphTraversalHandler = (req: Request, res: Response) => {
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
}

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
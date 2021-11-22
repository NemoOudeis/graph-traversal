import { Graph } from "./graph"
import { log } from "./log"

export const bfs = (graph: Graph<string>, start: string) => {
  const queue = []
  queue.push({node: start, d: 0})
  const distances: Record<string, number> = {}

  while (queue.length > 0) {
    const next = queue.shift()
    if(!next) continue
    const visited = Object.keys(distances)
    
    if(visited.includes(next.node)) {
      log('bfs: already visited ', next.node)
      continue
    }
    distances[next.node] = next.d
    
    for(const neighbor of graph.neighbors(next.node)) {
      if(!visited.includes(neighbor)) {
        queue.push({node: neighbor, d: next.d + 1})
      } else {
        log('bfs: already visited ', next.node)
      }
    }
  }
  return distances
}

import { Graph } from "./graph"
import { log } from "./log"

const infinity = Number.MAX_SAFE_INTEGER

export const dfs = (graph: Graph<string>, start: string) => {
  const queue = []
  queue.push({node: start, d: 0})
  const distances: Record<string, number> = {}

  while (queue.length > 0) {
    const next = queue.shift()
    if(!next) continue
    const visited = Object.keys(distances)
    
    if(distances[next.node] || infinity < next.d + 1) {
      log('dfs: already visited ', next.node, ' on a shorter path')
      continue
    }
    distances[next.node] = next.d

    for(const neighbor of graph.neighbors(next.node)) {
      if(distances[next.node] || infinity > next.d + 1) {
        queue.unshift({node: neighbor, d: next.d + 1})
      } else {
        log('dfs: already visited ', next.node, ' on a shorter path')
      }
    }
  }
  return distances
}
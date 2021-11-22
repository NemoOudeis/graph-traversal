import { Graph } from "./graph"

export const bfs = (graph: Graph<string>, start: string) => {
  const queue = []
  queue.push({node: start, d: 0})
  const distances: Record<string, number> = {}

  while (queue.length > 0) {
    const next = queue.shift()
    if(!next) continue
    const visited = Object.keys(distances)
    
    if(visited.includes(next.node)) {
      console.log('bfs: already visited ', next.node)
      continue
    }
    distances[next.node] = next.d
    

    for(const neighbor of graph.neighbors(next.node)) {
      if(!visited.includes(neighbor)) {
        queue.push({node: neighbor, d: next.d + 1})
      } else {
        console.log('bfs: already visited ', next.node)
      }
    }
  }
  return distances
}

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
      console.log('dfs: already visited ', next.node, ' on a shorter path')
      continue
    }
    distances[next.node] = next.d

    for(const neighbor of graph.neighbors(next.node)) {
      if(distances[next.node] || infinity > next.d + 1) {
        queue.unshift({node: neighbor, d: next.d + 1})
      } else {
        console.log('dfs: already visited ', next.node, ' on a shorter path')
      }
    }
  }
  return distances
}
import { Graph } from "./graph"
import Heap from "heap"

const infinity = Number.MAX_SAFE_INTEGER

interface Counter {
  node: string
  d: number
}

export const dijksta = (graph: Graph<string>, start: string) => {
  const queue = new Heap<Counter>((r,l) => r.d - l.d)
  queue.push({node: start, d: 0})
  const distances: Record<string, number> = {}
  distances[start] = 0
  
  while (!queue.empty()) {
    const next = queue.pop()
    if(!next) continue
    
    const dist = distances[next.node]
    const q = queue.toArray()
    
    for(const neighbor of graph.neighbors(next.node)) {
      const edge = graph.edge(next.node, neighbor)
      if (!edge) continue
      distances[neighbor] = Math.min(distances[neighbor] || infinity, dist + edge.weight)

      // update priority queue 
      const queueItem = q.find(it => it.node === neighbor)
      if (queueItem) { 
        queueItem.d = distances[neighbor]
        queue.updateItem(queueItem)
      } 
      // add the nodes we haven't encounter to the queue
      if(!q.map(it => it.node).includes(neighbor)) {
        queue.push({node: neighbor, d: distances[neighbor]})
      }
    }
  }
  return distances
}
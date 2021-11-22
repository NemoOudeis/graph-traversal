import { loadGraph } from './graph_from_fs'
import { bfs } from '../core/bfs'
import { dijkstra } from '../core/dijkstra'
import { dfs } from '../core/dfs'


const main = async () => {
  const graph = await loadGraph('./cli/graph.txt')
  console.log(graph)
  console.log(bfs(graph, '1'))
  console.log(dfs(graph, '1'))
  const graph2 = await loadGraph('./cli/graph2.txt')
  console.log(graph2)
  console.log(dijkstra(graph2, '1'))
}

main()
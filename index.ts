import { Graph, loadGraph } from './graph'
import { dfs, bfs } from './exhaustive_search'
import { dijksta } from './dijkstra'


const main = async () => {
  const graph = await loadGraph('./graph.txt')
  console.log(graph)
  console.log(bfs(graph, '1'))
  console.log(dfs(graph, '1'))
  const graph2 = await loadGraph('./graph2.txt')
  console.log(graph2)
  console.log(dijksta(graph2, '1'))
}

main()
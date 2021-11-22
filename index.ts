import { Graph } from './graph'
import { loadGraph } from './graph_from_fs'
import { bfs } from './bfs'
import { dijksta } from './dijkstra'
import { dfs } from './dfs'


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
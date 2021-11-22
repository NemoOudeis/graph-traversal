import * as fs from 'fs/promises'
import { graph, Graph } from '../core/graph'

export const loadGraph = async (file: string): Promise<Graph<string>> => {
  const input = await fs.readFile(file, { encoding: 'utf-8' })
  const edges = input.split('\n')
    .map(it => it.split(" -> "))
    .map(it => [it[0], ...it[1].split(' : ')])
    .map(it => { 
      return {
        src: it[0], 
        dst: it[1], 
        weight: Number(it[2]) || 0
      } 
    })

  return graph(edges)
}

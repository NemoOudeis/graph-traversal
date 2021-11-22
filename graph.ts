import * as fs from 'fs/promises'

export interface Graph<T> {
  nodes: Set<T>
  edges: Edge<T>[]
  neighbors(node: T): Set<T>
  edge(from: T, to: T): Edge<T> | undefined
}

export interface Edge<T> {
  src: T
  dst: T
  weight: number
}

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

  const nodes = new Set<string>()
  edges.forEach(it => {
    nodes.add(it.src)
    nodes.add(it.dst)
  })

  return {
    nodes,
    edges,
    neighbors: (node: string): Set<string> => {
      const out = new Set<string>()
      edges.filter(it => it.src === node)
          .forEach(it => out.add(it.dst))
      return out
    },
    edge: (src: string, dst: string): Edge<string> | undefined => {
      return edges.find(it => it.src === src && it.dst === dst)
    }
  }
}




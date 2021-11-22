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

export const graph = <T>(edges: Edge<T>[]): Graph<T> => {
  return {
    nodes: new Set<T>(edges.map(it => [it.src, it.dst]).flat()),
    edges,
    neighbors: (node: T): Set<T> => {
      const out = new Set<T>()
      edges.filter(it => it.src === node)
          .forEach(it => out.add(it.dst))
      return out
    },
    edge: (src: T, dst: T): Edge<T> | undefined => {
      return edges.find(it => it.src === src && it.dst === dst)
    }
  }
}

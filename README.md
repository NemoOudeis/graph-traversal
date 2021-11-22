# Fiddling with Graphs & Express.js

Just to refresh my memory, nothing serious here.

TypeScript + Express + Open API Spec + vanilla graph algorithms

```shell
pnpm install --frozen-lockfile
pnpm run cli # run algorithms on data in local files
# see ./cli folder
pnpm run dev # run a web server that exposes graph traversal
# see ./web folder
```

What's in here?

```shell
.
├── README.md
├── cli             
│   ├── graph.txt               # local test data
│   ├── graph2.txt              # local test data
│   ├── graph_from_fs.ts        # util to read & parse data
│   └── index.ts                # execute algorithms on the test data
├── core
│   ├── bfs.ts                  # breadth first search
│   ├── dfs.ts                  # depth first search
│   ├── dijkstra.ts             # dijkstra's algorithm
│   ├── graph.ts                # type definition of graph
│   └── log.ts                  # util
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
└── web
    ├── graph-traversal.yml     # OpenAPI Spec for the express app
    ├── request-handler.ts      # translates core to web domain
    └── server.ts               # express config
```

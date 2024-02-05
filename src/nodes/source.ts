import { type Context, NodeType, GoNode } from "../types"
import utils from "../utils"

export const source = (ctx: Context): GoNode => {
  const [syntaxList] = ctx.node.getChildren()

  return {
    nodeType: NodeType.File,
    name: {
      nodeType: NodeType.Ident,
      name: "main"
    },
    decls: ctx.mapNodes(syntaxList.getChildren())
  }
}

export const imports = (imports: string[]): GoNode => {
  return {
    nodeType: NodeType.GenDecl,
    tok: "import",
    specs: imports.map((path) => ({
      nodeType: NodeType.ImportSpec,
      name: {
        nodeType: NodeType.Ident,
        name: "."
      },
      path: {
        nodeType: NodeType.BasicLit,
        kind: "STRING",
        value: `"${path}"`
      }
    }))
  }
}

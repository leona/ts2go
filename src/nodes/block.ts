import { type Context, NodeType, GoNode } from "../types"

export const block = (ctx: Context): GoNode => {
  const [_, syntaxList] = ctx.node.getChildren()
  return {
    nodeType: NodeType.BlockStmt,
    list: ctx.mapNodes(syntaxList.getChildren())
  }
}



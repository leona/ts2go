import { type Context, NodeType, GoNode } from "../types"
import ts from "typescript"

export const ifStatements = (ctx: Context): GoNode => {
  const node = ctx.node as ts.IfStatement
  const [ifKeyword, openParentToken, binaryExpression, closeParentToken] = ctx.node.getChildren()
  const [_, thenSyntax] = node.thenStatement.getChildren()

  return {
    nodeType: NodeType.IfStmt,
    init: null,
    cond: {
      nodeType: NodeType.ParenExpr,
      x: ctx.mapNode(binaryExpression),
    },
    body: {
      nodeType: NodeType.BlockStmt,
      list: thenSyntax ? ctx.mapNodes(thenSyntax.getChildren()) : null
    },
    else: node.elseStatement ? {
      nodeType: NodeType.BlockStmt,
      list: ctx.mapNodes(node.elseStatement.getChildren()[1].getChildren())
    } : null
  }
}

export const tryStatement = (ctx: Context): GoNode => {
  const node = ctx.node as ts.TryStatement

  return {
    nodeType: NodeType.IfStmt,
    init: {
      nodeType: NodeType.AssignStmt,
      lhs: [{
        nodeType: NodeType.Ident,
        name: "TRY_RESULT",
      }],
      tok: ":=",
      rhs: [{
        nodeType: NodeType.CallExpr,
        fun: {
          nodeType: NodeType.Ident,
          name: "TryCatch",
        },
        args: [

        ]
      }]
    }
  }
}

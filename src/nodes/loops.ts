import { type Context, NodeType, GoNode } from "../types"
import ts from "typescript"

export const whileLoop = (ctx: Context): GoNode => {
  const node = ctx.node as ts.WhileStatement

  return {
    nodeType: NodeType.ForStmt,
    init: null,
    post: null,
    cond: ctx.mapNode(node.expression),
    body: ctx.mapNode(node.statement)
  }
}

export const forInLoop = (ctx: Context): GoNode => {
  const node = ctx.node as ts.ForInStatement
  const declaration = node.initializer?.declarations[0]

  return {
    nodeType: NodeType.RangeStmt,
    key: ctx.mapNode(declaration.name),
    value: null,
    tok: ":=",
    x: ctx.mapNode(node.expression),
    body: ctx.mapNode(node.statement)
  }
}

export const forLoop = (ctx: Context): GoNode => {
  const node = ctx.node as ts.ForStatement
  const declaration = node.initializer?.declarations[0]

  return {
    nodeType: NodeType.ForStmt,
    init: {
      nodeType: NodeType.AssignStmt,
      lhs: [{
        nodeType: NodeType.Ident,
        name: declaration.name.text
      }],
      tok: ":=",
      rhs: [{
        nodeType: NodeType.BasicLit,
        kind: "INT",
        value: declaration.initializer.text
      }]
    },
    post: ctx.mapNode(node.incrementor as ts.Node),
    cond: ctx.mapNode(node.condition as ts.Node),
    body: ctx.mapNode(node.statement)
  }
}


import { type Context, NodeType, GoNode } from "../types"
import ts from "typescript"
import utils from "../utils"

export const parenthizedExpressions = (ctx: Context & {}): GoNode => {
  const node = ctx.node as ts.ParenthesizedExpression

  return {
    nodeType: NodeType.ParenExpr,
    x: ctx.mapNode(node?.expression)
  }
}

export const postfixUnaryExpression = (ctx: Context): GoNode => {
  const node = ctx.node as ts.PostfixUnaryExpression

  return {
    nodeType: NodeType.IncDecStmt,
    x: {
      nodeType: NodeType.Ident,
      name: utils.capitalize(node.operand?.getText())
    },
    tok: utils.kindToString(node?.operator)
  }
}

export const binaryExpressions = (ctx: Context): GoNode => {
  const node = ctx.node as ts.BinaryExpression

  return {
    nodeType: NodeType.BinaryExpr,
    x: ctx.mapNode(node.left),
    op: utils.kindToString(node.operatorToken.kind),
    y: ctx.mapNode(node.right)
  }
}

export const expressionStatement = (ctx: Context): GoNode => {
  const node = ctx.node as ts.ExpressionStatement

  if (node.expression.kind == ts.SyntaxKind.PostfixUnaryExpression && ![ts.SyntaxKind.ForInStatement, ts.SyntaxKind.ForStatement, ts.SyntaxKind.ForOfStatement, ts.SyntaxKind.WhileStatement, ts.SyntaxKind.DoStatement].includes(node.parent.kind)) {
    return ctx.mapNode(node.expression)
  }

  return {
    nodeType: NodeType.ExprStmt,
    x: ctx.mapNode(node.expression)
  }
}

export const callExpression = (ctx: Context): GoNode => {
  const node = ctx.node as ts.CallExpression

  return {
    nodeType: NodeType.CallExpr,
    fun: ctx.mapNode(node.expression),
    args: ctx.mapNodes(node.arguments)
  }
}

export const propertyAccessExpression = (ctx: Context): GoNode => {
  const node = ctx.node as ts.PropertyAccessExpression

  if (node.expression.kind == ts.SyntaxKind.Identifier) {
    var x = {
      nodeType: NodeType.Ident,
      name: utils.capitalize(node.expression.getText())
    }
  } else {
    var x = ctx.mapNode(node.expression)
  }

  return {
    nodeType: NodeType.SelectorExpr,
    x,
    sel: {
      nodeType: NodeType.Ident,
      name: utils.capitalize(node.name.text)
    }
  }
}

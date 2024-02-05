import { type Context, NodeType, GoNode } from "../types"
import ts from "typescript"
import { result } from "./literals"
import * as utils from "../utils"

export const parameter = (ctx: Context): GoNode => {
  const node = ctx.node as ts.ParameterDeclaration

  return {
    nodeType: NodeType.Field,
    names: [ctx.mapNode(node.name)],
    type: ctx.mapNode(node.type)
  }
}

export const returnStatement = (ctx: Context): GoNode => {
  const node = ctx.node as ts.ReturnStatement

  return {
    nodeType: NodeType.ReturnStmt,
    results: [ctx.mapNode(node.expression)]
  }
}

export const functionDeclaration = (ctx: Context): GoNode => {
  const node = ctx.node as ts.FunctionDeclaration

  return {
    nodeType: NodeType.FuncDecl,
    recv: null,
    name: {
      nodeType: "Ident",
      name: node?.name?.text == "main" ? "main" : utils.capitalize(node?.name?.text)
    },
    type: {
      nodeType: NodeType.FuncType,
      typeParams: null,
      params: {
        nodeType: NodeType.FieldList,
        list: ctx.mapNodes(node.parameters)
      },
      results: result(node?.type?.kind)
    },
    body: {
      nodeType: NodeType.BlockStmt,
      list: ctx.mapNodes(node.body.statements)
    }
  }
}

import { type Context, NodeType, GoNode } from "../types"
import ts from "typescript"

export const typeAliasDeclaration = (ctx: Context): GoNode => {
  const node = ctx.node as ts.TypeAliasDeclaration

  return {
    nodeType: NodeType.GenDecl,
    tok: "type",
    specs: [
      {
        nodeType: NodeType.TypeSpec,
        name: ctx.mapNode(node.name),
        typeParams: null,
        type: ctx.mapNode(node.type)
      }
    ]
  }
}

export const typeReference = (ctx: Context): GoNode => {
  const node = ctx.node as ts.TypeReferenceNode

  return {
    nodeType: NodeType.Ident,
    name: node.typeName.getText()
  }
}

export const interfaceDeclaration = (ctx: Context): GoNode => {
  const node = ctx.node as ts.InterfaceDeclaration

  if (node.members.find(i => i.kind == ts.SyntaxKind.PropertySignature)) {
    throw new Error("Interface with property signatures not supported")
  }

  return {
    nodeType: NodeType.GenDecl,
    tok: "type",
    specs: [{
      nodeType: NodeType.TypeSpec,
      name: ctx.mapNode(node.name),
      typeParams: null,
      type: {
        nodeType: NodeType.InterfaceType,
        incomplete: false,
        methods: {
          nodeType: NodeType.FieldList,
          list: ctx.mapNodes(node.members)
        }
      }
    }]
  }
}



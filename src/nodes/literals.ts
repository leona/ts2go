import { type Context, NodeType, GoNode } from "../types"
import utils from "../utils"
import ts from "typescript"

export const trueKeyword = (ctx: Context): GoNode => {
  return {
    nodeType: NodeType.Ident,
    name: "true"
  }
}

export const stringKeyword = (ctx: Context): GoNode => {
  return {
    nodeType: NodeType.Ident,
    name: "TS_string"
  }
}

export const identifier = (ctx: Context): GoNode => {
  return {
    nodeType: NodeType.Ident,
    name: utils.capitalize(ctx.node.getText())
  }
}

export const literal = (ctx: Context): GoNode => {
  return {
    nodeType: utils.kindToNodeType(ctx.node.kind),
    kind: utils.kindToString(ctx.node.kind),
    value: ctx.node.getText()
  }
}

export const objectLiteralExpression = (ctx: Context): GoNode => {
  const node = ctx.node as ts.ObjectLiteralExpression
  const variable = node.parent as ts.VariableDeclaration

  if (!variable.type?.typeName && !node.properties.length) {
    throw new Error(`Missing type for definition: ${variable.name.getText()}`)
  }

  if (variable.type?.typeName) {
    var type = ctx.mapNode(variable.type)
  } else {
    const kind = utils.kindToType(node.properties[0].initializer.kind)

    var type = {
      nodetype: NodeType.MapType,
      key: {
        nodeType: NodeType.Ident,
        name: "string",
      },
      value: {
        nodeType: NodeType.Ident,
        name: kind
      },
    }
  }

  return {
    nodeType: NodeType.CompositeLit,
    type,
    elts: ctx.mapNodes(node.properties),
    incomplete: false
  }
}

export const arrayLiteral = (ctx: Context): GoNode => {
  const node = ctx.node as ts.ArrayLiteralExpression
  let kind = "interface{}"

  if (node.elements.length) {
    kind = utils.kindToType(node.elements[0]?.kind)
  }

  if (node.parent?.type?.elementType?.kind) {
    kind = utils.kindToType(node.parent?.type?.elementType?.kind)
  }

  return {
    nodeType: NodeType.CompositeLit,
    type: {
      nodeType: NodeType.IndexExpr,
      x: {
        nodeType: NodeType.Ident,
        name: NodeType.TS_array
      },
      index: {
        nodeType: NodeType.Ident,
        name: kind
      }
    },
    elts: node.elements.map(i => ctx.mapNode(i)),
    incomplete: false
  }
}

export const typeLiteral = (ctx: Context): GoNode => {
  const node = ctx.node as ts.TypeLiteralNode

  if (node.members.find(i => i.kind == ts.SyntaxKind.MethodSignature)) {
    throw new Error("Method signature in type literal not supported")
  }

  if (!node.members?.length) {
    throw new Error("Empty type literal not supported")
  }

  return {
    nodeType: NodeType.StructType,
    incomplete: false,
    fields: {
      nodeType: NodeType.FieldList,
      list: ctx.mapNodes(node.members)
    }
  }
}

export const propertySignature = (ctx: Context): GoNode => {
  const node = ctx.node as ts.PropertySignature
  const name = ctx.mapNode(node.name)
  name.name = utils.capitalize(name?.name)

  return {
    nodeType: NodeType.Field,
    names: [name],
    type: {
      nodeType: NodeType.Ident,
      name: utils.kindToType(node.type?.kind)
    }
  }
}

export const result = (kind?: ts.SyntaxKind | undefined): GoNode => {
  return {
    nodeType: NodeType.FieldList,
    list: [
      {
        NodeType: NodeType.Field,
        names: null,
        type: {
          nodeType: NodeType.Ident,
          name: utils.kindToType(kind)
        }
      }
    ]
  }
}

export const methodSignature = (ctx: Context): GoNode => {
  const node = ctx.node as ts.MethodSignature
  const name = ctx.mapNode(node.name)
  name.name = utils.capitalize(name?.name)

  return {
    nodeType: NodeType.Field,
    names: [name],
    type: {
      nodeType: NodeType.FuncType,
      typeParams: null,
      params: {
        nodeType: NodeType.FieldList,
        list: ctx.mapNodes(node.parameters)
      },
      results: result(node.type?.kind)
    }
  }
}

import { type Context, NodeType, GoNode } from "../types"
import ts from "typescript"
import utils from "../utils"
import { arrayLiteral } from "./literals"

export const propertyAssignment = (ctx: Context): GoNode => {
  const node = ctx.node as ts.PropertyAssignment
  let name = ctx.mapNode(node.name)
  name.name = utils.capitalize(name.name ?? utils.unwrapText(name.value))

  if (node.parent.kind == ts.SyntaxKind.ObjectLiteralExpression && !node.parent?.parent?.type?.typeName) {
    name = {
      nodeType: NodeType.BasicLit,
      kind: "STRING",
      value: utils.wrapKind(name.name, ts.SyntaxKind.StringLiteral)
    }
  }

  return {
    nodeType: NodeType.KeyValueExpr,
    key: name,
    value: ctx.mapNode(node.initializer)
  }
}

export const variables = (ctx: Context): GoNode => {
  const [variableDeclarationList] = ctx.node.getChildren()
  const [_, declarationList] = variableDeclarationList.getChildren()
  const [variableDeclaration] = declarationList.getChildren()
  const variable = variableDeclaration as ts.VariableDeclaration
  const keyword = utils.flagToKeyword(variableDeclarationList.flags)

  var value = ctx.mapNode(variable.initializer)

  const output = {
    nodeType: NodeType.GenDecl,
    tok: keyword,
    specs: [
      {
        nodeType: NodeType.ValueSpec,
        names: [
          {
            nodeType: NodeType.Ident,
            name: utils.capitalize(variable.name.getText())
          }
        ],
        type: null,
        values: [value]
      }
    ]
  }

  if (utils.hasKindsInParents(ctx.node, [ts.SyntaxKind.FunctionDeclaration])) {
    return {
      nodeType: NodeType.DeclStmt,
      decl: output
    }
  }

  return output
}

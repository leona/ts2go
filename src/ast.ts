import ts from 'typescript';
import { GenerateResponse, GenerateOptions, GoNode, InputNode } from "./types"
import * as nodes from "./nodes"
import utils from "./utils"
import { Context } from './types';
import { imports } from "./nodes/source"
import { defaultDeclarations } from "./constants"

const mapNode = (node: InputNode): GoNode | undefined => {
  if (!node) return
  const input: Context = { node, mapNode, mapNodes }

  switch (node.kind) {
    case ts.SyntaxKind.SourceFile:
      return nodes.source(input)
    case ts.SyntaxKind.TypeAliasDeclaration:
      return nodes.typeAliasDeclaration(input)
    case ts.SyntaxKind.TryStatement:
      return nodes.tryStatement(input)
    case ts.SyntaxKind.ObjectLiteralExpression:
      return nodes.objectLiteralExpression(input)
    case ts.SyntaxKind.InterfaceDeclaration:
      return nodes.interfaceDeclaration(input)
    case ts.SyntaxKind.FunctionDeclaration:
      return nodes.functionDeclaration(input)
    case ts.SyntaxKind.ReturnStatement:
      return nodes.returnStatement(input)
    case ts.SyntaxKind.MethodSignature:
      return nodes.methodSignature(input)
    case ts.SyntaxKind.Parameter:
      return nodes.parameter(input)
    case ts.SyntaxKind.Identifier:
      return nodes.identifier(input)
    case ts.SyntaxKind.ArrayLiteralExpression:
      return nodes.arrayLiteral(input)
    case ts.SyntaxKind.TypeLiteral:
      return nodes.typeLiteral(input)
    case ts.SyntaxKind.PropertySignature:
      return nodes.propertySignature(input)
    case ts.SyntaxKind.FirstLiteralToken:
    case ts.SyntaxKind.StringLiteral:
      return nodes.literal(input)
    case ts.SyntaxKind.VariableStatement:
      return nodes.variables(input)
    case ts.SyntaxKind.IfStatement:
      return nodes.ifStatements(input)
    case ts.SyntaxKind.BinaryExpression:
      return nodes.binaryExpressions(input)
    case ts.SyntaxKind.PostfixUnaryExpression:
      return nodes.postfixUnaryExpression(input)
    case ts.SyntaxKind.ParenthesizedExpression:
      return nodes.parenthizedExpressions(input)
    case ts.SyntaxKind.TypeReference:
      return nodes.typeReference(input)
    case ts.SyntaxKind.ExpressionStatement:
      return nodes.expressionStatement(input)
    case ts.SyntaxKind.PropertyAccessExpression:
      return nodes.propertyAccessExpression(input)
    case ts.SyntaxKind.CallExpression:
      return nodes.callExpression(input)
    case ts.SyntaxKind.PropertyAssignment:
      return nodes.propertyAssignment(input)
    case ts.SyntaxKind.Block:
      return nodes.block(input)
    case ts.SyntaxKind.TrueKeyword:
      return nodes.trueKeyword(input)
    case ts.SyntaxKind.StringKeyword:
      return nodes.stringKeyword(input)
    case ts.SyntaxKind.ForStatement:
      return nodes.forLoop(input)
    case ts.SyntaxKind.ForInStatement:
      return nodes.forInLoop(input)
    case ts.SyntaxKind.WhileStatement:
      return nodes.whileLoop(input)
    case ts.SyntaxKind.DoStatement:
    default:
      console.log("unknown kind:", node.kind)
  }
}

const mapNodes = (nodes: InputNode[]): GoNode[] => {
  let result: GoNode[] = [];

  nodes.forEach((node) => {
    const output = mapNode(node)
    if (!output) return
    result.push(output);
  });

  return result;
};

export const buildGoTree = async (options: GenerateOptions): Promise<GenerateResponse> => {
  if (!options.filepath && !options.source?.length) {
    throw new Error("filepath or source is required");
  }

  const startTime = Date.now()

  if (options.filepath) {
    // options.source = fs.readFileSync(options.filepath, "utf8");
  } else {
    options.filepath = "demo.ts"
  }

  const response: GenerateResponse = {}

  var sourceFile = ts.createSourceFile(
    options.filepath,
    options.source as string,
    ts.ScriptTarget.ESNext,
    true
  );

  if (options.outputTypescriptAst) {
    response.typescript = utils.prettyPrintObjectWithCircularDeps(sourceFile)
  }

  let declaration = mapNode(sourceFile) as GoNode
  let fullDeclaration = { ...declaration }

  fullDeclaration.decls = [
    imports(["app/globals", "app/types"]),
    ...defaultDeclarations,
    ...declaration.decls
  ]

  const finalize = (input) => (utils.camelToUpperCamel({
    ...input,
    Imports: null,
    Unresolved: null,
    Comments: null,
    FileSet: {
      Base: 90,
      Files: [
        {
          Name: "",
          Base: 1,
          Size: 88,
          Lines: [
            0,
            13,
            14,
            15,
            42,
            43,
            44,
            58,
            87
          ],
          Infos: null
        }
      ]
    },
  }))

  declaration = finalize(declaration)
  fullDeclaration = finalize(fullDeclaration)
  response.go = JSON.stringify(declaration, null, 2)
  response.fullGo = JSON.stringify(fullDeclaration, null, 2)
  console.log("ts to go AST built in:", Date.now() - startTime, "ms")
  return response
}


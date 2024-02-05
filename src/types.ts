import ts from "typescript"

export type GenerateResponse = {
  go?: string
  typescript?: string
  fullGo?: string
}

export type GenerateOptions = {
  outputTypescriptAst?: boolean
  filepath?: string
  source?: string
}

export enum NodeType {
  GenDecl = "GenDecl",
  MapType = "MapType",
  TS_array = "TS_array",
  IndexExpr = "IndexExpr",
  ReturnStmt = "ReturnStmt",
  InterfaceType = "InterfaceType",
  Field = "Field",
  KeyValueExpr = "KeyValueExpr",
  ImportSpec = "ImportSpec",
  StructType = "StructType",
  ExprStmt = "ExprStmt",
  TypeSpec = "TypeSpec",
  SelectorExpr = "SelectorExpr",
  CallExpr = "CallExpr",
  FuncDecl = "FuncDecl",
  ArrayType = "ArrayType",
  FuncType = "FuncType",
  RangeStmt = "RangeStmt",
  BlockStmt = "BlockStmt",
  AssignStmt = "AssignStmt",
  BasicLit = "BasicLit",
  Ident = "Ident",
  FieldList = "FieldList",
  File = "File",
  ValueSpec = "ValueSpec",
  DeclStmt = "DeclStmt",
  IfStmt = "IfStmt",
  ParenExpr = "ParenExpr",
  BinaryExpr = "BinaryExpr",
  ForStmt = "ForStmt",
  TrueKeyword = "TrueKeyword",
  IncDecStmt = "IncDecStmt",
  CompositeLit = "CompositeLit",
}

export type GoNode = {
  nodeType: NodeType
  tok?: string
  fun?: GoNode
  args?: GoNode[]
  incomplete?: boolean
  fields?: GoNode
  typeParams?: undefined | null
  key?: GoNode
  value?: GoNode | undefined | null
  specs?: GoNode[]
  names?: GoNode[] | undefined
  decls?: GoNode[]
  post?: GoNode | undefined | null
  name?: any
  op?: string
  doc?: GoNode
  type?: GoNode
  recv?: string | null
  results?: GoNode | undefined | null
  init?: GoNode | undefined | null
  kind?: "INT" | "STRING"
  cond?: GoNode
  x?: GoNode | undefined
  y?: GoNode | undefined
  params?: GoNode
  body?: GoNode
  else?: GoNode
  decl?: GoNode
  list?: GoNode[] | null
  lhs?: GoNode[]
  rhs?: GoNode[]
}

export interface Context {
  node: ts.Node
  mapNode: (node: InputNode) => GoNode | undefined
  mapNodes: (nodes: ts.Node[]) => GoNode[]
}

export type InputNode = ts.Node | ts.PrimaryExpression | ts.TypeNode | undefined

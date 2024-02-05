import ts, { SyntaxKind } from 'typescript';
import { NodeType } from './types';

const debounces = {}

export const debounce = (key: string, fn: any, delay: number) => {
  if (debounces[key]) {
    clearTimeout(debounces[key])
  }

  debounces[key] = setTimeout(() => {
    console.log(`running debounce: ${key}`)
    fn()
  }, delay)
}

export const convertDeclarationKeyword = (keyword: string): "var" | "const" => {
  switch (keyword) {
    case "var":
    case "let":
      return "var"
    default:
      return "const"
  }
}

export const printNodeTypes = (key: string, node: ts.Node) => console.log(key, "contains types:", node?.getChildren().map(i => ts.SyntaxKind[i.kind]))

export const hasKindsInParents = (node: ts.Node, kinds: ts.SyntaxKind[]): boolean => {
  let parent = node.parent;

  while (parent) {
    if (kinds.includes(parent.kind)) {
      return true;
    }
    parent = parent.parent;
  }

  return false;
};

export const kindToNodeType = (kind: ts.SyntaxKind | undefined): NodeType => {
  switch (kind) {
    case ts.SyntaxKind.FirstLiteralToken:
    case ts.SyntaxKind.StringLiteral:
      return NodeType.BasicLit
    case ts.SyntaxKind.Identifier:
      return NodeType.Ident
  }
}

export const kindToType = (keyword: ts.SyntaxKind | string | undefined): string => {
  switch (keyword) {
    case "string":
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.StringKeyword:
      return "TS_string"
    case "number":
    case ts.SyntaxKind.FirstLiteralToken:
    case ts.SyntaxKind.NumberKeyword:
      return "TS_number"
    default:
      return ""
  }
}

export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

export const kindToString = (kind: ts.SyntaxKind | undefined): string => {
  switch (kind) {
    case ts.SyntaxKind.FirstLiteralToken:
    case ts.SyntaxKind.NumericLiteral:
      return "INT"
    case ts.SyntaxKind.StringLiteral:
      return "STRING"
    case ts.SyntaxKind.EqualsEqualsEqualsToken:
    case ts.SyntaxKind.EqualsEqualsToken:
      return "=="
    case ts.SyntaxKind.EqualsToken:
      return "="
    case ts.SyntaxKind.NumberKeyword:
      return "int"
    case ts.SyntaxKind.AmpersandAmpersandToken:
      return "&&"
    case ts.SyntaxKind.BarBarToken:
      return "||"
    case ts.SyntaxKind.PlusPlusToken:
      return "++"
    case ts.SyntaxKind.LessThanEqualsToken:
      return "<="
    case ts.SyntaxKind.LessThanToken:
      return "<"
    case ts.SyntaxKind.GreaterThanEqualsToken:
      return ">="
    case ts.SyntaxKind.GreaterThanToken:
      return ">"
    case ts.SyntaxKind.PlusToken:
      return "+"
    case ts.SyntaxKind.AsteriskToken:
      return "*"
    case ts.SyntaxKind.SlashToken:
      return "/"
    case ts.SyntaxKind.MinusToken:
      return "-"
    case ts.SyntaxKind.PercentToken:
      return "%"
    case ts.SyntaxKind.MinusMinusToken:
      return "--"
    default:
      throw new Error(`Unknown kind: ${kind} - ${ts.SyntaxKind[kind]}`)

  }
}

export const wrapKind = (value: string, kind: ts.SyntaxKind): string => {
  switch (kind) {
    case ts.SyntaxKind.NumericLiteral:
      return value
    case ts.SyntaxKind.StringLiteral:
      return `"${value}"`
  }
}

export const unwrapText = (text: string): string => {
  return text.slice(1, text.length - 1)
}

export const camelToUpperCamel = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(camelToUpperCamel)
  }

  if (data === null) {
    return data
  }
  if (typeof data === "object") {
    const result: any = {}
    Object.keys(data).forEach(key => {
      result[key[0].toUpperCase() + key.slice(1)] = camelToUpperCamel(data[key])
    })
    return result
  }

  return data
}

export const prettyPrintObjectWithCircularDeps = (obj: any) => {
  const cache: any[] = [];

  const result = JSON.stringify(obj, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.includes(value)) {
        try {
          return JSON.parse(JSON.stringify(value));
        } catch (error) {
          return;
        }
      }
      cache.push(value);
    }

    if (key == "kind") {
      return ts.SyntaxKind[value];
    }

    return value;
  }, 2);

  cache.length = 0;
  return result
};

export const flagToKeyword = (flag: ts.NodeFlags): "var" | "const" => {
  switch (flag) {
    case ts.NodeFlags.Const:
      return "const"
    default:
      return "var"
  }
}

export default {
  convertDeclarationKeyword,
  debounce,
  printNodeTypes,
  hasKindsInParents,
  kindToString,
  prettyPrintObjectWithCircularDeps,
  wrapKind,
  kindToNodeType,
  flagToKeyword,
  capitalize,
  kindToType,
  unwrapText,
  camelToUpperCamel
}

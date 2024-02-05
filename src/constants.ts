export const defaultCode = {

  typescript: `function main() {
}`,
  go: `package main

func main() {
    
}`
}

export const defaultDeclarations = [
  {
    "NodeType": "GenDecl",
    "Tok": "var",
    "Specs": [
      {
        "NodeType": "ValueSpec",
        "Names": [
          {
            "NodeType": "Ident",
            "Name": "_"
          }
        ],
        "Type": null,
        "Values": [
          {
            "NodeType": "Ident",
            "Name": "Console"
          }
        ]
      }
    ]
  },
  {
    "NodeType": "GenDecl",
    "Tok": "var",
    "Specs": [
      {
        "NodeType": "ValueSpec",
        "Names": [
          {
            "NodeType": "Ident",
            "Name": "_"
          }
        ],
        "Type": {
          "NodeType": "Ident",
          "Name": "TS_string"
        },
        "Values": null
      }
    ]
  },
]


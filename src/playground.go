package main

import (
	"bytes"
	"encoding/json"
	"github.com/asty-org/asty/asty"
	"go/parser"
	"syscall/js"

	"go/printer"
	"log"
)

func SourceToJSON(input string) (string, error) {
	options := asty.Options{
		WithImports:    true,
		WithComments:   false,
		WithPositions:  false,
		WithReferences: false, // maybe use
	}

	marshaller := asty.NewMarshaller(options)
	data := []byte(input)
	mode := parser.SkipObjectResolution

	if options.WithComments {
		mode |= parser.ParseComments
	}

	tree, err := parser.ParseFile(marshaller.FileSet(), "", data, mode)

	if err != nil {
		return "", err
	}

	buf := new(bytes.Buffer)
	node := marshaller.MarshalFile(tree)
	encoder := json.NewEncoder(buf)
	encoder.SetIndent("", "  ")
	err = encoder.Encode(node)

	if err != nil {
		return "", err
	}

	return buf.String(), nil
}

func JSONToSource(input string) (string, error) {
	options := asty.Options{
		WithImports:    true,
		WithComments:   false,
		WithPositions:  false,
		WithReferences: false,
	}

	data := []byte(input)
	var node asty.FileNode
	err := json.Unmarshal(data, &node)

	if err != nil {
		log.Println("err decoding AST", err)
		return "", err
	}

	unmarshaler := asty.NewUnmarshaller(options)
	tree := unmarshaler.UnmarshalFileNode(&node)
	buf := new(bytes.Buffer)
	err = printer.Fprint(buf, unmarshaler.FileSet(), tree)

	if err != nil {
		log.Println("error converting AST to Go")
		return "", err
	}

	return buf.String(), nil
}

func main() {
	c := make(chan struct{}, 0)

	js.Global().Set("astToGo", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		ast := args[0].String()
		log.Println("converting JSON AST to Go")
		code, _ := JSONToSource(ast)
		return code
	}))

	js.Global().Set("goToAst", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		code := args[0].String()
		log.Println("converting Go code to JSON AST")
		ast, _ := SourceToJSON(code)
		return ast
	}))

	<-c
}

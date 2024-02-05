import { buildGoTree } from "../../src/ast"
import { defaultCode } from "../../src/constants"
import utils from "../../src/utils"
import { setupEditor } from "./utils"

export default async () => {
  let showAst = false
  const tsEditor = setupEditor("ts-editor", "typescript")
  const goEditor = setupEditor("go-editor", "golang")
  tsEditor.setValue(defaultCode.typescript, -1)
  const checkbox = document.getElementById("show-ast-toggle")

  checkbox?.addEventListener('change', (event) => {
    showAst = event?.currentTarget?.checked
    console.log("updated showAst", showAst)
    update()
  })

  const update = async () => {
    const startTime = Date.now()

    try {
      var result = await buildGoTree({
        source: tsEditor.getSession().getValue(),
        outputTypescriptAst: true
      })
    } catch (e) {
      return goEditor.setValue(`AST conversion failed: ${e.message}`, -1)
    }

    if (showAst) {
      return goEditor.setValue(result.go, -1)
    }

    const goCode = astToGo(result.fullGo)
    console.log("transpiled in", Date.now() - startTime, "ms")
    goEditor.setValue(goCode || "error transpiling", -1)
  }

  const go = new Go();
  const wa = await WebAssembly.instantiateStreaming(fetch('playground.wasm'), go.importObject)
  go.run(wa.instance);
  update()

  tsEditor.getSession().on('change', function() {
    console.log("code updated")
    utils.debounce("codeUpdate", update, 400)
  });
}

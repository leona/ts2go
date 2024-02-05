import { buildGoTree } from "../../src/ast"
import { defaultCode } from "../../src/constants"
import utils from "../../src/utils"
import { setupEditor, updateJson } from "./utils"
import { html as Diff2Html } from "diff2html"
import * as Diff from "diff"

// messy debugger thrown together

const content = {
  typescript: {
    code: localStorage.getItem("debuggerTypescriptCode") ?? defaultCode.typescript,
    ast: "",
    transpiledAst: "",
    fullTranspiledAst: ""
  },
  go: {
    code: localStorage.getItem("debuggerGoCode") ?? defaultCode.go,
    ast: ""
  }
}

console.log("initial content:", content)

const pushLog = (logType: "info" | "error", message: string) => {
  let ul = document.querySelector('#log-container ul');
  let li = document.createElement('li');
  li.innerHTML = logType == "error" ? `<span style="color:red">${logType.toUpperCase()}</span>` : `<span style="color:blue">${logType.toUpperCase()}</span>`
  li.innerHTML = `${li.innerHTML} | ${message}`
  ul.prepend(li);
}

const normalizeAst = (ast: string) => {
  try {
    return JSON.stringify(JSON.parse(ast).Decls, null, 2)
  } catch (e) {
    pushLog("error", `Failed to normalize AST: ${e.message}`)
  }

  return ""
}

const reloadGo = async () => {
  console.log("reloading go")
  const go = new Go();
  const wa = await WebAssembly.instantiateStreaming(fetch('playground.wasm'), go.importObject)
  go.run(wa.instance);
}

export default async () => {
  pushLog("info", "init")

  const setDiff = (typescript: string, go: string) => {
    const diff = Diff.createTwoFilesPatch("typescript", "go", typescript, go);
    const html = Diff2Html(diff, { colorScheme: "dark", matching: 'lines', outputFormat: 'side-by-side' });
    document.getElementById("diff").innerHTML = html
  }

  const updateDiff = () => {
    console.log("updating diff", content.typescript.transpiledAst.length, content.go.ast.length)
    setDiff(normalizeAst(content.typescript.transpiledAst), normalizeAst(content.go.ast))
  }

  const updateTypescriptAst = async () => {
    updateJson("ts-input-ast", JSON.parse(content.typescript.ast).statements)

    // updateJson("ts-input-ast", JSON.parse(content.typescript.transpiledAst))

    if (!content.typescript?.fullTranspiledAst?.length) {
      return pushLog("error", "No AST to transpile")
    }

    try {
      var code = astToGo(content.typescript.fullTranspiledAst)

      if (!code) {
        throw new Error("No code returned")
      }
    } catch (e) {
      await reloadGo()
      return pushLog("error", `Failed to transpile AST: ${e.message}`)
    }

    try {
      const response = await fetch("/api/compile", {
        method: "POST",
        body: JSON.stringify({
          code
        })
      })

      pushLog("info", "Go executed")
      const data = await response.json()
      const text = data.error + data.response
      text.split('\n').filter(i => i).forEach((line: string) => pushLog("info", `GO: ${line}`))
    } catch (e) {
      await reloadGo()
      pushLog("error", `Failed to compile transpiled AST: ${e.message}`)
    }
  }

  const onTypescriptUpdate = async (code: string) => {
    content.typescript.code = code
    localStorage.setItem("debuggerTypescriptCode", code)

    try {
      var { go, typescript, fullGo } = await buildGoTree({
        source: code,
        outputTypescriptAst: true
      })
    } catch (e) {
      return pushLog("error", `TypeScript AST conversion failed: ${e.stack}`)
    }

    content.typescript.ast = typescript as string
    content.typescript.transpiledAst = go as string
    content.typescript.fullTranspiledAst = fullGo as string
    updateDiff()
    updateTypescriptAst()
    pushLog("info", "TypeScript updated")
  }

  const onGoUpdate = async (code: string) => {
    content.go.code = code
    localStorage.setItem("debuggerGoCode", code)

    try {
      var result = goToAst(code)
    } catch (e) {
      await reloadGo()
      return pushLog("error", `Go AST conversion failed: ${e.message}`)
    }

    content.go.ast = result
    updateDiff()
    pushLog("info", "Go updated")
  }

  const tsEditor = setupEditor("ts-editor", "typescript")
  const goEditor = setupEditor("go-editor", "golang")
  tsEditor.setValue(content.typescript.code, -1)
  goEditor.setValue(content.go.code, -1)

  tsEditor.getSession().on('change', function() {
    utils.debounce("codeUpdate", () => {
      onTypescriptUpdate(tsEditor.getSession().getValue())
    }, 400)
  });

  goEditor.getSession().on('change', function() {
    utils.debounce("codeUpdate", () => {
      onGoUpdate(goEditor.getSession().getValue())
    }, 400)
  });

  await reloadGo()
  onGoUpdate(content.go.code)
  onTypescriptUpdate(content.typescript.code)
}


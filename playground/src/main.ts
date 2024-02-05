import './style.scss'
import "./wasm_exec"
import playgroundRoute from "./playground"
import debugRoute from "./debugger"

const body = document.querySelector('body') as HTMLBodyElement
const route = body.getAttribute("data-route")
console.log("got", route, "route")

switch (route) {
  case "index":
    playgroundRoute()
    break
  case "debugger":
    debugRoute()
    break
}


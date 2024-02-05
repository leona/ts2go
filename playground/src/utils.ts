import jsonview from "@pgrabovets/json-view"

export const setupEditor = (id: string, mode: string) => {
  var editor = ace.edit(id);
  editor.setOptions({ fontSize: '18px' })
  editor.setTheme("ace/theme/monokai");
  editor.session.setMode(`ace/mode/${mode}`);
  return editor
}

export const updateJson = (id: string, data: any) => {
  document.getElementById(id).innerHTML = ""
  const tree = jsonview.renderJSON(data, document.getElementById(id));
  jsonview.expand(tree)
}


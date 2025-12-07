const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

// Render inicial
actualizar();

editor.addEventListener("input", actualizar);

function actualizar() {
  preview.innerHTML = editor.value;

  // Esperar a que el DOM actualice y luego renderizar MathJax
  if (window.MathJax) {
    MathJax.typesetPromise([preview]);
  }
}

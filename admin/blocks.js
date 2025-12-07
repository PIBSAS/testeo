const container = document.getElementById("blocksContainer");
const preview = document.getElementById("preview");

let blocks = [];

export function agregarBloqueTexto(contenido = "<p>Nuevo bloque</p>") {
  const block = document.createElement("div");
  block.className = "block";
  block.draggable = true;

  const textarea = document.createElement("textarea");
  textarea.value = contenido;

  textarea.addEventListener("input", actualizarPreview);

  block.appendChild(textarea);
  container.appendChild(block);

  blocks.push(block);

  activarDragAndDrop();
  actualizarPreview();
}

// Drag & drop
function activarDragAndDrop() {
  let arrastrando = null;

  container.querySelectorAll(".block").forEach(block => {
    block.addEventListener("dragstart", () => {
      arrastrando = block;
      block.style.opacity = "0.4";
    });

    block.addEventListener("dragend", () => {
      arrastrando.style.opacity = "1";
      arrastrando = null;
      actualizarPreview();
    });

    block.addEventListener("dragover", e => {
      e.preventDefault();
      const rect = block.getBoundingClientRect();
      const mitad = rect.top + rect.height / 2;

      if (e.clientY < mitad) {
        container.insertBefore(arrastrando, block);
      } else {
        container.insertBefore(arrastrando, block.nextSibling);
      }
    });
  });
}


export function obtenerHTMLFinal() {
  let html = "";
  container.querySelectorAll(".block textarea").forEach(t => {
    html += t.value + "\n\n";
  });
  return html;
}

// Renderiza todo en la vista previa
function actualizarPreview() {
  preview.innerHTML = obtenerHTMLFinal();
  if (window.MathJax) MathJax.typesetPromise([preview]);
}

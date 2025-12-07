const container = document.createElement("div");
container.id = "blocksContainer";
document.body.insertBefore(container, document.getElementById("preview"));

let blocks = [];

function agregarBloqueTexto(contenido = "<p>Nuevo bloque</p>") {
  const block = document.createElement("div");
  block.className = "block";
  block.draggable = true;

  const textarea = document.createElement("textarea");
  textarea.value = contenido;

  textarea.addEventListener("input", actualizarPreview);

  block.appendChild(textarea);
  container.appendChild(block);

  blocks.push(block);

  hacerBloquesArrastrables();
  actualizarPreview();
}

// Drag & drop
function hacerBloquesArrastrables() {
  let dragE = null;

  container.querySelectorAll(".block").forEach(block => {
    block.addEventListener("dragstart", e => {
      dragE = block;
      block.style.opacity = "0.4";
    });
    block.addEventListener("dragend", () => {
      dragE.style.opacity = "1";
      dragE = null;
    });
    block.addEventListener("dragover", e => {
      e.preventDefault();
      const rect = block.getBoundingClientRect();
      const mitad = rect.top + rect.height / 2;
      if (e.clientY < mitad) {
        container.insertBefore(dragE, block);
      } else {
        container.insertBefore(dragE, block.nextSibling);
      }
      actualizarPreview();
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
  const preview = document.getElementById("preview");
  preview.innerHTML = obtenerHTMLFinal();
  if (window.MathJax) MathJax.typesetPromise([preview]);
}

// Agregar un bloque inicial
agregarBloqueTexto("<h2>Inicio del capítulo</h2>");

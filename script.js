function convertTextToHTML(text) {
  return `<section data-scope="ilh">
    <p>${text.replace(/\n+/g, "</p><p>")}</p>
  </section>`;
}

function wrapAcademicStructure(contentHTML) {
  return `
  <section class="pane" data-scope="ilh">
    <article>
      <h2>Introducción</h2>
      <p><!-- [ADD][ES] Agrega una introducción aquí --></p>

      <h2>Desarrollo</h2>
      ${contentHTML}

      <h2>Conclusiones</h2>
      <p><!-- [ADD][ES] Sintetiza los puntos clave aquí --></p>

      <h2>Referencias</h2>
      <p><!-- [ADD][ES] Añade referencias en formato APA si es necesario --></p>
    </article>
  </section>`;
}

let lastPrompt = "";

document.getElementById("generate-btn").addEventListener("click", () => {
  const template = document.getElementById("template-input").value;
  const contentRaw = document.getElementById("content-input").value;
  const contentType = document.querySelector('input[name="content-type"]:checked').value;
  const academic = document.querySelector('input[name="structure"]:checked').value;

  let integratedContent = contentType === "text"
    ? convertTextToHTML(contentRaw)
    : contentRaw;

  if (academic === "yes") {
    integratedContent = wrapAcademicStructure(integratedContent);
  }

  lastPrompt = `
📝 Prompt Maestro para integración de contenido en plantilla base
________________________________________
Tengo una plantilla HTML base donde necesito insertar un fragmento de contenido o proyecto en HTML o texto.

Debes devolverme el archivo HTML completo y combinado, listo para publicar, cumpliendo con todas las siguientes condiciones:
________________________________________
⚙️ Condiciones obligatorias:
1. No modificar ni eliminar header, menú lateral (drawer), botón de comentarios (utterances), footer ni banner de cookies.
2. Mantener la uniformidad del sitio (clases, estilos y animaciones).
3. Encapsular nuevos estilos con prefijo ".ilh-" o dentro de [data-scope="ilh"].
4. HTML válido, accesible y con IDs únicos.
5. Comentarios en dos idiomas (ES/EN).
6. Responsive (PC y móviles).
7. Armonía visual con la plantilla.
8. La plantilla debe mantenerse intacta excepto en <section class="pane">.
9. Mantener el botón de comentarios de la plantilla base.

🔧 ¿Estructura académica solicitada?: ${academic === "yes" ? "Sí" : "No"}
📦 Tipo de contenido: ${contentType === "text" ? "Texto plano (convertir a HTML)" : "HTML directo"}

📄 Contenido a integrar:
${integratedContent}

📁 Plantilla HTML base:
${template}
`;

  document.getElementById("copy-prompt-btn").style.display = "inline-block";
});

document.getElementById("copy-prompt-btn").addEventListener("click", () => {
  navigator.clipboard.writeText(lastPrompt).then(() => {
    const status = document.getElementById("copy-status");
    status.style.display = "inline";
    setTimeout(() => status.style.display = "none", 2000);
  });
});

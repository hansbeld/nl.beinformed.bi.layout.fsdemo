/**
 * Create page html
 */
const Html = (contextPath, application, head, state = "") => `
  <!doctype html>
  <html ${head ? head.htmlAttributes.toString() : ""}>
    <head>
      <meta charset="utf-8" />
      ${head ? head.title.toString() : ""}
      ${head ? head.base.toString() : ""}
      ${head ? head.meta.toString() : ""}
      ${head ? head.link.toString() : ""}
      ${head ? head.script.toString() : ""}
      ${head ? head.noscript.toString() : ""}
      ${head ? head.style.toString() : ""}

      {CSSASSETS:<link rel="stylesheet" type="text/css" href="${contextPath}/{FILE}" />:CSSASSETS}
    </head>
    <body class="nojs">
      <div id="application">${application}</div>
      <script type="application/json" data-app-state="app-json">
        ${state}
      </script>
      {JSASSETS:<script src="${contextPath}/{FILE}"></script>:JSASSETS}
    </body>
  </html>
`;

export default Html;

function AddAssetsToServerHTMLPlugin(options) {}

function getFiles(assets) {
  const files = {
    js: {
      common: []
    },
    css: []
  };

  for (let filename in assets) {
    if (filename.endsWith(".js") && filename.includes("manifest")) {
      files.js.manifest = filename;
    } else if (filename.endsWith(".js") && filename.includes("server")) {
      files.js.server = filename;
    } else if (filename.endsWith(".js") && filename.includes("client")) {
      files.js.client = filename;
    } else if (filename.endsWith(".js")) {
      files.js.common.push(filename);
    } else if (filename.endsWith(".css")) {
      files.css.push(filename);
    }
  }

  return files;
}

function getTemplates(source) {
  const cssTemplateRegex = /{CSSASSETS:(.*?):CSSASSETS}/g;
  const jsTemplateRegex = /{JSASSETS:(.*?):JSASSETS}/g;

  const templates = {
    css: cssTemplateRegex.exec(source),
    js: jsTemplateRegex.exec(source)
  };

  if (templates.css === null || templates.js === null) {
    return {
      css: "",
      js: ""
    };
    console.error(
      "CSS or JS templates not found using regex: /{CSSASSETS:(.*?):CSSASSETS}/g and /{JSASSETS:(.*?):JSASSETS}/g in build script"
    );
  }

  return {
    css: templates.css[1],
    js: templates.js[1]
  };
}

function replaceTemplate(template, filename) {
  return template.replace("{FILE}", filename);
}

function addHTML(source, jsHTML, cssHTML) {
  return source
    .replace(/{CSSASSETS:.*?:CSSASSETS}/, cssHTML)
    .replace(/{JSASSETS:.*?:JSASSETS}/, jsHTML);
}

AddAssetsToServerHTMLPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {
    const publicPath = compilation.outputOptions.publicPath;
    const files = getFiles(compilation.assets);

    const serverSource = compilation.assets[files.js.server].source();
    const templates = getTemplates(serverSource);

    const jsImports = [];
    jsImports.push(replaceTemplate(templates.js, files.js.manifest));
    files.js.common.forEach(commonFile => {
      jsImports.push(replaceTemplate(templates.js, commonFile));
    });
    jsImports.push(replaceTemplate(templates.js, files.js.client));

    const cssImports = files.css.map(cssFile =>
      replaceTemplate(templates.css, cssFile)
    );

    const jsHTML = jsImports.join("");
    const cssHTML = cssImports.join("");

    const newSource = addHTML(serverSource, jsHTML, cssHTML);

    compilation.assets[files.js.server] = {
      source: () => newSource,
      size: () => newSource.length
    };

    callback();
  });
};

module.exports = AddAssetsToServerHTMLPlugin;

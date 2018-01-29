const fs = require("fs");
const colors = require("colors");
const path = require("path");
const exec = require("child_process").exec;

const json = JSON.parse(fs.readFileSync("package.json", "utf8"));
const pluginName = json.name + "_" + json.version;

if (!fs.existsSync("./_PLUGIN")){
  fs.mkdirSync("./_PLUGIN");
}

exec(
  `jar -cvfm _PLUGIN/${pluginName}.jar META-INF/MANIFEST.MF plugin.xml WEB-INF`,
  (error) => {
    if (error) {
      console.error(`Build Error: ${error}`.red);
      return
    }

    console.log(`Plugin ${pluginName}.jar created in _PLUGIN folder.`.green);
  }
);

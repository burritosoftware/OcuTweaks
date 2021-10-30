const fs = require("fs");
const { join } = require('path');

const pluginsFolder = join(__dirname, "./settings/plugins");
const plugins = fs.readdirSync(pluginsFolder, { withFileTypes: true });

module.exports = class pluginLoader {
    init() {
        console.log("Initializing plugins...")
        console.log(plugins);
        for (let i in plugins) {
            const plugin = plugins[i]
            // Try-catch errors to prevent conflicts with other plugins
            try {
                console.log(`Found plugin directory '${plugin}'`);
                // Gets the path of the plugin
                const pluginPath = join(__dirname, "./settings/plugins", plugin);
                // Gets path of the plugin JS file
                const jsPath = join(pluginPath, "plugin.js");
                // If it doesn't have plugin file, it's not an plugin and ignore it
                if(!fs.existsSync(jsPath)) continue
                // Require the plugin file
                let main = require(jsPath);
                main.init();
                console.log(`Loaded '${plugin}'`);
            }
            catch (e) {
                console.error("Failed to initialize plugin by ID", plugin.id, e);
            }
        }
    };

    uninit() {
        console.log("Uninitializing plugins...")
        console.log(plugins);
        for (let i in plugins) {
            const plugin = plugins[i]
            // Try-catch errors to prevent conflicts with other plugins
            try {
                console.log(`Found plugin directory '${plugin}'`);
                // Gets the path of the plugin
                const pluginPath = join(__dirname, "./settings/plugins", plugin);
                // Gets path of the plugin JS file
                const jsPath = join(pluginPath, "plugin.js");
                // If it doesn't have plugin file, it's not an plugin and ignore it
                if(!fs.existsSync(jsPath)) continue
                // Require the plugin file
                let main = require(jsPath);
                main.uninit();
                console.log(`Uninit '${plugin}'`);
            }
            catch (e) {
                console.error("Failed to uninitialize plugin by ID", plugin.id, e);
            }
        }
    };
};
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pages: {
    popup: {
      template: 'public/browser-extension.html',
      entry: './src/popup/main.js',
      title: 'Popup'
    },
    override: {
      template: 'public/browser-extension.html',
      entry: './src/override/main.js',
      title: 'Override'
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        // background: {
        //   entry: 'src/background.js'
        // },
        contentScripts: {
          entries: {
            'content-script': [
              'src/content-scripts/content-script.js'
            ]
          }
        }
      }
    }
  },
  configureWebpack: {
    devtool: 'cheap-module-source-map',
    output: {
      filename: "[name].js",
      chunkFilename: "[name].js",
    },
  },
})

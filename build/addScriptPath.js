// 自动生成html时给页面添加指定的script路径
// 取自http://www.cnblogs.com/haogj/p/5649670.html
// webpack 会给我们提供的回调函数提供参数，我们可以注册编译阶段的事件了。html-webpack-plugin 提供了一系列事件。
// Async:
// html-webpack-plugin-before-html-generation
// html-webpack-plugin-before-html-processing
// html-webpack-plugin-alter-asset-tags
// html-webpack-plugin-after-html-processing
// html-webpack-plugin-after-emit
// Sync:
// html-webpack-plugin-alter-chunks
// 我们可以注册到它处理 HTML 之前，使用 html-webpack-plugin-before-html-processing 事件。
//
function AddScriptPathPlugin(options) {
  this.options = options;
}

AddScriptPathPlugin.prototype.apply = function(compiler) {
  var paths = this.options.paths;
  compiler.plugin('compilation', function(compilation, options) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      for (var i = paths.length - 1; i >= 0; i--) {
        htmlPluginData.assets.js.unshift(paths[i] + '.js' + '?v=' + compilation.hash );
      }
      callback(null, htmlPluginData);
    });
  });
};

module.exports = AddScriptPathPlugin;

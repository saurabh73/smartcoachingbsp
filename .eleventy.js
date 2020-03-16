const pluginSEO = require("eleventy-plugin-seo");
const yaml = require("js-yaml");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy('src/images')

  eleventyConfig.addPlugin(pluginSEO, require("./src/_data/seo.json"));
  eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
    htmlTemplateEngine: 'njk'
  }
}

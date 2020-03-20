const pluginSEO = require("eleventy-plugin-seo");
const markdownIt = require("markdown-it");
const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {

  // Enable Markdown Render
  const md = new markdownIt({
    html: true,
    xhtmlOut: true,
    breaks: false
  });

  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/fonts");

  eleventyConfig.addDataExtension("yaml", (contents) => {
    return yaml.safeLoad(contents)
  });

  eleventyConfig.addPlugin(pluginSEO, require("./src/_data/seo.json"));

  eleventyConfig.addPairedShortcode("markdown", (content) => {
    return md.renderInline(content);
  });




  return {
    dir: { input: "src", output: "dist", data: "_data" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "css", "html", "yml"],
    htmlTemplateEngine: "njk"
  }
}

const pluginSEO = require("eleventy-plugin-seo");
const markdownIt = require("markdown-it");
const yaml = require("js-yaml");

// const yaml = require("js-yaml");eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

module.exports = function(eleventyConfig) {
  
  // Enable Markdown Render
  const md = new markdownIt({
    html: true,
    xhtmlOut: true,
    breaks: true
  });
  

  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy('src/images')

  eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

  eleventyConfig.addPlugin(pluginSEO, require("./src/_data/seo.json"));
 
  eleventyConfig.addPairedShortcode("markdown", (content) => {
    return md.renderInline(content);
  });
  

  // eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

  return {
    dir: { input: 'src', output: 'dist', data: '_data' },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
    htmlTemplateEngine: 'njk'
  }
}

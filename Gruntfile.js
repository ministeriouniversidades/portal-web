var yaml = require("yamljs");
var S = require("string");
const fs = require('fs');
var path = require('path');
const { file } = require("grunt");

var CONTENT_PATH_PREFIX = "/content/es";
const rootDir = path.join(__dirname, CONTENT_PATH_PREFIX);
const langs = ['en', 'fr', 'ca', 'eu', 'ga', 'va']
let excludedAttrs = ['draft']

module.exports = function(grunt) {

    grunt.registerTask("lunr-index", function() {

        grunt.log.writeln("Build pages index");

        var indexPages = function() {
            var pagesIndex = [];
            grunt.file.recurse(rootDir, function(abspath, rootdir, subdir, filename) {
                grunt.verbose.writeln("Parse file:",abspath);
                if (processFile(abspath, filename) != null) pagesIndex.push(processFile(abspath, filename));
            });

            return pagesIndex;
        };

        var processFile = function(abspath, filename) {
            var pageIndex;

            if (S(filename).endsWith(".html")) {
                pageIndex = processHTMLFile(abspath, filename);
            } else {
                pageIndex = processMDFile(abspath, filename);
            }

            return pageIndex;
        };

        var processHTMLFile = function(abspath, filename) {
            var content = grunt.file.read(abspath);
            var pageName = S(filename).chompRight(".html").s;
            var href = S(abspath)
                .chompLeft(CONTENT_PATH_PREFIX).s;
            return {
                title: pageName,
                href: href,
                content: S(content).trim().stripTags().stripPunctuation().s
            };
        };

        var processMDFile = function(abspath, filename) {
            var pathFileName = path.extname(abspath);
            if (pathFileName != '.md') return
            var content = grunt.file.read(abspath);
            var pageIndex;
            // First separate the Front Matter from the content and parse it
            content = content.split("---");
            var frontMatter;
            try {
                frontMatter = yaml.parse(content[1].trim());
            } catch (e) {
                console.error(e.message);
            }
            var href = S(abspath).chompLeft(S(rootDir).replace(/\\/g, '/')).chompRight(".md").s;
            // href for index.md files stops at the folder name
            if (filename === "index.md") {
                href = S(abspath).chompLeft(S(rootDir).replace(/\\/g, '/')).chompRight(filename).s;
            }

            // Build Lunr index for this page
            pageIndex = {
                href: href,
                title: frontMatter.title,
                // tags: frontMatter.tags,
                content: S(content[2]).trim().stripTags().stripPunctuation().s
            };

            return pageIndex;
        };

        grunt.file.write("static/js/lunr/PagesIndex.json", JSON.stringify(indexPages()));
        grunt.log.ok("Index built");
    });
    grunt.registerTask("trans-task", function() {
        grunt.log.writeln("Begin translation...");
        for (let i = 0; i < langs.length; i++) {
            grunt.file.recurse(rootDir, function(abspath, rootdir, subdir, filename) {
                let new_path = rootdir.substring(0, rootdir.lastIndexOf('\\')) +'\\'+ langs[i]
                if (subdir != undefined) new_path += '\\' + subdir.replace('/', '\\');

                const text = fs.readFileSync(abspath, 'utf8');
                
                try { if (!fs.existsSync(new_path)) fs.mkdirSync(new_path, { recursive: true }) }
                catch (err) { console.error(err) }   
                
                if (S(filename).endsWith(".md")) {
                    const lines = text.split(/\r?\n/);
                    let originalStructure = {};
                    let filteredStructure = {};
                    let countSeparator = 0;
                    let content = '',props = '';
    
                    for (const line of lines) {
                        if (line === '---') {
                            countSeparator++;
                            continue;
                        }
                        if (countSeparator === 1) {
                            let key = line.substring(0, line.indexOf(":"));
                            let value = line.substring(line.indexOf(":") + 1);
                            originalStructure[key] = value
                            if(excludedAttrs.indexOf(key) == -1) {
                                filteredStructure[key] = value
                            }
                        }
                        if (countSeparator === 2) content += line + '\r\n'
                    }
                    // Call for translation function to translate the value of each key in {properties} and in the {content}
                    // Code here...
                    // I need to merge the original structure to the translated one to get the full structure for the new file
                    Object.assign(originalStructure, filteredStructure);
                    // Create the formatted new file MD
                    Object.entries(originalStructure).forEach(([key, value]) => { props += `${key}: ${value}\n` });

                    try {
                        // Then open a file with the write permission and loop on each element and write into it                   
                        fs.writeFileSync(new_path + '\\' + filename, `---\n${props}---\n${content}`)
                        console.info('Successful writing new file')
                    } catch (err) { console.error(err) }
                } else {fs.writeFileSync(new_path + '\\' + filename, text)}
            });
        }
    });
};
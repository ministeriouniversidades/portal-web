var yaml = require('yamljs');
var S = require('string');
var moment = require('moment');
const fs = require('fs');
var path = require('path');
const formatter = require('html-formatter');
const { file } = require('grunt');
// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate').v2;

var CONTENT_PATH_PREFIX = '/content/es';
const rootDir = path.join(__dirname, CONTENT_PATH_PREFIX);
// const langs = ['en', 'fr', 'ca', 'eu', 'ga', 'va']
const langs = ['en'];
let excludedAttrs = [
    'draft',
    'type',
    'section_img',
    'layout',
    'struc_dep_pic',
    'sections_title',
    'icon',
    'url',
    'weight',
    'organism_cat',
    'date',
    'has_media',
    'has_video',
    'news_date',
    'tags',
    'call_closed',
    'call_opened',
    'call_status',
    'img',
    'event_desc_date',
    'event_type',
    'event_time',
    'linkImage_titulo1',
    'linkImage_imagen1',
    'linkImage_url1',
    'linkImage_titulo2',
    'linkImage_imagen2',
    'linkImage_url2',
    'linkImage_titulo3',
    'linkImage_imagen3',
    'linkImage_url3'
];
const translate = new Translate();
module.exports = function (grunt) {
    grunt.registerTask('lunr-index', function () {
        grunt.log.writeln('Build pages index');

        var indexPages = function () {
            var pagesIndex = [];
            grunt.file.recurse(rootDir, function (abspath, rootdir, subdir, filename) {
                grunt.verbose.writeln('Parse file:', abspath);
                if (subdir != 'eventos' && processFile(abspath, filename) != null)
                    pagesIndex.push(processFile(abspath, filename));
            });

            return pagesIndex;
        };

        var processFile = function (abspath, filename) {
            var pageIndex;

            if (S(filename).endsWith('.html')) {
                pageIndex = processHTMLFile(abspath, filename);
            } else {
                pageIndex = processMDFile(abspath, filename);
            }

            return pageIndex;
        };

        var processHTMLFile = function (abspath, filename) {
            var content = grunt.file.read(abspath);
            var pageName = S(filename).chompRight('.html').s;
            var href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).s;
            return {
                title: pageName,
                href: href,
                content: S(content).trim().stripTags().stripPunctuation().s
            };
        };

        var processMDFile = function (abspath, filename) {
            var pathFileName = path.extname(abspath);
            if (pathFileName != '.md') return;
            var content = grunt.file.read(abspath);
            var pageIndex;
            // First separate the Front Matter from the content and parse it
            content = content.split('---');
            var frontMatter;
            try {
                frontMatter = yaml.parse(content[1].trim());
            } catch (e) {
                console.error(e.message);
            }
            var href = S(abspath).chompLeft(S(rootDir).replace(/\\/g, '/')).chompRight('.md').s;
            // href for index.md files stops at the folder name
            if (filename === 'index.md' || filename === '_index.md') {
                href = S(abspath).chompLeft(S(rootDir).replace(/\\/g, '/')).chompRight(filename).s;
            }
            // Build Lunr index for this page
            pageIndex = {
                href: frontMatter.url != undefined ? frontMatter.url : href,
                title: frontMatter.title != undefined ? frontMatter.title.toLowerCase() : '',
                section_title_1:
                    frontMatter.section_title_1 != undefined
                        ? S(frontMatter.section_title_1)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_contenido_1:
                    frontMatter.section_contenido_1 != undefined
                        ? S(frontMatter.section_contenido_1)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_title_2:
                    frontMatter.section_title_2 != undefined
                        ? S(frontMatter.section_title_2)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_contenido_2:
                    frontMatter.section_contenido_2 != undefined
                        ? S(frontMatter.section_contenido_2)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_title_3:
                    frontMatter.section_title_3 != undefined
                        ? S(frontMatter.section_title_3)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_contenido_3:
                    frontMatter.section_contenido_3 != undefined
                        ? S(frontMatter.section_contenido_3)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_title_4:
                    frontMatter.section_title_4 != undefined
                        ? S(frontMatter.section_title_4)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_contenido_4:
                    frontMatter.section_contenido_4 != undefined
                        ? S(frontMatter.section_contenido_4)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_title_5:
                    frontMatter.section_title_5 != undefined
                        ? S(frontMatter.section_title_5)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_contenido_5:
                    frontMatter.section_contenido_5 != undefined
                        ? S(frontMatter.section_contenido_5)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_title_6:
                    frontMatter.section_title_6 != undefined
                        ? S(frontMatter.section_title_6)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_contenido_6:
                    frontMatter.section_contenido_6 != undefined
                        ? S(frontMatter.section_contenido_6)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_title_7:
                    frontMatter.section_title_7 != undefined
                        ? S(frontMatter.section_title_7)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_contenido_7:
                    frontMatter.section_contenido_7 != undefined
                        ? S(frontMatter.section_contenido_7)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_title_8:
                    frontMatter.section_title_8 != undefined
                        ? S(frontMatter.section_title_8)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_contenido_8:
                    frontMatter.section_contenido_8 != undefined
                        ? S(frontMatter.section_contenido_8)
                            .trim()
                            .stripTags()
                            .latinise()
                            .stripPunctuation()
                            .s.toLowerCase()
                        : '',
                section_title_9:
                    frontMatter.section_title_9 != undefined
                        ? S(frontMatter.section_title_9).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_contenido_9:
                    frontMatter.section_contenido_9 != undefined
                        ? S(frontMatter.section_contenido_9).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_title_10:
                    frontMatter.section_title_10 != undefined
                        ? S(frontMatter.section_title_10).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_contenido_10:
                    frontMatter.section_contenido_10 != undefined
                        ? S(frontMatter.section_contenido_10).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_title_11:
                    frontMatter.section_title_11 != undefined
                        ? S(frontMatter.section_title_11).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_contenido_11:
                    frontMatter.section_contenido_11 != undefined
                        ? S(frontMatter.section_contenido_11).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_title_12:
                    frontMatter.section_title_12 != undefined
                        ? S(frontMatter.section_title_12).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_contenido_12:
                    frontMatter.section_contenido_12 != undefined
                        ? S(frontMatter.section_contenido_12).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_title_13:
                    frontMatter.section_title_13 != undefined
                        ? S(frontMatter.section_title_13).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_contenido_13:
                    frontMatter.section_contenido_13 != undefined
                        ? S(frontMatter.section_contenido_13).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_title_14:
                    frontMatter.section_title_14 != undefined
                        ? S(frontMatter.section_title_14).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_contenido_14:
                    frontMatter.section_contenido_14 != undefined
                        ? S(frontMatter.section_contenido_14).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_title_15:
                    frontMatter.section_title_15 != undefined
                        ? S(frontMatter.section_title_15).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_contenido_15:
                    frontMatter.section_contenido_15 != undefined
                        ? S(frontMatter.section_contenido_15).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_title_16:
                    frontMatter.section_title_16 != undefined
                        ? S(frontMatter.section_title_16).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                section_contenido_16:
                    frontMatter.section_contenido_16 != undefined
                        ? S(frontMatter.section_contenido_16).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                news_desc:
                    frontMatter.news_desc != undefined
                        ? S(frontMatter.news_desc).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                news_title:
                    frontMatter.news_title != undefined
                        ? S(frontMatter.news_title).trim().stripTags().latinise().stripPunctuation().s
                        : '',
                content: S(content[2]).trim().stripTags().latinise().stripPunctuation().s.toLowerCase(),
                description: frontMatter.news_title != undefined
                ? S(frontMatter.news_title).trim().stripTags().decodeHTMLEntities().s
                : S(content[2]).trim().stripTags().decodeHTMLEntities().s
            };

            return pageIndex;
        };
        grunt.file.write('static/js/lunr/PagesIndex.json', JSON.stringify(indexPages()));
        grunt.log.ok('Index built');
    });
    grunt.registerTask('events-index', function () {
        grunt.log.writeln('Build events pages index');

        var indexPages = function () {
            var pagesIndex = [];
            var EVENTS_PATH = '/content/es/eventos';
            var iterator = 1;
            const eventsDir = path.join(__dirname, EVENTS_PATH);
            grunt.file.recurse(eventsDir, function (abspath, rootdir, subdir, filename) {
                grunt.verbose.writeln('Parse file:', abspath);
                if (processFile(abspath, filename) != null) {
                    pagesIndex.push(processFile(abspath, filename, iterator));
                    iterator++;
                }
            });

            return pagesIndex;
        };

        var processFile = function (abspath, filename, iterator) {
            var pageIndex;
            pageIndex = processMDFile(abspath, filename, iterator);

            return pageIndex;
        };

        var processMDFile = function (abspath, filename, iterator) {
            var pathFileName = path.extname(abspath)
            if (pathFileName != '.md') return
            var content = grunt.file.read(abspath)
            var pageIndex;
            // First separate the Front Matter from the content and parse it
            content = content.split('---');
            var frontMatter;
            try {
                frontMatter = yaml.parse(content[1].trim())
            } catch (e) {
                console.error(e.message)
            }
            var href = S(abspath).chompLeft(S(rootDir).replace(/\\/g, '/')).chompRight('.md').s
            // href for index.md files stops at the folder name
            if (filename === 'index.md') {
                href = S(abspath).chompLeft(S(rootDir).replace(/\\/g, '/')).chompRight(filename).s
            }
            // Build Lunr index for this page
            pageIndex = {
                id: iterator,
                href: href,
                title: frontMatter.title,
                event_type: frontMatter.event_type,
                event_cat: frontMatter.event_cat,
                start: frontMatter.event_time ? moment(frontMatter.event_time).format() : frontMatter.event_time,
                end: frontMatter.event_desc_date
                    ? moment(frontMatter.event_desc_date).format()
                    : frontMatter.event_desc_date,
                event_desc_info: frontMatter.event_desc_info,
                content: S(content[2]).trim().s
            };
            return pageIndex
        };

        grunt.file.write('static/js/events/EventsIndex.json', JSON.stringify(indexPages()));
        grunt.log.ok('Index built');
    });
    grunt.registerTask('trans-task', function () {
        const done = this.async();
        grunt.log.writeln('Begin translation...');

        let fileProps = [];

        for (let i = 0; i < langs.length; i++) {
            let targetLang = langs[i];
            grunt.file.recurse(rootDir, function (abspath, rootdir, subdir, filename) {
                let new_path = rootdir.substring(0, rootdir.lastIndexOf('\\')) + '\\' + langs[i];
                if (subdir != undefined) new_path += '\\' + subdir.replace('/', '\\');

                const text = fs.readFileSync(abspath, 'utf8');

                try {
                    if (!fs.existsSync(new_path)) fs.mkdirSync(new_path, { recursive: true });
                } catch (err) {
                    console.error(err);
                }

                if (S(filename).endsWith('.md')) {
                    const lines = text.split(/\r?\n/);
                    let originalStructure = {};
                    let filteredStructure = {};
                    let countSeparator = 0;
                    let content = ``;
                    let isFirstLine = true;

                    let openingContainerChar = '', closingContainerChar = '', key = '', value = ''
                    for (const line of lines) {
                        if (line.trim() === '---') {
                            countSeparator++;
                            continue;
                        }
                        if (countSeparator === 1) { //Inside props MD file.
                            if (isFirstLine) {
                                key = line.substring(0, line.indexOf(':'))
                                if (key === '') continue
                                openingContainerChar = (line.substring(line.indexOf(':') + 1).trim())[0]
                                if (openingContainerChar === '"') {
                                    closingContainerChar = '"'
                                } else if (openingContainerChar === "'") {
                                    closingContainerChar = "'"
                                } else if (openingContainerChar === '[') {
                                    closingContainerChar = ']'
                                } else {
                                    value = line.substring(line.indexOf(':') + 1)
                                    originalStructure[key] = value
                                    if (excludedAttrs.indexOf(key) == -1) {
                                        filteredStructure[key] = value
                                    }
                                    continue
                                }
                                value = line.substring(line.indexOf(openingContainerChar))
                                if (value.indexOf(closingContainerChar) === -1) {
                                    isFirstLine = false
                                    continue
                                }
                            } else {
                                value += line
                                if (line.indexOf(closingContainerChar) === -1) {
                                    // if (line[line.length] != closingContainerChar) {
                                    continue
                                } else {
                                    isFirstLine = true
                                }
                            }
                            originalStructure[key] = value
                            if (excludedAttrs.indexOf(key) == -1) {
                                filteredStructure[key] = value
                            }
                        }
                        if (countSeparator === 2) content += line + '\r\n'
                    }
                    fileProps.push({
                        new_path,
                        filename,
                        filteredStructure,
                        originalStructure,
                        content,
                        targetLang
                    });
                } else {
                    fs.writeFileSync(new_path + '\\' + filename, text)
                }
            });
        }
        (async () => {
            try {
                for ({ content, new_path, filename, filteredStructure, originalStructure, targetLang } of fileProps) {
                    let valuesToBeTranslated = [];
                    let props = ``;

                    Object.entries(filteredStructure).forEach(([key, value]) => {
                        valuesToBeTranslated.push(value);
                    });
                    let [translationsContent] = await translate.translate(
                        [content, ...valuesToBeTranslated],
                        targetLang
                    );
                    translationsContent = Array.isArray(translationsContent)
                        ? translationsContent
                        : [translationsContent];
                    Object.entries(filteredStructure).forEach(([key], index) => {
                        filteredStructure[key] = (translationsContent[index + 1]).trim();
                    });
                    content = formatter.render(translationsContent[0])

                    // I need to merge the original structure to the translated one to get the full structure for the new file
                    Object.assign(originalStructure, filteredStructure);
                    // Create the formatted new file MD
                    Object.entries(originalStructure).forEach(([key, value]) => {
                        value = value.replace(/&quot;/gi, '"').replace(/&#39;/gi, "'")
                        props += `${key}: ${value}\n`;
                    });
                    // Then open a file with the write permission and loop on each element and write into it
                    fs.writeFileSync(new_path + '\\' + filename, `---\n${props}---\n${content}`)
                    console.info('Successful writing new file');
                }
            } catch (err) {
                console.error(err);
                done();
            }
            done();
        })();
    });
};

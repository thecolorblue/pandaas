var _ = require('underscore');
var {spawn} = require('child_process');
var formatMap = {
  asciidoc: 'txt',
  beamer: 'beamer',
  context: 'context',
  docbook: 'docbook',
  docx: 'docx',
  dokuwiki: 'dokuwiki',
  dzslides: 'dzslides',
  epub: 'epub',
  epub3: 'epub',
  fb2: 'fb2',
  haddock: 'haddock',
  html: 'html',
  html5: 'html',
  icml: 'icml',
  json: 'json',
  latex: 'latex',
  man: 'man',
  markdown: 'md',
  markdown_github: 'md',
  markdown_mmd: 'md',
  markdown_phpextra: 'md',
  markdown_strict: 'md',
  mediawiki: 'mediawiki',
  native: 'native',
  odt: 'odt',
  opendocument: 'odoc',
  opml: 'opml',
  org: 'org',
  pdf: 'pdf',
  plain: 'txt',
  revealjs: 'js',
  rst: 'rst',
  rtf: 'rtf',
  s5: 's5',
  slideous: 'slideous',
  slidy: 'slidy',
  texinfo: 'texinfo',
  textile: 'tex'
};

module.exports = {

  import: function(req, res, next) {
    var file = '';

    var pandoc = spawn('pandoc', ['-f', req.body.format, '-t', 'markdown', `${__dirname}/../${req.file.path}`]);

    pandoc.stdout.on('data', (data)=> file += data);
    pandoc.stderr.on('data', (data)=> console.log('pandoc error: ', data));
    pandoc.on('close', (code)=> {
      res.locals.md = file;
      next();
    });
  },

  export: function(req, res, next) {
    var file =  `${_.uniqueId(req.body.format + '_')}.${formatMap[req.body.format]}`;

    var pandoc = spawn('pandoc', ['-t', req.body.format, '-f', 'markdown', '-o', `${__dirname}/../files/${file}`]);

    pandoc.stderr.on('data', (data)=> console.log('pandoc error: ', data));
    pandoc.on('close', (code)=> {
      res.locals.url = `/files/${file}`;
      next();
    });

    pandoc.stdin.end(req.body.md, 'utf8');
  },

  mdResponse: function(req, res, next) {
    res.send(res.locals.md);
  },

  urlResponse: function(req, res, next) {
    res.send(res.locals.url);
  }

};

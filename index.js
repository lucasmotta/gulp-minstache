'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var minstache = require('minstache');

module.exports = function (data) {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-minstache', 'Streaming not supported'));
      return;
    }

    try {
      var tpl = minstache(file.contents.toString(), data);
      file.contents = new Buffer(tpl.toString());
      this.push(file);
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-minstache', err, {fileName: file.path}));
    }

    cb();
  });
};

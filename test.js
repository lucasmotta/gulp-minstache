'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var data = require('gulp-data');
var template = require('./');

it('should compile Minstache templates', function (cb) {
  var stream = template({people: [{name:'foo'}, {name:'bar'}]});

  stream.on('data', function (data) {
    assert.equal(data.contents.toString(), '<li>foo</li><li>bar</li>');
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    contents: new Buffer('{{#people}}<li>{{name}}</li>{{/people}}')
  }));

  stream.end();
});

it('should not alter gulp-data or data parameter', function (cb) {
  var chunks = [];

  var stream = data(function (file) {
    return {
      contents: file.contents.toString()
    };
  });

  var parameter = {
    foo: 'foo',
    bar: 'bar',
    foobar: ['foo', 'bar']
  };

  stream.pipe(template(parameter));

  stream.on('data', function (chunk) {
    chunks.push(chunk);
  });

  stream.on('end', function () {
    assert.deepEqual(chunks[0].data, {contents: 'foo'});
    assert.deepEqual(parameter, {
      foo: 'foo',
      bar: 'bar',
      foobar: ['foo', 'bar']
    });
    cb();
  });

  stream.write(new gutil.File({
    contents: new Buffer('foo')
  }));

  stream.end();
});

it('should work with no data supplied', function (cb) {
  var stream = template();

  stream.on('data', function (data) {
    assert.equal(data.contents.toString(), '');
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    contents: new Buffer('')
  }));

  stream.end();
});

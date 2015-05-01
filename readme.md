# gulp-minstache

> Render [Minstache templates](https://github.com/visionmedia/minstache)

*Issues with the output should be reported on the Minstache [issue tracker](https://github.com/visionmedia/minstache/issues).*


## Install

```
$ npm install --save-dev gulp-minstache
```


## Usage

### `src/greeting.html`

```erb
<h1>Hello {{name}}</h1>
```

### `gulpfile.js`

```js
var gulp = require('gulp');
var template = require('gulp-minstache');

gulp.task('default', function () {
  return gulp.src('src/greeting.html')
    .pipe(template({name: 'World'}))
    .pipe(gulp.dest('dist'));
});
```

### `dist/greeting.html`

```html
<h1>Hello World</h1>
```


## API

### template(data)

Render a template using the provided `data`.


#### data

Type: `Object`

The data object used to populate the text.


## License

MIT © [Lucas Motta](http://lucasmotta.com)

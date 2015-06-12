#[gulp](https://github.com/gulpjs/gulp)-yaml-validate

## Install

```sh
npm install --save-dev gulp-yaml-validate
```

## Usage

```js
var yaml = require('gulp-yaml-validate');

gulp.src('./src/*.yml')
  .pipe(yaml());

gulp.src('./src/*.yml')
  .pipe(yaml({ safe: true }));

gulp.src('./src/*.yml')
  .pipe(yaml({ html: true }));
```


## API

### yaml([options])


#### options.safe

Type: `Boolean`

Default: `false`

Enable or disable support for regexps, functions and undefined.

**This flag should be enabled when working with untrusted data.**


#### options.space

Type: `Number` or `String`

Default: `null`

Control spacing in the resulting output. It has the same usage as for [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)


#### options.replacer

Type: `Function` or `Array`

Default: `null`

Further transform the resulting output. It has the same usage as for [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

#### options.safe

Type: `Boolean`

Default: `false`

Enable or disable support for html tags in yaml strings.

**This flag should be enabled when working with untrusted data.**

## License

MIT ©


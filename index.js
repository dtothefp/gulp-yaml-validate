try{require("source-map-support").install();}
catch(err) {}
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireDefault = __webpack_require__(2)['default'];
	
	var _through2 = __webpack_require__(3);
	
	var _through22 = _interopRequireDefault(_through2);
	
	var _path = __webpack_require__(4);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _gulpUtil = __webpack_require__(5);
	
	var _gulpUtil2 = _interopRequireDefault(_gulpUtil);
	
	var _jsYaml = __webpack_require__(1);
	
	var _jsYaml2 = _interopRequireDefault(_jsYaml);
	
	var _extend = __webpack_require__(6);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	var _bufferstreams = __webpack_require__(7);
	
	var _bufferstreams2 = _interopRequireDefault(_bufferstreams);
	
	var _jsYaml3 = _interopRequireDefault(_jsYaml);
	
	var _checkType = __webpack_require__(8);
	
	var PLUGIN_NAME = 'gulp-yaml-validate';
	
	var check = (0, _checkType.init)();
	
	var yaml2json = function yaml2json(buffer, options) {
	  var htmlRe = /(<([^>]+)>)/ig;
	  var contents = buffer.toString('utf8');
	  if (options.html && htmlRe.test(contents)) {
	    throw new Error('YML cannot contain HTML');
	  } else {
	    var ymlDocument = options.safe ? _jsYaml2['default'].safeLoad(contents) : _jsYaml2['default'].load(contents);
	    return new Buffer(JSON.stringify(ymlDocument, options.replacer, options.space));
	  }
	};
	
	module.exports = function (options) {
	  var options = (0, _extend2['default'])({
	    safe: false,
	    html: false,
	    replacer: null,
	    space: null
	  }, options);
	
	  return _through22['default'].obj(function (file, enc, cb) {
	    var self = this;
	    if (file.isBuffer()) {
	      if (file.contents.length === 0) {
	        var msg = 'File ' + _path2['default'].dirname(file.path) + ' is empty';
	        this.emit('error', new _gulpUtil.PluginError(PLUGIN_NAME, msg));
	        return cb();
	      }
	      try {
	        file.contents = yaml2json(file.contents, options);
	        file.path = _gulpUtil2['default'].replaceExtension(file.path, '.json');
	      } catch (error) {
	        var msg = '' + error.message + ' => ' + file.path;
	        this.emit('error', new _gulpUtil.PluginError(PLUGIN_NAME, msg));
	        return cb();
	      }
	    } else if (file.isStream()) {
	      file.contents = file.contents.pipe(new _bufferstreams2['default'](function (err, buf, cb) {
	        if (err) {
	          self.emit('error', new _gulpUtil.PluginError(PLUGIN_NAME, err.message));
	        } else {
	          if (buf.length === 0) {
	            var msg = 'File ' + _path2['default'].dirname(file.path) + ' is empty';
	            var error = new _gulpUtil.PluginError(PLUGIN_NAME, msg);
	            self.emit('error', error);
	            cb(error);
	          } else {
	            try {
	              file.path = _gulpUtil2['default'].replaceExtension(file.path, '.json');
	              cb(null, yaml2json(buf, options));
	            } catch (error) {
	              var msg = '' + error.message + ' => ' + file.path;
	              self.emit('error', new _gulpUtil.PluginError(PLUGIN_NAME, msg));
	              cb(error);
	            }
	          }
	        }
	      }));
	    }
	    this.push(file);
	    cb();
	  });
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("js-yaml");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};
	
	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("through2");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("gulp-util");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("extend");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("bufferstreams");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("check-type");

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map
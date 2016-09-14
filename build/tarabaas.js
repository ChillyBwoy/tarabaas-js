(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.init = init;
	
	var _request = __webpack_require__(1);
	
	var _settings = __webpack_require__(2);
	
	var instance = null;
	
	function init() {
	  var settings = arguments.length <= 0 || arguments[0] === undefined ? _settings.DEFAULT_OPTIONS : arguments[0];
	
	  var URL_BASE = settings.serverURL + '/api';
	  var URL_PROJECTS = URL_BASE + '/projects';
	
	  if (!!instance) {
	    return instance;
	  }
	
	  var projectsAll = function projectsAll() {
	    return (0, _request.createRequest)({ url: URL_PROJECTS });
	  };
	
	  var projectsCreate = function projectsCreate() {
	    var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    return (0, _request.createRequest)({
	      url: URL_PROJECTS,
	      params: {
	        method: 'POST',
	        mode: 'cors',
	        body: JSON.stringify({ name: payload.name })
	      }
	    });
	  };
	
	  var projectsDestroy = function projectsDestroy(uuid) {
	    return (0, _request.createRequest)({
	      url: URL_PROJECTS + '/' + uuid,
	      params: {
	        method: 'DELETE',
	        mode: 'cors'
	      }
	    });
	  };
	
	  var projectsGet = function projectsGet(uuid) {
	    var databasesURL = URL_PROJECTS + '/' + uuid + '/databases';
	
	    var databasesAll = function databasesAll() {
	      return (0, _request.createRequest)({ url: databasesURL });
	    };
	
	    var databasesCreate = function databasesCreate() {
	      var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      return (0, _request.createRequest)({
	        url: databasesURL,
	        params: {
	          method: 'POST',
	          mode: 'cors',
	          body: JSON.stringify(payload)
	        }
	      });
	    };
	
	    var databasesDestroy = function databasesDestroy(name) {
	      return (0, _request.createRequest)({
	        url: databasesURL + '/' + name,
	        params: {
	          method: 'DELETE',
	          mode: 'cors'
	        }
	      });
	    };
	
	    return _extends({}, (0, _request.createRequest)({ url: URL_PROJECTS + '/' + uuid }), {
	      databases: function databases() {
	        var itemsURL = URL_BASE + '/clients/projects/' + uuid + '/databases';
	
	        return {
	          all: databasesAll,
	          get: function get(name) {
	            return _extends({}, (0, _request.createRequest)({ url: databasesURL + '/' + name }), {
	              listItems: function listItems() {
	                return (0, _request.createRequest)({ url: itemsURL + '/' + name });
	              },
	              createItem: function createItem() {
	                var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	                return (0, _request.createRequest)({
	                  url: itemsURL + '/' + name,
	                  params: {
	                    method: 'POST',
	                    mode: 'cors',
	                    body: JSON.stringify(payload)
	                  }
	                });
	              },
	              destroyItem: function destroyItem(id) {
	                return (0, _request.createRequest)({
	                  url: itemsURL + '/' + name + '/' + id + '/',
	                  params: {
	                    method: 'DELETE',
	                    mode: 'cors'
	                  }
	                });
	              },
	              updateItem: function updateItem(id, payload) {
	                return (0, _request.createRequest)({
	                  url: itemsURL + '/' + name + '/' + id + '/',
	                  params: {
	                    method: 'PUT',
	                    mode: 'cors',
	                    body: JSON.stringify(payload)
	                  }
	                });
	              }
	            });
	          },
	          create: databasesCreate,
	          destroy: databasesDestroy
	        };
	      }
	    });
	  };
	
	  instance = {
	    projects: function projects() {
	      return {
	        all: projectsAll,
	        create: projectsCreate,
	        destroy: projectsDestroy,
	        get: projectsGet
	      };
	    }
	  };
	
	  return instance;
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createRequest = createRequest;
	function createRequest(state) {
	  return {
	    commit: function commit() {
	      var url = state.url;
	      var _state$params = state.params;
	      var params = _state$params === undefined ? {} : _state$params;
	
	      return fetch(url, params).then(function (r) {
	        return r.json();
	      });
	    },
	    payload: function payload() {
	      return state;
	    }
	  };
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var DEFAULT_OPTIONS = exports.DEFAULT_OPTIONS = {
	  serverURL: 'https://tarabaas.com'
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5NDE2NDVhNmE0YTQxNGJlOGI5YSIsIndlYnBhY2s6Ly8vLi9saWIvdGFyYWJhYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbImluaXQiLCJpbnN0YW5jZSIsInNldHRpbmdzIiwiVVJMX0JBU0UiLCJzZXJ2ZXJVUkwiLCJVUkxfUFJPSkVDVFMiLCJwcm9qZWN0c0FsbCIsInVybCIsInByb2plY3RzQ3JlYXRlIiwicGF5bG9hZCIsInBhcmFtcyIsIm1ldGhvZCIsIm1vZGUiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJwcm9qZWN0c0Rlc3Ryb3kiLCJ1dWlkIiwicHJvamVjdHNHZXQiLCJkYXRhYmFzZXNVUkwiLCJkYXRhYmFzZXNBbGwiLCJkYXRhYmFzZXNDcmVhdGUiLCJkYXRhYmFzZXNEZXN0cm95IiwiZGF0YWJhc2VzIiwiaXRlbXNVUkwiLCJhbGwiLCJnZXQiLCJsaXN0SXRlbXMiLCJjcmVhdGVJdGVtIiwiZGVzdHJveUl0ZW0iLCJpZCIsInVwZGF0ZUl0ZW0iLCJjcmVhdGUiLCJkZXN0cm95IiwicHJvamVjdHMiLCJjcmVhdGVSZXF1ZXN0Iiwic3RhdGUiLCJjb21taXQiLCJmZXRjaCIsInRoZW4iLCJyIiwianNvbiIsIkRFRkFVTFRfT1BUSU9OUyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNB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QUFFQyxJQUFGLEVBQUw7QUFBQSxRQURELENBQVA7QUFFRCxNQUxJO0FBT0xqQyxZQVBLLHFCQU9LO0FBQ1IsY0FBTzRCLEtBQVA7QUFDRDtBQVRJLElBQVA7QUFXRCxHOzs7Ozs7Ozs7OztBQ1pNLEtBQU1NLDRDQUFrQjtBQUM3QnZDLGNBQVc7QUFEa0IsRUFBeEIsQyIsImZpbGUiOiJ0YXJhYmFhcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDk0MTY0NWE2YTRhNDE0YmU4YjlhXG4gKiovIiwiaW1wb3J0IHsgY3JlYXRlUmVxdWVzdCB9IGZyb20gJy4vcmVxdWVzdCc7XG5pbXBvcnQgeyBERUZBVUxUX09QVElPTlMgfSBmcm9tICcuL3NldHRpbmdzJztcblxubGV0IGluc3RhbmNlID0gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQgKHNldHRpbmdzID0gREVGQVVMVF9PUFRJT05TKSB7XG4gIGNvbnN0IFVSTF9CQVNFID0gYCR7c2V0dGluZ3Muc2VydmVyVVJMfS9hcGlgO1xuICBjb25zdCBVUkxfUFJPSkVDVFMgPSBgJHtVUkxfQkFTRX0vcHJvamVjdHNgO1xuXG4gIGlmICghIWluc3RhbmNlKSB7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgY29uc3QgcHJvamVjdHNBbGwgPSAoKSA9PiBjcmVhdGVSZXF1ZXN0KHt1cmw6IFVSTF9QUk9KRUNUU30pO1xuXG4gIGNvbnN0IHByb2plY3RzQ3JlYXRlID0gKHBheWxvYWQgPSB7fSkgPT4gY3JlYXRlUmVxdWVzdCh7XG4gICAgdXJsOiBVUkxfUFJPSkVDVFMsXG4gICAgcGFyYW1zOiB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtuYW1lOiBwYXlsb2FkLm5hbWV9KVxuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgcHJvamVjdHNEZXN0cm95ID0gKHV1aWQpID0+IGNyZWF0ZVJlcXVlc3Qoe1xuICAgIHVybDogYCR7VVJMX1BST0pFQ1RTfS8ke3V1aWR9YCxcbiAgICBwYXJhbXM6IHtcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICBtb2RlOiAnY29ycydcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHByb2plY3RzR2V0ID0gKHV1aWQpID0+IHtcbiAgICBsZXQgZGF0YWJhc2VzVVJMID0gYCR7VVJMX1BST0pFQ1RTfS8ke3V1aWR9L2RhdGFiYXNlc2A7XG5cbiAgICBjb25zdCBkYXRhYmFzZXNBbGwgPSAoKSA9PiBjcmVhdGVSZXF1ZXN0KHt1cmw6IGRhdGFiYXNlc1VSTH0pO1xuXG4gICAgY29uc3QgZGF0YWJhc2VzQ3JlYXRlID0gKHBheWxvYWQgPSB7fSkgPT4gY3JlYXRlUmVxdWVzdCh7XG4gICAgICB1cmw6IGRhdGFiYXNlc1VSTCxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgZGF0YWJhc2VzRGVzdHJveSA9IChuYW1lKSA9PiBjcmVhdGVSZXF1ZXN0KHtcbiAgICAgIHVybDogYCR7ZGF0YWJhc2VzVVJMfS8ke25hbWV9YCxcbiAgICAgIHBhcmFtczoge1xuICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICBtb2RlOiAnY29ycydcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5jcmVhdGVSZXF1ZXN0KHt1cmw6IGAke1VSTF9QUk9KRUNUU30vJHt1dWlkfWB9KSxcbiAgICAgIGRhdGFiYXNlcygpIHtcbiAgICAgICAgbGV0IGl0ZW1zVVJMID0gYCR7VVJMX0JBU0V9L2NsaWVudHMvcHJvamVjdHMvJHt1dWlkfS9kYXRhYmFzZXNgO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgYWxsOiBkYXRhYmFzZXNBbGwsXG4gICAgICAgICAgZ2V0OiAobmFtZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4uY3JlYXRlUmVxdWVzdCh7dXJsOiBgJHtkYXRhYmFzZXNVUkx9LyR7bmFtZX1gfSksXG4gICAgICAgICAgICAgIGxpc3RJdGVtczogKCkgPT4gY3JlYXRlUmVxdWVzdCh7dXJsOiBgJHtpdGVtc1VSTH0vJHtuYW1lfWB9KSxcbiAgICAgICAgICAgICAgY3JlYXRlSXRlbTogKHBheWxvYWQgPSB7fSkgPT4gY3JlYXRlUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOiBgJHtpdGVtc1VSTH0vJHtuYW1lfWAsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgZGVzdHJveUl0ZW06IChpZCkgPT4gY3JlYXRlUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOiBgJHtpdGVtc1VSTH0vJHtuYW1lfS8ke2lkfS9gLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgICAgICAgIG1vZGU6ICdjb3JzJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIHVwZGF0ZUl0ZW06IChpZCwgcGF5bG9hZCkgPT4gY3JlYXRlUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsOiBgJHtpdGVtc1VSTH0vJHtuYW1lfS8ke2lkfS9gLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3JlYXRlOiBkYXRhYmFzZXNDcmVhdGUsXG4gICAgICAgICAgZGVzdHJveTogZGF0YWJhc2VzRGVzdHJveVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGluc3RhbmNlID0ge1xuICAgIHByb2plY3RzKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWxsOiBwcm9qZWN0c0FsbCxcbiAgICAgICAgY3JlYXRlOiBwcm9qZWN0c0NyZWF0ZSxcbiAgICAgICAgZGVzdHJveTogcHJvamVjdHNEZXN0cm95LFxuICAgICAgICBnZXQ6IHByb2plY3RzR2V0XG4gICAgICB9O1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvdGFyYWJhYXMuanNcbiAqKi8iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVxdWVzdCAoc3RhdGUpIHtcbiAgcmV0dXJuIHtcbiAgICBjb21taXQoKSB7XG4gICAgICBsZXQge3VybCwgcGFyYW1zPXt9fSA9IHN0YXRlO1xuICAgICAgcmV0dXJuIGZldGNoKHVybCwgcGFyYW1zKVxuICAgICAgICAudGhlbihyID0+IHIuanNvbigpKTtcbiAgICB9LFxuXG4gICAgcGF5bG9hZCgpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9yZXF1ZXN0LmpzXG4gKiovIiwiZXhwb3J0IGNvbnN0IERFRkFVTFRfT1BUSU9OUyA9IHtcbiAgc2VydmVyVVJMOiAnaHR0cHM6Ly90YXJhYmFhcy5jb20nXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvc2V0dGluZ3MuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9
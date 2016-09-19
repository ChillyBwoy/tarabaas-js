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
	    var collectionsURL = URL_PROJECTS + '/' + uuid + '/collections';
	
	    var collectionsAll = function collectionsAll() {
	      return (0, _request.createRequest)({ url: collectionsURL });
	    };
	
	    var collectionsCreate = function collectionsCreate() {
	      var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      return (0, _request.createRequest)({
	        url: collectionsURL,
	        params: {
	          method: 'POST',
	          mode: 'cors',
	          body: JSON.stringify(payload)
	        }
	      });
	    };
	
	    var collectionsDestroy = function collectionsDestroy(name) {
	      return (0, _request.createRequest)({
	        url: collectionsURL + '/' + name,
	        params: {
	          method: 'DELETE',
	          mode: 'cors'
	        }
	      });
	    };
	
	    return _extends({}, (0, _request.createRequest)({ url: URL_PROJECTS + '/' + uuid }), {
	      collections: function collections() {
	        var itemsURL = URL_BASE + '/clients/projects/' + uuid + '/collections';
	
	        return {
	          all: collectionsAll,
	          get: function get(name) {
	            return _extends({}, (0, _request.createRequest)({ url: collectionsURL + '/' + name }), {
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
	              },
	              search: function search(payload) {
	                return (0, _request.createRequest)({
	                  url: itemsURL + '/' + name + '/search',
	                  params: {
	                    method: 'POST',
	                    mode: 'cors',
	                    body: JSON.stringify(payload)
	                  }
	                });
	              }
	            });
	          },
	          create: collectionsCreate,
	          destroy: collectionsDestroy
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5NThkN2Y5ZGQ0ZjcwMGU1MTIzYiIsIndlYnBhY2s6Ly8vLi9saWIvdGFyYWJhYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbImluaXQiLCJpbnN0YW5jZSIsInNldHRpbmdzIiwiVVJMX0JBU0UiLCJzZXJ2ZXJVUkwiLCJVUkxfUFJPSkVDVFMiLCJwcm9qZWN0c0FsbCIsInVybCIsInByb2plY3RzQ3JlYXRlIiwicGF5bG9hZCIsInBhcmFtcyIsIm1ldGhvZCIsIm1vZGUiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJwcm9qZWN0c0Rlc3Ryb3kiLCJ1dWlkIiwicHJvamVjdHNHZXQiLCJkYXRhYmFzZXNVUkwiLCJkYXRhYmFzZXNBbGwiLCJkYXRhYmFzZXNDcmVhdGUiLCJkYXRhYmFzZXNEZXN0cm95IiwiZGF0YWJhc2VzIiwiaXRlbXNVUkwiLCJhbGwiLCJnZXQiLCJsaXN0SXRlbXMiLCJjcmVhdGVJdGVtIiwiZGVzdHJveUl0ZW0iLCJpZCIsInVwZGF0ZUl0ZW0iLCJzZWFyY2giLCJjcmVhdGUiLCJkZXN0cm95IiwicHJvamVjdHMiLCJjcmVhdGVSZXF1ZXN0Iiwic3RhdGUiLCJjb21taXQiLCJmZXRjaCIsInRoZW4iLCJyIiwianNvbiIsIkRFRkFVTFRfT1BUSU9OUyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7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S0FBeEIsRUFBK0I7QUFDcEMsVUFBTztBQUNMQyxXQURLLG9CQUNJO0FBQUEsV0FDRmhDLEdBREUsR0FDZ0IrQixLQURoQixDQUNGL0IsR0FERTtBQUFBLDJCQUNnQitCLEtBRGhCLENBQ0c1QixNQURIO0FBQUEsV0FDR0EsTUFESCxpQ0FDVSxFQURWOztBQUVQLGNBQU84QixNQUFNakMsR0FBTixFQUFXRyxNQUFYLEVBQ0orQixJQURJLENBQ0M7QUFBQSxnQkFBS0MsRUFBRUMsSUFBRixFQUFMO0FBQUEsUUFERCxDQUFQO0FBRUQsTUFMSTtBQU9MbEMsWUFQSyxxQkFPSztBQUNSLGNBQU82QixLQUFQO0FBQ0Q7QUFUSSxJQUFQO0FBV0QsRzs7Ozs7Ozs7Ozs7QUNaTSxLQUFNTSw0Q0FBa0I7QUFDN0J4QyxjQUFXO0FBRGtCLEVBQXhCLEMiLCJmaWxlIjoidGFyYWJhYXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5NThkN2Y5ZGQ0ZjcwMGU1MTIzYlxuICoqLyIsImltcG9ydCB7IGNyZWF0ZVJlcXVlc3QgfSBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHsgREVGQVVMVF9PUFRJT05TIH0gZnJvbSAnLi9zZXR0aW5ncyc7XG5cbmxldCBpbnN0YW5jZSA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0IChzZXR0aW5ncyA9IERFRkFVTFRfT1BUSU9OUykge1xuICBjb25zdCBVUkxfQkFTRSA9IGAke3NldHRpbmdzLnNlcnZlclVSTH0vYXBpYDtcbiAgY29uc3QgVVJMX1BST0pFQ1RTID0gYCR7VVJMX0JBU0V9L3Byb2plY3RzYDtcblxuICBpZiAoISFpbnN0YW5jZSkge1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIGNvbnN0IHByb2plY3RzQWxsID0gKCkgPT4gY3JlYXRlUmVxdWVzdCh7dXJsOiBVUkxfUFJPSkVDVFN9KTtcblxuICBjb25zdCBwcm9qZWN0c0NyZWF0ZSA9IChwYXlsb2FkID0ge30pID0+IGNyZWF0ZVJlcXVlc3Qoe1xuICAgIHVybDogVVJMX1BST0pFQ1RTLFxuICAgIHBhcmFtczoge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBtb2RlOiAnY29ycycsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7bmFtZTogcGF5bG9hZC5uYW1lfSlcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHByb2plY3RzRGVzdHJveSA9ICh1dWlkKSA9PiBjcmVhdGVSZXF1ZXN0KHtcbiAgICB1cmw6IGAke1VSTF9QUk9KRUNUU30vJHt1dWlkfWAsXG4gICAgcGFyYW1zOiB7XG4gICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgbW9kZTogJ2NvcnMnXG4gICAgfVxuICB9KTtcblxuICBjb25zdCBwcm9qZWN0c0dldCA9ICh1dWlkKSA9PiB7XG4gICAgbGV0IGRhdGFiYXNlc1VSTCA9IGAke1VSTF9QUk9KRUNUU30vJHt1dWlkfS9kYXRhYmFzZXNgO1xuXG4gICAgY29uc3QgZGF0YWJhc2VzQWxsID0gKCkgPT4gY3JlYXRlUmVxdWVzdCh7dXJsOiBkYXRhYmFzZXNVUkx9KTtcblxuICAgIGNvbnN0IGRhdGFiYXNlc0NyZWF0ZSA9IChwYXlsb2FkID0ge30pID0+IGNyZWF0ZVJlcXVlc3Qoe1xuICAgICAgdXJsOiBkYXRhYmFzZXNVUkwsXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGRhdGFiYXNlc0Rlc3Ryb3kgPSAobmFtZSkgPT4gY3JlYXRlUmVxdWVzdCh7XG4gICAgICB1cmw6IGAke2RhdGFiYXNlc1VSTH0vJHtuYW1lfWAsXG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgbW9kZTogJ2NvcnMnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uY3JlYXRlUmVxdWVzdCh7dXJsOiBgJHtVUkxfUFJPSkVDVFN9LyR7dXVpZH1gfSksXG4gICAgICBkYXRhYmFzZXMoKSB7XG4gICAgICAgIGxldCBpdGVtc1VSTCA9IGAke1VSTF9CQVNFfS9jbGllbnRzL3Byb2plY3RzLyR7dXVpZH0vZGF0YWJhc2VzYDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGFsbDogZGF0YWJhc2VzQWxsLFxuICAgICAgICAgIGdldDogKG5hbWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmNyZWF0ZVJlcXVlc3Qoe3VybDogYCR7ZGF0YWJhc2VzVVJMfS8ke25hbWV9YH0pLFxuICAgICAgICAgICAgICBsaXN0SXRlbXM6ICgpID0+IGNyZWF0ZVJlcXVlc3Qoe3VybDogYCR7aXRlbXNVUkx9LyR7bmFtZX1gfSksXG4gICAgICAgICAgICAgIGNyZWF0ZUl0ZW06IChwYXlsb2FkID0ge30pID0+IGNyZWF0ZVJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogYCR7aXRlbXNVUkx9LyR7bmFtZX1gLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICBtb2RlOiAnY29ycycsXG4gICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGRlc3Ryb3lJdGVtOiAoaWQpID0+IGNyZWF0ZVJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogYCR7aXRlbXNVUkx9LyR7bmFtZX0vJHtpZH0vYCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICAgICAgICAgICAgICBtb2RlOiAnY29ycydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICB1cGRhdGVJdGVtOiAoaWQsIHBheWxvYWQpID0+IGNyZWF0ZVJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogYCR7aXRlbXNVUkx9LyR7bmFtZX0vJHtpZH0vYCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgICAgICAgICAgICAgICBtb2RlOiAnY29ycycsXG4gICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwYXlsb2FkKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIHNlYXJjaDogKHBheWxvYWQpID0+IGNyZWF0ZVJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybDogYCR7aXRlbXNVUkx9LyR7bmFtZX0vc2VhcmNoYCxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBjcmVhdGU6IGRhdGFiYXNlc0NyZWF0ZSxcbiAgICAgICAgICBkZXN0cm95OiBkYXRhYmFzZXNEZXN0cm95XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaW5zdGFuY2UgPSB7XG4gICAgcHJvamVjdHMoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhbGw6IHByb2plY3RzQWxsLFxuICAgICAgICBjcmVhdGU6IHByb2plY3RzQ3JlYXRlLFxuICAgICAgICBkZXN0cm95OiBwcm9qZWN0c0Rlc3Ryb3ksXG4gICAgICAgIGdldDogcHJvamVjdHNHZXRcbiAgICAgIH07XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi90YXJhYmFhcy5qc1xuICoqLyIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXF1ZXN0IChzdGF0ZSkge1xuICByZXR1cm4ge1xuICAgIGNvbW1pdCgpIHtcbiAgICAgIGxldCB7dXJsLCBwYXJhbXM9e319ID0gc3RhdGU7XG4gICAgICByZXR1cm4gZmV0Y2godXJsLCBwYXJhbXMpXG4gICAgICAgIC50aGVuKHIgPT4gci5qc29uKCkpO1xuICAgIH0sXG5cbiAgICBwYXlsb2FkKCkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3JlcXVlc3QuanNcbiAqKi8iLCJleHBvcnQgY29uc3QgREVGQVVMVF9PUFRJT05TID0ge1xuICBzZXJ2ZXJVUkw6ICdodHRwczovL3RhcmFiYWFzLmNvbSdcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2xpYi9zZXR0aW5ncy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=

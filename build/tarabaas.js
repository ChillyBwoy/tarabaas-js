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
	
	  var BASE_URL = settings.serverURL + '/api';
	
	  if (!!instance) {
	    return instance;
	  }
	
	  instance = {
	    projects: function projects() {
	      var projectsURL = BASE_URL + '/projects';
	
	      return {
	        all: function all() {
	          return (0, _request.createRequest)({ url: projectsURL });
	        },
	        get: function get(uuid) {
	          return _extends({}, (0, _request.createRequest)({ url: projectsURL + '/' + uuid }), {
	            databases: function databases() {
	              var databasesURL = projectsURL + '/' + uuid + '/databases';
	              var itemsURL = BASE_URL + '/clients/projects/' + uuid + '/databases';
	
	              return {
	                all: function all() {
	                  return (0, _request.createRequest)({ url: databasesURL });
	                },
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
	                create: function create() {
	                  var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	                  return (0, _request.createRequest)({
	                    url: databasesURL,
	                    params: {
	                      method: 'POST',
	                      mode: 'cors',
	                      body: JSON.stringify(payload)
	                    }
	                  });
	                },
	                destroy: function destroy(name) {
	                  return (0, _request.createRequest)({
	                    url: databasesURL + '/' + name,
	                    params: {
	                      method: 'DELETE',
	                      mode: 'cors'
	                    }
	                  });
	                }
	              };
	            }
	          });
	        },
	        create: function create() {
	          var payload = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	          return (0, _request.createRequest)({
	            url: projectsURL,
	            params: {
	              method: 'POST',
	              mode: 'cors',
	              body: JSON.stringify({ name: payload.name })
	            }
	          });
	        },
	        destroy: function destroy(uuid) {
	          return (0, _request.createRequest)({
	            url: projectsURL + '/' + uuid,
	            params: {
	              method: 'DELETE',
	              mode: 'cors'
	            }
	          });
	        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2NjEyNTg5ZDU4Y2MzOGJkODJlZiIsIndlYnBhY2s6Ly8vLi9saWIvdGFyYWJhYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL3NldHRpbmdzLmpzIl0sIm5hbWVzIjpbImluaXQiLCJpbnN0YW5jZSIsInNldHRpbmdzIiwiQkFTRV9VUkwiLCJzZXJ2ZXJVUkwiLCJwcm9qZWN0cyIsInByb2plY3RzVVJMIiwiYWxsIiwidXJsIiwiZ2V0IiwidXVpZCIsImRhdGFiYXNlcyIsImRhdGFiYXNlc1VSTCIsIml0ZW1zVVJMIiwibmFtZSIsImxpc3RJdGVtcyIsImNyZWF0ZUl0ZW0iLCJwYXlsb2FkIiwicGFyYW1zIiwibWV0aG9kIiwibW9kZSIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZGVzdHJveUl0ZW0iLCJpZCIsInVwZGF0ZUl0ZW0iLCJjcmVhdGUiLCJkZXN0cm95IiwiY3JlYXRlUmVxdWVzdCIsInN0YXRlIiwiY29tbWl0IiwiZmV0Y2giLCJ0aGVuIiwiciIsImpzb24iLCJERUZBVUxUX09QVElPTlMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O1NDakNnQkEsSSxHQUFBQSxJOztBQUxoQjs7QUFDQTs7QUFFQSxLQUFJQyxXQUFXLElBQWY7O0FBRU8sVUFBU0QsSUFB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LEtBQUtDLFNBQUwsQ0FBZSxFQUFDVCxNQUFNRyxRQUFRSCxJQUFmLEVBQWY7QUFIQTtBQUY4QixZQUFkLENBQWxCO0FBQUEsVUEzREg7QUFtRUxjLGtCQUFTLGlCQUFDbEIsSUFBRDtBQUFBLGtCQUFVLDRCQUFjO0FBQy9CRixrQkFBUUYsV0FBUixTQUF1QkksSUFEUTtBQUUvQlEscUJBQVE7QUFDTkMsdUJBQVEsUUFERjtBQUVOQyxxQkFBTTtBQUZBO0FBRnVCLFlBQWQsQ0FBVjtBQUFBO0FBbkVKLFFBQVA7QUEyRUQ7QUEvRVEsSUFBWDs7QUFrRkEsVUFBT25CLFFBQVA7QUFDRCxHOzs7Ozs7Ozs7OztTQy9GZTRCLGEsR0FBQUEsYTtBQUFULFVBQVNBLGFBQVQsQ0FBd0JDLEtBQXhCLEVBQStCO0FBQ3BDLFVBQU87QUFDTEMsV0FESyxvQkFDSTtBQUFBLFdBQ0Z2QixHQURFLEdBQ2dCc0IsS0FEaEIsQ0FDRnRCLEdBREU7QUFBQSwyQkFDZ0JzQixLQURoQixDQUNHWixNQURIO0FBQUEsV0FDR0EsTUFESCxpQ0FDVSxFQURWOztBQUVQLGNBQU9jLE1BQU14QixHQUFOLEVBQVdVLE1BQVgsRUFDSmUsSUFESSxDQUNDO0FBQUEsZ0JBQUtDLEVBQUVDLElBQUYsRUFBTDtBQUFBLFFBREQsQ0FBUDtBQUVELE1BTEk7QUFPTGxCLFlBUEsscUJBT0s7QUFDUixjQUFPYSxLQUFQO0FBQ0Q7QUFUSSxJQUFQO0FBV0QsRzs7Ozs7Ozs7Ozs7QUNaTSxLQUFNTSw0Q0FBa0I7QUFDN0JoQyxjQUFXO0FBRGtCLEVBQXhCLEMiLCJmaWxlIjoidGFyYWJhYXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gZmFjdG9yeSgpO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2NjEyNTg5ZDU4Y2MzOGJkODJlZlxuICoqLyIsImltcG9ydCB7IGNyZWF0ZVJlcXVlc3QgfSBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHsgREVGQVVMVF9PUFRJT05TIH0gZnJvbSAnLi9zZXR0aW5ncyc7XG5cbmxldCBpbnN0YW5jZSA9IG51bGw7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0IChzZXR0aW5ncyA9IERFRkFVTFRfT1BUSU9OUykge1xuICBjb25zdCBCQVNFX1VSTCA9IGAke3NldHRpbmdzLnNlcnZlclVSTH0vYXBpYDtcblxuICBpZiAoISFpbnN0YW5jZSkge1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIGluc3RhbmNlID0ge1xuICAgIHByb2plY3RzKCkge1xuICAgICAgbGV0IHByb2plY3RzVVJMID0gYCR7QkFTRV9VUkx9L3Byb2plY3RzYDtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWxsOiAoKSA9PiBjcmVhdGVSZXF1ZXN0KHt1cmw6IHByb2plY3RzVVJMfSksXG4gICAgICAgIGdldDogKHV1aWQpID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uY3JlYXRlUmVxdWVzdCh7dXJsOiBgJHtwcm9qZWN0c1VSTH0vJHt1dWlkfWB9KSxcbiAgICAgICAgICAgIGRhdGFiYXNlcygpIHtcbiAgICAgICAgICAgICAgbGV0IGRhdGFiYXNlc1VSTCA9IGAke3Byb2plY3RzVVJMfS8ke3V1aWR9L2RhdGFiYXNlc2A7XG4gICAgICAgICAgICAgIGxldCBpdGVtc1VSTCA9IGAke0JBU0VfVVJMfS9jbGllbnRzL3Byb2plY3RzLyR7dXVpZH0vZGF0YWJhc2VzYDtcblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGFsbDogKCkgPT4gY3JlYXRlUmVxdWVzdCh7dXJsOiBkYXRhYmFzZXNVUkx9KSxcbiAgICAgICAgICAgICAgICBnZXQ6IChuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi5jcmVhdGVSZXF1ZXN0KHt1cmw6IGAke2RhdGFiYXNlc1VSTH0vJHtuYW1lfWB9KSxcbiAgICAgICAgICAgICAgICAgICAgbGlzdEl0ZW1zOiAoKSA9PiBjcmVhdGVSZXF1ZXN0KHt1cmw6IGAke2l0ZW1zVVJMfS8ke25hbWV9YH0pLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdGVJdGVtOiAocGF5bG9hZCA9IHt9KSA9PiBjcmVhdGVSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6IGAke2l0ZW1zVVJMfS8ke25hbWV9YCxcbiAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICBkZXN0cm95SXRlbTogKGlkKSA9PiBjcmVhdGVSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6IGAke2l0ZW1zVVJMfS8ke25hbWV9LyR7aWR9L2AsXG4gICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogJ2NvcnMnXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlSXRlbTogKGlkLCBwYXlsb2FkKSA9PiBjcmVhdGVSZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB1cmw6IGAke2l0ZW1zVVJMfS8ke25hbWV9LyR7aWR9L2AsXG4gICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogJ2NvcnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjcmVhdGU6IChwYXlsb2FkID0ge30pID0+IGNyZWF0ZVJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgdXJsOiBkYXRhYmFzZXNVUkwsXG4gICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIG1vZGU6ICdjb3JzJyxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBkZXN0cm95OiAobmFtZSkgPT4gY3JlYXRlUmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICB1cmw6IGAke2RhdGFiYXNlc1VSTH0vJHtuYW1lfWAsXG4gICAgICAgICAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICAgICAgICAgICAgICAgICAgbW9kZTogJ2NvcnMnXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY3JlYXRlOiAocGF5bG9hZCA9IHt9KSA9PiBjcmVhdGVSZXF1ZXN0KHtcbiAgICAgICAgICB1cmw6IHByb2plY3RzVVJMLFxuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBtb2RlOiAnY29ycycsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7bmFtZTogcGF5bG9hZC5uYW1lfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgICBkZXN0cm95OiAodXVpZCkgPT4gY3JlYXRlUmVxdWVzdCh7XG4gICAgICAgICAgdXJsOiBgJHtwcm9qZWN0c1VSTH0vJHt1dWlkfWAsXG4gICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgICAgICAgICAgbW9kZTogJ2NvcnMnXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3RhcmFiYWFzLmpzXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlcXVlc3QgKHN0YXRlKSB7XG4gIHJldHVybiB7XG4gICAgY29tbWl0KCkge1xuICAgICAgbGV0IHt1cmwsIHBhcmFtcz17fX0gPSBzdGF0ZTtcbiAgICAgIHJldHVybiBmZXRjaCh1cmwsIHBhcmFtcylcbiAgICAgICAgLnRoZW4ociA9PiByLmpzb24oKSk7XG4gICAgfSxcblxuICAgIHBheWxvYWQoKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9saWIvcmVxdWVzdC5qc1xuICoqLyIsImV4cG9ydCBjb25zdCBERUZBVUxUX09QVElPTlMgPSB7XG4gIHNlcnZlclVSTDogJ2h0dHBzOi8vdGFyYWJhYXMuY29tJ1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vbGliL3NldHRpbmdzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==
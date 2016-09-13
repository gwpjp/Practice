/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest() { // eslint-disable-line no-unused-vars
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = 10000;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}

/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "14c3ca8455ef13af8474"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotMainModule = true; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			hotMainModule = false;
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				Object.defineProperty(fn, name, (function(name) {
/******/ 					return {
/******/ 						configurable: true,
/******/ 						enumerable: true,
/******/ 						get: function() {
/******/ 							return __webpack_require__[name];
/******/ 						},
/******/ 						set: function(value) {
/******/ 							__webpack_require__[name] = value;
/******/ 						}
/******/ 					};
/******/ 				}(name)));
/******/ 			}
/******/ 		}
/******/ 		Object.defineProperty(fn, "e", {
/******/ 			enumerable: true,
/******/ 			value: function(chunkId) {
/******/ 				if(hotStatus === "ready")
/******/ 					hotSetStatus("prepare");
/******/ 				hotChunksLoading++;
/******/ 				return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 					finishChunkLoading();
/******/ 					throw err;
/******/ 				});
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		});
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotMainModule,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotMainModule = true;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest().then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				}
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					}
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						}
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = function() {
/******/ 						console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 					};
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					dependency = moduleOutdatedDependencies[j];
/******/ 					idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return Promise.resolve(outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(11)(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

eval("module.exports = jQuery;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJqUXVlcnlcIj8wY2I4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IjAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGpRdWVyeTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImpRdWVyeVwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony export (immutable) */ exports[\"a\"] = prettify;\nfunction prettify(yourNumber) {\n    //Seperates the components of the number\n    var n= yourNumber.toString().split(\".\");\n    //Comma-fies the first part\n    n[0] = n[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, \",\");\n    //Combines the two sections\n    return n.join(\".\");\n}\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvcHJldHRpZnkuanM/M2M5YiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsRUFBRTtBQUNwQztBQUNBO0FBQ0EiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXR0aWZ5KHlvdXJOdW1iZXIpIHtcbiAgICAvL1NlcGVyYXRlcyB0aGUgY29tcG9uZW50cyBvZiB0aGUgbnVtYmVyXG4gICAgdmFyIG49IHlvdXJOdW1iZXIudG9TdHJpbmcoKS5zcGxpdChcIi5cIik7XG4gICAgLy9Db21tYS1maWVzIHRoZSBmaXJzdCBwYXJ0XG4gICAgblswXSA9IG5bMF0ucmVwbGFjZSgvXFxCKD89KFxcZHszfSkrKD8hXFxkKSkvZywgXCIsXCIpO1xuICAgIC8vQ29tYmluZXMgdGhlIHR3byBzZWN0aW9uc1xuICAgIHJldHVybiBuLmpvaW4oXCIuXCIpO1xufVxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9wcmV0dGlmeS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("const questions = ['Find the sum of all the multiples of 3 or 5 below 1,000.',\n'Find the sum of the even Fibonacci numbers less than 4,000,000.',\n'Find the largest prime factor of 600,851,475,143.',\n'Find the largest palindrome that is the multiple of two 3-digit numbers.',\n'Smallest number divisible by 1,...,20.',\n'Difference between the sum of squares and the square of the sum of the numbers 1,...,100'\n\n];\n\n/* harmony default export */ exports[\"a\"] = questions;\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZGF0YS5qcz82MzVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSIsImZpbGUiOiIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcXVlc3Rpb25zID0gWydGaW5kIHRoZSBzdW0gb2YgYWxsIHRoZSBtdWx0aXBsZXMgb2YgMyBvciA1IGJlbG93IDEsMDAwLicsXG4nRmluZCB0aGUgc3VtIG9mIHRoZSBldmVuIEZpYm9uYWNjaSBudW1iZXJzIGxlc3MgdGhhbiA0LDAwMCwwMDAuJyxcbidGaW5kIHRoZSBsYXJnZXN0IHByaW1lIGZhY3RvciBvZiA2MDAsODUxLDQ3NSwxNDMuJyxcbidGaW5kIHRoZSBsYXJnZXN0IHBhbGluZHJvbWUgdGhhdCBpcyB0aGUgbXVsdGlwbGUgb2YgdHdvIDMtZGlnaXQgbnVtYmVycy4nLFxuJ1NtYWxsZXN0IG51bWJlciBkaXZpc2libGUgYnkgMSwuLi4sMjAuJyxcbidEaWZmZXJlbmNlIGJldHdlZW4gdGhlIHN1bSBvZiBzcXVhcmVzIGFuZCB0aGUgc3F1YXJlIG9mIHRoZSBzdW0gb2YgdGhlIG51bWJlcnMgMSwuLi4sMTAwJ1xuXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBxdWVzdGlvbnM7XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2RhdGEuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(1);\n/* harmony export (immutable) */ exports[\"a\"] = ex1;\n\n//var $ = require ('jquery');\n\n\nfunction ex1(node){\n\tvar sum = 0;\n\n\tfor(let i = 0; i < 1000; i++) {\n\t\tif (i%3===0 || i%5===0) {\n\t\t  sum+=i;\n\t\t}\n\t}\n\n\t$(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__[\"a\" /* default */])(sum));\n}\n\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZXhlcmNpc2VzL0V4MS5qcz9jNGJjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxlQUFlLFVBQVU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4vL3ZhciAkID0gcmVxdWlyZSAoJ2pxdWVyeScpO1xuaW1wb3J0IHByZXR0aWZ5IGZyb20gJy4uL3ByZXR0aWZ5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXgxKG5vZGUpe1xuXHR2YXIgc3VtID0gMDtcblxuXHRmb3IobGV0IGkgPSAwOyBpIDwgMTAwMDsgaSsrKSB7XG5cdFx0aWYgKGklMz09PTAgfHwgaSU1PT09MCkge1xuXHRcdCAgc3VtKz1pO1xuXHRcdH1cblx0fVxuXG5cdCQobm9kZSkuaHRtbChwcmV0dGlmeShzdW0pKTtcbn1cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvZXhlcmNpc2VzL0V4MS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(1);\n/* harmony export (immutable) */ exports[\"a\"] = ex2;\n//var $ = require ('jquery');\n\n\nfunction ex2(node){\n  var pre = 1;\n  var cur = 2;\n  var temp = 0;\n  var total = 0;\n\n  while(cur < 4000000){\n    if(cur%2 === 0) {\n      total+=cur;\n    }\n    temp = cur;\n    cur+=pre;\n    pre = temp;\n  }\n  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__[\"a\" /* default */])(total));\n}\n\n\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZXhlcmNpc2VzL0V4Mi5qcz8zOWQxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy92YXIgJCA9IHJlcXVpcmUgKCdqcXVlcnknKTtcbmltcG9ydCBwcmV0dGlmeSBmcm9tICcuLi9wcmV0dGlmeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4Mihub2RlKXtcbiAgdmFyIHByZSA9IDE7XG4gIHZhciBjdXIgPSAyO1xuICB2YXIgdGVtcCA9IDA7XG4gIHZhciB0b3RhbCA9IDA7XG5cbiAgd2hpbGUoY3VyIDwgNDAwMDAwMCl7XG4gICAgaWYoY3VyJTIgPT09IDApIHtcbiAgICAgIHRvdGFsKz1jdXI7XG4gICAgfVxuICAgIHRlbXAgPSBjdXI7XG4gICAgY3VyKz1wcmU7XG4gICAgcHJlID0gdGVtcDtcbiAgfVxuICAkKG5vZGUpLmh0bWwocHJldHRpZnkodG90YWwpKTtcbn1cblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9leGVyY2lzZXMvRXgyLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(1);\n/* harmony export (immutable) */ exports[\"a\"] = ex3;\n//var $ = require ('jquery');\n\n\nfunction ex3(node){\n  var n = Math.sqrt(600851475143); //This is the highest you have to check.\n  var primeCheck = 0;\n  var prime = 0;\n  var m = 0;\n\n  for (let i = 1; i < n; i++) {\n    //First, check to see if 'i' is prime.\n    m = Math.sqrt(n);\n    for (let j = 1; j < m; j++){\n      if (i%j === 0) {\n        primeCheck = j;\n      }\n    }\n    /*If it is prime, then its largest divisor is 1,\n    so use this to check if it divides our number.*/\n    if (primeCheck === 1 && 600851475143%i === 0){\n      prime = i;\n    }\n  }\n\n  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__[\"a\" /* default */])(prime));\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZXhlcmNpc2VzL0V4My5qcz9lNjQ1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6IjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL3ZhciAkID0gcmVxdWlyZSAoJ2pxdWVyeScpO1xuaW1wb3J0IHByZXR0aWZ5IGZyb20gJy4uL3ByZXR0aWZ5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXgzKG5vZGUpe1xuICB2YXIgbiA9IE1hdGguc3FydCg2MDA4NTE0NzUxNDMpOyAvL1RoaXMgaXMgdGhlIGhpZ2hlc3QgeW91IGhhdmUgdG8gY2hlY2suXG4gIHZhciBwcmltZUNoZWNrID0gMDtcbiAgdmFyIHByaW1lID0gMDtcbiAgdmFyIG0gPSAwO1xuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbjsgaSsrKSB7XG4gICAgLy9GaXJzdCwgY2hlY2sgdG8gc2VlIGlmICdpJyBpcyBwcmltZS5cbiAgICBtID0gTWF0aC5zcXJ0KG4pO1xuICAgIGZvciAobGV0IGogPSAxOyBqIDwgbTsgaisrKXtcbiAgICAgIGlmIChpJWogPT09IDApIHtcbiAgICAgICAgcHJpbWVDaGVjayA9IGo7XG4gICAgICB9XG4gICAgfVxuICAgIC8qSWYgaXQgaXMgcHJpbWUsIHRoZW4gaXRzIGxhcmdlc3QgZGl2aXNvciBpcyAxLFxuICAgIHNvIHVzZSB0aGlzIHRvIGNoZWNrIGlmIGl0IGRpdmlkZXMgb3VyIG51bWJlci4qL1xuICAgIGlmIChwcmltZUNoZWNrID09PSAxICYmIDYwMDg1MTQ3NTE0MyVpID09PSAwKXtcbiAgICAgIHByaW1lID0gaTtcbiAgICB9XG4gIH1cblxuICAkKG5vZGUpLmh0bWwocHJldHRpZnkocHJpbWUpKTtcbn07XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2V4ZXJjaXNlcy9FeDMuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(1);\n/* harmony export (immutable) */ exports[\"a\"] = ex4;\n//var $ = require ('jquery');\n\n\n//Example 4: Largest Palindrome Project\nfunction ex4(node) {\n  let pal = 0;\n  let temp = 0;\n  let temp2 = 0;\n\n  for (let i = 1; i < 1000; i++) {\n    for (let j = 1; j < 1000; j++) {\n      temp = i * j;\n      temp2 = temp.toString().split('').reverse().join('');\n      if (temp == temp2 && temp > pal) {\n        pal = temp;\n      }\n    }\n  }\n\n  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__[\"a\" /* default */])(pal));\n};\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZXhlcmNpc2VzL0V4NC5qcz8wNTJmIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsVUFBVTtBQUMzQixtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6IjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvL3ZhciAkID0gcmVxdWlyZSAoJ2pxdWVyeScpO1xuaW1wb3J0IHByZXR0aWZ5IGZyb20gJy4uL3ByZXR0aWZ5JztcblxuLy9FeGFtcGxlIDQ6IExhcmdlc3QgUGFsaW5kcm9tZSBQcm9qZWN0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleDQobm9kZSkge1xuICBsZXQgcGFsID0gMDtcbiAgbGV0IHRlbXAgPSAwO1xuICBsZXQgdGVtcDIgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAxOyBpIDwgMTAwMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCAxMDAwOyBqKyspIHtcbiAgICAgIHRlbXAgPSBpICogajtcbiAgICAgIHRlbXAyID0gdGVtcC50b1N0cmluZygpLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XG4gICAgICBpZiAodGVtcCA9PSB0ZW1wMiAmJiB0ZW1wID4gcGFsKSB7XG4gICAgICAgIHBhbCA9IHRlbXA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJChub2RlKS5odG1sKHByZXR0aWZ5KHBhbCkpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2V4ZXJjaXNlcy9FeDQuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(1);\n/* harmony export (immutable) */ exports[\"a\"] = ex5;\n//var $ = require ('jquery');\n\n\n//Example 5: Smallest number divisible by 1,...,20.\nfunction ex5(node) {\n  let N = 20;\n  let done = false;\n  let cur = 2;\n  let temp = 2;\n\n  while (!done) {\n    if (temp > N) {\n      done = true;\n    } else {\n      if (cur % temp == 0) {\n        temp++;\n      } else {\n        temp = 2;\n        cur++;\n      }\n    }\n  }\n\n  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__[\"a\" /* default */])(cur));\n\n}\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZXhlcmNpc2VzL0V4NS5qcz85OTI4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEiLCJmaWxlIjoiNy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vdmFyICQgPSByZXF1aXJlICgnanF1ZXJ5Jyk7XG5pbXBvcnQgcHJldHRpZnkgZnJvbSAnLi4vcHJldHRpZnknO1xuXG4vL0V4YW1wbGUgNTogU21hbGxlc3QgbnVtYmVyIGRpdmlzaWJsZSBieSAxLC4uLiwyMC5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4NShub2RlKSB7XG4gIGxldCBOID0gMjA7XG4gIGxldCBkb25lID0gZmFsc2U7XG4gIGxldCBjdXIgPSAyO1xuICBsZXQgdGVtcCA9IDI7XG5cbiAgd2hpbGUgKCFkb25lKSB7XG4gICAgaWYgKHRlbXAgPiBOKSB7XG4gICAgICBkb25lID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGN1ciAlIHRlbXAgPT0gMCkge1xuICAgICAgICB0ZW1wKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wID0gMjtcbiAgICAgICAgY3VyKys7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJChub2RlKS5odG1sKHByZXR0aWZ5KGN1cikpO1xuXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9leGVyY2lzZXMvRXg1LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(1);\n/* harmony export (immutable) */ exports[\"a\"] = ex6;\n//var $ = require ('jquery');\n\n\n//Example 6: Sum and squares\nfunction ex6(node) {\n  let N = 100;\n  let sumsq = Math.pow(N*(N+1)/2,2);\n  let sqsum = 0;\n  for (let i = 1; i <= 100; i++) {\n    sqsum += Math.pow(i,2);\n  }\n\n  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__[\"a\" /* default */])(sumsq - sqsum));\n\n}\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZXhlcmNpc2VzL0V4Ni5qcz8xYzA1Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0E7O0FBRUE7O0FBRUEiLCJmaWxlIjoiOC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vdmFyICQgPSByZXF1aXJlICgnanF1ZXJ5Jyk7XG5pbXBvcnQgcHJldHRpZnkgZnJvbSAnLi4vcHJldHRpZnknO1xuXG4vL0V4YW1wbGUgNjogU3VtIGFuZCBzcXVhcmVzXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleDYobm9kZSkge1xuICBsZXQgTiA9IDEwMDtcbiAgbGV0IHN1bXNxID0gTWF0aC5wb3coTiooTisxKS8yLDIpO1xuICBsZXQgc3FzdW0gPSAwO1xuICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDA7IGkrKykge1xuICAgIHNxc3VtICs9IE1hdGgucG93KGksMik7XG4gIH1cblxuICAkKG5vZGUpLmh0bWwocHJldHRpZnkoc3Vtc3EgLSBzcXN1bSkpO1xuXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9leGVyY2lzZXMvRXg2LmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("const questionTemplate = '<p class = \"example\"><strong>Example #<%= num %></strong>: <%= title %> </p>' +  \n    '<p>Answer: <span id=\"answer_<%= num %>\"></span></p>' + \n    '<input id=\"b-<%= num %>\" type=\"button\" value=\"Answer the question.\" />';\n\n/* harmony default export */ exports[\"a\"] = questionTemplate;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvdGVtcGxhdGUuanM/ODhiYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiOS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHF1ZXN0aW9uVGVtcGxhdGUgPSAnPHAgY2xhc3MgPSBcImV4YW1wbGVcIj48c3Ryb25nPkV4YW1wbGUgIzwlPSBudW0gJT48L3N0cm9uZz46IDwlPSB0aXRsZSAlPiA8L3A+JyArICBcbiAgICAnPHA+QW5zd2VyOiA8c3BhbiBpZD1cImFuc3dlcl88JT0gbnVtICU+XCI+PC9zcGFuPjwvcD4nICsgXG4gICAgJzxpbnB1dCBpZD1cImItPCU9IG51bSAlPlwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIkFuc3dlciB0aGUgcXVlc3Rpb24uXCIgLz4nO1xuXG5leHBvcnQgZGVmYXVsdCBxdWVzdGlvblRlbXBsYXRlO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3RlbXBsYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 10 */
/***/ function(module, exports) {

eval("module.exports = _;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJfXCI/YjNiOSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIxMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIl9cIlxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__data__ = __webpack_require__(2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__template__ = __webpack_require__(9);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exercises_Ex1__ = __webpack_require__(3);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__exercises_Ex2__ = __webpack_require__(4);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__exercises_Ex3__ = __webpack_require__(5);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__exercises_Ex4__ = __webpack_require__(6);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__exercises_Ex5__ = __webpack_require__(7);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__exercises_Ex6__ = __webpack_require__(8);\n//Load lodash functions.  Not actually necessary because of webpack plugin settings.\nvar _ = __webpack_require__(10);\n//Load jquery.  Not actually necessary because of webpack plugin settings.\nvar $ = __webpack_require__(0);\n\n//Get the data for the questions\n\n\n\n//Get the functions\n\n\n\n\n\n\n\nvar ex={};\nex.ex1 = __WEBPACK_IMPORTED_MODULE_2__exercises_Ex1__[\"a\" /* default */];\nex.ex2 = __WEBPACK_IMPORTED_MODULE_3__exercises_Ex2__[\"a\" /* default */];\nex.ex3 = __WEBPACK_IMPORTED_MODULE_4__exercises_Ex3__[\"a\" /* default */];\nex.ex4 = __WEBPACK_IMPORTED_MODULE_5__exercises_Ex4__[\"a\" /* default */];\nex.ex5 = __WEBPACK_IMPORTED_MODULE_6__exercises_Ex5__[\"a\" /* default */];\nex.ex6 = __WEBPACK_IMPORTED_MODULE_7__exercises_Ex6__[\"a\" /* default */];\n\n//Render the questions\nvar template = _.template(__WEBPACK_IMPORTED_MODULE_1__template__[\"a\" /* default */]);\n_.forEach(__WEBPACK_IMPORTED_MODULE_0__data__[\"a\" /* default */],function(el,i){\n\t$('#main').append(template({'num': i+1, 'title': el}));\n});\n\n//Attach the function to the button\nvar inputs = $('input');\n_.forEach(inputs, function(el) {\n\tvar num = parseInt(/[0-9]+/.exec(el.id));\n\t$(el).click(function() {\n\t\tex['ex'+num]($('#answer_'+num));\n\t});\n});\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXguanM/ZGFkYyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLHdCQUF3QjtBQUNyRCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixDQUFDIiwiZmlsZSI6IjExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9Mb2FkIGxvZGFzaCBmdW5jdGlvbnMuICBOb3QgYWN0dWFsbHkgbmVjZXNzYXJ5IGJlY2F1c2Ugb2Ygd2VicGFjayBwbHVnaW4gc2V0dGluZ3MuXG52YXIgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xuLy9Mb2FkIGpxdWVyeS4gIE5vdCBhY3R1YWxseSBuZWNlc3NhcnkgYmVjYXVzZSBvZiB3ZWJwYWNrIHBsdWdpbiBzZXR0aW5ncy5cbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XG5cbi8vR2V0IHRoZSBkYXRhIGZvciB0aGUgcXVlc3Rpb25zXG5pbXBvcnQgcXVlc3Rpb25zIGZyb20gJy4vZGF0YSc7XG5pbXBvcnQgcXVlc3Rpb25UZW1wbGF0ZSBmcm9tICcuL3RlbXBsYXRlJztcblxuLy9HZXQgdGhlIGZ1bmN0aW9uc1xuaW1wb3J0IGV4MSBmcm9tICcuL2V4ZXJjaXNlcy9FeDEnO1xuaW1wb3J0IGV4MiBmcm9tICcuL2V4ZXJjaXNlcy9FeDInO1xuaW1wb3J0IGV4MyBmcm9tICcuL2V4ZXJjaXNlcy9FeDMnO1xuaW1wb3J0IGV4NCBmcm9tICcuL2V4ZXJjaXNlcy9FeDQnO1xuaW1wb3J0IGV4NSBmcm9tICcuL2V4ZXJjaXNlcy9FeDUnO1xuaW1wb3J0IGV4NiBmcm9tICcuL2V4ZXJjaXNlcy9FeDYnO1xuXG52YXIgZXg9e307XG5leC5leDEgPSBleDE7XG5leC5leDIgPSBleDI7XG5leC5leDMgPSBleDM7XG5leC5leDQgPSBleDQ7XG5leC5leDUgPSBleDU7XG5leC5leDYgPSBleDY7XG5cbi8vUmVuZGVyIHRoZSBxdWVzdGlvbnNcbnZhciB0ZW1wbGF0ZSA9IF8udGVtcGxhdGUocXVlc3Rpb25UZW1wbGF0ZSk7XG5fLmZvckVhY2gocXVlc3Rpb25zLGZ1bmN0aW9uKGVsLGkpe1xuXHQkKCcjbWFpbicpLmFwcGVuZCh0ZW1wbGF0ZSh7J251bSc6IGkrMSwgJ3RpdGxlJzogZWx9KSk7XG59KTtcblxuLy9BdHRhY2ggdGhlIGZ1bmN0aW9uIHRvIHRoZSBidXR0b25cbnZhciBpbnB1dHMgPSAkKCdpbnB1dCcpO1xuXy5mb3JFYWNoKGlucHV0cywgZnVuY3Rpb24oZWwpIHtcblx0dmFyIG51bSA9IHBhcnNlSW50KC9bMC05XSsvLmV4ZWMoZWwuaWQpKTtcblx0JChlbCkuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0ZXhbJ2V4JytudW1dKCQoJyNhbnN3ZXJfJytudW0pKTtcblx0fSk7XG59KTtcblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ }
/******/ ]);
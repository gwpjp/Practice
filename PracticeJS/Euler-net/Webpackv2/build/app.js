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
/******/ 	var hotCurrentHash = "7466649f60654335ce60"; // eslint-disable-line no-unused-vars
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
eval("/* harmony export (immutable) */ exports[\"a\"] = prettify;\nfunction prettify(yourNumber) {\n  // Seperates the components of the number\n  const n = yourNumber.toString().split('.');\n  // Comma-fies the first part\n  n[0] = n[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');\n  // Combines the two sections\n  return n.join('.');\n}\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvcHJldHRpZnkuanM/NzQyNyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsRUFBRTtBQUNsQztBQUNBO0FBQ0EiLCJmaWxlIjoiMS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByZXR0aWZ5KHlvdXJOdW1iZXIpIHtcbiAgLy8gU2VwZXJhdGVzIHRoZSBjb21wb25lbnRzIG9mIHRoZSBudW1iZXJcbiAgY29uc3QgbiA9IHlvdXJOdW1iZXIudG9TdHJpbmcoKS5zcGxpdCgnLicpO1xuICAvLyBDb21tYS1maWVzIHRoZSBmaXJzdCBwYXJ0XG4gIG5bMF0gPSBuWzBdLnJlcGxhY2UoL1xcQig/PShcXGR7M30pKyg/IVxcZCkpL2csICcsJyk7XG4gIC8vIENvbWJpbmVzIHRoZSB0d28gc2VjdGlvbnNcbiAgcmV0dXJuIG4uam9pbignLicpO1xufVxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9wcmV0dGlmeS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("const questions = ['Find the sum of all the multiples of 3 or 5 below 1,000.',\n'Find the sum of the even Fibonacci numbers less than 4,000,000.',\n'Find the largest prime factor of 600,851,475,143.',\n'Find the largest palindrome that is the multiple of two 3-digit numbers.',\n'Smallest number divisible by 1,...,20.',\n'Difference between the sum of squares and the square of the sum of the numbers 1,...,100',\n];\n\n/* harmony default export */ exports[\"a\"] = questions;\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZGF0YS5qcz8yYjY4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6IjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBxdWVzdGlvbnMgPSBbJ0ZpbmQgdGhlIHN1bSBvZiBhbGwgdGhlIG11bHRpcGxlcyBvZiAzIG9yIDUgYmVsb3cgMSwwMDAuJyxcbidGaW5kIHRoZSBzdW0gb2YgdGhlIGV2ZW4gRmlib25hY2NpIG51bWJlcnMgbGVzcyB0aGFuIDQsMDAwLDAwMC4nLFxuJ0ZpbmQgdGhlIGxhcmdlc3QgcHJpbWUgZmFjdG9yIG9mIDYwMCw4NTEsNDc1LDE0My4nLFxuJ0ZpbmQgdGhlIGxhcmdlc3QgcGFsaW5kcm9tZSB0aGF0IGlzIHRoZSBtdWx0aXBsZSBvZiB0d28gMy1kaWdpdCBudW1iZXJzLicsXG4nU21hbGxlc3QgbnVtYmVyIGRpdmlzaWJsZSBieSAxLC4uLiwyMC4nLFxuJ0RpZmZlcmVuY2UgYmV0d2VlbiB0aGUgc3VtIG9mIHNxdWFyZXMgYW5kIHRoZSBzcXVhcmUgb2YgdGhlIHN1bSBvZiB0aGUgbnVtYmVycyAxLC4uLiwxMDAnLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgcXVlc3Rpb25zO1xuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9kYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(1);\n/* harmony export (immutable) */ exports[\"a\"] = ex1;\n\n// var $ = require ('jquery');\n\n\nfunction ex1(node) {\n  let sum = 0;\n\n  for (let i = 0; i < 1000; i += 1) {\n    if (i % 3 === 0 || i % 5 === 0) {\n      sum += i;\n    }\n  }\n\n  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__[\"a\" /* default */])(sum));\n}\n\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZXhlcmNpc2VzL0V4MS5qcz9hMTMxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsVUFBVTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6IjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIHZhciAkID0gcmVxdWlyZSAoJ2pxdWVyeScpO1xuaW1wb3J0IHByZXR0aWZ5IGZyb20gJy4uL3ByZXR0aWZ5JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXgxKG5vZGUpIHtcbiAgbGV0IHN1bSA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDAwOyBpICs9IDEpIHtcbiAgICBpZiAoaSAlIDMgPT09IDAgfHwgaSAlIDUgPT09IDApIHtcbiAgICAgIHN1bSArPSBpO1xuICAgIH1cbiAgfVxuXG4gICQobm9kZSkuaHRtbChwcmV0dGlmeShzdW0pKTtcbn1cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvZXhlcmNpc2VzL0V4MS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(1);\n/* harmony export (immutable) */ exports[\"a\"] = ex2;\n// var $ = require ('jquery');\n\n\nfunction ex2(node) {\n  let pre = 1;\n  let cur = 2;\n  let temp = 0;\n  let total = 0;\n\n  while (cur < 4000000) {\n    if (cur % 2 === 0) {\n      total += cur;\n    }\n    temp = cur;\n    cur += pre;\n    pre = temp;\n  }\n  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__[\"a\" /* default */])(total));\n}\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZXhlcmNpc2VzL0V4Mi5qcz9mMjU4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiI0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdmFyICQgPSByZXF1aXJlICgnanF1ZXJ5Jyk7XG5pbXBvcnQgcHJldHRpZnkgZnJvbSAnLi4vcHJldHRpZnknO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBleDIobm9kZSkge1xuICBsZXQgcHJlID0gMTtcbiAgbGV0IGN1ciA9IDI7XG4gIGxldCB0ZW1wID0gMDtcbiAgbGV0IHRvdGFsID0gMDtcblxuICB3aGlsZSAoY3VyIDwgNDAwMDAwMCkge1xuICAgIGlmIChjdXIgJSAyID09PSAwKSB7XG4gICAgICB0b3RhbCArPSBjdXI7XG4gICAgfVxuICAgIHRlbXAgPSBjdXI7XG4gICAgY3VyICs9IHByZTtcbiAgICBwcmUgPSB0ZW1wO1xuICB9XG4gICQobm9kZSkuaHRtbChwcmV0dGlmeSh0b3RhbCkpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvZXhlcmNpc2VzL0V4Mi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(1);\n/* harmony export (immutable) */ exports[\"a\"] = ex3;\n// var $ = require ('jquery');\n\n\nfunction ex3(node) {\n  const n = Math.sqrt(600851475143); // This is the highest you have to check.\n  let primeCheck = 0;\n  let prime = 0;\n  let m = 0;\n\n  for (let i = 1; i < n; i += 1) {\n    // First, check to see if 'i' is prime.\n    m = Math.sqrt(n);\n    for (let j = 1; j < m; j += 1) {\n      if (i % j === 0) {\n        primeCheck = j;\n      }\n    }\n    /* If it is prime, then its largest divisor is 1,\n    so use this to check if it divides our number.*/\n    if (primeCheck === 1 && 600851475143 % i === 0) {\n      prime = i;\n    }\n  }\n\n  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__[\"a\" /* default */])(prime));\n}\n\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZXhlcmNpc2VzL0V4My5qcz9hZmVmIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6IjUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB2YXIgJCA9IHJlcXVpcmUgKCdqcXVlcnknKTtcbmltcG9ydCBwcmV0dGlmeSBmcm9tICcuLi9wcmV0dGlmeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4Myhub2RlKSB7XG4gIGNvbnN0IG4gPSBNYXRoLnNxcnQoNjAwODUxNDc1MTQzKTsgLy8gVGhpcyBpcyB0aGUgaGlnaGVzdCB5b3UgaGF2ZSB0byBjaGVjay5cbiAgbGV0IHByaW1lQ2hlY2sgPSAwO1xuICBsZXQgcHJpbWUgPSAwO1xuICBsZXQgbSA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBuOyBpICs9IDEpIHtcbiAgICAvLyBGaXJzdCwgY2hlY2sgdG8gc2VlIGlmICdpJyBpcyBwcmltZS5cbiAgICBtID0gTWF0aC5zcXJ0KG4pO1xuICAgIGZvciAobGV0IGogPSAxOyBqIDwgbTsgaiArPSAxKSB7XG4gICAgICBpZiAoaSAlIGogPT09IDApIHtcbiAgICAgICAgcHJpbWVDaGVjayA9IGo7XG4gICAgICB9XG4gICAgfVxuICAgIC8qIElmIGl0IGlzIHByaW1lLCB0aGVuIGl0cyBsYXJnZXN0IGRpdmlzb3IgaXMgMSxcbiAgICBzbyB1c2UgdGhpcyB0byBjaGVjayBpZiBpdCBkaXZpZGVzIG91ciBudW1iZXIuKi9cbiAgICBpZiAocHJpbWVDaGVjayA9PT0gMSAmJiA2MDA4NTE0NzUxNDMgJSBpID09PSAwKSB7XG4gICAgICBwcmltZSA9IGk7XG4gICAgfVxuICB9XG5cbiAgJChub2RlKS5odG1sKHByZXR0aWZ5KHByaW1lKSk7XG59XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2V4ZXJjaXNlcy9FeDMuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(1);\n/* harmony export (immutable) */ exports[\"a\"] = ex4;\n// var $ = require ('jquery');\n\n\n// Example 4: Largest Palindrome Project\nfunction ex4(node) {\n  let pal = 0;\n  let temp = 0;\n  let temp2 = 0;\n\n  for (let i = 1; i < 1000; i += 1) {\n    for (let j = 1; j < 1000; j += 1) {\n      temp = i * j;\n      temp2 = temp.toString().split('').reverse().join('');\n      if (temp.toString() === temp2 && temp > pal) {\n        pal = temp;\n      }\n    }\n  }\n\n  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__[\"a\" /* default */])(pal));\n}\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZXhlcmNpc2VzL0V4NC5qcz85YzgwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsVUFBVTtBQUMzQixtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwiZmlsZSI6IjYuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB2YXIgJCA9IHJlcXVpcmUgKCdqcXVlcnknKTtcbmltcG9ydCBwcmV0dGlmeSBmcm9tICcuLi9wcmV0dGlmeSc7XG5cbi8vIEV4YW1wbGUgNDogTGFyZ2VzdCBQYWxpbmRyb21lIFByb2plY3RcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4NChub2RlKSB7XG4gIGxldCBwYWwgPSAwO1xuICBsZXQgdGVtcCA9IDA7XG4gIGxldCB0ZW1wMiA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCAxMDAwOyBpICs9IDEpIHtcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8IDEwMDA7IGogKz0gMSkge1xuICAgICAgdGVtcCA9IGkgKiBqO1xuICAgICAgdGVtcDIgPSB0ZW1wLnRvU3RyaW5nKCkuc3BsaXQoJycpLnJldmVyc2UoKS5qb2luKCcnKTtcbiAgICAgIGlmICh0ZW1wLnRvU3RyaW5nKCkgPT09IHRlbXAyICYmIHRlbXAgPiBwYWwpIHtcbiAgICAgICAgcGFsID0gdGVtcDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAkKG5vZGUpLmh0bWwocHJldHRpZnkocGFsKSk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9leGVyY2lzZXMvRXg0LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(1);\n/* harmony export (immutable) */ exports[\"a\"] = ex5;\n// var $ = require ('jquery');\n\n\n// Example 5: Smallest number divisible by 1,...,20.\nfunction ex5(node) {\n  const N = 20;\n  let done = false;\n  let cur = 2;\n  let temp = 2;\n\n  while (!done) {\n    if (temp > N) {\n      done = true;\n    } else if (cur % temp === 0) {\n      temp += 1;\n    } else {\n      temp = 2;\n      cur += 1;\n    }\n  }\n  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__[\"a\" /* default */])(cur));\n}\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZXhlcmNpc2VzL0V4NS5qcz9jNDNjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiNy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHZhciAkID0gcmVxdWlyZSAoJ2pxdWVyeScpO1xuaW1wb3J0IHByZXR0aWZ5IGZyb20gJy4uL3ByZXR0aWZ5JztcblxuLy8gRXhhbXBsZSA1OiBTbWFsbGVzdCBudW1iZXIgZGl2aXNpYmxlIGJ5IDEsLi4uLDIwLlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXg1KG5vZGUpIHtcbiAgY29uc3QgTiA9IDIwO1xuICBsZXQgZG9uZSA9IGZhbHNlO1xuICBsZXQgY3VyID0gMjtcbiAgbGV0IHRlbXAgPSAyO1xuXG4gIHdoaWxlICghZG9uZSkge1xuICAgIGlmICh0ZW1wID4gTikge1xuICAgICAgZG9uZSA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChjdXIgJSB0ZW1wID09PSAwKSB7XG4gICAgICB0ZW1wICs9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRlbXAgPSAyO1xuICAgICAgY3VyICs9IDE7XG4gICAgfVxuICB9XG4gICQobm9kZSkuaHRtbChwcmV0dGlmeShjdXIpKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2V4ZXJjaXNlcy9FeDUuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prettify__ = __webpack_require__(1);\n/* harmony export (immutable) */ exports[\"a\"] = ex6;\n// var $ = require ('jquery');\n\n\n// Example 6: Sum and squares\nfunction ex6(node) {\n  const N = 100;\n  const sumsq = Math.pow((N / 2) * (N + 1), 2);\n  let sqsum = 0;\n  for (let i = 1; i <= 100; i += 1) {\n    sqsum += Math.pow(i, 2);\n  }\n\n  $(node).html(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__prettify__[\"a\" /* default */])(sumsq - sqsum));\n}\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvZXhlcmNpc2VzL0V4Ni5qcz9hMmZhIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixVQUFVO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiI4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdmFyICQgPSByZXF1aXJlICgnanF1ZXJ5Jyk7XG5pbXBvcnQgcHJldHRpZnkgZnJvbSAnLi4vcHJldHRpZnknO1xuXG4vLyBFeGFtcGxlIDY6IFN1bSBhbmQgc3F1YXJlc1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXg2KG5vZGUpIHtcbiAgY29uc3QgTiA9IDEwMDtcbiAgY29uc3Qgc3Vtc3EgPSBNYXRoLnBvdygoTiAvIDIpICogKE4gKyAxKSwgMik7XG4gIGxldCBzcXN1bSA9IDA7XG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IDEwMDsgaSArPSAxKSB7XG4gICAgc3FzdW0gKz0gTWF0aC5wb3coaSwgMik7XG4gIH1cblxuICAkKG5vZGUpLmh0bWwocHJldHRpZnkoc3Vtc3EgLSBzcXN1bSkpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvZXhlcmNpc2VzL0V4Ni5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("const questionTemplate = '<p class = \"example\"><strong>Example #<%= num %></strong>: <%= title %> </p>' +\n    '<p>Answer: <span id=\"answer_<%= num %>\"></span></p>' +\n    '<input id=\"b-<%= num %>\" type=\"button\" value=\"Answer the question.\" />';\n\n/* harmony default export */ exports[\"a\"] = questionTemplate;\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvdGVtcGxhdGUuanM/OGUzNSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiOS5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHF1ZXN0aW9uVGVtcGxhdGUgPSAnPHAgY2xhc3MgPSBcImV4YW1wbGVcIj48c3Ryb25nPkV4YW1wbGUgIzwlPSBudW0gJT48L3N0cm9uZz46IDwlPSB0aXRsZSAlPiA8L3A+JyArXG4gICAgJzxwPkFuc3dlcjogPHNwYW4gaWQ9XCJhbnN3ZXJfPCU9IG51bSAlPlwiPjwvc3Bhbj48L3A+JyArXG4gICAgJzxpbnB1dCBpZD1cImItPCU9IG51bSAlPlwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIkFuc3dlciB0aGUgcXVlc3Rpb24uXCIgLz4nO1xuXG5leHBvcnQgZGVmYXVsdCBxdWVzdGlvblRlbXBsYXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvdGVtcGxhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 10 */
/***/ function(module, exports) {

eval("module.exports = _;//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJfXCI/YjNiOSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIxMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIl9cIlxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__exercises_Ex1__ = __webpack_require__(3);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__exercises_Ex2__ = __webpack_require__(4);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__exercises_Ex3__ = __webpack_require__(5);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__exercises_Ex4__ = __webpack_require__(6);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__exercises_Ex5__ = __webpack_require__(7);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__exercises_Ex6__ = __webpack_require__(8);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__template__ = __webpack_require__(9);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__data__ = __webpack_require__(2);\n// Get the functions\n\n\n\n\n\n\n\n// Get the data for the questions\n\n\n\n// Load lodash.  Not necessary because of webpack plugin settings.\nconst _ = __webpack_require__(10);\n// Load jquery.  Not necessary because of webpack plugin settings.\nconst $ = __webpack_require__(0);\n// Global variable used to hold the exercises\nconst ex = {};\n\n// Place functions in global variable\nex.ex1 = __WEBPACK_IMPORTED_MODULE_0__exercises_Ex1__[\"a\" /* default */];\nex.ex2 = __WEBPACK_IMPORTED_MODULE_1__exercises_Ex2__[\"a\" /* default */];\nex.ex3 = __WEBPACK_IMPORTED_MODULE_2__exercises_Ex3__[\"a\" /* default */];\nex.ex4 = __WEBPACK_IMPORTED_MODULE_3__exercises_Ex4__[\"a\" /* default */];\nex.ex5 = __WEBPACK_IMPORTED_MODULE_4__exercises_Ex5__[\"a\" /* default */];\nex.ex6 = __WEBPACK_IMPORTED_MODULE_5__exercises_Ex6__[\"a\" /* default */];\n\n// Render the questions\nconst template = _.template(__WEBPACK_IMPORTED_MODULE_6__template__[\"a\" /* default */]);\n\n_.forEach(__WEBPACK_IMPORTED_MODULE_7__data__[\"a\" /* default */], (el, i) => {\n  $('#main').append(template({ num: i + 1, title: el }));\n});\n\n// Attach the function to the button\nconst inputs = $('input');\n\n_.forEach(inputs, (el) => {\n  const num = parseInt(/[0-9]+/.exec(el.id), 10);\n\n  $(el).click(() => {\n    ex[`ex${num}`]($(`#answer_${num}`));\n  });\n});\n\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXguanM/OGUwNiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsd0JBQXdCO0FBQ3RELENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxJQUFJLGdCQUFnQixJQUFJO0FBQ3BDLEdBQUc7QUFDSCxDQUFDIiwiZmlsZSI6IjExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gR2V0IHRoZSBmdW5jdGlvbnNcbmltcG9ydCBleDEgZnJvbSAnLi9leGVyY2lzZXMvRXgxJztcbmltcG9ydCBleDIgZnJvbSAnLi9leGVyY2lzZXMvRXgyJztcbmltcG9ydCBleDMgZnJvbSAnLi9leGVyY2lzZXMvRXgzJztcbmltcG9ydCBleDQgZnJvbSAnLi9leGVyY2lzZXMvRXg0JztcbmltcG9ydCBleDUgZnJvbSAnLi9leGVyY2lzZXMvRXg1JztcbmltcG9ydCBleDYgZnJvbSAnLi9leGVyY2lzZXMvRXg2JztcblxuLy8gR2V0IHRoZSBkYXRhIGZvciB0aGUgcXVlc3Rpb25zXG5pbXBvcnQgcXVlc3Rpb25UZW1wbGF0ZSBmcm9tICcuL3RlbXBsYXRlJztcbmltcG9ydCBxdWVzdGlvbnMgZnJvbSAnLi9kYXRhJztcblxuLy8gTG9hZCBsb2Rhc2guICBOb3QgbmVjZXNzYXJ5IGJlY2F1c2Ugb2Ygd2VicGFjayBwbHVnaW4gc2V0dGluZ3MuXG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJyk7XG4vLyBMb2FkIGpxdWVyeS4gIE5vdCBuZWNlc3NhcnkgYmVjYXVzZSBvZiB3ZWJwYWNrIHBsdWdpbiBzZXR0aW5ncy5cbmNvbnN0ICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbi8vIEdsb2JhbCB2YXJpYWJsZSB1c2VkIHRvIGhvbGQgdGhlIGV4ZXJjaXNlc1xuY29uc3QgZXggPSB7fTtcblxuLy8gUGxhY2UgZnVuY3Rpb25zIGluIGdsb2JhbCB2YXJpYWJsZVxuZXguZXgxID0gZXgxO1xuZXguZXgyID0gZXgyO1xuZXguZXgzID0gZXgzO1xuZXguZXg0ID0gZXg0O1xuZXguZXg1ID0gZXg1O1xuZXguZXg2ID0gZXg2O1xuXG4vLyBSZW5kZXIgdGhlIHF1ZXN0aW9uc1xuY29uc3QgdGVtcGxhdGUgPSBfLnRlbXBsYXRlKHF1ZXN0aW9uVGVtcGxhdGUpO1xuXG5fLmZvckVhY2gocXVlc3Rpb25zLCAoZWwsIGkpID0+IHtcbiAgJCgnI21haW4nKS5hcHBlbmQodGVtcGxhdGUoeyBudW06IGkgKyAxLCB0aXRsZTogZWwgfSkpO1xufSk7XG5cbi8vIEF0dGFjaCB0aGUgZnVuY3Rpb24gdG8gdGhlIGJ1dHRvblxuY29uc3QgaW5wdXRzID0gJCgnaW5wdXQnKTtcblxuXy5mb3JFYWNoKGlucHV0cywgKGVsKSA9PiB7XG4gIGNvbnN0IG51bSA9IHBhcnNlSW50KC9bMC05XSsvLmV4ZWMoZWwuaWQpLCAxMCk7XG5cbiAgJChlbCkuY2xpY2soKCkgPT4ge1xuICAgIGV4W2BleCR7bnVtfWBdKCQoYCNhbnN3ZXJfJHtudW19YCkpO1xuICB9KTtcbn0pO1xuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ]);
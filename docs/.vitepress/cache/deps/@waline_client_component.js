import {
  Fragment,
  computed,
  createBaseVNode,
  createBlock,
  createCommentVNode,
  createElementBlock,
  createTextVNode,
  createVNode,
  customRef,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  h,
  inject,
  isRef,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onBeforeUnmount,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  provide,
  reactive,
  readonly,
  ref,
  renderList,
  resolveComponent,
  shallowReadonly,
  shallowRef,
  toDisplayString,
  toRef,
  toValue,
  unref,
  useTemplateRef,
  vModelDynamic,
  vModelText,
  vShow,
  watch,
  withDirectives
} from "./chunk-JAPIL3UL.js";
import {
  __commonJS,
  __toESM
} from "./chunk-5WRI5ZAA.js";

// node_modules/recaptcha-v3/dist/ReCaptchaInstance.js
var require_ReCaptchaInstance = __commonJS({
  "node_modules/recaptcha-v3/dist/ReCaptchaInstance.js"(exports) {
    "use strict";
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P2, generator) {
      function adopt(value) {
        return value instanceof P2 ? value : new P2(function(resolve) {
          resolve(value);
        });
      }
      return new (P2 || (P2 = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e2) {
            reject(e2);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e2) {
            reject(e2);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _2 = { label: 0, sent: function() {
        if (t2[0] & 1) throw t2[1];
        return t2[1];
      }, trys: [], ops: [] }, f, y3, t2, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n2) {
        return function(v2) {
          return step([n2, v2]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_2 = 0)), _2) try {
          if (f = 1, y3 && (t2 = op[0] & 2 ? y3["return"] : op[0] ? y3["throw"] || ((t2 = y3["return"]) && t2.call(y3), 0) : y3.next) && !(t2 = t2.call(y3, op[1])).done) return t2;
          if (y3 = 0, t2) op = [op[0] & 2, t2.value];
          switch (op[0]) {
            case 0:
            case 1:
              t2 = op;
              break;
            case 4:
              _2.label++;
              return { value: op[1], done: false };
            case 5:
              _2.label++;
              y3 = op[1];
              op = [0];
              continue;
            case 7:
              op = _2.ops.pop();
              _2.trys.pop();
              continue;
            default:
              if (!(t2 = _2.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _2 = 0;
                continue;
              }
              if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                _2.label = op[1];
                break;
              }
              if (op[0] === 6 && _2.label < t2[1]) {
                _2.label = t2[1];
                t2 = op;
                break;
              }
              if (t2 && _2.label < t2[2]) {
                _2.label = t2[2];
                _2.ops.push(op);
                break;
              }
              if (t2[2]) _2.ops.pop();
              _2.trys.pop();
              continue;
          }
          op = body.call(thisArg, _2);
        } catch (e2) {
          op = [6, e2];
          y3 = 0;
        } finally {
          f = t2 = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReCaptchaInstance = void 0;
    var ReCaptchaInstance = (function() {
      function ReCaptchaInstance2(siteKey, recaptchaID, recaptcha) {
        this.siteKey = siteKey;
        this.recaptchaID = recaptchaID;
        this.recaptcha = recaptcha;
        this.styleContainer = null;
      }
      ReCaptchaInstance2.prototype.execute = function(action) {
        return __awaiter(this, void 0, void 0, function() {
          var _a2;
          return __generator(this, function(_b) {
            switch (_b.label) {
              case 0:
                if (!this.recaptcha.enterprise) return [3, 2];
                return [4, this.recaptcha.enterprise.execute(this.recaptchaID, { action })];
              case 1:
                _a2 = _b.sent();
                return [3, 4];
              case 2:
                return [4, this.recaptcha.execute(this.recaptchaID, { action })];
              case 3:
                _a2 = _b.sent();
                _b.label = 4;
              case 4:
                return [2, _a2];
            }
          });
        });
      };
      ReCaptchaInstance2.prototype.getSiteKey = function() {
        return this.siteKey;
      };
      ReCaptchaInstance2.prototype.hideBadge = function() {
        if (this.styleContainer !== null) {
          return;
        }
        this.styleContainer = document.createElement("style");
        this.styleContainer.innerHTML = ".grecaptcha-badge{visibility:hidden !important;}";
        document.head.appendChild(this.styleContainer);
      };
      ReCaptchaInstance2.prototype.showBadge = function() {
        if (this.styleContainer === null) {
          return;
        }
        document.head.removeChild(this.styleContainer);
        this.styleContainer = null;
      };
      return ReCaptchaInstance2;
    })();
    exports.ReCaptchaInstance = ReCaptchaInstance;
  }
});

// node_modules/recaptcha-v3/dist/ReCaptchaLoader.js
var require_ReCaptchaLoader = __commonJS({
  "node_modules/recaptcha-v3/dist/ReCaptchaLoader.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t2) {
        for (var s2, i = 1, n2 = arguments.length; i < n2; i++) {
          s2 = arguments[i];
          for (var p2 in s2) if (Object.prototype.hasOwnProperty.call(s2, p2))
            t2[p2] = s2[p2];
        }
        return t2;
      };
      return __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getInstance = exports.load = void 0;
    var ReCaptchaInstance_1 = require_ReCaptchaInstance();
    var ELoadingState;
    (function(ELoadingState2) {
      ELoadingState2[ELoadingState2["NOT_LOADED"] = 0] = "NOT_LOADED";
      ELoadingState2[ELoadingState2["LOADING"] = 1] = "LOADING";
      ELoadingState2[ELoadingState2["LOADED"] = 2] = "LOADED";
    })(ELoadingState || (ELoadingState = {}));
    var ReCaptchaLoader = (function() {
      function ReCaptchaLoader2() {
      }
      ReCaptchaLoader2.load = function(siteKey, options) {
        if (options === void 0) {
          options = {};
        }
        if (typeof document === "undefined") {
          return Promise.reject(new Error("This is a library for the browser!"));
        }
        if (ReCaptchaLoader2.getLoadingState() === ELoadingState.LOADED) {
          if (ReCaptchaLoader2.instance.getSiteKey() === siteKey) {
            return Promise.resolve(ReCaptchaLoader2.instance);
          } else {
            return Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
          }
        }
        if (ReCaptchaLoader2.getLoadingState() === ELoadingState.LOADING) {
          if (siteKey !== ReCaptchaLoader2.instanceSiteKey) {
            return Promise.reject(new Error("reCAPTCHA already loaded with different site key!"));
          }
          return new Promise(function(resolve, reject) {
            ReCaptchaLoader2.successfulLoadingConsumers.push(function(instance) {
              return resolve(instance);
            });
            ReCaptchaLoader2.errorLoadingRunnable.push(function(reason) {
              return reject(reason);
            });
          });
        }
        ReCaptchaLoader2.instanceSiteKey = siteKey;
        ReCaptchaLoader2.setLoadingState(ELoadingState.LOADING);
        var loader = new ReCaptchaLoader2();
        return new Promise(function(resolve, reject) {
          loader.loadScript(siteKey, options.useRecaptchaNet || false, options.useEnterprise || false, options.renderParameters ? options.renderParameters : {}, options.customUrl).then(function() {
            ReCaptchaLoader2.setLoadingState(ELoadingState.LOADED);
            var widgetID = loader.doExplicitRender(grecaptcha, siteKey, options.explicitRenderParameters ? options.explicitRenderParameters : {}, options.useEnterprise || false);
            var instance = new ReCaptchaInstance_1.ReCaptchaInstance(siteKey, widgetID, grecaptcha);
            ReCaptchaLoader2.successfulLoadingConsumers.forEach(function(v2) {
              return v2(instance);
            });
            ReCaptchaLoader2.successfulLoadingConsumers = [];
            if (options.autoHideBadge) {
              instance.hideBadge();
            }
            ReCaptchaLoader2.instance = instance;
            resolve(instance);
          }).catch(function(error) {
            ReCaptchaLoader2.errorLoadingRunnable.forEach(function(v2) {
              return v2(error);
            });
            ReCaptchaLoader2.errorLoadingRunnable = [];
            reject(error);
          });
        });
      };
      ReCaptchaLoader2.getInstance = function() {
        return ReCaptchaLoader2.instance;
      };
      ReCaptchaLoader2.setLoadingState = function(state) {
        ReCaptchaLoader2.loadingState = state;
      };
      ReCaptchaLoader2.getLoadingState = function() {
        if (ReCaptchaLoader2.loadingState === null) {
          return ELoadingState.NOT_LOADED;
        } else {
          return ReCaptchaLoader2.loadingState;
        }
      };
      ReCaptchaLoader2.prototype.loadScript = function(siteKey, useRecaptchaNet, useEnterprise, renderParameters, customUrl) {
        var _this = this;
        if (useRecaptchaNet === void 0) {
          useRecaptchaNet = false;
        }
        if (useEnterprise === void 0) {
          useEnterprise = false;
        }
        if (renderParameters === void 0) {
          renderParameters = {};
        }
        if (customUrl === void 0) {
          customUrl = "";
        }
        var scriptElement = document.createElement("script");
        scriptElement.setAttribute("recaptcha-v3-script", "");
        scriptElement.setAttribute("async", "");
        scriptElement.setAttribute("defer", "");
        var scriptBase = "https://www.google.com/recaptcha/api.js";
        if (useRecaptchaNet) {
          if (useEnterprise) {
            scriptBase = "https://recaptcha.net/recaptcha/enterprise.js";
          } else {
            scriptBase = "https://recaptcha.net/recaptcha/api.js";
          }
        } else if (useEnterprise) {
          scriptBase = "https://www.google.com/recaptcha/enterprise.js";
        }
        if (customUrl) {
          scriptBase = customUrl;
        }
        if (renderParameters.render) {
          renderParameters.render = void 0;
        }
        var parametersQuery = this.buildQueryString(renderParameters);
        scriptElement.src = scriptBase + "?render=explicit" + parametersQuery;
        return new Promise(function(resolve, reject) {
          scriptElement.addEventListener("load", _this.waitForScriptToLoad(function() {
            resolve(scriptElement);
          }, useEnterprise), false);
          scriptElement.onerror = function(error) {
            ReCaptchaLoader2.setLoadingState(ELoadingState.NOT_LOADED);
            reject(error);
          };
          document.head.appendChild(scriptElement);
        });
      };
      ReCaptchaLoader2.prototype.buildQueryString = function(parameters) {
        var parameterKeys = Object.keys(parameters);
        if (parameterKeys.length < 1) {
          return "";
        }
        return "&" + Object.keys(parameters).filter(function(parameterKey) {
          return !!parameters[parameterKey];
        }).map(function(parameterKey) {
          return parameterKey + "=" + parameters[parameterKey];
        }).join("&");
      };
      ReCaptchaLoader2.prototype.waitForScriptToLoad = function(callback, useEnterprise) {
        var _this = this;
        return function() {
          if (window.grecaptcha === void 0) {
            setTimeout(function() {
              _this.waitForScriptToLoad(callback, useEnterprise);
            }, ReCaptchaLoader2.SCRIPT_LOAD_DELAY);
          } else {
            if (useEnterprise) {
              window.grecaptcha.enterprise.ready(function() {
                callback();
              });
            } else {
              window.grecaptcha.ready(function() {
                callback();
              });
            }
          }
        };
      };
      ReCaptchaLoader2.prototype.doExplicitRender = function(grecaptcha2, siteKey, parameters, isEnterprise) {
        var augmentedParameters = __assign({ sitekey: siteKey }, parameters);
        if (parameters.container) {
          if (isEnterprise) {
            return grecaptcha2.enterprise.render(parameters.container, augmentedParameters);
          } else {
            return grecaptcha2.render(parameters.container, augmentedParameters);
          }
        } else {
          if (isEnterprise) {
            return grecaptcha2.enterprise.render(augmentedParameters);
          } else {
            return grecaptcha2.render(augmentedParameters);
          }
        }
      };
      ReCaptchaLoader2.loadingState = null;
      ReCaptchaLoader2.instance = null;
      ReCaptchaLoader2.instanceSiteKey = null;
      ReCaptchaLoader2.successfulLoadingConsumers = [];
      ReCaptchaLoader2.errorLoadingRunnable = [];
      ReCaptchaLoader2.SCRIPT_LOAD_DELAY = 25;
      return ReCaptchaLoader2;
    })();
    exports.load = ReCaptchaLoader.load;
    exports.getInstance = ReCaptchaLoader.getInstance;
  }
});

// node_modules/recaptcha-v3/dist/ReCaptcha.js
var require_ReCaptcha = __commonJS({
  "node_modules/recaptcha-v3/dist/ReCaptcha.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReCaptchaInstance = exports.getInstance = exports.load = void 0;
    var ReCaptchaLoader_1 = require_ReCaptchaLoader();
    Object.defineProperty(exports, "load", { enumerable: true, get: function() {
      return ReCaptchaLoader_1.load;
    } });
    Object.defineProperty(exports, "getInstance", { enumerable: true, get: function() {
      return ReCaptchaLoader_1.getInstance;
    } });
    var ReCaptchaInstance_1 = require_ReCaptchaInstance();
    Object.defineProperty(exports, "ReCaptchaInstance", { enumerable: true, get: function() {
      return ReCaptchaInstance_1.ReCaptchaInstance;
    } });
  }
});

// node_modules/@waline/client/node_modules/@vueuse/shared/dist/index.js
function tryOnScopeDispose(fn2, failSilently) {
  if (getCurrentScope()) {
    onScopeDispose(fn2, failSilently);
    return true;
  }
  return false;
}
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
var isWorker = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var toString = Object.prototype.toString;
var isObject = (val) => toString.call(val) === "[object Object]";
var noop = () => {
};
var isIOS = getIsIOS();
function getIsIOS() {
  var _window, _window2, _window3;
  return isClient && ((_window = window) === null || _window === void 0 || (_window = _window.navigator) === null || _window === void 0 ? void 0 : _window.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_window2 = window) === null || _window2 === void 0 || (_window2 = _window2.navigator) === null || _window2 === void 0 ? void 0 : _window2.maxTouchPoints) > 2 && /iPad|Macintosh/.test((_window3 = window) === null || _window3 === void 0 ? void 0 : _window3.navigator.userAgent));
}
function toRef2(...args) {
  if (args.length !== 1) return toRef(...args);
  const r2 = args[0];
  return typeof r2 === "function" ? readonly(customRef(() => ({
    get: r2,
    set: noop
  }))) : ref(r2);
}
function createFilterWrapper(filter, fn2) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn2.apply(this, args), {
        fn: fn2,
        thisArg: this,
        args
      })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
var bypassFilter = (invoke$1) => {
  return invoke$1();
};
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer$1) => {
    clearTimeout(timer$1);
    lastRejector();
    lastRejector = noop;
  };
  let lastInvoker;
  const filter = (invoke$1) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer) _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = void 0;
      }
      return Promise.resolve(invoke$1());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      lastInvoker = invoke$1;
      if (maxDuration && !maxTimer) maxTimer = setTimeout(() => {
        if (timer) _clearTimeout(timer);
        maxTimer = void 0;
        resolve(lastInvoker());
      }, maxDuration);
      timer = setTimeout(() => {
        if (maxTimer) _clearTimeout(maxTimer);
        maxTimer = void 0;
        resolve(invoke$1());
      }, duration);
    });
  };
  return filter;
}
function pausableFilter(extendFilter = bypassFilter, options = {}) {
  const { initialState = "active" } = options;
  const isActive = toRef2(initialState === "active");
  function pause() {
    isActive.value = false;
  }
  function resume() {
    isActive.value = true;
  }
  const eventFilter = (...args) => {
    if (isActive.value) extendFilter(...args);
  };
  return {
    isActive: readonly(isActive),
    pause,
    resume,
    eventFilter
  };
}
function identity(arg) {
  return arg;
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function cacheStringFunction(fn2) {
  const cache = /* @__PURE__ */ Object.create(null);
  return ((str) => {
    return cache[str] || (cache[str] = fn2(str));
  });
}
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
function getLifeCycleTarget(target) {
  return target || getCurrentInstance();
}
function useDebounceFn(fn2, ms = 200, options = {}) {
  return createFilterWrapper(debounceFilter(ms, options), fn2);
}
function watchWithFilter(source, cb, options = {}) {
  const { eventFilter = bypassFilter, ...watchOptions } = options;
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions);
}
function watchPausable(source, cb, options = {}) {
  const { eventFilter: filter, initialState = "active", ...watchOptions } = options;
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter, { initialState });
  return {
    stop: watchWithFilter(source, cb, {
      ...watchOptions,
      eventFilter
    }),
    pause,
    resume,
    isActive
  };
}
var pausableWatch = watchPausable;
function tryOnMounted(fn2, sync = true, target) {
  if (getLifeCycleTarget(target)) onMounted(fn2, target);
  else if (sync) fn2();
  else nextTick(fn2);
}
function tryOnUnmounted(fn2, target) {
  if (getLifeCycleTarget(target)) onUnmounted(fn2, target);
}
function useIntervalFn(cb, interval = 1e3, options = {}) {
  const { immediate = true, immediateCallback = false } = options;
  let timer = null;
  const isActive = shallowRef(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    const intervalValue = toValue(interval);
    if (intervalValue <= 0) return;
    isActive.value = true;
    if (immediateCallback) cb();
    clean();
    if (isActive.value) timer = setInterval(cb, intervalValue);
  }
  if (immediate && isClient) resume();
  if (isRef(interval) || typeof interval === "function") tryOnScopeDispose(watch(interval, () => {
    if (isActive.value && isClient) resume();
  }));
  tryOnScopeDispose(pause);
  return {
    isActive: shallowReadonly(isActive),
    pause,
    resume
  };
}
function watchImmediate(source, cb, options) {
  return watch(source, cb, {
    ...options,
    immediate: true
  });
}

// node_modules/@waline/client/node_modules/@vueuse/core/dist/index.js
var defaultWindow = isClient ? window : void 0;
var defaultDocument = isClient ? window.document : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
var defaultLocation = isClient ? window.location : void 0;
function unrefElement(elRef) {
  var _$el;
  const plain = toValue(elRef);
  return (_$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _$el !== void 0 ? _$el : plain;
}
function useEventListener(...args) {
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn2) => fn2());
    cleanups.length = 0;
  };
  const register = (el2, event, listener, options) => {
    el2.addEventListener(event, listener, options);
    return () => el2.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter((e2) => e2 != null);
    return test.every((e2) => typeof e2 !== "string") ? test : void 0;
  });
  const stopWatch = watchImmediate(() => {
    var _firstParamTargets$va, _firstParamTargets$va2;
    return [
      (_firstParamTargets$va = (_firstParamTargets$va2 = firstParamTargets.value) === null || _firstParamTargets$va2 === void 0 ? void 0 : _firstParamTargets$va2.map((e2) => unrefElement(e2))) !== null && _firstParamTargets$va !== void 0 ? _firstParamTargets$va : [defaultWindow].filter((e2) => e2 != null),
      toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
      toArray(unref(firstParamTargets.value ? args[2] : args[1])),
      toValue(firstParamTargets.value ? args[3] : args[2])
    ];
  }, ([raw_targets, raw_events, raw_listeners, raw_options]) => {
    cleanup();
    if (!(raw_targets === null || raw_targets === void 0 ? void 0 : raw_targets.length) || !(raw_events === null || raw_events === void 0 ? void 0 : raw_events.length) || !(raw_listeners === null || raw_listeners === void 0 ? void 0 : raw_listeners.length)) return;
    const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
    cleanups.push(...raw_targets.flatMap((el2) => raw_events.flatMap((event) => raw_listeners.map((listener) => register(el2, event, listener, optionsClone)))));
  }, { flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(cleanup);
  return stop;
}
function useRafFn(fn2, options = {}) {
  const { immediate = true, fpsLimit = void 0, window: window$1 = defaultWindow, once = false } = options;
  const isActive = shallowRef(false);
  const intervalLimit = computed(() => {
    return fpsLimit ? 1e3 / toValue(fpsLimit) : null;
  });
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp$1) {
    if (!isActive.value || !window$1) return;
    if (!previousFrameTimestamp) previousFrameTimestamp = timestamp$1;
    const delta = timestamp$1 - previousFrameTimestamp;
    if (intervalLimit.value && delta < intervalLimit.value) {
      rafId = window$1.requestAnimationFrame(loop);
      return;
    }
    previousFrameTimestamp = timestamp$1;
    fn2({
      delta,
      timestamp: timestamp$1
    });
    if (once) {
      isActive.value = false;
      rafId = null;
      return;
    }
    rafId = window$1.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window$1) {
      isActive.value = true;
      previousFrameTimestamp = 0;
      rafId = window$1.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window$1) {
      window$1.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate) resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly(isActive),
    pause,
    resume
  };
}
var ssrWidthSymbol = Symbol("vueuse-ssr-width");
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global)) _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function getSSRHandler(key, fallback) {
  return handlers[key] || fallback;
}
function guessSerializerType(rawInit) {
  return rawInit == null ? "any" : rawInit instanceof Set ? "set" : rawInit instanceof Map ? "map" : rawInit instanceof Date ? "date" : typeof rawInit === "boolean" ? "boolean" : typeof rawInit === "string" ? "string" : typeof rawInit === "object" ? "object" : !Number.isNaN(rawInit) ? "number" : "any";
}
var StorageSerializers = {
  boolean: {
    read: (v2) => v2 === "true",
    write: (v2) => String(v2)
  },
  object: {
    read: (v2) => JSON.parse(v2),
    write: (v2) => JSON.stringify(v2)
  },
  number: {
    read: (v2) => Number.parseFloat(v2),
    write: (v2) => String(v2)
  },
  any: {
    read: (v2) => v2,
    write: (v2) => String(v2)
  },
  string: {
    read: (v2) => v2,
    write: (v2) => String(v2)
  },
  map: {
    read: (v2) => new Map(JSON.parse(v2)),
    write: (v2) => JSON.stringify(Array.from(v2.entries()))
  },
  set: {
    read: (v2) => new Set(JSON.parse(v2)),
    write: (v2) => JSON.stringify(Array.from(v2))
  },
  date: {
    read: (v2) => new Date(v2),
    write: (v2) => v2.toISOString()
  }
};
var customStorageEventName = "vueuse-storage";
function useStorage(key, defaults$1, storage, options = {}) {
  var _options$serializer;
  const { flush = "pre", deep = true, listenToStorageChanges = true, writeDefaults = true, mergeDefaults = false, shallow, window: window$1 = defaultWindow, eventFilter, onError = (e2) => {
    console.error(e2);
  }, initOnMounted } = options;
  const data = (shallow ? shallowRef : ref)(typeof defaults$1 === "function" ? defaults$1() : defaults$1);
  const keyComputed = computed(() => toValue(key));
  if (!storage) try {
    storage = getSSRHandler("getDefaultStorage", () => defaultWindow === null || defaultWindow === void 0 ? void 0 : defaultWindow.localStorage)();
  } catch (e2) {
    onError(e2);
  }
  if (!storage) return data;
  const rawInit = toValue(defaults$1);
  const type = guessSerializerType(rawInit);
  const serializer = (_options$serializer = options.serializer) !== null && _options$serializer !== void 0 ? _options$serializer : StorageSerializers[type];
  const { pause: pauseWatch, resume: resumeWatch } = pausableWatch(data, (newValue) => write(newValue), {
    flush,
    deep,
    eventFilter
  });
  watch(keyComputed, () => update(), { flush });
  let firstMounted = false;
  const onStorageEvent = (ev) => {
    if (initOnMounted && !firstMounted) return;
    update(ev);
  };
  const onStorageCustomEvent = (ev) => {
    if (initOnMounted && !firstMounted) return;
    updateFromCustomEvent(ev);
  };
  if (window$1 && listenToStorageChanges) if (storage instanceof Storage) useEventListener(window$1, "storage", onStorageEvent, { passive: true });
  else useEventListener(window$1, customStorageEventName, onStorageCustomEvent);
  if (initOnMounted) tryOnMounted(() => {
    firstMounted = true;
    update();
  });
  else update();
  function dispatchWriteEvent(oldValue, newValue) {
    if (window$1) {
      const payload = {
        key: keyComputed.value,
        oldValue,
        newValue,
        storageArea: storage
      };
      window$1.dispatchEvent(storage instanceof Storage ? new StorageEvent("storage", payload) : new CustomEvent(customStorageEventName, { detail: payload }));
    }
  }
  function write(v2) {
    try {
      const oldValue = storage.getItem(keyComputed.value);
      if (v2 == null) {
        dispatchWriteEvent(oldValue, null);
        storage.removeItem(keyComputed.value);
      } else {
        const serialized = serializer.write(v2);
        if (oldValue !== serialized) {
          storage.setItem(keyComputed.value, serialized);
          dispatchWriteEvent(oldValue, serialized);
        }
      }
    } catch (e2) {
      onError(e2);
    }
  }
  function read(event) {
    const rawValue = event ? event.newValue : storage.getItem(keyComputed.value);
    if (rawValue == null) {
      if (writeDefaults && rawInit != null) storage.setItem(keyComputed.value, serializer.write(rawInit));
      return rawInit;
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue);
      if (typeof mergeDefaults === "function") return mergeDefaults(value, rawInit);
      else if (type === "object" && !Array.isArray(value)) return {
        ...rawInit,
        ...value
      };
      return value;
    } else if (typeof rawValue !== "string") return rawValue;
    else return serializer.read(rawValue);
  }
  function update(event) {
    if (event && event.storageArea !== storage) return;
    if (event && event.key == null) {
      data.value = rawInit;
      return;
    }
    if (event && event.key !== keyComputed.value) return;
    pauseWatch();
    try {
      const serializedData = serializer.write(data.value);
      if (event === void 0 || (event === null || event === void 0 ? void 0 : event.newValue) !== serializedData) data.value = read(event);
    } catch (e2) {
      onError(e2);
    } finally {
      if (event) nextTick(resumeWatch);
      else resumeWatch();
    }
  }
  function updateFromCustomEvent(event) {
    update(event.detail);
  }
  return data;
}
function useNow(options = {}) {
  const { controls: exposeControls = false, interval = "requestAnimationFrame", immediate = true } = options;
  const now = ref(/* @__PURE__ */ new Date());
  const update = () => now.value = /* @__PURE__ */ new Date();
  const controls = interval === "requestAnimationFrame" ? useRafFn(update, { immediate }) : useIntervalFn(update, interval, { immediate });
  if (exposeControls) return {
    now,
    ...controls
  };
  else return now;
}
var defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
var keys = Object.keys(defaultState);
function useScriptTag(src, onLoaded = noop, options = {}) {
  const { immediate = true, manual = false, type = "text/javascript", async = true, crossOrigin, referrerPolicy, noModule, defer, document: document$1 = defaultDocument, attrs = {}, nonce = void 0 } = options;
  const scriptTag = shallowRef(null);
  let _promise = null;
  const loadScript = (waitForScriptLoad) => new Promise((resolve, reject) => {
    const resolveWithElement = (el$1) => {
      scriptTag.value = el$1;
      resolve(el$1);
      return el$1;
    };
    if (!document$1) {
      resolve(false);
      return;
    }
    let shouldAppend = false;
    let el2 = document$1.querySelector(`script[src="${toValue(src)}"]`);
    if (!el2) {
      el2 = document$1.createElement("script");
      el2.type = type;
      el2.async = async;
      el2.src = toValue(src);
      if (defer) el2.defer = defer;
      if (crossOrigin) el2.crossOrigin = crossOrigin;
      if (noModule) el2.noModule = noModule;
      if (referrerPolicy) el2.referrerPolicy = referrerPolicy;
      if (nonce) el2.nonce = nonce;
      Object.entries(attrs).forEach(([name, value]) => el2 === null || el2 === void 0 ? void 0 : el2.setAttribute(name, value));
      shouldAppend = true;
    } else if (el2.hasAttribute("data-loaded")) resolveWithElement(el2);
    const listenerOptions = { passive: true };
    useEventListener(el2, "error", (event) => reject(event), listenerOptions);
    useEventListener(el2, "abort", (event) => reject(event), listenerOptions);
    useEventListener(el2, "load", () => {
      el2.setAttribute("data-loaded", "true");
      onLoaded(el2);
      resolveWithElement(el2);
    }, listenerOptions);
    if (shouldAppend) el2 = document$1.head.appendChild(el2);
    if (!waitForScriptLoad) resolveWithElement(el2);
  });
  const load = (waitForScriptLoad = true) => {
    if (!_promise) _promise = loadScript(waitForScriptLoad);
    return _promise;
  };
  const unload = () => {
    if (!document$1) return;
    _promise = null;
    if (scriptTag.value) scriptTag.value = null;
    const el2 = document$1.querySelector(`script[src="${toValue(src)}"]`);
    if (el2) document$1.head.removeChild(el2);
  };
  if (immediate && !manual) tryOnMounted(load);
  if (!manual) tryOnUnmounted(unload);
  return {
    scriptTag,
    load,
    unload
  };
}
var _id = 0;
function useStyleTag(css, options = {}) {
  const isLoaded = shallowRef(false);
  const { document: document$1 = defaultDocument, immediate = true, manual = false, id = `vueuse_styletag_${++_id}` } = options;
  const cssRef = shallowRef(css);
  let stop = () => {
  };
  const load = () => {
    if (!document$1) return;
    const el2 = document$1.getElementById(id) || document$1.createElement("style");
    if (!el2.isConnected) {
      el2.id = id;
      if (options.nonce) el2.nonce = options.nonce;
      if (options.media) el2.media = options.media;
      document$1.head.appendChild(el2);
    }
    if (isLoaded.value) return;
    stop = watch(cssRef, (value) => {
      el2.textContent = value;
    }, { immediate: true });
    isLoaded.value = true;
  };
  const unload = () => {
    if (!document$1 || !isLoaded.value) return;
    stop();
    document$1.head.removeChild(document$1.getElementById(id));
    isLoaded.value = false;
  };
  if (immediate && !manual) tryOnMounted(load);
  if (!manual) tryOnScopeDispose(unload);
  return {
    id,
    css: cssRef,
    unload,
    load,
    isLoaded: readonly(isLoaded)
  };
}
var DEFAULT_UNITS = [
  {
    max: 6e4,
    value: 1e3,
    name: "second"
  },
  {
    max: 276e4,
    value: 6e4,
    name: "minute"
  },
  {
    max: 72e6,
    value: 36e5,
    name: "hour"
  },
  {
    max: 5184e5,
    value: 864e5,
    name: "day"
  },
  {
    max: 24192e5,
    value: 6048e5,
    name: "week"
  },
  {
    max: 28512e6,
    value: 2592e6,
    name: "month"
  },
  {
    max: Number.POSITIVE_INFINITY,
    value: 31536e6,
    name: "year"
  }
];
var _TransitionPresets = {
  easeInSine: [
    0.12,
    0,
    0.39,
    0
  ],
  easeOutSine: [
    0.61,
    1,
    0.88,
    1
  ],
  easeInOutSine: [
    0.37,
    0,
    0.63,
    1
  ],
  easeInQuad: [
    0.11,
    0,
    0.5,
    0
  ],
  easeOutQuad: [
    0.5,
    1,
    0.89,
    1
  ],
  easeInOutQuad: [
    0.45,
    0,
    0.55,
    1
  ],
  easeInCubic: [
    0.32,
    0,
    0.67,
    0
  ],
  easeOutCubic: [
    0.33,
    1,
    0.68,
    1
  ],
  easeInOutCubic: [
    0.65,
    0,
    0.35,
    1
  ],
  easeInQuart: [
    0.5,
    0,
    0.75,
    0
  ],
  easeOutQuart: [
    0.25,
    1,
    0.5,
    1
  ],
  easeInOutQuart: [
    0.76,
    0,
    0.24,
    1
  ],
  easeInQuint: [
    0.64,
    0,
    0.78,
    0
  ],
  easeOutQuint: [
    0.22,
    1,
    0.36,
    1
  ],
  easeInOutQuint: [
    0.83,
    0,
    0.17,
    1
  ],
  easeInExpo: [
    0.7,
    0,
    0.84,
    0
  ],
  easeOutExpo: [
    0.16,
    1,
    0.3,
    1
  ],
  easeInOutExpo: [
    0.87,
    0,
    0.13,
    1
  ],
  easeInCirc: [
    0.55,
    0,
    1,
    0.45
  ],
  easeOutCirc: [
    0,
    0.55,
    0.45,
    1
  ],
  easeInOutCirc: [
    0.85,
    0,
    0.15,
    1
  ],
  easeInBack: [
    0.36,
    0,
    0.66,
    -0.56
  ],
  easeOutBack: [
    0.34,
    1.56,
    0.64,
    1
  ],
  easeInOutBack: [
    0.68,
    -0.6,
    0.32,
    1.6
  ]
};
var TransitionPresets = Object.assign({}, { linear: identity }, _TransitionPresets);

// node_modules/@waline/api/dist/api.js
var m = { "Content-Type": "application/json" };
var s = (e2) => `${e2.replace(/\/?$/, "/")}api/`;
var c = (e2, n2 = "") => {
  if (typeof e2 == "object" && e2.errno) throw new TypeError(`${n2} failed with ${e2.errno}: ${e2.errmsg}`);
  return e2;
};
var p = ({ serverURL: e2, lang: n2, paths: o2, type: a, signal: t2 }) => fetch(`${s(e2)}article?path=${encodeURIComponent(o2.join(","))}&type=${encodeURIComponent(a.join(","))}&lang=${n2}`, { signal: t2 }).then((r2) => r2.json()).then((r2) => c(r2, "Get counter").data);
var d = ({ serverURL: e2, lang: n2, path: o2, type: a, action: t2 }) => fetch(`${s(e2)}article?lang=${n2}`, { method: "POST", headers: m, body: JSON.stringify({ path: o2, type: a, action: t2 }) }).then((r2) => r2.json()).then((r2) => c(r2, "Update counter").data);
var $ = ({ serverURL: e2, lang: n2, path: o2, page: a, pageSize: t2, sortBy: r2, signal: h3, token: i }) => {
  const l = {};
  return i && (l.Authorization = `Bearer ${i}`), fetch(`${s(e2)}comment?path=${encodeURIComponent(o2)}&pageSize=${t2}&page=${a}&lang=${n2}&sortBy=${r2}`, { signal: h3, headers: l }).then((g) => g.json()).then((g) => c(g, "Get comment data").data);
};
var u = ({ serverURL: e2, lang: n2, token: o2, comment: a }) => {
  const t2 = { "Content-Type": "application/json" };
  return o2 && (t2.Authorization = `Bearer ${o2}`), fetch(`${s(e2)}comment?lang=${n2}`, { method: "POST", headers: t2, body: JSON.stringify(a) }).then((r2) => r2.json());
};
var y = ({ serverURL: e2, lang: n2, token: o2, objectId: a }) => fetch(`${s(e2)}comment/${a}?lang=${n2}`, { method: "DELETE", headers: { Authorization: `Bearer ${o2}` } }).then((t2) => t2.json()).then((t2) => c(t2, "Delete comment"));
var U = ({ serverURL: e2, lang: n2, token: o2, objectId: a, comment: t2 }) => fetch(`${s(e2)}comment/${a}?lang=${n2}`, { method: "PUT", headers: { ...m, Authorization: `Bearer ${o2}` }, body: JSON.stringify(t2) }).then((r2) => r2.json()).then((r2) => c(r2, "Update comment"));
var R = ({ lang: e2, serverURL: n2 }) => {
  const o2 = (window.innerWidth - 450) / 2, a = (window.innerHeight - 450) / 2, t2 = window.open(`${n2.replace(/\/$/, "")}/ui/login?lng=${encodeURIComponent(e2)}`, "_blank", `width=450,height=450,left=${o2},top=${a},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
  return t2?.postMessage({ type: "TOKEN", data: null }, "*"), new Promise((r2) => {
    const h3 = ({ data: i }) => {
      !i || typeof i != "object" || i.type !== "userInfo" || i.data.token && (t2?.close(), window.removeEventListener("message", h3), r2(i.data));
    };
    window.addEventListener("message", h3);
  });
};

// node_modules/autosize/dist/autosize.esm.js
var e = /* @__PURE__ */ new Map();
function t(t2) {
  var o2 = e.get(t2);
  o2 && o2.destroy();
}
function o(t2) {
  var o2 = e.get(t2);
  o2 && o2.update();
}
var r = null;
"undefined" == typeof window ? ((r = function(e2) {
  return e2;
}).destroy = function(e2) {
  return e2;
}, r.update = function(e2) {
  return e2;
}) : ((r = function(t2, o2) {
  return t2 && Array.prototype.forEach.call(t2.length ? t2 : [t2], function(t3) {
    return (function(t4) {
      if (t4 && t4.nodeName && "TEXTAREA" === t4.nodeName && !e.has(t4)) {
        var o3, r2 = null, n2 = window.getComputedStyle(t4), i = (o3 = t4.value, function() {
          a({ testForHeightReduction: "" === o3 || !t4.value.startsWith(o3), restoreTextAlign: null }), o3 = t4.value;
        }), l = (function(o4) {
          t4.removeEventListener("autosize:destroy", l), t4.removeEventListener("autosize:update", s2), t4.removeEventListener("input", i), window.removeEventListener("resize", s2), Object.keys(o4).forEach(function(e2) {
            return t4.style[e2] = o4[e2];
          }), e.delete(t4);
        }).bind(t4, { height: t4.style.height, resize: t4.style.resize, textAlign: t4.style.textAlign, overflowY: t4.style.overflowY, overflowX: t4.style.overflowX, wordWrap: t4.style.wordWrap });
        t4.addEventListener("autosize:destroy", l), t4.addEventListener("autosize:update", s2), t4.addEventListener("input", i), window.addEventListener("resize", s2), t4.style.overflowX = "hidden", t4.style.wordWrap = "break-word", e.set(t4, { destroy: l, update: s2 }), s2();
      }
      function a(e2) {
        var o4, i2, l2 = e2.restoreTextAlign, s3 = void 0 === l2 ? null : l2, d2 = e2.testForHeightReduction, u4 = void 0 === d2 || d2, c2 = n2.overflowY;
        if (0 !== t4.scrollHeight && ("vertical" === n2.resize ? t4.style.resize = "none" : "both" === n2.resize && (t4.style.resize = "horizontal"), u4 && (o4 = (function(e3) {
          for (var t5 = []; e3 && e3.parentNode && e3.parentNode instanceof Element; ) e3.parentNode.scrollTop && t5.push([e3.parentNode, e3.parentNode.scrollTop]), e3 = e3.parentNode;
          return function() {
            return t5.forEach(function(e4) {
              var t6 = e4[0], o5 = e4[1];
              t6.style.scrollBehavior = "auto", t6.scrollTop = o5, t6.style.scrollBehavior = null;
            });
          };
        })(t4), t4.style.height = ""), i2 = "content-box" === n2.boxSizing ? t4.scrollHeight - (parseFloat(n2.paddingTop) + parseFloat(n2.paddingBottom)) : t4.scrollHeight + parseFloat(n2.borderTopWidth) + parseFloat(n2.borderBottomWidth), "none" !== n2.maxHeight && i2 > parseFloat(n2.maxHeight) ? ("hidden" === n2.overflowY && (t4.style.overflow = "scroll"), i2 = parseFloat(n2.maxHeight)) : "hidden" !== n2.overflowY && (t4.style.overflow = "hidden"), t4.style.height = i2 + "px", s3 && (t4.style.textAlign = s3), o4 && o4(), r2 !== i2 && (t4.dispatchEvent(new Event("autosize:resized", { bubbles: true })), r2 = i2), c2 !== n2.overflow && !s3)) {
          var v2 = n2.textAlign;
          "hidden" === n2.overflow && (t4.style.textAlign = "start" === v2 ? "end" : "start"), a({ restoreTextAlign: v2, testForHeightReduction: true });
        }
      }
      function s2() {
        a({ testForHeightReduction: true, restoreTextAlign: null });
      }
    })(t3);
  }), t2;
}).destroy = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], t), e2;
}, r.update = function(e2) {
  return e2 && Array.prototype.forEach.call(e2.length ? e2 : [e2], o), e2;
});
var n = r;
var autosize_esm_default = n;

// node_modules/marked/lib/marked.esm.js
function L() {
  return { async: false, breaks: false, extensions: null, gfm: true, hooks: null, pedantic: false, renderer: null, silent: false, tokenizer: null, walkTokens: null };
}
var T = L();
function G(u4) {
  T = u4;
}
var I = { exec: () => null };
function h2(u4, e2 = "") {
  let t2 = typeof u4 == "string" ? u4 : u4.source, n2 = { replace: (r2, i) => {
    let s2 = typeof i == "string" ? i : i.source;
    return s2 = s2.replace(m2.caret, "$1"), t2 = t2.replace(r2, s2), n2;
  }, getRegex: () => new RegExp(t2, e2) };
  return n2;
}
var m2 = { codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm, outputLinkReplace: /\\([\[\]])/g, indentCodeCompensation: /^(\s+)(?:```)/, beginningSpace: /^\s+/, endingHash: /#$/, startingSpaceChar: /^ /, endingSpaceChar: / $/, nonSpaceChar: /[^ ]/, newLineCharGlobal: /\n/g, tabCharGlobal: /\t/g, multipleSpaceGlobal: /\s+/g, blankLine: /^[ \t]*$/, doubleBlankLine: /\n[ \t]*\n[ \t]*$/, blockquoteStart: /^ {0,3}>/, blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g, blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm, listReplaceTabs: /^\t+/, listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g, listIsTask: /^\[[ xX]\] /, listReplaceTask: /^\[[ xX]\] +/, anyLine: /\n.*\n/, hrefBrackets: /^<(.*)>$/, tableDelimiter: /[:|]/, tableAlignChars: /^\||\| *$/g, tableRowBlankLine: /\n[ \t]*$/, tableAlignRight: /^ *-+: *$/, tableAlignCenter: /^ *:-+: *$/, tableAlignLeft: /^ *:-+ *$/, startATag: /^<a /i, endATag: /^<\/a>/i, startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i, endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i, startAngleBracket: /^</, endAngleBracket: />$/, pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/, unicodeAlphaNumeric: /[\p{L}\p{N}]/u, escapeTest: /[&<>"']/, escapeReplace: /[&<>"']/g, escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/, escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g, unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, caret: /(^|[^\[])\^/g, percentDecode: /%25/g, findPipe: /\|/g, splitPipe: / \|/, slashPipe: /\\\|/g, carriageReturn: /\r\n|\r/g, spaceLine: /^ +$/gm, notSpaceStart: /^\S*/, endingNewline: /\n$/, listItemRegex: (u4) => new RegExp(`^( {0,3}${u4})((?:[	 ][^\\n]*)?(?:\\n|$))`), nextBulletRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`), hrRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`), fencesBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}(?:\`\`\`|~~~)`), headingBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}#`), htmlBeginRegex: (u4) => new RegExp(`^ {0,${Math.min(3, u4 - 1)}}<(?:[a-z].*>|!--)`, "i") };
var be = /^(?:[ \t]*(?:\n|$))+/;
var Re = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
var Te = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
var E = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
var Oe = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
var F = /(?:[*+-]|\d{1,9}[.)])/;
var ie = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
var oe = h2(ie).replace(/bull/g, F).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
var we = h2(ie).replace(/bull/g, F).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
var j = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
var ye = /^[^\n]+/;
var Q = /(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/;
var Pe = h2(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", Q).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
var Se = h2(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, F).getRegex();
var v = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
var U2 = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
var $e = h2("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))", "i").replace("comment", U2).replace("tag", v).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
var ae = h2(j).replace("hr", E).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
var _e = h2(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ae).getRegex();
var K = { blockquote: _e, code: Re, def: Pe, fences: Te, heading: Oe, hr: E, html: $e, lheading: oe, list: Se, newline: be, paragraph: ae, table: I, text: ye };
var re = h2("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", E).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex();
var Le = { ...K, lheading: we, table: re, paragraph: h2(j).replace("hr", E).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", re).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", v).getRegex() };
var Me = { ...K, html: h2(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", U2).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(), def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/, heading: /^(#{1,6})(.*)(?:\n+|$)/, fences: I, lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/, paragraph: h2(j).replace("hr", E).replace("heading", ` *#{1,6} *[^
]`).replace("lheading", oe).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex() };
var ze = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
var Ae = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
var le = /^( {2,}|\\)\n(?!\s*$)/;
var Ie = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
var D = /[\p{P}\p{S}]/u;
var W = /[\s\p{P}\p{S}]/u;
var ue = /[^\s\p{P}\p{S}]/u;
var Ee = h2(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, W).getRegex();
var pe = /(?!~)[\p{P}\p{S}]/u;
var Ce = /(?!~)[\s\p{P}\p{S}]/u;
var Be = /(?:[^\s\p{P}\p{S}]|~)/u;
var qe = h2(/link|code|html/, "g").replace("link", new RegExp("\\[(?:[^\\[\\]`]|(?<!`)(?<a>`+)[^`]+\\k<a>(?!`))*?\\]\\((?:\\\\[\\s\\S]|[^\\\\\\(\\)]|\\((?:\\\\[\\s\\S]|[^\\\\\\(\\)])*\\))*\\)")).replace("code", new RegExp("(?<!`)(?<b>`+)[^`]+\\k<b>(?!`)")).replace("html", /<(?! )[^<>]*?>/).getRegex();
var ce = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
var ve = h2(ce, "u").replace(/punct/g, D).getRegex();
var De = h2(ce, "u").replace(/punct/g, pe).getRegex();
var he = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
var He = h2(he, "gu").replace(/notPunctSpace/g, ue).replace(/punctSpace/g, W).replace(/punct/g, D).getRegex();
var Ze = h2(he, "gu").replace(/notPunctSpace/g, Be).replace(/punctSpace/g, Ce).replace(/punct/g, pe).getRegex();
var Ge = h2("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)", "gu").replace(/notPunctSpace/g, ue).replace(/punctSpace/g, W).replace(/punct/g, D).getRegex();
var Ne = h2(/\\(punct)/, "gu").replace(/punct/g, D).getRegex();
var Fe = h2(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
var je = h2(U2).replace("(?:-->|$)", "-->").getRegex();
var Qe = h2("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", je).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
var q = /(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/;
var Ue = h2(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", q).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
var de = h2(/^!?\[(label)\]\[(ref)\]/).replace("label", q).replace("ref", Q).getRegex();
var ke = h2(/^!?\[(ref)\](?:\[\])?/).replace("ref", Q).getRegex();
var Ke = h2("reflink|nolink(?!\\()", "g").replace("reflink", de).replace("nolink", ke).getRegex();
var se = /[hH][tT][tT][pP][sS]?|[fF][tT][pP]/;
var X = { _backpedal: I, anyPunctuation: Ne, autolink: Fe, blockSkip: qe, br: le, code: Ae, del: I, emStrongLDelim: ve, emStrongRDelimAst: He, emStrongRDelimUnd: Ge, escape: ze, link: Ue, nolink: ke, punctuation: Ee, reflink: de, reflinkSearch: Ke, tag: Qe, text: Ie, url: I };
var We = { ...X, link: h2(/^!?\[(label)\]\((.*?)\)/).replace("label", q).getRegex(), reflink: h2(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", q).getRegex() };
var N = { ...X, emStrongRDelimAst: Ze, emStrongLDelim: De, url: h2(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol", se).replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(), _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/, del: /^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/, text: h2(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol", se).getRegex() };
var Xe = { ...N, br: h2(le).replace("{2,}", "*").getRegex(), text: h2(N.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex() };
var C = { normal: K, gfm: Le, pedantic: Me };
var M = { normal: X, gfm: N, breaks: Xe, pedantic: We };
var Je = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
var ge = (u4) => Je[u4];
function w(u4, e2) {
  if (e2) {
    if (m2.escapeTest.test(u4)) return u4.replace(m2.escapeReplace, ge);
  } else if (m2.escapeTestNoEncode.test(u4)) return u4.replace(m2.escapeReplaceNoEncode, ge);
  return u4;
}
function J(u4) {
  try {
    u4 = encodeURI(u4).replace(m2.percentDecode, "%");
  } catch {
    return null;
  }
  return u4;
}
function V(u4, e2) {
  let t2 = u4.replace(m2.findPipe, (i, s2, o2) => {
    let a = false, l = s2;
    for (; --l >= 0 && o2[l] === "\\"; ) a = !a;
    return a ? "|" : " |";
  }), n2 = t2.split(m2.splitPipe), r2 = 0;
  if (n2[0].trim() || n2.shift(), n2.length > 0 && !n2.at(-1)?.trim() && n2.pop(), e2) if (n2.length > e2) n2.splice(e2);
  else for (; n2.length < e2; ) n2.push("");
  for (; r2 < n2.length; r2++) n2[r2] = n2[r2].trim().replace(m2.slashPipe, "|");
  return n2;
}
function z(u4, e2, t2) {
  let n2 = u4.length;
  if (n2 === 0) return "";
  let r2 = 0;
  for (; r2 < n2; ) {
    let i = u4.charAt(n2 - r2 - 1);
    if (i === e2 && !t2) r2++;
    else if (i !== e2 && t2) r2++;
    else break;
  }
  return u4.slice(0, n2 - r2);
}
function fe(u4, e2) {
  if (u4.indexOf(e2[1]) === -1) return -1;
  let t2 = 0;
  for (let n2 = 0; n2 < u4.length; n2++) if (u4[n2] === "\\") n2++;
  else if (u4[n2] === e2[0]) t2++;
  else if (u4[n2] === e2[1] && (t2--, t2 < 0)) return n2;
  return t2 > 0 ? -2 : -1;
}
function me(u4, e2, t2, n2, r2) {
  let i = e2.href, s2 = e2.title || null, o2 = u4[1].replace(r2.other.outputLinkReplace, "$1");
  n2.state.inLink = true;
  let a = { type: u4[0].charAt(0) === "!" ? "image" : "link", raw: t2, href: i, title: s2, text: o2, tokens: n2.inlineTokens(o2) };
  return n2.state.inLink = false, a;
}
function Ve(u4, e2, t2) {
  let n2 = u4.match(t2.other.indentCodeCompensation);
  if (n2 === null) return e2;
  let r2 = n2[1];
  return e2.split(`
`).map((i) => {
    let s2 = i.match(t2.other.beginningSpace);
    if (s2 === null) return i;
    let [o2] = s2;
    return o2.length >= r2.length ? i.slice(r2.length) : i;
  }).join(`
`);
}
var y2 = class {
  options;
  rules;
  lexer;
  constructor(e2) {
    this.options = e2 || T;
  }
  space(e2) {
    let t2 = this.rules.block.newline.exec(e2);
    if (t2 && t2[0].length > 0) return { type: "space", raw: t2[0] };
  }
  code(e2) {
    let t2 = this.rules.block.code.exec(e2);
    if (t2) {
      let n2 = t2[0].replace(this.rules.other.codeRemoveIndent, "");
      return { type: "code", raw: t2[0], codeBlockStyle: "indented", text: this.options.pedantic ? n2 : z(n2, `
`) };
    }
  }
  fences(e2) {
    let t2 = this.rules.block.fences.exec(e2);
    if (t2) {
      let n2 = t2[0], r2 = Ve(n2, t2[3] || "", this.rules);
      return { type: "code", raw: n2, lang: t2[2] ? t2[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t2[2], text: r2 };
    }
  }
  heading(e2) {
    let t2 = this.rules.block.heading.exec(e2);
    if (t2) {
      let n2 = t2[2].trim();
      if (this.rules.other.endingHash.test(n2)) {
        let r2 = z(n2, "#");
        (this.options.pedantic || !r2 || this.rules.other.endingSpaceChar.test(r2)) && (n2 = r2.trim());
      }
      return { type: "heading", raw: t2[0], depth: t2[1].length, text: n2, tokens: this.lexer.inline(n2) };
    }
  }
  hr(e2) {
    let t2 = this.rules.block.hr.exec(e2);
    if (t2) return { type: "hr", raw: z(t2[0], `
`) };
  }
  blockquote(e2) {
    let t2 = this.rules.block.blockquote.exec(e2);
    if (t2) {
      let n2 = z(t2[0], `
`).split(`
`), r2 = "", i = "", s2 = [];
      for (; n2.length > 0; ) {
        let o2 = false, a = [], l;
        for (l = 0; l < n2.length; l++) if (this.rules.other.blockquoteStart.test(n2[l])) a.push(n2[l]), o2 = true;
        else if (!o2) a.push(n2[l]);
        else break;
        n2 = n2.slice(l);
        let c2 = a.join(`
`), p2 = c2.replace(this.rules.other.blockquoteSetextReplace, `
    $1`).replace(this.rules.other.blockquoteSetextReplace2, "");
        r2 = r2 ? `${r2}
${c2}` : c2, i = i ? `${i}
${p2}` : p2;
        let g = this.lexer.state.top;
        if (this.lexer.state.top = true, this.lexer.blockTokens(p2, s2, true), this.lexer.state.top = g, n2.length === 0) break;
        let d2 = s2.at(-1);
        if (d2?.type === "code") break;
        if (d2?.type === "blockquote") {
          let R2 = d2, f = R2.raw + `
` + n2.join(`
`), O = this.blockquote(f);
          s2[s2.length - 1] = O, r2 = r2.substring(0, r2.length - R2.raw.length) + O.raw, i = i.substring(0, i.length - R2.text.length) + O.text;
          break;
        } else if (d2?.type === "list") {
          let R2 = d2, f = R2.raw + `
` + n2.join(`
`), O = this.list(f);
          s2[s2.length - 1] = O, r2 = r2.substring(0, r2.length - d2.raw.length) + O.raw, i = i.substring(0, i.length - R2.raw.length) + O.raw, n2 = f.substring(s2.at(-1).raw.length).split(`
`);
          continue;
        }
      }
      return { type: "blockquote", raw: r2, tokens: s2, text: i };
    }
  }
  list(e2) {
    let t2 = this.rules.block.list.exec(e2);
    if (t2) {
      let n2 = t2[1].trim(), r2 = n2.length > 1, i = { type: "list", raw: "", ordered: r2, start: r2 ? +n2.slice(0, -1) : "", loose: false, items: [] };
      n2 = r2 ? `\\d{1,9}\\${n2.slice(-1)}` : `\\${n2}`, this.options.pedantic && (n2 = r2 ? n2 : "[*+-]");
      let s2 = this.rules.other.listItemRegex(n2), o2 = false;
      for (; e2; ) {
        let l = false, c2 = "", p2 = "";
        if (!(t2 = s2.exec(e2)) || this.rules.block.hr.test(e2)) break;
        c2 = t2[0], e2 = e2.substring(c2.length);
        let g = t2[2].split(`
`, 1)[0].replace(this.rules.other.listReplaceTabs, (H) => " ".repeat(3 * H.length)), d2 = e2.split(`
`, 1)[0], R2 = !g.trim(), f = 0;
        if (this.options.pedantic ? (f = 2, p2 = g.trimStart()) : R2 ? f = t2[1].length + 1 : (f = t2[2].search(this.rules.other.nonSpaceChar), f = f > 4 ? 1 : f, p2 = g.slice(f), f += t2[1].length), R2 && this.rules.other.blankLine.test(d2) && (c2 += d2 + `
`, e2 = e2.substring(d2.length + 1), l = true), !l) {
          let H = this.rules.other.nextBulletRegex(f), ee = this.rules.other.hrRegex(f), te = this.rules.other.fencesBeginRegex(f), ne = this.rules.other.headingBeginRegex(f), xe = this.rules.other.htmlBeginRegex(f);
          for (; e2; ) {
            let Z = e2.split(`
`, 1)[0], A;
            if (d2 = Z, this.options.pedantic ? (d2 = d2.replace(this.rules.other.listReplaceNesting, "  "), A = d2) : A = d2.replace(this.rules.other.tabCharGlobal, "    "), te.test(d2) || ne.test(d2) || xe.test(d2) || H.test(d2) || ee.test(d2)) break;
            if (A.search(this.rules.other.nonSpaceChar) >= f || !d2.trim()) p2 += `
` + A.slice(f);
            else {
              if (R2 || g.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4 || te.test(g) || ne.test(g) || ee.test(g)) break;
              p2 += `
` + d2;
            }
            !R2 && !d2.trim() && (R2 = true), c2 += Z + `
`, e2 = e2.substring(Z.length + 1), g = A.slice(f);
          }
        }
        i.loose || (o2 ? i.loose = true : this.rules.other.doubleBlankLine.test(c2) && (o2 = true));
        let O = null, Y;
        this.options.gfm && (O = this.rules.other.listIsTask.exec(p2), O && (Y = O[0] !== "[ ] ", p2 = p2.replace(this.rules.other.listReplaceTask, ""))), i.items.push({ type: "list_item", raw: c2, task: !!O, checked: Y, loose: false, text: p2, tokens: [] }), i.raw += c2;
      }
      let a = i.items.at(-1);
      if (a) a.raw = a.raw.trimEnd(), a.text = a.text.trimEnd();
      else return;
      i.raw = i.raw.trimEnd();
      for (let l = 0; l < i.items.length; l++) if (this.lexer.state.top = false, i.items[l].tokens = this.lexer.blockTokens(i.items[l].text, []), !i.loose) {
        let c2 = i.items[l].tokens.filter((g) => g.type === "space"), p2 = c2.length > 0 && c2.some((g) => this.rules.other.anyLine.test(g.raw));
        i.loose = p2;
      }
      if (i.loose) for (let l = 0; l < i.items.length; l++) i.items[l].loose = true;
      return i;
    }
  }
  html(e2) {
    let t2 = this.rules.block.html.exec(e2);
    if (t2) return { type: "html", block: true, raw: t2[0], pre: t2[1] === "pre" || t2[1] === "script" || t2[1] === "style", text: t2[0] };
  }
  def(e2) {
    let t2 = this.rules.block.def.exec(e2);
    if (t2) {
      let n2 = t2[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " "), r2 = t2[2] ? t2[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "", i = t2[3] ? t2[3].substring(1, t2[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t2[3];
      return { type: "def", tag: n2, raw: t2[0], href: r2, title: i };
    }
  }
  table(e2) {
    let t2 = this.rules.block.table.exec(e2);
    if (!t2 || !this.rules.other.tableDelimiter.test(t2[2])) return;
    let n2 = V(t2[1]), r2 = t2[2].replace(this.rules.other.tableAlignChars, "").split("|"), i = t2[3]?.trim() ? t2[3].replace(this.rules.other.tableRowBlankLine, "").split(`
`) : [], s2 = { type: "table", raw: t2[0], header: [], align: [], rows: [] };
    if (n2.length === r2.length) {
      for (let o2 of r2) this.rules.other.tableAlignRight.test(o2) ? s2.align.push("right") : this.rules.other.tableAlignCenter.test(o2) ? s2.align.push("center") : this.rules.other.tableAlignLeft.test(o2) ? s2.align.push("left") : s2.align.push(null);
      for (let o2 = 0; o2 < n2.length; o2++) s2.header.push({ text: n2[o2], tokens: this.lexer.inline(n2[o2]), header: true, align: s2.align[o2] });
      for (let o2 of i) s2.rows.push(V(o2, s2.header.length).map((a, l) => ({ text: a, tokens: this.lexer.inline(a), header: false, align: s2.align[l] })));
      return s2;
    }
  }
  lheading(e2) {
    let t2 = this.rules.block.lheading.exec(e2);
    if (t2) return { type: "heading", raw: t2[0], depth: t2[2].charAt(0) === "=" ? 1 : 2, text: t2[1], tokens: this.lexer.inline(t2[1]) };
  }
  paragraph(e2) {
    let t2 = this.rules.block.paragraph.exec(e2);
    if (t2) {
      let n2 = t2[1].charAt(t2[1].length - 1) === `
` ? t2[1].slice(0, -1) : t2[1];
      return { type: "paragraph", raw: t2[0], text: n2, tokens: this.lexer.inline(n2) };
    }
  }
  text(e2) {
    let t2 = this.rules.block.text.exec(e2);
    if (t2) return { type: "text", raw: t2[0], text: t2[0], tokens: this.lexer.inline(t2[0]) };
  }
  escape(e2) {
    let t2 = this.rules.inline.escape.exec(e2);
    if (t2) return { type: "escape", raw: t2[0], text: t2[1] };
  }
  tag(e2) {
    let t2 = this.rules.inline.tag.exec(e2);
    if (t2) return !this.lexer.state.inLink && this.rules.other.startATag.test(t2[0]) ? this.lexer.state.inLink = true : this.lexer.state.inLink && this.rules.other.endATag.test(t2[0]) && (this.lexer.state.inLink = false), !this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(t2[0]) ? this.lexer.state.inRawBlock = true : this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(t2[0]) && (this.lexer.state.inRawBlock = false), { type: "html", raw: t2[0], inLink: this.lexer.state.inLink, inRawBlock: this.lexer.state.inRawBlock, block: false, text: t2[0] };
  }
  link(e2) {
    let t2 = this.rules.inline.link.exec(e2);
    if (t2) {
      let n2 = t2[2].trim();
      if (!this.options.pedantic && this.rules.other.startAngleBracket.test(n2)) {
        if (!this.rules.other.endAngleBracket.test(n2)) return;
        let s2 = z(n2.slice(0, -1), "\\");
        if ((n2.length - s2.length) % 2 === 0) return;
      } else {
        let s2 = fe(t2[2], "()");
        if (s2 === -2) return;
        if (s2 > -1) {
          let a = (t2[0].indexOf("!") === 0 ? 5 : 4) + t2[1].length + s2;
          t2[2] = t2[2].substring(0, s2), t2[0] = t2[0].substring(0, a).trim(), t2[3] = "";
        }
      }
      let r2 = t2[2], i = "";
      if (this.options.pedantic) {
        let s2 = this.rules.other.pedanticHrefTitle.exec(r2);
        s2 && (r2 = s2[1], i = s2[3]);
      } else i = t2[3] ? t2[3].slice(1, -1) : "";
      return r2 = r2.trim(), this.rules.other.startAngleBracket.test(r2) && (this.options.pedantic && !this.rules.other.endAngleBracket.test(n2) ? r2 = r2.slice(1) : r2 = r2.slice(1, -1)), me(t2, { href: r2 && r2.replace(this.rules.inline.anyPunctuation, "$1"), title: i && i.replace(this.rules.inline.anyPunctuation, "$1") }, t2[0], this.lexer, this.rules);
    }
  }
  reflink(e2, t2) {
    let n2;
    if ((n2 = this.rules.inline.reflink.exec(e2)) || (n2 = this.rules.inline.nolink.exec(e2))) {
      let r2 = (n2[2] || n2[1]).replace(this.rules.other.multipleSpaceGlobal, " "), i = t2[r2.toLowerCase()];
      if (!i) {
        let s2 = n2[0].charAt(0);
        return { type: "text", raw: s2, text: s2 };
      }
      return me(n2, i, n2[0], this.lexer, this.rules);
    }
  }
  emStrong(e2, t2, n2 = "") {
    let r2 = this.rules.inline.emStrongLDelim.exec(e2);
    if (!r2 || r2[3] && n2.match(this.rules.other.unicodeAlphaNumeric)) return;
    if (!(r2[1] || r2[2] || "") || !n2 || this.rules.inline.punctuation.exec(n2)) {
      let s2 = [...r2[0]].length - 1, o2, a, l = s2, c2 = 0, p2 = r2[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
      for (p2.lastIndex = 0, t2 = t2.slice(-1 * e2.length + s2); (r2 = p2.exec(t2)) != null; ) {
        if (o2 = r2[1] || r2[2] || r2[3] || r2[4] || r2[5] || r2[6], !o2) continue;
        if (a = [...o2].length, r2[3] || r2[4]) {
          l += a;
          continue;
        } else if ((r2[5] || r2[6]) && s2 % 3 && !((s2 + a) % 3)) {
          c2 += a;
          continue;
        }
        if (l -= a, l > 0) continue;
        a = Math.min(a, a + l + c2);
        let g = [...r2[0]][0].length, d2 = e2.slice(0, s2 + r2.index + g + a);
        if (Math.min(s2, a) % 2) {
          let f = d2.slice(1, -1);
          return { type: "em", raw: d2, text: f, tokens: this.lexer.inlineTokens(f) };
        }
        let R2 = d2.slice(2, -2);
        return { type: "strong", raw: d2, text: R2, tokens: this.lexer.inlineTokens(R2) };
      }
    }
  }
  codespan(e2) {
    let t2 = this.rules.inline.code.exec(e2);
    if (t2) {
      let n2 = t2[2].replace(this.rules.other.newLineCharGlobal, " "), r2 = this.rules.other.nonSpaceChar.test(n2), i = this.rules.other.startingSpaceChar.test(n2) && this.rules.other.endingSpaceChar.test(n2);
      return r2 && i && (n2 = n2.substring(1, n2.length - 1)), { type: "codespan", raw: t2[0], text: n2 };
    }
  }
  br(e2) {
    let t2 = this.rules.inline.br.exec(e2);
    if (t2) return { type: "br", raw: t2[0] };
  }
  del(e2) {
    let t2 = this.rules.inline.del.exec(e2);
    if (t2) return { type: "del", raw: t2[0], text: t2[2], tokens: this.lexer.inlineTokens(t2[2]) };
  }
  autolink(e2) {
    let t2 = this.rules.inline.autolink.exec(e2);
    if (t2) {
      let n2, r2;
      return t2[2] === "@" ? (n2 = t2[1], r2 = "mailto:" + n2) : (n2 = t2[1], r2 = n2), { type: "link", raw: t2[0], text: n2, href: r2, tokens: [{ type: "text", raw: n2, text: n2 }] };
    }
  }
  url(e2) {
    let t2;
    if (t2 = this.rules.inline.url.exec(e2)) {
      let n2, r2;
      if (t2[2] === "@") n2 = t2[0], r2 = "mailto:" + n2;
      else {
        let i;
        do
          i = t2[0], t2[0] = this.rules.inline._backpedal.exec(t2[0])?.[0] ?? "";
        while (i !== t2[0]);
        n2 = t2[0], t2[1] === "www." ? r2 = "http://" + t2[0] : r2 = t2[0];
      }
      return { type: "link", raw: t2[0], text: n2, href: r2, tokens: [{ type: "text", raw: n2, text: n2 }] };
    }
  }
  inlineText(e2) {
    let t2 = this.rules.inline.text.exec(e2);
    if (t2) {
      let n2 = this.lexer.state.inRawBlock;
      return { type: "text", raw: t2[0], text: t2[0], escaped: n2 };
    }
  }
};
var x = class u2 {
  tokens;
  options;
  state;
  tokenizer;
  inlineQueue;
  constructor(e2) {
    this.tokens = [], this.tokens.links = /* @__PURE__ */ Object.create(null), this.options = e2 || T, this.options.tokenizer = this.options.tokenizer || new y2(), this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = { inLink: false, inRawBlock: false, top: true };
    let t2 = { other: m2, block: C.normal, inline: M.normal };
    this.options.pedantic ? (t2.block = C.pedantic, t2.inline = M.pedantic) : this.options.gfm && (t2.block = C.gfm, this.options.breaks ? t2.inline = M.breaks : t2.inline = M.gfm), this.tokenizer.rules = t2;
  }
  static get rules() {
    return { block: C, inline: M };
  }
  static lex(e2, t2) {
    return new u2(t2).lex(e2);
  }
  static lexInline(e2, t2) {
    return new u2(t2).inlineTokens(e2);
  }
  lex(e2) {
    e2 = e2.replace(m2.carriageReturn, `
`), this.blockTokens(e2, this.tokens);
    for (let t2 = 0; t2 < this.inlineQueue.length; t2++) {
      let n2 = this.inlineQueue[t2];
      this.inlineTokens(n2.src, n2.tokens);
    }
    return this.inlineQueue = [], this.tokens;
  }
  blockTokens(e2, t2 = [], n2 = false) {
    for (this.options.pedantic && (e2 = e2.replace(m2.tabCharGlobal, "    ").replace(m2.spaceLine, "")); e2; ) {
      let r2;
      if (this.options.extensions?.block?.some((s2) => (r2 = s2.call({ lexer: this }, e2, t2)) ? (e2 = e2.substring(r2.raw.length), t2.push(r2), true) : false)) continue;
      if (r2 = this.tokenizer.space(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s2 = t2.at(-1);
        r2.raw.length === 1 && s2 !== void 0 ? s2.raw += `
` : t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.code(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s2 = t2.at(-1);
        s2?.type === "paragraph" || s2?.type === "text" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.text, this.inlineQueue.at(-1).src = s2.text) : t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.fences(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.heading(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.hr(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.blockquote(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.list(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.html(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.def(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s2 = t2.at(-1);
        s2?.type === "paragraph" || s2?.type === "text" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.raw, this.inlineQueue.at(-1).src = s2.text) : this.tokens.links[r2.tag] || (this.tokens.links[r2.tag] = { href: r2.href, title: r2.title }, t2.push(r2));
        continue;
      }
      if (r2 = this.tokenizer.table(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      if (r2 = this.tokenizer.lheading(e2)) {
        e2 = e2.substring(r2.raw.length), t2.push(r2);
        continue;
      }
      let i = e2;
      if (this.options.extensions?.startBlock) {
        let s2 = 1 / 0, o2 = e2.slice(1), a;
        this.options.extensions.startBlock.forEach((l) => {
          a = l.call({ lexer: this }, o2), typeof a == "number" && a >= 0 && (s2 = Math.min(s2, a));
        }), s2 < 1 / 0 && s2 >= 0 && (i = e2.substring(0, s2 + 1));
      }
      if (this.state.top && (r2 = this.tokenizer.paragraph(i))) {
        let s2 = t2.at(-1);
        n2 && s2?.type === "paragraph" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s2.text) : t2.push(r2), n2 = i.length !== e2.length, e2 = e2.substring(r2.raw.length);
        continue;
      }
      if (r2 = this.tokenizer.text(e2)) {
        e2 = e2.substring(r2.raw.length);
        let s2 = t2.at(-1);
        s2?.type === "text" ? (s2.raw += (s2.raw.endsWith(`
`) ? "" : `
`) + r2.raw, s2.text += `
` + r2.text, this.inlineQueue.pop(), this.inlineQueue.at(-1).src = s2.text) : t2.push(r2);
        continue;
      }
      if (e2) {
        let s2 = "Infinite loop on byte: " + e2.charCodeAt(0);
        if (this.options.silent) {
          console.error(s2);
          break;
        } else throw new Error(s2);
      }
    }
    return this.state.top = true, t2;
  }
  inline(e2, t2 = []) {
    return this.inlineQueue.push({ src: e2, tokens: t2 }), t2;
  }
  inlineTokens(e2, t2 = []) {
    let n2 = e2, r2 = null;
    if (this.tokens.links) {
      let o2 = Object.keys(this.tokens.links);
      if (o2.length > 0) for (; (r2 = this.tokenizer.rules.inline.reflinkSearch.exec(n2)) != null; ) o2.includes(r2[0].slice(r2[0].lastIndexOf("[") + 1, -1)) && (n2 = n2.slice(0, r2.index) + "[" + "a".repeat(r2[0].length - 2) + "]" + n2.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
    }
    for (; (r2 = this.tokenizer.rules.inline.anyPunctuation.exec(n2)) != null; ) n2 = n2.slice(0, r2.index) + "++" + n2.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
    for (; (r2 = this.tokenizer.rules.inline.blockSkip.exec(n2)) != null; ) n2 = n2.slice(0, r2.index) + "[" + "a".repeat(r2[0].length - 2) + "]" + n2.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
    n2 = this.options.hooks?.emStrongMask?.call({ lexer: this }, n2) ?? n2;
    let i = false, s2 = "";
    for (; e2; ) {
      i || (s2 = ""), i = false;
      let o2;
      if (this.options.extensions?.inline?.some((l) => (o2 = l.call({ lexer: this }, e2, t2)) ? (e2 = e2.substring(o2.raw.length), t2.push(o2), true) : false)) continue;
      if (o2 = this.tokenizer.escape(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.tag(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.link(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.reflink(e2, this.tokens.links)) {
        e2 = e2.substring(o2.raw.length);
        let l = t2.at(-1);
        o2.type === "text" && l?.type === "text" ? (l.raw += o2.raw, l.text += o2.text) : t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.emStrong(e2, n2, s2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.codespan(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.br(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.del(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (o2 = this.tokenizer.autolink(e2)) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      if (!this.state.inLink && (o2 = this.tokenizer.url(e2))) {
        e2 = e2.substring(o2.raw.length), t2.push(o2);
        continue;
      }
      let a = e2;
      if (this.options.extensions?.startInline) {
        let l = 1 / 0, c2 = e2.slice(1), p2;
        this.options.extensions.startInline.forEach((g) => {
          p2 = g.call({ lexer: this }, c2), typeof p2 == "number" && p2 >= 0 && (l = Math.min(l, p2));
        }), l < 1 / 0 && l >= 0 && (a = e2.substring(0, l + 1));
      }
      if (o2 = this.tokenizer.inlineText(a)) {
        e2 = e2.substring(o2.raw.length), o2.raw.slice(-1) !== "_" && (s2 = o2.raw.slice(-1)), i = true;
        let l = t2.at(-1);
        l?.type === "text" ? (l.raw += o2.raw, l.text += o2.text) : t2.push(o2);
        continue;
      }
      if (e2) {
        let l = "Infinite loop on byte: " + e2.charCodeAt(0);
        if (this.options.silent) {
          console.error(l);
          break;
        } else throw new Error(l);
      }
    }
    return t2;
  }
};
var P = class {
  options;
  parser;
  constructor(e2) {
    this.options = e2 || T;
  }
  space(e2) {
    return "";
  }
  code({ text: e2, lang: t2, escaped: n2 }) {
    let r2 = (t2 || "").match(m2.notSpaceStart)?.[0], i = e2.replace(m2.endingNewline, "") + `
`;
    return r2 ? '<pre><code class="language-' + w(r2) + '">' + (n2 ? i : w(i, true)) + `</code></pre>
` : "<pre><code>" + (n2 ? i : w(i, true)) + `</code></pre>
`;
  }
  blockquote({ tokens: e2 }) {
    return `<blockquote>
${this.parser.parse(e2)}</blockquote>
`;
  }
  html({ text: e2 }) {
    return e2;
  }
  def(e2) {
    return "";
  }
  heading({ tokens: e2, depth: t2 }) {
    return `<h${t2}>${this.parser.parseInline(e2)}</h${t2}>
`;
  }
  hr(e2) {
    return `<hr>
`;
  }
  list(e2) {
    let t2 = e2.ordered, n2 = e2.start, r2 = "";
    for (let o2 = 0; o2 < e2.items.length; o2++) {
      let a = e2.items[o2];
      r2 += this.listitem(a);
    }
    let i = t2 ? "ol" : "ul", s2 = t2 && n2 !== 1 ? ' start="' + n2 + '"' : "";
    return "<" + i + s2 + `>
` + r2 + "</" + i + `>
`;
  }
  listitem(e2) {
    let t2 = "";
    if (e2.task) {
      let n2 = this.checkbox({ checked: !!e2.checked });
      e2.loose ? e2.tokens[0]?.type === "paragraph" ? (e2.tokens[0].text = n2 + " " + e2.tokens[0].text, e2.tokens[0].tokens && e2.tokens[0].tokens.length > 0 && e2.tokens[0].tokens[0].type === "text" && (e2.tokens[0].tokens[0].text = n2 + " " + w(e2.tokens[0].tokens[0].text), e2.tokens[0].tokens[0].escaped = true)) : e2.tokens.unshift({ type: "text", raw: n2 + " ", text: n2 + " ", escaped: true }) : t2 += n2 + " ";
    }
    return t2 += this.parser.parse(e2.tokens, !!e2.loose), `<li>${t2}</li>
`;
  }
  checkbox({ checked: e2 }) {
    return "<input " + (e2 ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
  }
  paragraph({ tokens: e2 }) {
    return `<p>${this.parser.parseInline(e2)}</p>
`;
  }
  table(e2) {
    let t2 = "", n2 = "";
    for (let i = 0; i < e2.header.length; i++) n2 += this.tablecell(e2.header[i]);
    t2 += this.tablerow({ text: n2 });
    let r2 = "";
    for (let i = 0; i < e2.rows.length; i++) {
      let s2 = e2.rows[i];
      n2 = "";
      for (let o2 = 0; o2 < s2.length; o2++) n2 += this.tablecell(s2[o2]);
      r2 += this.tablerow({ text: n2 });
    }
    return r2 && (r2 = `<tbody>${r2}</tbody>`), `<table>
<thead>
` + t2 + `</thead>
` + r2 + `</table>
`;
  }
  tablerow({ text: e2 }) {
    return `<tr>
${e2}</tr>
`;
  }
  tablecell(e2) {
    let t2 = this.parser.parseInline(e2.tokens), n2 = e2.header ? "th" : "td";
    return (e2.align ? `<${n2} align="${e2.align}">` : `<${n2}>`) + t2 + `</${n2}>
`;
  }
  strong({ tokens: e2 }) {
    return `<strong>${this.parser.parseInline(e2)}</strong>`;
  }
  em({ tokens: e2 }) {
    return `<em>${this.parser.parseInline(e2)}</em>`;
  }
  codespan({ text: e2 }) {
    return `<code>${w(e2, true)}</code>`;
  }
  br(e2) {
    return "<br>";
  }
  del({ tokens: e2 }) {
    return `<del>${this.parser.parseInline(e2)}</del>`;
  }
  link({ href: e2, title: t2, tokens: n2 }) {
    let r2 = this.parser.parseInline(n2), i = J(e2);
    if (i === null) return r2;
    e2 = i;
    let s2 = '<a href="' + e2 + '"';
    return t2 && (s2 += ' title="' + w(t2) + '"'), s2 += ">" + r2 + "</a>", s2;
  }
  image({ href: e2, title: t2, text: n2, tokens: r2 }) {
    r2 && (n2 = this.parser.parseInline(r2, this.parser.textRenderer));
    let i = J(e2);
    if (i === null) return w(n2);
    e2 = i;
    let s2 = `<img src="${e2}" alt="${n2}"`;
    return t2 && (s2 += ` title="${w(t2)}"`), s2 += ">", s2;
  }
  text(e2) {
    return "tokens" in e2 && e2.tokens ? this.parser.parseInline(e2.tokens) : "escaped" in e2 && e2.escaped ? e2.text : w(e2.text);
  }
};
var $2 = class {
  strong({ text: e2 }) {
    return e2;
  }
  em({ text: e2 }) {
    return e2;
  }
  codespan({ text: e2 }) {
    return e2;
  }
  del({ text: e2 }) {
    return e2;
  }
  html({ text: e2 }) {
    return e2;
  }
  text({ text: e2 }) {
    return e2;
  }
  link({ text: e2 }) {
    return "" + e2;
  }
  image({ text: e2 }) {
    return "" + e2;
  }
  br() {
    return "";
  }
};
var b = class u3 {
  options;
  renderer;
  textRenderer;
  constructor(e2) {
    this.options = e2 || T, this.options.renderer = this.options.renderer || new P(), this.renderer = this.options.renderer, this.renderer.options = this.options, this.renderer.parser = this, this.textRenderer = new $2();
  }
  static parse(e2, t2) {
    return new u3(t2).parse(e2);
  }
  static parseInline(e2, t2) {
    return new u3(t2).parseInline(e2);
  }
  parse(e2, t2 = true) {
    let n2 = "";
    for (let r2 = 0; r2 < e2.length; r2++) {
      let i = e2[r2];
      if (this.options.extensions?.renderers?.[i.type]) {
        let o2 = i, a = this.options.extensions.renderers[o2.type].call({ parser: this }, o2);
        if (a !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "def", "paragraph", "text"].includes(o2.type)) {
          n2 += a || "";
          continue;
        }
      }
      let s2 = i;
      switch (s2.type) {
        case "space": {
          n2 += this.renderer.space(s2);
          continue;
        }
        case "hr": {
          n2 += this.renderer.hr(s2);
          continue;
        }
        case "heading": {
          n2 += this.renderer.heading(s2);
          continue;
        }
        case "code": {
          n2 += this.renderer.code(s2);
          continue;
        }
        case "table": {
          n2 += this.renderer.table(s2);
          continue;
        }
        case "blockquote": {
          n2 += this.renderer.blockquote(s2);
          continue;
        }
        case "list": {
          n2 += this.renderer.list(s2);
          continue;
        }
        case "html": {
          n2 += this.renderer.html(s2);
          continue;
        }
        case "def": {
          n2 += this.renderer.def(s2);
          continue;
        }
        case "paragraph": {
          n2 += this.renderer.paragraph(s2);
          continue;
        }
        case "text": {
          let o2 = s2, a = this.renderer.text(o2);
          for (; r2 + 1 < e2.length && e2[r2 + 1].type === "text"; ) o2 = e2[++r2], a += `
` + this.renderer.text(o2);
          t2 ? n2 += this.renderer.paragraph({ type: "paragraph", raw: a, text: a, tokens: [{ type: "text", raw: a, text: a, escaped: true }] }) : n2 += a;
          continue;
        }
        default: {
          let o2 = 'Token with "' + s2.type + '" type was not found.';
          if (this.options.silent) return console.error(o2), "";
          throw new Error(o2);
        }
      }
    }
    return n2;
  }
  parseInline(e2, t2 = this.renderer) {
    let n2 = "";
    for (let r2 = 0; r2 < e2.length; r2++) {
      let i = e2[r2];
      if (this.options.extensions?.renderers?.[i.type]) {
        let o2 = this.options.extensions.renderers[i.type].call({ parser: this }, i);
        if (o2 !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
          n2 += o2 || "";
          continue;
        }
      }
      let s2 = i;
      switch (s2.type) {
        case "escape": {
          n2 += t2.text(s2);
          break;
        }
        case "html": {
          n2 += t2.html(s2);
          break;
        }
        case "link": {
          n2 += t2.link(s2);
          break;
        }
        case "image": {
          n2 += t2.image(s2);
          break;
        }
        case "strong": {
          n2 += t2.strong(s2);
          break;
        }
        case "em": {
          n2 += t2.em(s2);
          break;
        }
        case "codespan": {
          n2 += t2.codespan(s2);
          break;
        }
        case "br": {
          n2 += t2.br(s2);
          break;
        }
        case "del": {
          n2 += t2.del(s2);
          break;
        }
        case "text": {
          n2 += t2.text(s2);
          break;
        }
        default: {
          let o2 = 'Token with "' + s2.type + '" type was not found.';
          if (this.options.silent) return console.error(o2), "";
          throw new Error(o2);
        }
      }
    }
    return n2;
  }
};
var S = class {
  options;
  block;
  constructor(e2) {
    this.options = e2 || T;
  }
  static passThroughHooks = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens", "emStrongMask"]);
  static passThroughHooksRespectAsync = /* @__PURE__ */ new Set(["preprocess", "postprocess", "processAllTokens"]);
  preprocess(e2) {
    return e2;
  }
  postprocess(e2) {
    return e2;
  }
  processAllTokens(e2) {
    return e2;
  }
  emStrongMask(e2) {
    return e2;
  }
  provideLexer() {
    return this.block ? x.lex : x.lexInline;
  }
  provideParser() {
    return this.block ? b.parse : b.parseInline;
  }
};
var B = class {
  defaults = L();
  options = this.setOptions;
  parse = this.parseMarkdown(true);
  parseInline = this.parseMarkdown(false);
  Parser = b;
  Renderer = P;
  TextRenderer = $2;
  Lexer = x;
  Tokenizer = y2;
  Hooks = S;
  constructor(...e2) {
    this.use(...e2);
  }
  walkTokens(e2, t2) {
    let n2 = [];
    for (let r2 of e2) switch (n2 = n2.concat(t2.call(this, r2)), r2.type) {
      case "table": {
        let i = r2;
        for (let s2 of i.header) n2 = n2.concat(this.walkTokens(s2.tokens, t2));
        for (let s2 of i.rows) for (let o2 of s2) n2 = n2.concat(this.walkTokens(o2.tokens, t2));
        break;
      }
      case "list": {
        let i = r2;
        n2 = n2.concat(this.walkTokens(i.items, t2));
        break;
      }
      default: {
        let i = r2;
        this.defaults.extensions?.childTokens?.[i.type] ? this.defaults.extensions.childTokens[i.type].forEach((s2) => {
          let o2 = i[s2].flat(1 / 0);
          n2 = n2.concat(this.walkTokens(o2, t2));
        }) : i.tokens && (n2 = n2.concat(this.walkTokens(i.tokens, t2)));
      }
    }
    return n2;
  }
  use(...e2) {
    let t2 = this.defaults.extensions || { renderers: {}, childTokens: {} };
    return e2.forEach((n2) => {
      let r2 = { ...n2 };
      if (r2.async = this.defaults.async || r2.async || false, n2.extensions && (n2.extensions.forEach((i) => {
        if (!i.name) throw new Error("extension name required");
        if ("renderer" in i) {
          let s2 = t2.renderers[i.name];
          s2 ? t2.renderers[i.name] = function(...o2) {
            let a = i.renderer.apply(this, o2);
            return a === false && (a = s2.apply(this, o2)), a;
          } : t2.renderers[i.name] = i.renderer;
        }
        if ("tokenizer" in i) {
          if (!i.level || i.level !== "block" && i.level !== "inline") throw new Error("extension level must be 'block' or 'inline'");
          let s2 = t2[i.level];
          s2 ? s2.unshift(i.tokenizer) : t2[i.level] = [i.tokenizer], i.start && (i.level === "block" ? t2.startBlock ? t2.startBlock.push(i.start) : t2.startBlock = [i.start] : i.level === "inline" && (t2.startInline ? t2.startInline.push(i.start) : t2.startInline = [i.start]));
        }
        "childTokens" in i && i.childTokens && (t2.childTokens[i.name] = i.childTokens);
      }), r2.extensions = t2), n2.renderer) {
        let i = this.defaults.renderer || new P(this.defaults);
        for (let s2 in n2.renderer) {
          if (!(s2 in i)) throw new Error(`renderer '${s2}' does not exist`);
          if (["options", "parser"].includes(s2)) continue;
          let o2 = s2, a = n2.renderer[o2], l = i[o2];
          i[o2] = (...c2) => {
            let p2 = a.apply(i, c2);
            return p2 === false && (p2 = l.apply(i, c2)), p2 || "";
          };
        }
        r2.renderer = i;
      }
      if (n2.tokenizer) {
        let i = this.defaults.tokenizer || new y2(this.defaults);
        for (let s2 in n2.tokenizer) {
          if (!(s2 in i)) throw new Error(`tokenizer '${s2}' does not exist`);
          if (["options", "rules", "lexer"].includes(s2)) continue;
          let o2 = s2, a = n2.tokenizer[o2], l = i[o2];
          i[o2] = (...c2) => {
            let p2 = a.apply(i, c2);
            return p2 === false && (p2 = l.apply(i, c2)), p2;
          };
        }
        r2.tokenizer = i;
      }
      if (n2.hooks) {
        let i = this.defaults.hooks || new S();
        for (let s2 in n2.hooks) {
          if (!(s2 in i)) throw new Error(`hook '${s2}' does not exist`);
          if (["options", "block"].includes(s2)) continue;
          let o2 = s2, a = n2.hooks[o2], l = i[o2];
          S.passThroughHooks.has(s2) ? i[o2] = (c2) => {
            if (this.defaults.async && S.passThroughHooksRespectAsync.has(s2)) return (async () => {
              let g = await a.call(i, c2);
              return l.call(i, g);
            })();
            let p2 = a.call(i, c2);
            return l.call(i, p2);
          } : i[o2] = (...c2) => {
            if (this.defaults.async) return (async () => {
              let g = await a.apply(i, c2);
              return g === false && (g = await l.apply(i, c2)), g;
            })();
            let p2 = a.apply(i, c2);
            return p2 === false && (p2 = l.apply(i, c2)), p2;
          };
        }
        r2.hooks = i;
      }
      if (n2.walkTokens) {
        let i = this.defaults.walkTokens, s2 = n2.walkTokens;
        r2.walkTokens = function(o2) {
          let a = [];
          return a.push(s2.call(this, o2)), i && (a = a.concat(i.call(this, o2))), a;
        };
      }
      this.defaults = { ...this.defaults, ...r2 };
    }), this;
  }
  setOptions(e2) {
    return this.defaults = { ...this.defaults, ...e2 }, this;
  }
  lexer(e2, t2) {
    return x.lex(e2, t2 ?? this.defaults);
  }
  parser(e2, t2) {
    return b.parse(e2, t2 ?? this.defaults);
  }
  parseMarkdown(e2) {
    return (n2, r2) => {
      let i = { ...r2 }, s2 = { ...this.defaults, ...i }, o2 = this.onError(!!s2.silent, !!s2.async);
      if (this.defaults.async === true && i.async === false) return o2(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
      if (typeof n2 > "u" || n2 === null) return o2(new Error("marked(): input parameter is undefined or null"));
      if (typeof n2 != "string") return o2(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(n2) + ", string expected"));
      if (s2.hooks && (s2.hooks.options = s2, s2.hooks.block = e2), s2.async) return (async () => {
        let a = s2.hooks ? await s2.hooks.preprocess(n2) : n2, c2 = await (s2.hooks ? await s2.hooks.provideLexer() : e2 ? x.lex : x.lexInline)(a, s2), p2 = s2.hooks ? await s2.hooks.processAllTokens(c2) : c2;
        s2.walkTokens && await Promise.all(this.walkTokens(p2, s2.walkTokens));
        let d2 = await (s2.hooks ? await s2.hooks.provideParser() : e2 ? b.parse : b.parseInline)(p2, s2);
        return s2.hooks ? await s2.hooks.postprocess(d2) : d2;
      })().catch(o2);
      try {
        s2.hooks && (n2 = s2.hooks.preprocess(n2));
        let l = (s2.hooks ? s2.hooks.provideLexer() : e2 ? x.lex : x.lexInline)(n2, s2);
        s2.hooks && (l = s2.hooks.processAllTokens(l)), s2.walkTokens && this.walkTokens(l, s2.walkTokens);
        let p2 = (s2.hooks ? s2.hooks.provideParser() : e2 ? b.parse : b.parseInline)(l, s2);
        return s2.hooks && (p2 = s2.hooks.postprocess(p2)), p2;
      } catch (a) {
        return o2(a);
      }
    };
  }
  onError(e2, t2) {
    return (n2) => {
      if (n2.message += `
Please report this to https://github.com/markedjs/marked.`, e2) {
        let r2 = "<p>An error occurred:</p><pre>" + w(n2.message + "", true) + "</pre>";
        return t2 ? Promise.resolve(r2) : r2;
      }
      if (t2) return Promise.reject(n2);
      throw n2;
    };
  }
};
var _ = new B();
function k(u4, e2) {
  return _.parse(u4, e2);
}
k.options = k.setOptions = function(u4) {
  return _.setOptions(u4), k.defaults = _.defaults, G(k.defaults), k;
};
k.getDefaults = L;
k.defaults = T;
k.use = function(...u4) {
  return _.use(...u4), k.defaults = _.defaults, G(k.defaults), k;
};
k.walkTokens = function(u4, e2) {
  return _.walkTokens(u4, e2);
};
k.parseInline = _.parseInline;
k.Parser = b;
k.parser = b.parse;
k.Renderer = P;
k.TextRenderer = $2;
k.Lexer = x;
k.lexer = x.lex;
k.Tokenizer = y2;
k.Hooks = S;
k.parse = k;
var Ht = k.options;
var Zt = k.setOptions;
var Gt = k.use;
var Nt = k.walkTokens;
var Ft = k.parseInline;
var Qt = b.parse;
var Ut = x.lex;

// node_modules/marked-highlight/src/index.js
function markedHighlight(options) {
  if (typeof options === "function") {
    options = {
      highlight: options
    };
  }
  if (!options || typeof options.highlight !== "function") {
    throw new Error("Must provide highlight function");
  }
  if (typeof options.langPrefix !== "string") {
    options.langPrefix = "language-";
  }
  if (typeof options.emptyLangClass !== "string") {
    options.emptyLangClass = "";
  }
  return {
    async: !!options.async,
    walkTokens(token) {
      if (token.type !== "code") {
        return;
      }
      const lang = getLang(token.lang);
      if (options.async) {
        return Promise.resolve(options.highlight(token.text, lang, token.lang || "")).then(updateToken(token));
      }
      const code = options.highlight(token.text, lang, token.lang || "");
      if (code instanceof Promise) {
        throw new Error("markedHighlight is not set to async but the highlight function is async. Set the async option to true on markedHighlight to await the async highlight function.");
      }
      updateToken(token)(code);
    },
    useNewRenderer: true,
    renderer: {
      code(code, infoString, escaped) {
        if (typeof code === "object") {
          escaped = code.escaped;
          infoString = code.lang;
          code = code.text;
        }
        const lang = getLang(infoString);
        const classValue = lang ? options.langPrefix + escape(lang) : options.emptyLangClass;
        const classAttr = classValue ? ` class="${classValue}"` : "";
        code = code.replace(/\n$/, "");
        return `<pre><code${classAttr}>${escaped ? code : escape(code, true)}
</code></pre>`;
      }
    }
  };
}
function getLang(lang) {
  return (lang || "").match(/\S*/)[0];
}
function updateToken(token) {
  return (code) => {
    if (typeof code === "string" && code !== token.text) {
      token.escaped = true;
      token.text = code;
    }
  };
}
var escapeTest = /[&<>"']/;
var escapeReplace = new RegExp(escapeTest.source, "g");
var escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
var escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
var escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
var getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}

// node_modules/@waline/client/dist/component.js
var import_recaptcha_v3 = __toESM(require_ReCaptcha());
var Te2 = ({ size: e2 }) => h("svg", { class: "wl-close-icon", viewBox: "0 0 1024 1024", width: e2, height: e2 }, [h("path", { d: "M697.173 85.333h-369.92c-144.64 0-241.92 101.547-241.92 252.587v348.587c0 150.613 97.28 252.16 241.92 252.16h369.92c144.64 0 241.494-101.547 241.494-252.16V337.92c0-151.04-96.854-252.587-241.494-252.587z", fill: "currentColor" }), h("path", { d: "m640.683 587.52-75.947-75.861 75.904-75.862a37.29 37.29 0 0 0 0-52.778 37.205 37.205 0 0 0-52.779 0l-75.946 75.818-75.862-75.946a37.419 37.419 0 0 0-52.821 0 37.419 37.419 0 0 0 0 52.821l75.947 75.947-75.776 75.733a37.29 37.29 0 1 0 52.778 52.821l75.776-75.776 75.947 75.947a37.376 37.376 0 0 0 52.779-52.821z", fill: "#888" })]);
var zt = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "m341.013 394.667 27.755 393.45h271.83l27.733-393.45h64.106l-28.01 397.952a64 64 0 0 1-63.83 59.498H368.768a64 64 0 0 1-63.83-59.52l-28.053-397.93h64.128zm139.307 19.818v298.667h-64V414.485h64zm117.013 0v298.667h-64V414.485h64zM181.333 288h640v64h-640v-64zm453.483-106.667v64h-256v-64h256z", fill: "red" }));
var Rt = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M563.2 463.3 677 540c1.7 1.2 3.7 1.8 5.8 1.8.7 0 1.4-.1 2-.2 2.7-.5 5.1-2.1 6.6-4.4l25.3-37.8c1.5-2.3 2.1-5.1 1.6-7.8s-2.1-5.1-4.4-6.6l-73.6-49.1 73.6-49.1c2.3-1.5 3.9-3.9 4.4-6.6.5-2.7 0-5.5-1.6-7.8l-25.3-37.8a10.1 10.1 0 0 0-6.6-4.4c-.7-.1-1.3-.2-2-.2-2.1 0-4.1.6-5.8 1.8l-113.8 76.6c-9.2 6.2-14.7 16.4-14.7 27.5.1 11 5.5 21.3 14.7 27.4zM387 348.8h-45.5c-5.7 0-10.4 4.7-10.4 10.4v153.3c0 5.7 4.7 10.4 10.4 10.4H387c5.7 0 10.4-4.7 10.4-10.4V359.2c0-5.7-4.7-10.4-10.4-10.4zm333.8 241.3-41-20a10.3 10.3 0 0 0-8.1-.5c-2.6.9-4.8 2.9-5.9 5.4-30.1 64.9-93.1 109.1-164.4 115.2-5.7.5-9.9 5.5-9.5 11.2l3.9 45.5c.5 5.3 5 9.5 10.3 9.5h.9c94.8-8 178.5-66.5 218.6-152.7 2.4-5 .3-11.2-4.8-13.6zm186-186.1c-11.9-42-30.5-81.4-55.2-117.1-24.1-34.9-53.5-65.6-87.5-91.2-33.9-25.6-71.5-45.5-111.6-59.2-41.2-14-84.1-21.1-127.8-21.1h-1.2c-75.4 0-148.8 21.4-212.5 61.7-63.7 40.3-114.3 97.6-146.5 165.8-32.2 68.1-44.3 143.6-35.1 218.4 9.3 74.8 39.4 145 87.3 203.3.1.2.3.3.4.5l36.2 38.4c1.1 1.2 2.5 2.1 3.9 2.6 73.3 66.7 168.2 103.5 267.5 103.5 73.3 0 145.2-20.3 207.7-58.7 37.3-22.9 70.3-51.5 98.1-85 27.1-32.7 48.7-69.5 64.2-109.1 15.5-39.7 24.4-81.3 26.6-123.8 2.4-43.6-2.5-87-14.5-129zm-60.5 181.1c-8.3 37-22.8 72-43 104-19.7 31.1-44.3 58.6-73.1 81.7-28.8 23.1-61 41-95.7 53.4-35.6 12.7-72.9 19.1-110.9 19.1-82.6 0-161.7-30.6-222.8-86.2l-34.1-35.8c-23.9-29.3-42.4-62.2-55.1-97.7-12.4-34.7-18.8-71-19.2-107.9-.4-36.9 5.4-73.3 17.1-108.2 12-35.8 30-69.2 53.4-99.1 31.7-40.4 71.1-72 117.2-94.1 44.5-21.3 94-32.6 143.4-32.6 49.3 0 97 10.8 141.8 32 34.3 16.3 65.3 38.1 92 64.8 26.1 26 47.5 56 63.6 89.2 16.2 33.2 26.6 68.5 31 105.1 4.6 37.5 2.7 75.3-5.6 112.3z", fill: "currentColor" }));
var Vt = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M784 112H240c-88 0-160 72-160 160v480c0 88 72 160 160 160h544c88 0 160-72 160-160V272c0-88-72-160-160-160zm96 640c0 52.8-43.2 96-96 96H240c-52.8 0-96-43.2-96-96V272c0-52.8 43.2-96 96-96h544c52.8 0 96 43.2 96 96v480z", fill: "currentColor" }), h("path", { d: "M352 480c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0-128c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zm462.4 379.2-3.2-3.2-177.6-177.6c-25.6-25.6-65.6-25.6-91.2 0l-80 80-36.8-36.8c-25.6-25.6-65.6-25.6-91.2 0L200 728c-4.8 6.4-8 14.4-8 24 0 17.6 14.4 32 32 32 9.6 0 16-3.2 22.4-9.6L380.8 640l134.4 134.4c6.4 6.4 14.4 9.6 24 9.6 17.6 0 32-14.4 32-32 0-9.6-4.8-17.6-9.6-24l-52.8-52.8 80-80L769.6 776c6.4 4.8 12.8 8 20.8 8 17.6 0 32-14.4 32-32 0-8-3.2-16-8-20.8z", fill: "currentColor" })]);
var Ut2 = ({ active: e2 = false }) => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: `M850.654 323.804c-11.042-25.625-26.862-48.532-46.885-68.225-20.022-19.61-43.258-34.936-69.213-45.73-26.78-11.124-55.124-16.727-84.375-16.727-40.622 0-80.256 11.123-114.698 32.135A214.79 214.79 0 0 0 512 241.819a214.79 214.79 0 0 0-23.483-16.562c-34.442-21.012-74.076-32.135-114.698-32.135-29.25 0-57.595 5.603-84.375 16.727-25.872 10.711-49.19 26.12-69.213 45.73-20.105 19.693-35.843 42.6-46.885 68.225-11.453 26.615-17.303 54.877-17.303 83.963 0 27.439 5.603 56.03 16.727 85.117 9.31 24.307 22.659 49.52 39.715 74.981 27.027 40.293 64.188 82.316 110.33 124.915 76.465 70.615 152.189 119.394 155.402 121.371l19.528 12.525c8.652 5.52 19.776 5.52 28.427 0l19.529-12.525c3.213-2.06 78.854-50.756 155.401-121.371 46.143-42.6 83.304-84.622 110.33-124.915 17.057-25.46 30.487-50.674 39.716-74.981 11.124-29.087 16.727-57.678 16.727-85.117.082-29.086-5.768-57.348-17.221-83.963z${e2 ? "" : "M512 761.5S218.665 573.55 218.665 407.767c0-83.963 69.461-152.023 155.154-152.023 60.233 0 112.473 33.618 138.181 82.727 25.708-49.109 77.948-82.727 138.18-82.727 85.694 0 155.155 68.06 155.155 152.023C805.335 573.551 512 761.5 512 761.5z"}`, fill: e2 ? "red" : "currentColor" })]);
var _t = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, [h("path", { d: "M710.816 654.301c70.323-96.639 61.084-230.578-23.705-314.843-46.098-46.098-107.183-71.109-172.28-71.109-65.008 0-126.092 25.444-172.28 71.109-45.227 46.098-70.756 107.183-70.756 172.106 0 64.923 25.444 126.007 71.194 172.106 46.099 46.098 107.184 71.109 172.28 71.109 51.414 0 100.648-16.212 142.824-47.404l126.53 126.006c7.058 7.06 16.297 10.979 26.406 10.979 10.105 0 19.343-3.919 26.402-10.979 14.467-14.467 14.467-38.172 0-52.723L710.816 654.301zm-315.107-23.265c-65.88-65.88-65.88-172.54 0-238.42 32.069-32.07 74.245-49.149 119.471-49.149 45.227 0 87.407 17.603 119.472 49.149 65.88 65.879 65.88 172.539 0 238.42-63.612 63.178-175.242 63.178-238.943 0zm0 0", fill: "currentColor" }), h("path", { d: "M703.319 121.603H321.03c-109.8 0-199.469 89.146-199.469 199.38v382.034c0 109.796 89.236 199.38 199.469 199.38h207.397c20.653 0 37.384-16.645 37.384-37.299 0-20.649-16.731-37.296-37.384-37.296H321.03c-68.582 0-124.352-55.77-124.352-124.267V321.421c0-68.496 55.77-124.267 124.352-124.267h382.289c68.582 0 124.352 55.771 124.352 124.267V524.72c0 20.654 16.736 37.299 37.385 37.299 20.654 0 37.384-16.645 37.384-37.299V320.549c-.085-109.8-89.321-198.946-199.121-198.946zm0 0", fill: "currentColor" })]);
var Ht2 = () => h("svg", { width: "16", height: "16", ariaHidden: "true" }, h("path", { d: "M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z", fill: "currentColor" }));
var Tt = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334zm0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333zm-271.36 213.334v64h-176.64v-64h176.64zm122.026-128v64H362.667v-64h298.666z", fill: "currentColor" }));
var Ft2 = () => h("svg", { viewBox: "0 0 1024 1024", width: "24", height: "24" }, h("path", { d: "M813.039 318.772L480.53 651.278H360.718V531.463L693.227 198.961C697.904 194.284 704.027 192 710.157 192C716.302 192 722.436 194.284 727.114 198.961L813.039 284.88C817.72 289.561 820 295.684 820 301.825C820 307.95 817.72 314.093 813.039 318.772ZM710.172 261.888L420.624 551.431V591.376H460.561L750.109 301.825L710.172 261.888ZM490.517 291.845H240.906V771.09H720.156V521.479C720.156 504.947 733.559 491.529 750.109 491.529C766.653 491.529 780.063 504.947 780.063 521.479V791.059C780.063 813.118 762.18 831 740.125 831H220.937C198.882 831 181 813.118 181 791.059V271.872C181 249.817 198.882 231.935 220.937 231.935H490.517C507.06 231.935 520.47 245.352 520.47 261.888C520.47 278.424 507.06 291.845 490.517 291.845Z", fill: "currentColor" }));
var Nt2 = () => h("svg", { class: "verified-icon", viewBox: "0 0 1024 1024", width: "14", height: "14" }, h("path", { d: "m894.4 461.56-54.4-63.2c-10.4-12-18.8-34.4-18.8-50.4v-68c0-42.4-34.8-77.2-77.2-77.2h-68c-15.6 0-38.4-8.4-50.4-18.8l-63.2-54.4c-27.6-23.6-72.8-23.6-100.8 0l-62.8 54.8c-12 10-34.8 18.4-50.4 18.4h-69.2c-42.4 0-77.2 34.8-77.2 77.2v68.4c0 15.6-8.4 38-18.4 50l-54 63.6c-23.2 27.6-23.2 72.4 0 100l54 63.6c10 12 18.4 34.4 18.4 50v68.4c0 42.4 34.8 77.2 77.2 77.2h69.2c15.6 0 38.4 8.4 50.4 18.8l63.2 54.4c27.6 23.6 72.8 23.6 100.8 0l63.2-54.4c12-10.4 34.4-18.8 50.4-18.8h68c42.4 0 77.2-34.8 77.2-77.2v-68c0-15.6 8.4-38.4 18.8-50.4l54.4-63.2c23.2-27.6 23.2-73.2-.4-100.8zm-216-25.2-193.2 193.2a30 30 0 0 1-42.4 0l-96.8-96.8a30.16 30.16 0 0 1 0-42.4c11.6-11.6 30.8-11.6 42.4 0l75.6 75.6 172-172c11.6-11.6 30.8-11.6 42.4 0 11.6 11.6 11.6 30.8 0 42.4z", fill: "#27ae60" }));
var Wt = () => h("svg", { class: "administrator-icon", viewBox: "0 0 1024 1024", width: "14", height: "14" }, [h("path", { d: "M461.6 129.56C489.6 105.96 534.8 105.96 562.4 129.56L625.6 183.96C637.6 194.36 660.4 202.76 676 202.76H744C786.4 202.76 821.2 237.56 821.2 279.96V347.96C821.2 363.96 829.6 386.36 840 398.36L894.4 461.56C918 489.16 918 534.76 894.8 562.36L840.4 625.56C830 637.56 821.6 660.36 821.6 675.96V743.96C821.6 786.36 786.8 821.16 744.4 821.16H676.4C660.4 821.16 638 829.56 626 839.96L562.8 894.36C534.8 917.96 489.6 917.96 462 894.36L398.8 839.96C386.8 829.56 364 821.16 348.4 821.16H279.2C236.8 821.16 202 786.36 202 743.96V675.56C201.999 659.96 193.6 637.56 183.6 625.56L129.6 561.96C106.4 534.36 106.4 489.56 129.6 461.96L183.6 398.36C193.6 386.359 202 363.959 202 348.36V279.96C202 237.56 236.8 202.76 279.2 202.76H348.4C364 202.76 386.8 194.36 398.8 184.36L461.6 129.56ZM549.567 331.896C530.047 303.082 486.645 306.12 471.433 337.412L442.175 396.526C435.587 409.848 422.856 419.097 408.146 421.226L342.706 430.726C340.776 431 338.884 431.397 336.993 431.946C303.482 441.361 292.756 483.493 317.671 507.812L364.975 553.96C375.623 564.321 380.507 579.299 377.991 593.954L366.917 659.102C366.595 661.03 366.355 662.967 366.279 664.923C364.906 699.688 401.683 722.937 432.514 706.738L491.05 675.966C504.217 669.068 519.954 669.069 533.121 675.966L591.675 706.738C593.406 707.645 595.174 708.432 597.028 709.104C629.666 721.205 663.139 693.382 657.273 659.102L646.069 593.954C643.42 579.176 648.24 564.083 659.001 553.6L706.315 507.461C707.687 506.118 708.994 504.66 710.215 503.127C731.779 475.809 715.737 435.41 681.281 430.365L615.839 420.874C601.13 418.745 588.4 409.486 581.821 396.174L552.562 337.052C551.644 335.284 550.674 333.551 549.567 331.896Z", fill: "#f59831" })]);
var se2 = ({ size: e2 = 100 }) => h("svg", { width: e2, height: e2, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid" }, h("circle", { cx: 50, cy: 50, fill: "none", stroke: "currentColor", strokeWidth: "4", r: "40", "stroke-dasharray": "85 30" }, h("animateTransform", { attributeName: "transform", type: "rotate", repeatCount: "indefinite", dur: "1s", values: "0 50 50;360 50 50", keyTimes: "0;1" })));
var Bt = () => h("svg", { width: 24, height: 24, fill: "currentcolor", viewBox: "0 0 24 24" }, [h("path", { style: "transform: translateY(0.5px)", d: "M18.968 10.5H15.968V11.484H17.984V12.984H15.968V15H14.468V9H18.968V10.5V10.5ZM8.984 9C9.26533 9 9.49967 9.09367 9.687 9.281C9.87433 9.46833 9.968 9.70267 9.968 9.984V10.5H6.499V13.5H8.468V12H9.968V14.016C9.968 14.2973 9.87433 14.5317 9.687 14.719C9.49967 14.9063 9.26533 15 8.984 15H5.984C5.70267 15 5.46833 14.9063 5.281 14.719C5.09367 14.5317 5 14.2973 5 14.016V9.985C5 9.70367 5.09367 9.46933 5.281 9.282C5.46833 9.09467 5.70267 9.001 5.984 9.001H8.984V9ZM11.468 9H12.968V15H11.468V9V9Z" }), h("path", { d: "M18.5 3H5.75C3.6875 3 2 4.6875 2 6.75V18C2 20.0625 3.6875 21.75 5.75 21.75H18.5C20.5625 21.75 22.25 20.0625 22.25 18V6.75C22.25 4.6875 20.5625 3 18.5 3ZM20.75 18C20.75 19.2375 19.7375 20.25 18.5 20.25H5.75C4.5125 20.25 3.5 19.2375 3.5 18V6.75C3.5 5.5125 4.5125 4.5 5.75 4.5H18.5C19.7375 4.5 20.75 5.5125 20.75 6.75V18Z" })]);
var Dt = () => useStorage("WALINE_USER_META", { nick: "", mail: "", link: "" });
var Pt = () => useStorage("WALINE_COMMENT_BOX_EDITOR", "");
var qt = "WALINE_LIKE";
var Gt2 = useStorage(qt, []);
var Fe2 = () => Gt2;
var Ot = "WALINE_REACTION";
var Kt = useStorage(Ot, {});
var Zt2 = () => Kt;
var Ne2 = {};
var Xt = (e2) => {
  const a = Ne2[e2] ?? (Ne2[e2] = (0, import_recaptcha_v3.load)(e2, { useRecaptchaNet: true, autoHideBadge: true }));
  return { execute: (t2) => a.then((l) => l.execute(t2)) };
};
var Yt = (e2) => ({ execute: async (a) => {
  const { load: t2 } = useScriptTag("https://challenges.cloudflare.com/turnstile/v0/api.js", void 0, { async: false });
  await t2();
  const l = window.turnstile;
  return new Promise((r2) => {
    l == null || l.ready(() => {
      l.render(".wl-captcha-container", { sitekey: e2, action: a, size: "compact", callback: r2 });
    });
  });
} });
var Jt = "WALINE_USER";
var Qt2 = useStorage(Jt, {});
var be2 = () => Qt2;
var el = ["nick", "mail", "link"];
var We2 = (e2) => e2.filter((a) => el.includes(a));
var Be2 = ["//unpkg.com/@waline/emojis@1.1.0/weibo"];
var tl = ["//unpkg.com/@waline/emojis/tieba/tieba_agree.png", "//unpkg.com/@waline/emojis/tieba/tieba_look_down.png", "//unpkg.com/@waline/emojis/tieba/tieba_sunglasses.png", "//unpkg.com/@waline/emojis/tieba/tieba_pick_nose.png", "//unpkg.com/@waline/emojis/tieba/tieba_awkward.png", "//unpkg.com/@waline/emojis/tieba/tieba_sleep.png"];
var ll = (e2) => new Promise((a, t2) => {
  if (e2.size > 128e3) return t2(new Error("File too large! File size limit 128KB"));
  const l = new FileReader();
  l.readAsDataURL(e2), l.onload = () => a(l.result), l.onerror = t2;
});
var al = (e2) => e2 ? '<p class="wl-tex">TeX is not available in preview</p>' : '<span class="wl-tex">TeX is not available in preview</span>';
var nl = (e2) => {
  const a = async (t2, l = {}) => fetch(`https://api.giphy.com/v1/gifs/${t2}?${new URLSearchParams({ lang: e2, limit: "20", rating: "g", api_key: "6CIMLkNMMOhRcXPoMCPkFy4Ybk2XUiMp", ...l }).toString()}`).then((r2) => r2.json()).then(({ data: r2 }) => r2.map((m3) => ({ title: m3.title, src: m3.images.downsized_medium.url })));
  return { search: (t2) => a("search", { q: t2, offset: "0" }), default: () => a("trending", {}), more: (t2, l = 0) => a("search", { q: t2, offset: l.toString() }) };
};
var il = /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/;
var rl = /</;
var ol = /(?:^|\s)\/\/(.+?)$/gm;
var sl = /\/\*([\S\s]*?)\*\//gm;
var cl = new RegExp(`(${il.source}|${rl.source})|((?:${ol.source})|(?:${sl.source}))`, "gmi");
var De2 = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1", "1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"];
var Ce2 = {};
var ul = (e2) => {
  let a = 0;
  return e2.replace(cl, (t2, l, r2) => {
    if (r2) return `<span style="color: slategray">${r2}</span>`;
    if (l === "<") return "&lt;";
    let m3;
    Ce2[l] ? m3 = Ce2[l] : (m3 = De2[a], Ce2[l] = m3);
    const M2 = `<span style="color: #${m3}">${l}</span>`;
    return a = ++a % De2.length, M2;
  });
};
var ml = ["nick", "nickError", "mail", "mailError", "link", "optional", "placeholder", "sofa", "submit", "like", "cancelLike", "reply", "cancelReply", "comment", "refresh", "more", "preview", "emoji", "uploadImage", "seconds", "minutes", "hours", "days", "now", "uploading", "login", "logout", "admin", "sticky", "word", "wordHint", "anonymous", "level0", "level1", "level2", "level3", "level4", "level5", "gif", "gifSearchPlaceholder", "profile", "approved", "waiting", "spam", "unsticky", "oldest", "latest", "hottest", "reactionTitle"];
var J2 = (e2) => Object.fromEntries(e2.map((a, t2) => [ml[t2], a]));
var vl = J2(["Benutzername", "Der Benutzername darf nicht weniger als 3 Bytes umfassen.", "E-Mail", "Bitte bestätigen Sie Ihre E-Mail-Adresse.", "Webseite", "Optional", "Kommentieren Sie hier...", "Noch keine Kommentare.", "Senden", "Gefällt mir", "Gefällt mir nicht mehr", "Antworten", "Antwort abbrechen", "Kommentare", "Aktualisieren", "Mehr laden...", "Vorschau", "Emoji", "Ein Bild hochladen", "Vor einigen Sekunden", "Vor einigen Minuten", "Vor einigen Stunden", "Vor einigen Tagen", "Gerade eben", "Hochladen läuft", "Anmelden", "Abmelden", "Admin", "Angeheftet", "Wörter", "Bitte geben Sie Kommentare zwischen $0 und $1 Wörtern ein! Aktuelle Anzahl der Wörter: $2", "Anonym", "Zwerge", "Hobbits", "Ents", "Magier", "Elfen", "Maïar", "GIF", "Nach einem GIF suchen", "Profil", "Genehmigt", "Ausstehend", "Spam", "Lösen", "Älteste", "Neueste", "Am beliebtesten", "Was denken Sie?"]);
var Pe2 = J2(["NickName", "NickName cannot be less than 3 bytes.", "E-Mail", "Please confirm your email address.", "Website", "Optional", "Comment here...", "No comment yet.", "Submit", "Like", "Cancel like", "Reply", "Cancel reply", "Comments", "Refresh", "Load More...", "Preview", "Emoji", "Upload Image", "seconds ago", "minutes ago", "hours ago", "days ago", "just now", "Uploading", "Login", "logout", "Admin", "Sticky", "Words", `Please input comments between $0 and $1 words!
 Current word number: $2`, "Anonymous", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Search GIF", "Profile", "Approved", "Waiting", "Spam", "Unsticky", "Oldest", "Latest", "Hottest", "What do you think?"]);
var qe2 = J2(["Nombre de usuario", "El nombre de usuario no puede tener menos de 3 bytes.", "Correo electrónico", "Por favor confirma tu dirección de correo electrónico.", "Sitio web", "Opcional", "Comenta aquí...", "Sin comentarios todavía.", "Enviar", "Like", "Anular like", "Responder", "Anular respuesta", "Comentarios", "Recargar", "Cargar Más...", "Previsualizar", "Emoji", "Subir Imagen", "segundos atrás", "minutos atrás", "horas atrás", "días atrás", "justo ahora", "Subiendo", "Iniciar sesión", "cerrar sesión", "Admin", "Fijado", "Palabras", `Por favor escriba entre $0 y $1 palabras!
 El número actual de palabras: $2`, "Anónimo", "Enanos", "Hobbits", "Ents", "Magos", "Elfos", "Maiar", "GIF", "Buscar GIF", "Perfil", "Aprobado", "Esperando", "Spam", "Desfijar", "Más antiguos", "Más recientes", "Más vistos", "¿Qué piensas?"]);
var Ge2 = J2(["Pseudo", "Le pseudo ne peut pas faire moins de 3 octets.", "E-mail", "Veuillez confirmer votre adresse e-mail.", "Site Web", "Optionnel", "Commentez ici...", "Aucun commentaire pour l'instant.", "Envoyer", "J'aime", "Annuler le j'aime", "Répondre", "Annuler la réponse", "Commentaires", "Actualiser", "Charger plus...", "Aperçu", "Emoji", "Télécharger une image", "Il y a quelques secondes", "Il y a quelques minutes", "Il y a quelques heures", "Il y a quelques jours", "À l'instant", "Téléchargement en cours", "Connexion", "Déconnexion", "Admin", "Épinglé", "Mots", `Veuillez saisir des commentaires entre $0 et $1 mots !
 Nombre actuel de mots : $2`, "Anonyme", "Nains", "Hobbits", "Ents", "Mages", "Elfes", "Maïar", "GIF", "Rechercher un GIF", "Profil", "Approuvé", "En attente", "Indésirable", "Détacher", "Le plus ancien", "Dernier", "Le plus populaire", "Qu'en pensez-vous ?"]);
var Oe2 = J2(["ニックネーム", "3バイト以上のニックネームをご入力ください.", "メールアドレス", "メールアドレスをご確認ください.", "サイト", "オプション", "ここにコメント", "コメントしましょう~", "提出する", "Like", "Cancel like", "返信する", "キャンセル", "コメント", "更新", "さらに読み込む", "プレビュー", "絵文字", "画像をアップロード", "秒前", "分前", "時間前", "日前", "たっだ今", "アップロード", "ログインする", "ログアウト", "管理者", "トップに置く", "ワード", `コメントは $0 から $1 ワードの間でなければなりません!
 現在の単語番号: $2`, "匿名", "うえにん", "なかにん", "しもおし", "特にしもおし", "かげ", "なぬし", "GIF", "探す GIF", "個人情報", "承認済み", "待っている", "スパム", "べたつかない", "逆順", "正順", "人気順", "どう思いますか？"]);
var dl = J2(["Apelido", "Apelido não pode ser menor que 3 bytes.", "E-Mail", "Por favor, confirme seu endereço de e-mail.", "Website", "Opcional", "Comente aqui...", "Nenhum comentário, ainda.", "Enviar", "Like", "Cancel like", "Responder", "Cancelar resposta", "Comentários", "Refrescar", "Carregar Mais...", "Visualizar", "Emoji", "Enviar Imagem", "segundos atrás", "minutos atrás", "horas atrás", "dias atrás", "agora mesmo", "Enviando", "Entrar", "Sair", "Admin", "Sticky", "Palavras", `Favor enviar comentário com $0 a $1 palavras!
 Número de palavras atuais: $2`, "Anônimo", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Pesquisar GIF", "informação pessoal", "Aprovado", "Espera", "Spam", "Unsticky", "Mais velho", "Mais recentes", "Mais quente", "O que você acha?"]);
var Ke2 = J2(["Псевдоним", "Никнейм не может быть меньше 3 байт.", "Эл. адрес", "Пожалуйста, подтвердите адрес вашей электронной почты.", "Веб-сайт", "Необязательный", "Комментарий здесь...", "Пока нет комментариев.", "Отправить", "Like", "Cancel like", "Отвечать", "Отменить ответ", "Комментарии", "Обновить", "Загрузи больше...", "Превью", "эмодзи", "Загрузить изображение", "секунд назад", "несколько минут назад", "несколько часов назад", "дней назад", "прямо сейчас", "Загрузка", "Авторизоваться", "Выход из системы", "Админ", "Липкий", "Слова", `Пожалуйста, введите комментарии от $0 до $1 слов!
Номер текущего слова: $2`, "Анонимный", "Dwarves", "Hobbits", "Ents", "Wizards", "Elves", "Maiar", "GIF", "Поиск GIF", "Персональные данные", "Одобренный", "Ожидающий", "Спам", "Нелипкий", "самый старый", "последний", "самый горячий", "Что вы думаете?"]);
var Ze2 = J2(["Tên", "Tên không được nhỏ hơn 3 ký tự.", "E-Mail", "Vui lòng xác nhập địa chỉ email của bạn.", "Website", "Tùy chọn", "Hãy bình luận có văn hoá!", "Chưa có bình luận", "Gửi", "Thích", "Bỏ thích", "Trả lời", "Hủy bỏ", "bình luận", "Làm mới", "Tải thêm...", "Xem trước", "Emoji", "Tải lên hình ảnh", "giây trước", "phút trước", "giờ trước", "ngày trước", "Vừa xong", "Đang tải lên", "Đăng nhập", "đăng xuất", "Quản trị viên", "Dính", "từ", `Bình luận phải có độ dài giữa $0 và $1 từ!
 Số từ hiện tại: $2`, "Vô danh", "Người lùn", "Người tí hon", "Thần rừng", "Pháp sư", "Tiên tộc", "Maiar", "Ảnh GIF", "Tìm kiếm ảnh GIF", "thông tin cá nhân", "Đã được phê duyệt", "Đang chờ đợi", "Thư rác", "Không dính", "lâu đời nhất", "muộn nhất", "nóng nhất", "What do you think?"]);
var Xe2 = J2(["昵称", "昵称不能少于3个字符", "邮箱", "请填写正确的邮件地址", "网址", "可选", "欢迎评论", "来发评论吧~", "提交", "喜欢", "取消喜欢", "回复", "取消回复", "评论", "刷新", "加载更多...", "预览", "表情", "上传图片", "秒前", "分钟前", "小时前", "天前", "刚刚", "正在上传", "登录", "退出", "博主", "置顶", "字", `评论字数应在 $0 到 $1 字之间！
当前字数：$2`, "匿名", "潜水", "冒泡", "吐槽", "活跃", "话痨", "传说", "表情包", "搜索表情包", "个人资料", "通过", "待审核", "垃圾", "取消置顶", "按倒序", "按正序", "按热度", "你认为这篇文章怎么样？"]);
var pl = J2(["暱稱", "暱稱不能少於3個字元", "郵箱", "請填寫正確的郵件地址", "網址", "可選", "歡迎留言", "來發留言吧~", "送出", "喜歡", "取消喜歡", "回覆", "取消回覆", "留言", "重整", "載入更多...", "預覽", "表情", "上傳圖片", "秒前", "分鐘前", "小時前", "天前", "剛剛", "正在上傳", "登入", "登出", "管理者", "置頂", "字", `留言字數應在 $0 到 $1 字之間！
目前字數：$2`, "匿名", "潛水", "冒泡", "吐槽", "活躍", "多話", "傳說", "表情包", "搜尋表情包", "個人資料", "通過", "待審核", "垃圾", "取消置頂", "最早", "最新", "熱門", "你認為這篇文章怎麼樣？"]);
var Ye = "en-US";
var $e2 = { zh: Xe2, "zh-cn": Xe2, "zh-tw": pl, en: Pe2, "en-us": Pe2, fr: Ge2, "fr-fr": Ge2, jp: Oe2, "jp-jp": Oe2, "pt-br": dl, ru: Ke2, "ru-ru": Ke2, vi: Ze2, "vi-vn": Ze2, de: vl, es: qe2, "es-mx": qe2 };
var gl = (e2) => $e2[e2.toLowerCase()] || $e2[Ye.toLowerCase()];
var Je2 = (e2) => Object.keys($e2).includes(e2.toLowerCase()) ? e2 : Ye;
var Qe2 = { latest: "insertedAt_desc", oldest: "insertedAt_asc", hottest: "like_desc" };
var hl = Object.keys(Qe2);
var he2 = Symbol("waline-config");
var fl = { key: 0, class: "wl-reaction" };
var yl = ["textContent"];
var wl = { class: "wl-reaction-list" };
var kl = ["onClick"];
var bl = { class: "wl-reaction-img" };
var Cl = ["src", "alt"];
var $l = ["textContent"];
var Ll = ["textContent"];
var Il = defineComponent({ __name: "ArticleReaction", setup(e2) {
  const a = Zt2(), t2 = inject(he2), l = ref(-1), r2 = ref([]), m3 = computed(() => t2.value.locale), M2 = computed(() => {
    const { reaction: v2 } = t2.value;
    return v2 != null && v2.length ? v2 : null;
  }), w2 = computed(() => {
    var v2;
    const { path: A } = t2.value;
    return ((v2 = M2.value) == null ? void 0 : v2.map((U3, $3) => ({ icon: U3, desc: m3.value[`reaction${$3}`], active: a.value[A] === $3 }))) ?? null;
  });
  let b2;
  const k2 = async () => {
    const { serverURL: v2, lang: A, path: U3 } = t2.value;
    if (!M2.value) return;
    const $3 = new AbortController();
    b2 = $3.abort.bind($3);
    const [y3] = await p({ serverURL: v2, lang: A, paths: [U3], type: M2.value.map((S2, R2) => `reaction${R2}`), signal: $3.signal });
    r2.value = M2.value.map((S2, R2) => y3[`reaction${R2}`]);
  }, x2 = async (v2) => {
    if (l.value !== -1) return;
    const { serverURL: A, lang: U3, path: $3 } = t2.value, y3 = a.value[$3];
    l.value = v2, y3 !== void 0 && (await d({ serverURL: A, lang: U3, path: $3, type: `reaction${y3}`, action: "desc" }), r2.value[y3] = Math.max(r2.value[y3] - 1, 0)), y3 !== v2 && (await d({ serverURL: A, lang: U3, path: $3, type: `reaction${v2}` }), r2.value[v2] = (r2.value[v2] || 0) + 1), y3 === v2 ? delete a.value[$3] : a.value[$3] = v2, l.value = -1;
  };
  return onMounted(() => {
    watchImmediate(() => [t2.value.serverURL, t2.value.path], () => k2());
  }), onUnmounted(() => {
    b2 == null || b2();
  }), (v2, A) => w2.value ? (openBlock(), createElementBlock("div", fl, [createBaseVNode("div", { class: "wl-reaction-title", textContent: toDisplayString(m3.value.reactionTitle) }, null, 8, yl), createBaseVNode("ul", wl, [(openBlock(true), createElementBlock(Fragment, null, renderList(w2.value, ({ active: U3, icon: $3, desc: y3 }, S2) => (openBlock(), createElementBlock("li", { key: S2, class: normalizeClass(["wl-reaction-item", { active: U3 }]), onClick: (R2) => x2(S2) }, [createBaseVNode("div", bl, [createBaseVNode("img", { src: $3, alt: y3 }, null, 8, Cl), l.value === S2 ? (openBlock(), createBlock(unref(se2), { key: 0, class: "wl-reaction-loading" })) : (openBlock(), createElementBlock("div", { key: 1, class: "wl-reaction-votes", textContent: toDisplayString(r2.value[S2] || 0) }, null, 8, $l))]), createBaseVNode("div", { class: "wl-reaction-text", textContent: toDisplayString(y3) }, null, 8, Ll)], 10, kl))), 128))])])) : createCommentVNode("v-if", true);
} });
var El = ["data-index"];
var Ml = ["src", "title", "onClick"];
var xl = defineComponent({ __name: "ImageWall", props: { items: { default: () => [] }, columnWidth: { default: 300 }, gap: { default: 0 } }, emits: ["insert"], setup(e2) {
  const a = e2;
  let t2 = null;
  const l = useTemplateRef("wall"), r2 = ref({}), m3 = ref([]), M2 = () => {
    const v2 = Math.floor((l.value.getBoundingClientRect().width + a.gap) / (a.columnWidth + a.gap));
    return v2 > 0 ? v2 : 1;
  }, w2 = (v2) => new Array(v2).fill(null).map(() => []), b2 = async (v2) => {
    var A;
    if (v2 >= a.items.length) return;
    await nextTick();
    const U3 = Array.from(((A = l.value) == null ? void 0 : A.children) ?? []).reduce(($3, y3) => y3.getBoundingClientRect().height < $3.getBoundingClientRect().height ? y3 : $3);
    m3.value[Number(U3.dataset.index)].push(v2), await b2(v2 + 1);
  }, k2 = async (v2 = false) => {
    if (m3.value.length === M2() && !v2) return;
    m3.value = w2(M2());
    const A = window.scrollY;
    await b2(0), window.scrollTo({ top: A });
  }, x2 = (v2) => {
    r2.value[v2.target.src] = true;
  };
  return onMounted(() => {
    k2(true), t2 = new ResizeObserver(() => {
      k2();
    }), t2.observe(l.value), watch(() => [a.items], () => {
      r2.value = {}, k2(true);
    }), watch(() => [a.columnWidth, a.gap], () => {
      k2();
    });
  }), onBeforeUnmount(() => {
    t2.unobserve(l.value);
  }), (v2, A) => (openBlock(), createElementBlock("div", { ref_key: "wall", ref: l, class: "wl-gallery", style: normalizeStyle({ gap: `${e2.gap}px` }) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(m3.value, (U3, $3) => (openBlock(), createElementBlock("div", { key: $3, class: "wl-gallery-column", "data-index": $3, style: normalizeStyle({ gap: `${e2.gap}px` }) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(U3, (y3) => (openBlock(), createElementBlock(Fragment, { key: y3 }, [r2.value[e2.items[y3].src] ? createCommentVNode("v-if", true) : (openBlock(), createBlock(unref(se2), { key: 0, size: 36, style: { margin: "20px auto" } })), createBaseVNode("img", { class: "wl-gallery-item", src: e2.items[y3].src, title: e2.items[y3].title, loading: "lazy", onLoad: x2, onClick: (S2) => v2.$emit("insert", `![](${e2.items[y3].src})`) }, null, 40, Ml)], 64))), 128))], 12, El))), 128))], 4));
} });
var Al = (e2) => {
  try {
    e2 = decodeURI(e2);
  } catch {
  }
  return e2;
};
var et = (e2 = "") => e2.replace(/\/$/u, "");
var tt = (e2) => /^(https?:)?\/\//.test(e2);
var Sl = (e2) => {
  const a = et(e2);
  return tt(a) ? a : `https://${a}`;
};
var jl = (e2) => Array.isArray(e2) ? e2 : e2 ? [0, e2] : false;
var ce2 = (e2, a) => e2 == null || e2 === true ? a : e2 === false ? null : e2;
var zl = ({ serverURL: e2, path: a = location.pathname, lang: t2 = typeof navigator > "u" ? "en-US" : navigator.language, locale: l, meta: r2 = ["nick", "mail", "link"], requiredMeta: m3 = [], dark: M2 = false, pageSize: w2 = 10, wordLimit: b2, noCopyright: k2 = false, login: x2 = "enable", recaptchaV3Key: v2 = "", turnstileKey: A = "", commentSorting: U3 = "latest", emoji: $3 = Be2, imageUploader: y3, highlighter: S2, texRenderer: R2, search: c2, reaction: K2, ...X2 }) => ({ serverURL: Sl(e2), path: Al(a), lang: Je2(t2), locale: { ...gl(Je2(t2)), ...typeof l == "object" ? l : {} }, wordLimit: jl(b2), meta: We2(r2), requiredMeta: We2(m3), dark: M2, pageSize: w2, commentSorting: U3, login: x2, noCopyright: k2, recaptchaV3Key: v2, turnstileKey: A, ...X2, reaction: K2 === true ? tl : K2 || null, imageUploader: ce2(y3, ll), highlighter: ce2(S2, ul), texRenderer: ce2(R2, al), emoji: ce2($3, Be2), search: ce2(c2, nl(t2)) });
var Le2 = (e2) => typeof e2 == "string";
var Ie2 = "{--waline-white:#000;--waline-light-grey:#666;--waline-dark-grey:#999;--waline-color:#888;--waline-bg-color:#1e1e1e;--waline-bg-color-light:#272727;--waline-bg-color-hover: #444;--waline-border-color:#333;--waline-disable-bg-color:#444;--waline-disable-color:#272727;--waline-bq-color:#272727;--waline-info-bg-color:#272727;--waline-info-color:#666}";
var Rl = (e2) => Le2(e2) ? e2 === "auto" ? `@media(prefers-color-scheme:dark){body${Ie2}}` : `${e2}${Ie2}` : e2 === true ? `:root${Ie2}` : "";
var Ee2 = (e2, a) => {
  let t2 = e2.toString();
  for (; t2.length < a; ) t2 = "0" + t2;
  return t2;
};
var Vl = (e2) => {
  const a = Ee2(e2.getDate(), 2), t2 = Ee2(e2.getMonth() + 1, 2);
  return `${Ee2(e2.getFullYear(), 2)}-${t2}-${a}`;
};
var Ul = (e2, a, t2) => {
  if (!e2) return "";
  const l = Le2(e2) ? new Date(e2.includes(" ") ? e2.replace(/-/g, "/") : e2) : e2, r2 = a.getTime() - l.getTime(), m3 = Math.floor(r2 / (24 * 3600 * 1e3));
  if (m3 === 0) {
    const M2 = r2 % 864e5, w2 = Math.floor(M2 / (3600 * 1e3));
    if (w2 === 0) {
      const b2 = M2 % 36e5, k2 = Math.floor(b2 / (60 * 1e3));
      if (k2 === 0) {
        const x2 = b2 % 6e4;
        return `${Math.round(x2 / 1e3)} ${t2.seconds}`;
      }
      return `${k2} ${t2.minutes}`;
    }
    return `${w2} ${t2.hours}`;
  }
  return m3 < 0 ? t2.now : m3 < 8 ? `${m3} ${t2.days}` : Vl(l);
};
var _l = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var Hl = (e2) => _l.test(e2);
var Tl = "WALINE_EMOJI";
var lt = useStorage(Tl, {});
var Fl = (e2) => /@[0-9]+\.[0-9]+\.[0-9]+/.test(e2);
var Nl = (e2) => {
  const a = Fl(e2);
  if (a) {
    const t2 = lt.value[e2];
    if (t2) return Promise.resolve(t2);
  }
  return fetch(`${e2}/info.json`).then((t2) => t2.json()).then((t2) => {
    const l = { folder: e2, ...t2 };
    return a && (lt.value[e2] = l), l;
  });
};
var at = (e2, a = "", t2 = "", l = "") => `${a ? `${a}/` : ""}${t2}${e2}${l ? `.${l}` : ""}`;
var Wl = (e2) => Promise.all(e2 ? e2.map((a) => Le2(a) ? Nl(et(a)) : Promise.resolve(a)) : []).then((a) => {
  const t2 = { tabs: [], map: {} };
  return a.forEach((l) => {
    const { name: r2, folder: m3, icon: M2, prefix: w2 = "", type: b2, items: k2 } = l;
    t2.tabs.push({ name: r2, icon: at(M2, m3, w2, b2), items: k2.map((x2) => {
      const v2 = `${w2}${x2}`;
      return t2.map[v2] = at(x2, m3, w2, b2), v2;
    }) });
  }), t2;
});
var Bl = (e2) => e2.type.includes("image");
var nt = (e2) => {
  const a = Array.from(e2).find(Bl);
  return a ? a.getAsFile() : null;
};
var Dl = /\$.*?\$/;
var Pl = /^\$(.*?)\$/;
var ql = /^(?:\s{0,3})\$\$((?:[^\n]|\n[^\n])+?)\n{0,1}\$\$/;
var Gl = (e2) => [{ name: "blockMath", level: "block", tokenizer(a) {
  const t2 = ql.exec(a);
  if (t2 !== null) return { type: "html", raw: t2[0], text: e2(true, t2[1]) };
} }, { name: "inlineMath", level: "inline", start(a) {
  const t2 = a.search(Dl);
  return t2 !== -1 ? t2 : a.length;
}, tokenizer(a) {
  const t2 = Pl.exec(a);
  if (t2 !== null) return { type: "html", raw: t2[0], text: e2(false, t2[1]) };
} }];
var it = (e2 = "", a = {}) => e2.replace(/:(.+?):/g, (t2, l) => a[l] ? `<img class="wl-emoji" src="${a[l]}" alt="${l}">` : t2);
var Ol = (e2, { emojiMap: a, highlighter: t2, texRenderer: l }) => {
  const r2 = new B();
  if (r2.setOptions({ breaks: true }), t2 && r2.use(markedHighlight({ highlight: t2 })), l) {
    const m3 = Gl(l);
    r2.use({ extensions: m3 });
  }
  return r2.parse(it(e2, a));
};
var Kl = (e2) => e2.match(/[\w\d\s,.\u00C0-\u024F\u0400-\u04FF]+/giu);
var Zl = (e2) => e2.match(/[\u4E00-\u9FD5]/gu);
var Xl = (e2) => {
  var a, t2;
  return (((a = Kl(e2)) == null ? void 0 : a.reduce((l, r2) => l + (["", ",", "."].includes(r2.trim()) ? 0 : r2.trim().split(/\s+/u).length), 0)) ?? 0) + (((t2 = Zl(e2)) == null ? void 0 : t2.length) ?? 0);
};
var Yl = async () => {
  const { userAgentData: e2 } = navigator;
  let a = navigator.userAgent;
  if ((e2 == null ? void 0 : e2.platform) !== "Windows") return a;
  const { platformVersion: t2 } = await e2.getHighEntropyValues(["platformVersion"]);
  return t2 && parseInt(t2.split(".")[0]) >= 13 && (a = a.replace("Windows NT 10.0", "Windows NT 11.0")), a;
};
var Jl = { key: 0, class: "wl-login-info" };
var Ql = { class: "wl-avatar" };
var ea = ["title"];
var ta = ["title"];
var la = ["src"];
var aa = ["title", "textContent"];
var na = { class: "wl-panel" };
var ia = ["for", "textContent"];
var ra = ["id", "onUpdate:modelValue", "name", "type"];
var oa = ["placeholder"];
var sa = { class: "wl-preview" };
var ca = ["innerHTML"];
var ua = { class: "wl-footer" };
var ma = { class: "wl-actions" };
var va = { href: "https://guides.github.com/features/mastering-markdown/", title: "Markdown Guide", "aria-label": "Markdown is supported", class: "wl-action", target: "_blank", rel: "noopener noreferrer" };
var da = ["title"];
var pa = ["title"];
var ga = ["title", "aria-label"];
var ha = ["title"];
var fa = { class: "wl-info" };
var ya = { class: "wl-text-number" };
var wa = { key: 0 };
var ka = ["textContent"];
var ba = ["textContent"];
var Ca = ["disabled"];
var $a = ["placeholder"];
var La = { key: 1, class: "wl-loading" };
var Ia = { key: 0, class: "wl-tab-wrapper" };
var Ea = ["title", "onClick"];
var Ma = ["src", "alt"];
var xa = { key: 0, class: "wl-tabs" };
var Aa = ["onClick"];
var Sa = ["src", "alt", "title"];
var ja = ["title"];
var rt = defineComponent({ __name: "CommentBox", props: { edit: {}, rootId: {}, replyId: {}, replyUser: {} }, emits: ["log", "cancelEdit", "cancelReply", "submit"], setup(e2, { emit: a }) {
  const t2 = e2, l = a, r2 = inject(he2), m3 = Pt(), M2 = Dt(), w2 = be2(), b2 = ref({}), k2 = useTemplateRef("textarea"), x2 = useTemplateRef("image-uploader"), v2 = useTemplateRef("emoji-button"), A = useTemplateRef("emoji-popup"), U3 = useTemplateRef("gif-button"), $3 = useTemplateRef("gif-popup"), y3 = useTemplateRef("gif-search"), S2 = ref({ tabs: [], map: {} }), R2 = ref(0), c2 = ref(false), K2 = ref(false), X2 = ref(false), I2 = ref(""), V2 = ref(0), T2 = reactive({ loading: true, list: [] }), ae2 = ref(0), ee = ref(false), ue2 = ref(""), d2 = ref(false), j2 = ref(false), p2 = computed(() => r2.value.locale), F2 = computed(() => !!w2.value.token), q2 = computed(() => r2.value.imageUploader !== null), G2 = (u4) => {
    const n2 = k2.value, h3 = n2.selectionStart, H = n2.selectionEnd || 0, g = n2.scrollTop;
    m3.value = n2.value.substring(0, h3) + u4 + n2.value.substring(H, n2.value.length), n2.focus(), n2.selectionStart = h3 + u4.length, n2.selectionEnd = h3 + u4.length, n2.scrollTop = g;
  }, ie2 = ({ key: u4, ctrlKey: n2, metaKey: h3 }) => {
    d2.value || (n2 || h3) && u4 === "Enter" && Me2();
  }, me2 = async (u4) => {
    const n2 = `![${r2.value.locale.uploading} ${u4.name}]()`;
    G2(n2), d2.value = true;
    try {
      const h3 = await r2.value.imageUploader(u4);
      m3.value = m3.value.replace(n2, `\r
![${u4.name}](${h3})`);
    } catch (h3) {
      alert(h3.message), m3.value = m3.value.replace(n2, "");
    } finally {
      d2.value = false;
    }
  }, fe2 = (u4) => {
    var n2;
    if ((n2 = u4.dataTransfer) != null && n2.items) {
      const h3 = nt(u4.dataTransfer.items);
      h3 && q2.value && (me2(h3), u4.preventDefault());
    }
  }, st = (u4) => {
    if (u4.clipboardData) {
      const n2 = nt(u4.clipboardData.items);
      n2 && q2.value && me2(n2);
    }
  }, ct = () => {
    const u4 = x2.value;
    u4.files && q2.value && me2(u4.files[0]).then(() => {
      u4.value = "";
    });
  }, Me2 = async () => {
    var u4;
    const { serverURL: n2, lang: h3, login: H, wordLimit: g, requiredMeta: D2, recaptchaV3Key: N2, turnstileKey: Y } = r2.value, _2 = { comment: ue2.value, nick: M2.value.nick, mail: M2.value.mail, link: M2.value.link, url: r2.value.path, ua: await Yl() };
    if (!t2.edit) if (w2.value.token) _2.nick = w2.value.display_name, _2.mail = w2.value.email, _2.link = w2.value.url;
    else {
      if (H === "force") return;
      if (D2.includes("nick") && !_2.nick) {
        b2.value.nick.focus(), alert(p2.value.nickError);
        return;
      }
      if (D2.includes("mail") && !_2.mail || _2.mail && !Hl(_2.mail)) {
        b2.value.mail.focus(), alert(p2.value.mailError);
        return;
      }
      _2.nick || (_2.nick = p2.value.anonymous);
    }
    if (!_2.comment) {
      k2.value.focus();
      return;
    }
    if (!ee.value) {
      alert(p2.value.wordHint.replace("$0", g[0].toString()).replace("$1", g[1].toString()).replace("$2", V2.value.toString()));
      return;
    }
    _2.comment = it(_2.comment, S2.value.map), t2.replyId && t2.rootId && (_2.pid = t2.replyId, _2.rid = t2.rootId, _2.at = t2.replyUser), d2.value = true;
    try {
      N2 && (_2.recaptchaV3 = await Xt(N2).execute("social")), Y && (_2.turnstile = await Yt(Y).execute("social"));
      const ve2 = { serverURL: n2, lang: h3, token: w2.value.token, comment: _2 }, ye2 = await (t2.edit ? U({ objectId: t2.edit.objectId, ...ve2 }) : u(ve2));
      if (d2.value = false, ye2.errmsg) {
        alert(ye2.errmsg);
        return;
      }
      l("submit", ye2.data), m3.value = "", I2.value = "", await nextTick(), t2.replyId && l("cancelReply"), (u4 = t2.edit) != null && u4.objectId && l("cancelEdit");
    } catch (ve2) {
      d2.value = false, alert(ve2.message);
    }
  }, ut = (u4) => {
    u4.preventDefault();
    const { lang: n2, serverURL: h3 } = r2.value;
    R({ serverURL: h3, lang: n2 }).then((H) => {
      w2.value = H, (H.remember ? localStorage : sessionStorage).setItem("WALINE_USER", JSON.stringify(H)), l("log");
    });
  }, mt = () => {
    w2.value = {}, localStorage.setItem("WALINE_USER", "null"), sessionStorage.setItem("WALINE_USER", "null"), l("log");
  }, xe = (u4) => {
    u4.preventDefault();
    const { lang: n2, serverURL: h3 } = r2.value, H = 800, g = 800, D2 = (window.innerWidth - H) / 2, N2 = (window.innerHeight - g) / 2, Y = new URLSearchParams({ lng: n2, token: w2.value.token }), _2 = window.open(`${h3}/ui/profile?${Y.toString()}`, "_blank", `width=${H},height=${g},left=${D2},top=${N2},scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no`);
    _2 == null || _2.postMessage({ type: "TOKEN", data: w2.value.token }, "*");
  }, vt = (u4) => {
    var n2, h3, H, g;
    !((n2 = v2.value) != null && n2.contains(u4.target)) && !((h3 = A.value) != null && h3.contains(u4.target)) && (c2.value = false), !((H = U3.value) != null && H.contains(u4.target)) && !((g = $3.value) != null && g.contains(u4.target)) && (K2.value = false);
  }, Ae2 = async (u4) => {
    var n2;
    const { scrollTop: h3, clientHeight: H, scrollHeight: g } = u4.target, D2 = (H + h3) / g, N2 = r2.value.search, Y = ((n2 = y3.value) == null ? void 0 : n2.value) ?? "";
    D2 < 0.9 || T2.loading || j2.value || (T2.loading = true, (N2.more && T2.list.length ? await N2.more(Y, T2.list.length) : await N2.search(Y)).length ? T2.list = [...T2.list, ...N2.more && T2.list.length ? await N2.more(Y, T2.list.length) : await N2.search(Y)] : j2.value = true, T2.loading = false, setTimeout(() => {
      u4.target.scrollTop = h3;
    }, 50));
  }, Se2 = useDebounceFn((u4) => {
    T2.list = [], j2.value = false, Ae2(u4);
  }, 300);
  return useEventListener("click", vt), useEventListener("message", ({ data: u4 }) => {
    (u4 == null ? void 0 : u4.type) === "profile" && (w2.value = { ...w2.value, ...u4.data }, [localStorage, sessionStorage].filter((n2) => n2.getItem("WALINE_USER")).forEach((n2) => {
      n2.setItem("WALINE_USER", JSON.stringify(w2));
    }));
  }), watchImmediate([r2, V2], ([u4, n2]) => {
    const { wordLimit: h3 } = u4;
    h3 ? n2 < h3[0] && h3[0] !== 0 ? (ae2.value = h3[0], ee.value = false) : n2 > h3[1] ? (ae2.value = h3[1], ee.value = false) : (ae2.value = h3[1], ee.value = true) : (ae2.value = 0, ee.value = true);
  }), watch(K2, async (u4) => {
    var n2;
    if (!u4) return;
    const h3 = r2.value.search;
    y3.value && (y3.value.value = ""), T2.loading = true, T2.list = await (((n2 = h3.default) == null ? void 0 : n2.call(h3)) ?? h3.search("")), T2.loading = false;
  }), onMounted(() => {
    var u4;
    (u4 = t2.edit) != null && u4.objectId && (m3.value = t2.edit.orig), watchImmediate(() => m3.value, (n2) => {
      const { highlighter: h3, texRenderer: H } = r2.value;
      ue2.value = n2, I2.value = Ol(n2, { emojiMap: S2.value.map, highlighter: h3, texRenderer: H }), V2.value = Xl(n2), n2 ? autosize_esm_default(k2.value) : autosize_esm_default.destroy(k2.value);
    }), watchImmediate(() => r2.value.emoji, async (n2) => {
      S2.value = await Wl(n2);
    });
  }), (u4, n2) => {
    var h3, H;
    return openBlock(), createElementBlock("div", { key: unref(w2).token, class: "wl-comment" }, [unref(r2).login !== "disable" && F2.value && !((h3 = e2.edit) != null && h3.objectId) ? (openBlock(), createElementBlock("div", Jl, [createBaseVNode("div", Ql, [createBaseVNode("button", { type: "submit", class: "wl-logout-btn", title: p2.value.logout, onClick: mt }, [createVNode(unref(Te2), { size: 14 })], 8, ea), createBaseVNode("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: p2.value.profile, onClick: xe }, [createBaseVNode("img", { src: unref(w2).avatar, alt: "avatar" }, null, 8, la)], 8, ta)]), createBaseVNode("a", { href: "#", class: "wl-login-nick", "aria-label": "Profile", title: p2.value.profile, onClick: xe, textContent: toDisplayString(unref(w2).display_name) }, null, 8, aa)])) : createCommentVNode("v-if", true), createBaseVNode("div", na, [unref(r2).login !== "force" && unref(r2).meta.length && !F2.value ? (openBlock(), createElementBlock("div", { key: 0, class: normalizeClass(["wl-header", `item${unref(r2).meta.length}`]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(r2).meta, (g) => (openBlock(), createElementBlock("div", { key: g, class: "wl-header-item" }, [createBaseVNode("label", { for: `wl-${g}`, textContent: toDisplayString(p2.value[g] + (unref(r2).requiredMeta.includes(g) || !unref(r2).requiredMeta.length ? "" : `(${p2.value.optional})`)) }, null, 8, ia), withDirectives(createBaseVNode("input", { id: `wl-${g}`, ref_for: true, ref: (D2) => {
      D2 && (b2.value[g] = D2);
    }, "onUpdate:modelValue": (D2) => unref(M2)[g] = D2, class: normalizeClass(["wl-input", `wl-${g}`]), name: g, type: g === "mail" ? "email" : "text" }, null, 10, ra), [[vModelDynamic, unref(M2)[g]]])]))), 128))], 2)) : createCommentVNode("v-if", true), withDirectives(createBaseVNode("textarea", { id: "wl-edit", ref: "textarea", "onUpdate:modelValue": n2[0] || (n2[0] = (g) => isRef(m3) ? m3.value = g : null), class: "wl-editor", placeholder: e2.replyUser ? `@${e2.replyUser}` : p2.value.placeholder, onKeydown: ie2, onDrop: fe2, onPaste: st }, null, 40, oa), [[vModelText, unref(m3)]]), withDirectives(createBaseVNode("div", sa, [n2[7] || (n2[7] = createBaseVNode("hr", null, null, -1)), createBaseVNode("h4", null, toDisplayString(p2.value.preview) + ":", 1), createBaseVNode("div", { class: "wl-content", innerHTML: I2.value }, null, 8, ca)], 512), [[vShow, X2.value]]), createBaseVNode("div", ua, [createBaseVNode("div", ma, [createBaseVNode("a", va, [createVNode(unref(Ht2))]), withDirectives(createBaseVNode("button", { ref: "emoji-button", type: "button", class: normalizeClass(["wl-action", { active: c2.value }]), title: p2.value.emoji, onClick: n2[1] || (n2[1] = (g) => c2.value = !c2.value) }, [createVNode(unref(Rt))], 10, da), [[vShow, S2.value.tabs.length]]), unref(r2).search ? (openBlock(), createElementBlock("button", { key: 0, ref: "gif-button", type: "button", class: normalizeClass(["wl-action", { active: K2.value }]), title: p2.value.gif, onClick: n2[2] || (n2[2] = (g) => K2.value = !K2.value) }, [createVNode(unref(Bt))], 10, pa)) : createCommentVNode("v-if", true), createBaseVNode("input", { id: "wl-image-upload", ref: "image-uploader", class: "upload", "aria-hidden": "true", type: "file", accept: ".png,.jpg,.jpeg,.webp,.bmp,.gif", onChange: ct }, null, 544), q2.value ? (openBlock(), createElementBlock("label", { key: 1, for: "wl-image-upload", class: "wl-action", title: p2.value.uploadImage, "aria-label": p2.value.uploadImage }, [createVNode(unref(Vt))], 8, ga)) : createCommentVNode("v-if", true), createBaseVNode("button", { type: "button", class: normalizeClass(["wl-action", { active: X2.value }]), title: p2.value.preview, onClick: n2[3] || (n2[3] = (g) => X2.value = !X2.value) }, [createVNode(unref(_t))], 10, ha)]), createBaseVNode("div", fa, [n2[9] || (n2[9] = createBaseVNode("div", { class: "wl-captcha-container" }, null, -1)), createBaseVNode("div", ya, [createTextVNode(toDisplayString(V2.value) + " ", 1), unref(r2).wordLimit ? (openBlock(), createElementBlock("span", wa, [n2[8] || (n2[8] = createTextVNode("  /  ", -1)), createBaseVNode("span", { class: normalizeClass({ illegal: !ee.value }), textContent: toDisplayString(ae2.value) }, null, 10, ka)])) : createCommentVNode("v-if", true), createTextVNode("  " + toDisplayString(p2.value.word), 1)]), unref(r2).login !== "disable" && !F2.value ? (openBlock(), createElementBlock("button", { key: 0, type: "button", class: "wl-btn", onClick: ut, textContent: toDisplayString(p2.value.login) }, null, 8, ba)) : createCommentVNode("v-if", true), unref(r2).login !== "force" || F2.value ? (openBlock(), createElementBlock("button", { key: 1, type: "submit", class: "primary wl-btn", title: "Cmd|Ctrl + Enter", disabled: d2.value, onClick: Me2 }, [d2.value ? (openBlock(), createBlock(unref(se2), { key: 0, size: 16 })) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(p2.value.submit), 1)], 64))], 8, Ca)) : createCommentVNode("v-if", true)]), createBaseVNode("div", { ref: "gif-popup", class: normalizeClass(["wl-gif-popup", { display: K2.value }]) }, [createBaseVNode("input", { ref: "gif-search", type: "text", placeholder: p2.value.gifSearchPlaceholder, onInput: n2[4] || (n2[4] = (...g) => unref(Se2) && unref(Se2)(...g)) }, null, 40, $a), T2.list.length ? (openBlock(), createBlock(xl, { key: 0, items: T2.list, "column-width": 200, gap: 6, onInsert: n2[5] || (n2[5] = (g) => G2(g)), onScroll: Ae2 }, null, 8, ["items"])) : createCommentVNode("v-if", true), T2.loading ? (openBlock(), createElementBlock("div", La, [createVNode(unref(se2), { size: 30 })])) : createCommentVNode("v-if", true)], 2), createBaseVNode("div", { ref: "emoji-popup", class: normalizeClass(["wl-emoji-popup", { display: c2.value }]) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(S2.value.tabs, (g, D2) => (openBlock(), createElementBlock(Fragment, { key: g.name }, [D2 === R2.value ? (openBlock(), createElementBlock("div", Ia, [(openBlock(true), createElementBlock(Fragment, null, renderList(g.items, (N2) => (openBlock(), createElementBlock("button", { key: N2, type: "button", title: N2, onClick: (Y) => G2(`:${N2}:`) }, [c2.value ? (openBlock(), createElementBlock("img", { key: 0, class: "wl-emoji", src: S2.value.map[N2], alt: N2, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, Ma)) : createCommentVNode("v-if", true)], 8, Ea))), 128))])) : createCommentVNode("v-if", true)], 64))), 128)), S2.value.tabs.length > 1 ? (openBlock(), createElementBlock("div", xa, [(openBlock(true), createElementBlock(Fragment, null, renderList(S2.value.tabs, (g, D2) => (openBlock(), createElementBlock("button", { key: g.name, type: "button", class: normalizeClass(["wl-tab", { active: R2.value === D2 }]), onClick: (N2) => R2.value = D2 }, [createBaseVNode("img", { class: "wl-emoji", src: g.icon, alt: g.name, title: g.name, loading: "lazy", referrerPolicy: "no-referrer" }, null, 8, Sa)], 10, Aa))), 128))])) : createCommentVNode("v-if", true)], 2)])]), e2.replyId || (H = e2.edit) != null && H.objectId ? (openBlock(), createElementBlock("button", { key: 1, type: "button", class: "wl-close", title: p2.value.cancelReply, onClick: n2[6] || (n2[6] = (g) => e2.replyId ? l("cancelReply") : l("cancelEdit")) }, [createVNode(unref(Te2), { size: 24 })], 8, ja)) : createCommentVNode("v-if", true)]);
  };
} });
var za = ["id"];
var Ra = { class: "wl-user", "aria-hidden": "true" };
var Va = ["src"];
var Ua = { class: "wl-card" };
var _a = { class: "wl-head" };
var Ha = ["href"];
var Ta = { key: 1, class: "wl-nick" };
var Fa = ["textContent"];
var Na = ["textContent"];
var Wa = ["textContent"];
var Ba = ["textContent"];
var Da = { class: "wl-comment-actions" };
var Pa = ["title"];
var qa = ["title"];
var Ga = { class: "wl-meta", "aria-hidden": "true" };
var Oa = ["data-value", "textContent"];
var Ka = { key: 0, class: "wl-content" };
var Za = { key: 0 };
var Xa = ["href"];
var Ya = ["innerHTML"];
var Ja = { key: 1, class: "wl-admin-actions" };
var Qa = { class: "wl-comment-status" };
var en = ["disabled", "onClick", "textContent"];
var tn = { key: 3, class: "wl-quote" };
var ln = defineComponent({ __name: "CommentCard", props: { comment: {}, edit: {}, rootId: {}, reply: {} }, emits: ["log", "submit", "delete", "like", "sticky", "edit", "reply", "status"], setup(e2, { emit: a }) {
  const t2 = e2, l = a, r2 = ["approved", "waiting", "spam"], m3 = inject(he2), M2 = Fe2(), w2 = useNow(), b2 = be2(), k2 = computed(() => m3.value.locale), x2 = computed(() => {
    const { link: R2 } = t2.comment;
    return R2 ? tt(R2) ? R2 : `https://${R2}` : "";
  }), v2 = computed(() => M2.value.includes(t2.comment.objectId)), A = computed(() => Ul(new Date(t2.comment.time), w2.value, k2.value)), U3 = computed(() => b2.value.type === "administrator"), $3 = computed(() => t2.comment.user_id && b2.value.objectId === t2.comment.user_id), y3 = computed(() => {
    var R2;
    return t2.comment.objectId === ((R2 = t2.reply) == null ? void 0 : R2.objectId);
  }), S2 = computed(() => {
    var R2;
    return t2.comment.objectId === ((R2 = t2.edit) == null ? void 0 : R2.objectId);
  });
  return (R2, c2) => {
    var K2;
    const X2 = resolveComponent("CommentCard", true);
    return openBlock(), createElementBlock("div", { id: e2.comment.objectId.toString(), class: "wl-card-item" }, [createBaseVNode("div", Ra, [e2.comment.avatar ? (openBlock(), createElementBlock("img", { key: 0, class: "wl-user-avatar", src: e2.comment.avatar, alt: "" }, null, 8, Va)) : createCommentVNode("v-if", true), e2.comment.type === "guest" ? (openBlock(), createBlock(unref(Nt2), { key: 1 })) : createCommentVNode("v-if", true), e2.comment.type === "administrator" ? (openBlock(), createBlock(unref(Wt), { key: 2 })) : createCommentVNode("v-if", true)]), createBaseVNode("div", Ua, [createBaseVNode("div", _a, [x2.value ? (openBlock(), createElementBlock("a", { key: 0, class: "wl-nick", href: x2.value, target: "_blank", rel: "nofollow noopener noreferrer" }, toDisplayString(e2.comment.nick), 9, Ha)) : (openBlock(), createElementBlock("span", Ta, toDisplayString(e2.comment.nick), 1)), e2.comment.label ? (openBlock(), createElementBlock("span", { key: 2, class: "wl-badge", textContent: toDisplayString(e2.comment.label) }, null, 8, Fa)) : createCommentVNode("v-if", true), e2.comment.sticky ? (openBlock(), createElementBlock("span", { key: 3, class: "wl-badge", textContent: toDisplayString(k2.value.sticky) }, null, 8, Na)) : createCommentVNode("v-if", true), typeof e2.comment.level == "number" ? (openBlock(), createElementBlock("span", { key: 4, class: normalizeClass(`wl-badge level${e2.comment.level}`), textContent: toDisplayString(k2.value[`level${e2.comment.level}`] || `Level ${e2.comment.level}`) }, null, 10, Wa)) : createCommentVNode("v-if", true), createBaseVNode("span", { class: "wl-time", textContent: toDisplayString(A.value) }, null, 8, Ba), createBaseVNode("div", Da, [U3.value || $3.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("button", { type: "button", class: "wl-edit", onClick: c2[0] || (c2[0] = (I2) => l("edit", e2.comment)) }, [createVNode(unref(Ft2))]), createBaseVNode("button", { type: "button", class: "wl-delete", onClick: c2[1] || (c2[1] = (I2) => l("delete", e2.comment)) }, [createVNode(unref(zt))])], 64)) : createCommentVNode("v-if", true), createBaseVNode("button", { type: "button", class: "wl-like", title: v2.value ? k2.value.cancelLike : k2.value.like, onClick: c2[2] || (c2[2] = (I2) => l("like", e2.comment)) }, [createVNode(unref(Ut2), { active: v2.value }, null, 8, ["active"]), createTextVNode(" " + toDisplayString("like" in e2.comment ? e2.comment.like : ""), 1)], 8, Pa), createBaseVNode("button", { type: "button", class: normalizeClass(["wl-reply", { active: y3.value }]), title: y3.value ? k2.value.cancelReply : k2.value.reply, onClick: c2[3] || (c2[3] = (I2) => l("reply", y3.value ? null : e2.comment)) }, [createVNode(unref(Tt))], 10, qa)])]), createBaseVNode("div", Ga, [(openBlock(), createElementBlock(Fragment, null, renderList(["addr", "browser", "os"], (I2) => (openBlock(), createElementBlock(Fragment, null, [e2.comment[I2] ? (openBlock(), createElementBlock("span", { key: I2, class: normalizeClass(`wl-${I2}`), "data-value": e2.comment[I2], textContent: toDisplayString(e2.comment[I2]) }, null, 10, Oa)) : createCommentVNode("v-if", true)], 64))), 64))]), S2.value ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", Ka, ["reply_user" in e2.comment && e2.comment.reply_user ? (openBlock(), createElementBlock("p", Za, [createBaseVNode("a", { href: "#" + e2.comment.pid }, "@" + toDisplayString(e2.comment.reply_user.nick), 9, Xa), c2[17] || (c2[17] = createBaseVNode("span", null, ": ", -1))])) : createCommentVNode("v-if", true), createBaseVNode("div", { innerHTML: e2.comment.comment }, null, 8, Ya)])), U3.value && !S2.value ? (openBlock(), createElementBlock("div", Ja, [createBaseVNode("span", Qa, [(openBlock(), createElementBlock(Fragment, null, renderList(r2, (I2) => createBaseVNode("button", { key: I2, type: "submit", class: normalizeClass(`wl-btn wl-${I2}`), disabled: e2.comment.status === I2, onClick: (V2) => l("status", { status: I2, comment: e2.comment }), textContent: toDisplayString(k2.value[I2]) }, null, 10, en)), 64))]), U3.value && !("rid" in e2.comment) ? (openBlock(), createElementBlock("button", { key: 0, type: "submit", class: "wl-btn wl-sticky", onClick: c2[4] || (c2[4] = (I2) => l("sticky", e2.comment)) }, toDisplayString(e2.comment.sticky ? k2.value.unsticky : k2.value.sticky), 1)) : createCommentVNode("v-if", true)])) : createCommentVNode("v-if", true), y3.value || S2.value ? (openBlock(), createElementBlock("div", { key: 2, class: normalizeClass({ "wl-reply-wrapper": y3.value, "wl-edit-wrapper": S2.value }) }, [createVNode(rt, { edit: e2.edit, "reply-id": (K2 = e2.reply) == null ? void 0 : K2.objectId, "reply-user": e2.comment.nick, "root-id": e2.rootId, onLog: c2[5] || (c2[5] = (I2) => l("log")), onCancelReply: c2[6] || (c2[6] = (I2) => l("reply", null)), onCancelEdit: c2[7] || (c2[7] = (I2) => l("edit", null)), onSubmit: c2[8] || (c2[8] = (I2) => l("submit", I2)) }, null, 8, ["edit", "reply-id", "reply-user", "root-id"])], 2)) : createCommentVNode("v-if", true), "children" in e2.comment ? (openBlock(), createElementBlock("div", tn, [(openBlock(true), createElementBlock(Fragment, null, renderList(e2.comment.children, (I2) => (openBlock(), createBlock(X2, { key: I2.objectId, comment: I2, reply: e2.reply, edit: e2.edit, "root-id": e2.rootId, onLog: c2[9] || (c2[9] = (V2) => l("log")), onDelete: c2[10] || (c2[10] = (V2) => l("delete", V2)), onEdit: c2[11] || (c2[11] = (V2) => l("edit", V2)), onLike: c2[12] || (c2[12] = (V2) => l("like", V2)), onReply: c2[13] || (c2[13] = (V2) => l("reply", V2)), onStatus: c2[14] || (c2[14] = (V2) => l("status", V2)), onSticky: c2[15] || (c2[15] = (V2) => l("sticky", V2)), onSubmit: c2[16] || (c2[16] = (V2) => l("submit", V2)) }, null, 8, ["comment", "reply", "edit", "root-id"]))), 128))])) : createCommentVNode("v-if", true)])], 8, za);
  };
} });
var ot = "3.7.1";
var an = { "data-waline": "" };
var nn = { class: "wl-meta-head" };
var rn = { class: "wl-count" };
var on = ["textContent"];
var sn = { class: "wl-sort" };
var cn = ["onClick"];
var un = { class: "wl-cards" };
var mn = { key: 1, class: "wl-operation" };
var vn = ["textContent"];
var dn = { key: 2, class: "wl-loading" };
var pn = ["textContent"];
var gn = { key: 4, class: "wl-operation" };
var hn = ["textContent"];
var fn = { key: 5, class: "wl-power" };
var yn = defineComponent({ __name: "WalineComment", props: { serverURL: {}, path: {}, meta: {}, requiredMeta: {}, wordLimit: {}, pageSize: {}, lang: {}, locale: {}, commentSorting: {}, dark: { type: [String, Boolean] }, login: {}, noCopyright: { type: Boolean }, recaptchaV3Key: {}, turnstileKey: {}, reaction: { type: [Array, Boolean] }, emoji: {}, search: {}, highlighter: { type: Function }, imageUploader: { type: Function }, texRenderer: { type: Function } }, setup(e2) {
  const a = e2, t2 = be2(), l = Fe2(), r2 = ref("loading"), m3 = ref(0), M2 = ref(1), w2 = ref(0), b2 = computed(() => zl(a)), k2 = ref(b2.value.commentSorting), x2 = ref([]), v2 = ref(null), A = ref(null), U3 = computed(() => Rl(b2.value.dark)), $3 = computed(() => b2.value.locale);
  useStyleTag(U3, { id: "waline-darkmode" });
  let y3 = null;
  const S2 = (d2) => {
    const { serverURL: j2, path: p2, pageSize: F2 } = b2.value, q2 = new AbortController();
    r2.value = "loading", y3 == null || y3(), $({ serverURL: j2, lang: b2.value.lang, path: p2, pageSize: F2, sortBy: Qe2[k2.value], page: d2, signal: q2.signal, token: t2.value.token }).then((G2) => {
      r2.value = "success", m3.value = G2.count, x2.value.push(...G2.data), M2.value = d2, w2.value = G2.totalPages;
    }).catch((G2) => {
      G2.name !== "AbortError" && (console.error(G2.message), r2.value = "error");
    }), y3 = q2.abort.bind(q2);
  }, R2 = () => {
    S2(M2.value + 1);
  }, c2 = () => {
    m3.value = 0, x2.value = [], S2(1);
  }, K2 = (d2) => {
    k2.value !== d2 && (k2.value = d2, c2());
  }, X2 = (d2) => {
    v2.value = d2;
  }, I2 = (d2) => {
    A.value = d2;
  }, V2 = (d2) => {
    if (A.value) A.value.comment = d2.comment, A.value.orig = d2.orig;
    else if ("rid" in d2) {
      const j2 = x2.value.find(({ objectId: p2 }) => p2 === d2.rid);
      if (!j2) return;
      Array.isArray(j2.children) || (j2.children = []), j2.children.push(d2);
    } else x2.value.unshift(d2), m3.value += 1;
  }, T2 = async ({ comment: d2, status: j2 }) => {
    if (d2.status === j2) return;
    const { serverURL: p2, lang: F2 } = b2.value;
    await U({ serverURL: p2, lang: F2, token: t2.value.token, objectId: d2.objectId, comment: { status: j2 } }), d2.status = j2;
  }, ae2 = async (d2) => {
    if ("rid" in d2) return;
    const { serverURL: j2, lang: p2 } = b2.value;
    await U({ serverURL: j2, lang: p2, token: t2.value.token, objectId: d2.objectId, comment: { sticky: d2.sticky ? 0 : 1 } }), d2.sticky = !d2.sticky;
  }, ee = async ({ objectId: d2 }) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    const { serverURL: j2, lang: p2 } = b2.value;
    await y({ serverURL: j2, lang: p2, token: t2.value.token, objectId: d2 }), x2.value.some((F2, q2) => F2.objectId === d2 ? (x2.value = x2.value.filter((G2, ie2) => ie2 !== q2), true) : F2.children.some((G2, ie2) => G2.objectId === d2 ? (x2.value[q2].children = F2.children.filter((me2, fe2) => fe2 !== ie2), true) : false));
  }, ue2 = async (d2) => {
    const { serverURL: j2, lang: p2 } = b2.value, { objectId: F2 } = d2, q2 = l.value.includes(F2);
    await U({ serverURL: j2, lang: p2, objectId: F2, token: t2.value.token, comment: { like: !q2 } }), q2 ? l.value = l.value.filter((G2) => G2 !== F2) : (l.value = [...l.value, F2], l.value.length > 50 && (l.value = l.value.slice(-50))), d2.like = Math.max(0, (d2.like || 0) + (q2 ? -1 : 1));
  };
  return provide(he2, b2), onMounted(() => {
    watchImmediate(() => [a.serverURL, a.path], () => {
      c2();
    });
  }), onUnmounted(() => {
    y3 == null || y3();
  }), (d2, j2) => (openBlock(), createElementBlock("div", an, [createVNode(Il), !v2.value && !A.value ? (openBlock(), createBlock(rt, { key: 0, onLog: c2, onSubmit: V2 })) : createCommentVNode("v-if", true), createBaseVNode("div", nn, [createBaseVNode("div", rn, [m3.value ? (openBlock(), createElementBlock("span", { key: 0, class: "wl-num", textContent: toDisplayString(m3.value) }, null, 8, on)) : createCommentVNode("v-if", true), createTextVNode(" " + toDisplayString($3.value.comment), 1)]), createBaseVNode("ul", sn, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(hl), (p2) => (openBlock(), createElementBlock("li", { key: p2, class: normalizeClass([p2 === k2.value ? "active" : ""]), onClick: (F2) => K2(p2) }, toDisplayString($3.value[p2]), 11, cn))), 128))])]), createBaseVNode("div", un, [(openBlock(true), createElementBlock(Fragment, null, renderList(x2.value, (p2) => (openBlock(), createBlock(ln, { key: p2.objectId, "root-id": p2.objectId, comment: p2, reply: v2.value, edit: A.value, onLog: c2, onReply: X2, onEdit: I2, onSubmit: V2, onStatus: T2, onDelete: ee, onSticky: ae2, onLike: ue2 }, null, 8, ["root-id", "comment", "reply", "edit"]))), 128))]), r2.value === "error" ? (openBlock(), createElementBlock("div", mn, [createBaseVNode("button", { type: "button", class: "wl-btn", onClick: c2, textContent: toDisplayString($3.value.refresh) }, null, 8, vn)])) : r2.value === "loading" ? (openBlock(), createElementBlock("div", dn, [createVNode(unref(se2), { size: 30 })])) : x2.value.length ? M2.value < w2.value ? (openBlock(), createElementBlock("div", gn, [createBaseVNode("button", { type: "button", class: "wl-btn", onClick: R2, textContent: toDisplayString($3.value.more) }, null, 8, hn)])) : createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", { key: 3, class: "wl-empty", textContent: toDisplayString($3.value.sofa) }, null, 8, pn)), b2.value.noCopyright ? createCommentVNode("v-if", true) : (openBlock(), createElementBlock("div", fn, [j2[0] || (j2[0] = createTextVNode(" Powered by ", -1)), j2[1] || (j2[1] = createBaseVNode("a", { href: "https://github.com/walinejs/waline", target: "_blank", rel: "noopener noreferrer" }, " Waline ", -1)), createTextVNode(" v" + toDisplayString(unref(ot)), 1)]))]));
} });
export {
  yn as Waline,
  ot as version
};
//# sourceMappingURL=@waline_client_component.js.map

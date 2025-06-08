import require$$0, { useRef, useState, useEffect, useCallback } from "react";
import * as THREE from "three";
import { Vector3, MOUSE, TOUCH, Spherical, Quaternion, OrthographicCamera, Vector2, PerspectiveCamera, Ray, Plane, BoxGeometry } from "three";
import * as CANNON from "cannon-es";
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production;
function requireReactJsxRuntime_production() {
  if (hasRequiredReactJsxRuntime_production) return reactJsxRuntime_production;
  hasRequiredReactJsxRuntime_production = 1;
  var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
  function jsxProd(type, config, maybeKey) {
    var key = null;
    void 0 !== maybeKey && (key = "" + maybeKey);
    void 0 !== config.key && (key = "" + config.key);
    if ("key" in config) {
      maybeKey = {};
      for (var propName in config)
        "key" !== propName && (maybeKey[propName] = config[propName]);
    } else maybeKey = config;
    config = maybeKey.ref;
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type,
      key,
      ref: void 0 !== config ? config : null,
      props: maybeKey
    };
  }
  reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE;
  reactJsxRuntime_production.jsx = jsxProd;
  reactJsxRuntime_production.jsxs = jsxProd;
  return reactJsxRuntime_production;
}
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development) return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  "production" !== process.env.NODE_ENV && function() {
    function getComponentNameFromType(type) {
      if (null == type) return null;
      if ("function" === typeof type)
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if ("string" === typeof type) return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if ("object" === typeof type)
        switch ("number" === typeof type.tag && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return (type.displayName || "Context") + ".Provider";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {
            }
        }
      return null;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(
          JSCompiler_inline_result,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          JSCompiler_inline_result$jscomp$0
        );
        return testStringCoercion(value);
      }
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE) return "<>";
      if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning) return false;
      }
      return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          displayName
        ));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      ));
      componentName = this.props.ref;
      return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
      self = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
      var children = config.children;
      if (void 0 !== children)
        if (isStaticChildren)
          if (isArrayImpl(children)) {
            for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
              validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else validateChildKeys(children);
      if (hasOwnProperty.call(config, "key")) {
        children = getComponentNameFromType(type);
        var keys = Object.keys(config).filter(function(k) {
          return "key" !== k;
        });
        isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
        didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
          'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
          isStaticChildren,
          children,
          keys,
          children
        ), didWarnAboutKeySpread[children + isStaticChildren] = true);
      }
      children = null;
      void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
      hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          "key" !== propName && (maybeKey[propName] = config[propName]);
      } else maybeKey = config;
      children && defineKeyPropWarningGetter(
        maybeKey,
        "function" === typeof type ? type.displayName || type.name || "Unknown" : type
      );
      return ReactElement(
        type,
        children,
        self,
        source,
        getOwner(),
        maybeKey,
        debugStack,
        debugTask
      );
    }
    function validateChildKeys(node) {
      "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = require$$0, REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    React = {
      "react-stack-bottom-frame": function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(
      React,
      UnknownOwner
    )();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
    reactJsxRuntime_development.jsx = function(type, config, maybeKey, source, self) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        false,
        source,
        self,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
    reactJsxRuntime_development.jsxs = function(type, config, maybeKey, source, self) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(
        type,
        config,
        maybeKey,
        true,
        source,
        self,
        trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
        trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
      );
    };
  }();
  return reactJsxRuntime_development;
}
var hasRequiredJsxRuntime;
function requireJsxRuntime() {
  if (hasRequiredJsxRuntime) return jsxRuntime.exports;
  hasRequiredJsxRuntime = 1;
  if (process.env.NODE_ENV === "production") {
    jsxRuntime.exports = requireReactJsxRuntime_production();
  } else {
    jsxRuntime.exports = requireReactJsxRuntime_development();
  }
  return jsxRuntime.exports;
}
var jsxRuntimeExports = requireJsxRuntime();
const diceContainer = "_diceContainer_1ab37_1";
const diceWrapper = "_diceWrapper_1ab37_8";
const sceneContainer = "_sceneContainer_1ab37_14";
const controlsPanel = "_controlsPanel_1ab37_18";
const controlsSection = "_controlsSection_1ab37_27";
const physicsControls = "_physicsControls_1ab37_37";
const physicsSection = "_physicsSection_1ab37_41";
const sliderControl = "_sliderControl_1ab37_50";
const styles = {
  diceContainer,
  diceWrapper,
  sceneContainer,
  controlsPanel,
  controlsSection,
  physicsControls,
  physicsSection,
  sliderControl
};
const SCENE_CONFIG = {
  cameraFov: 45,
  cameraNear: 0.1,
  cameraFar: 100,
  cameraPosition: [0, 5, 10],
  cameraLookAt: [0, 0, 0]
};
const LIGHTING_CONFIG = {
  ambientIntensity: 0.8,
  // Increased from 0.6
  directionalIntensity: 0.8,
  // Increased from 0.5
  directionalPosition: [10, 10, 5],
  shadowMapSize: 1024
};
const TABLE_CONFIG = {
  groundSize: 1e3,
  // Very large ground for overlay effect
  groundY: -2
};
const CONTROLS_CONFIG = {
  enablePan: false,
  minDistance: 5,
  maxDistance: 20,
  target: [0, 0, 0]
};
const DEFAULT_PHYSICS = {
  gravity: 50,
  // 5x Earth gravity for snappier dice
  diceFriction: 0.3,
  // Moderate friction for realistic rolling
  diceRestitution: 0.3,
  // Moderate bounce
  groundFriction: 0.3,
  // Table friction
  groundRestitution: 0.1,
  // Low table bounce
  wallFriction: 0,
  // No wall friction
  wallRestitution: 1,
  // Perfect wall bounce
  linearDamping: 0.4,
  // Movement damping
  angularDamping: 0.4
  // Rotation damping
};
const PHYSICS_LIMITS = {
  gravity: { min: 10, max: 100, step: 5 },
  diceRestitution: { min: 0, max: 0.8, step: 0.05 },
  groundFriction: { min: 0.1, max: 1, step: 0.05 },
  diceFriction: { min: 0.1, max: 1, step: 0.05 },
  angularDamping: { min: 0, max: 0.8, step: 0.05 }
};
const PHYSICS_SIM_CONFIG = {
  timeStep: 1 / 60,
  maxSimSteps: 500,
  stoppedFramesRequired: 10,
  linearThreshold: 0.1,
  // Velocity threshold for stopped detection
  linearThresholdD20: 0.05
};
const DICE_CONFIGS = {
  d6: {
    defaultSize: 1,
    faces: 6,
    defaultMapping: [1, 6, 2, 5, 3, 4],
    // Opposite faces sum to 7
    textureSize: 256,
    textureMargin: 20
  },
  d8: {
    defaultSize: 1,
    faces: 8,
    defaultMapping: [1, 2, 3, 4, 5, 6, 7, 8],
    // Direct mapping, opposite faces sum to 9
    textureSize: 256,
    textureMargin: 20
  },
  d20: {
    defaultSize: 1,
    faces: 20,
    defaultMapping: Array.from({ length: 20 }, (_, i) => i + 1)
  }
};
const THROW_CONFIG = {
  defaultForce: 1,
  minForce: 0.5,
  maxForce: 2,
  forceStep: 0.1,
  startHeight: 2,
  startPosition: [0, 2, 0],
  velocityScale: 5,
  angularVelocityScale: 20
};
const MATERIAL_CONFIG = {
  fontFamily: "Arial",
  chamferRadius: 0.04,
  // 4% rounding for d6
  chamferSegments: 7
};
const UI_CONFIG = {
  controlsText: "#333",
  controlsHeading: "#222",
  controlsSubheading: "#444",
  buttonPrimary: "#007bff",
  inputBackground: "#f0f0f0",
  inputBorder: "#ccc",
  monospaceBg: "#f0f0f0",
  sliderHeight: "150px"
};
const ANIMATION_CONFIG = {
  renderFPS: 60,
  fallOffTableThreshold: 5,
  // Distance from center before reset
  fallThroughFloorY: -5,
  // Y position that triggers reset
  resultDelay: 100
  // ms delay before showing result
};
const ERROR_MESSAGES = {
  physicsWhileRolling: "Please wait for the die to stop rolling before changing physics parameters."
};
const PhysicsControls = ({ params, onChange }) => {
  const handleChange = (key, value) => {
    const updatedParams = {
      ...params,
      [key]: value,
      // Ensure hidden params maintain reasonable values
      groundRestitution: 0.1,
      // Low bounce for table
      wallFriction: 0,
      // No friction on walls
      wallRestitution: 1,
      // Perfect bounce off walls
      linearDamping: params.angularDamping
      // Match angular damping
    };
    onChange(updatedParams);
  };
  const renderSlider = (label, key, min, max, step = 0.01, unit = "") => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.sliderControl, style: { marginBottom: "10px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { color: UI_CONFIG.controlsText, display: "flex", alignItems: "center", flexWrap: "wrap" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { minWidth: "120px", fontWeight: "bold" }, children: [
      label,
      ":"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "range",
        min,
        max,
        step,
        value: params[key],
        onChange: (e) => handleChange(key, parseFloat(e.target.value)),
        style: { width: "120px", margin: "0 10px" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
      minWidth: "60px",
      backgroundColor: UI_CONFIG.monospaceBg,
      padding: "2px 8px",
      borderRadius: "4px",
      fontFamily: "monospace"
    }, children: [
      params[key].toFixed(step < 1 ? 2 : 0),
      unit
    ] })
  ] }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.physicsControls, style: { color: UI_CONFIG.controlsText }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: UI_CONFIG.controlsHeading, marginBottom: "15px" }, children: "Physics Settings" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginBottom: "20px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => onChange(DEFAULT_PHYSICS),
        style: {
          padding: "8px 20px",
          backgroundColor: UI_CONFIG.buttonPrimary,
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "bold"
        },
        children: "Reset to Defaults"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.physicsSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: UI_CONFIG.controlsSubheading, marginBottom: "10px" }, children: "Dice Behavior" }),
      renderSlider("Gravity", "gravity", PHYSICS_LIMITS.gravity.min, PHYSICS_LIMITS.gravity.max, PHYSICS_LIMITS.gravity.step, " m/s²"),
      renderSlider("Bounciness", "diceRestitution", PHYSICS_LIMITS.diceRestitution.min, PHYSICS_LIMITS.diceRestitution.max, PHYSICS_LIMITS.diceRestitution.step),
      renderSlider("Table Friction", "groundFriction", PHYSICS_LIMITS.groundFriction.min, PHYSICS_LIMITS.groundFriction.max, PHYSICS_LIMITS.groundFriction.step)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.physicsSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { color: UI_CONFIG.controlsSubheading, marginBottom: "10px" }, children: "Advanced" }),
      renderSlider("Dice Friction", "diceFriction", PHYSICS_LIMITS.diceFriction.min, PHYSICS_LIMITS.diceFriction.max, PHYSICS_LIMITS.diceFriction.step),
      renderSlider("Spin Damping", "angularDamping", PHYSICS_LIMITS.angularDamping.min, PHYSICS_LIMITS.angularDamping.max, PHYSICS_LIMITS.angularDamping.step)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", value: params.groundRestitution }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", value: params.wallFriction }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", value: params.wallRestitution }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", value: params.linearDamping })
  ] });
};
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, key + "", value);
  return value;
};
class EventDispatcher {
  constructor() {
    __publicField$1(this, "_listeners");
  }
  /**
   * Adds a listener to an event type.
   * @param type The type of event to listen to.
   * @param listener The function that gets called when the event is fired.
   */
  addEventListener(type, listener) {
    if (this._listeners === void 0)
      this._listeners = {};
    const listeners = this._listeners;
    if (listeners[type] === void 0) {
      listeners[type] = [];
    }
    if (listeners[type].indexOf(listener) === -1) {
      listeners[type].push(listener);
    }
  }
  /**
      * Checks if listener is added to an event type.
      * @param type The type of event to listen to.
      * @param listener The function that gets called when the event is fired.
      */
  hasEventListener(type, listener) {
    if (this._listeners === void 0)
      return false;
    const listeners = this._listeners;
    return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
  }
  /**
      * Removes a listener from an event type.
      * @param type The type of the listener that gets removed.
      * @param listener The listener function that gets removed.
      */
  removeEventListener(type, listener) {
    if (this._listeners === void 0)
      return;
    const listeners = this._listeners;
    const listenerArray = listeners[type];
    if (listenerArray !== void 0) {
      const index = listenerArray.indexOf(listener);
      if (index !== -1) {
        listenerArray.splice(index, 1);
      }
    }
  }
  /**
      * Fire an event type.
      * @param event The event that gets fired.
      */
  dispatchEvent(event) {
    if (this._listeners === void 0)
      return;
    const listeners = this._listeners;
    const listenerArray = listeners[event.type];
    if (listenerArray !== void 0) {
      event.target = this;
      const array = listenerArray.slice(0);
      for (let i = 0, l = array.length; i < l; i++) {
        array[i].call(this, event);
      }
      event.target = null;
    }
  }
}
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const _ray = /* @__PURE__ */ new Ray();
const _plane = /* @__PURE__ */ new Plane();
const TILT_LIMIT = Math.cos(70 * (Math.PI / 180));
const moduloWrapAround = (offset, capacity) => (offset % capacity + capacity) % capacity;
class OrbitControls extends EventDispatcher {
  constructor(object, domElement) {
    super();
    __publicField(this, "object");
    __publicField(this, "domElement");
    __publicField(this, "enabled", true);
    __publicField(this, "target", new Vector3());
    __publicField(this, "minDistance", 0);
    __publicField(this, "maxDistance", Infinity);
    __publicField(this, "minZoom", 0);
    __publicField(this, "maxZoom", Infinity);
    __publicField(this, "minPolarAngle", 0);
    __publicField(this, "maxPolarAngle", Math.PI);
    __publicField(this, "minAzimuthAngle", -Infinity);
    __publicField(this, "maxAzimuthAngle", Infinity);
    __publicField(this, "enableDamping", false);
    __publicField(this, "dampingFactor", 0.05);
    __publicField(this, "enableZoom", true);
    __publicField(this, "zoomSpeed", 1);
    __publicField(this, "enableRotate", true);
    __publicField(this, "rotateSpeed", 1);
    __publicField(this, "enablePan", true);
    __publicField(this, "panSpeed", 1);
    __publicField(this, "screenSpacePanning", true);
    __publicField(this, "keyPanSpeed", 7);
    __publicField(this, "zoomToCursor", false);
    __publicField(this, "autoRotate", false);
    __publicField(this, "autoRotateSpeed", 2);
    __publicField(this, "reverseOrbit", false);
    __publicField(this, "reverseHorizontalOrbit", false);
    __publicField(this, "reverseVerticalOrbit", false);
    __publicField(this, "keys", { LEFT: "ArrowLeft", UP: "ArrowUp", RIGHT: "ArrowRight", BOTTOM: "ArrowDown" });
    __publicField(this, "mouseButtons", {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN
    });
    __publicField(this, "touches", { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN });
    __publicField(this, "target0");
    __publicField(this, "position0");
    __publicField(this, "zoom0");
    __publicField(this, "_domElementKeyEvents", null);
    __publicField(this, "getPolarAngle");
    __publicField(this, "getAzimuthalAngle");
    __publicField(this, "setPolarAngle");
    __publicField(this, "setAzimuthalAngle");
    __publicField(this, "getDistance");
    __publicField(this, "getZoomScale");
    __publicField(this, "listenToKeyEvents");
    __publicField(this, "stopListenToKeyEvents");
    __publicField(this, "saveState");
    __publicField(this, "reset");
    __publicField(this, "update");
    __publicField(this, "connect");
    __publicField(this, "dispose");
    __publicField(this, "dollyIn");
    __publicField(this, "dollyOut");
    __publicField(this, "getScale");
    __publicField(this, "setScale");
    this.object = object;
    this.domElement = domElement;
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this.getPolarAngle = () => spherical.phi;
    this.getAzimuthalAngle = () => spherical.theta;
    this.setPolarAngle = (value) => {
      let phi = moduloWrapAround(value, 2 * Math.PI);
      let currentPhi = spherical.phi;
      if (currentPhi < 0)
        currentPhi += 2 * Math.PI;
      if (phi < 0)
        phi += 2 * Math.PI;
      let phiDist = Math.abs(phi - currentPhi);
      if (2 * Math.PI - phiDist < phiDist) {
        if (phi < currentPhi) {
          phi += 2 * Math.PI;
        } else {
          currentPhi += 2 * Math.PI;
        }
      }
      sphericalDelta.phi = phi - currentPhi;
      scope.update();
    };
    this.setAzimuthalAngle = (value) => {
      let theta = moduloWrapAround(value, 2 * Math.PI);
      let currentTheta = spherical.theta;
      if (currentTheta < 0)
        currentTheta += 2 * Math.PI;
      if (theta < 0)
        theta += 2 * Math.PI;
      let thetaDist = Math.abs(theta - currentTheta);
      if (2 * Math.PI - thetaDist < thetaDist) {
        if (theta < currentTheta) {
          theta += 2 * Math.PI;
        } else {
          currentTheta += 2 * Math.PI;
        }
      }
      sphericalDelta.theta = theta - currentTheta;
      scope.update();
    };
    this.getDistance = () => scope.object.position.distanceTo(scope.target);
    this.listenToKeyEvents = (domElement2) => {
      domElement2.addEventListener("keydown", onKeyDown);
      this._domElementKeyEvents = domElement2;
    };
    this.stopListenToKeyEvents = () => {
      this._domElementKeyEvents.removeEventListener("keydown", onKeyDown);
      this._domElementKeyEvents = null;
    };
    this.saveState = () => {
      scope.target0.copy(scope.target);
      scope.position0.copy(scope.object.position);
      scope.zoom0 = scope.object.zoom;
    };
    this.reset = () => {
      scope.target.copy(scope.target0);
      scope.object.position.copy(scope.position0);
      scope.object.zoom = scope.zoom0;
      scope.object.updateProjectionMatrix();
      scope.dispatchEvent(changeEvent);
      scope.update();
      state = STATE.NONE;
    };
    this.update = (() => {
      const offset = new Vector3();
      const up = new Vector3(0, 1, 0);
      const quat = new Quaternion().setFromUnitVectors(object.up, up);
      const quatInverse = quat.clone().invert();
      const lastPosition = new Vector3();
      const lastQuaternion = new Quaternion();
      const twoPI = 2 * Math.PI;
      return function update() {
        const position = scope.object.position;
        quat.setFromUnitVectors(object.up, up);
        quatInverse.copy(quat).invert();
        offset.copy(position).sub(scope.target);
        offset.applyQuaternion(quat);
        spherical.setFromVector3(offset);
        if (scope.autoRotate && state === STATE.NONE) {
          rotateLeft(getAutoRotationAngle());
        }
        if (scope.enableDamping) {
          spherical.theta += sphericalDelta.theta * scope.dampingFactor;
          spherical.phi += sphericalDelta.phi * scope.dampingFactor;
        } else {
          spherical.theta += sphericalDelta.theta;
          spherical.phi += sphericalDelta.phi;
        }
        let min = scope.minAzimuthAngle;
        let max = scope.maxAzimuthAngle;
        if (isFinite(min) && isFinite(max)) {
          if (min < -Math.PI)
            min += twoPI;
          else if (min > Math.PI)
            min -= twoPI;
          if (max < -Math.PI)
            max += twoPI;
          else if (max > Math.PI)
            max -= twoPI;
          if (min <= max) {
            spherical.theta = Math.max(min, Math.min(max, spherical.theta));
          } else {
            spherical.theta = spherical.theta > (min + max) / 2 ? Math.max(min, spherical.theta) : Math.min(max, spherical.theta);
          }
        }
        spherical.phi = Math.max(scope.minPolarAngle, Math.min(scope.maxPolarAngle, spherical.phi));
        spherical.makeSafe();
        if (scope.enableDamping === true) {
          scope.target.addScaledVector(panOffset, scope.dampingFactor);
        } else {
          scope.target.add(panOffset);
        }
        if (scope.zoomToCursor && performCursorZoom || scope.object.isOrthographicCamera) {
          spherical.radius = clampDistance(spherical.radius);
        } else {
          spherical.radius = clampDistance(spherical.radius * scale);
        }
        offset.setFromSpherical(spherical);
        offset.applyQuaternion(quatInverse);
        position.copy(scope.target).add(offset);
        if (!scope.object.matrixAutoUpdate)
          scope.object.updateMatrix();
        scope.object.lookAt(scope.target);
        if (scope.enableDamping === true) {
          sphericalDelta.theta *= 1 - scope.dampingFactor;
          sphericalDelta.phi *= 1 - scope.dampingFactor;
          panOffset.multiplyScalar(1 - scope.dampingFactor);
        } else {
          sphericalDelta.set(0, 0, 0);
          panOffset.set(0, 0, 0);
        }
        let zoomChanged = false;
        if (scope.zoomToCursor && performCursorZoom) {
          let newRadius = null;
          if (scope.object instanceof PerspectiveCamera && scope.object.isPerspectiveCamera) {
            const prevRadius = offset.length();
            newRadius = clampDistance(prevRadius * scale);
            const radiusDelta = prevRadius - newRadius;
            scope.object.position.addScaledVector(dollyDirection, radiusDelta);
            scope.object.updateMatrixWorld();
          } else if (scope.object.isOrthographicCamera) {
            const mouseBefore = new Vector3(mouse.x, mouse.y, 0);
            mouseBefore.unproject(scope.object);
            scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / scale));
            scope.object.updateProjectionMatrix();
            zoomChanged = true;
            const mouseAfter = new Vector3(mouse.x, mouse.y, 0);
            mouseAfter.unproject(scope.object);
            scope.object.position.sub(mouseAfter).add(mouseBefore);
            scope.object.updateMatrixWorld();
            newRadius = offset.length();
          } else {
            console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.");
            scope.zoomToCursor = false;
          }
          if (newRadius !== null) {
            if (scope.screenSpacePanning) {
              scope.target.set(0, 0, -1).transformDirection(scope.object.matrix).multiplyScalar(newRadius).add(scope.object.position);
            } else {
              _ray.origin.copy(scope.object.position);
              _ray.direction.set(0, 0, -1).transformDirection(scope.object.matrix);
              if (Math.abs(scope.object.up.dot(_ray.direction)) < TILT_LIMIT) {
                object.lookAt(scope.target);
              } else {
                _plane.setFromNormalAndCoplanarPoint(scope.object.up, scope.target);
                _ray.intersectPlane(_plane, scope.target);
              }
            }
          }
        } else if (scope.object instanceof OrthographicCamera && scope.object.isOrthographicCamera) {
          zoomChanged = scale !== 1;
          if (zoomChanged) {
            scope.object.zoom = Math.max(scope.minZoom, Math.min(scope.maxZoom, scope.object.zoom / scale));
            scope.object.updateProjectionMatrix();
          }
        }
        scale = 1;
        performCursorZoom = false;
        if (zoomChanged || lastPosition.distanceToSquared(scope.object.position) > EPS || 8 * (1 - lastQuaternion.dot(scope.object.quaternion)) > EPS) {
          scope.dispatchEvent(changeEvent);
          lastPosition.copy(scope.object.position);
          lastQuaternion.copy(scope.object.quaternion);
          zoomChanged = false;
          return true;
        }
        return false;
      };
    })();
    this.connect = (domElement2) => {
      scope.domElement = domElement2;
      scope.domElement.style.touchAction = "none";
      scope.domElement.addEventListener("contextmenu", onContextMenu);
      scope.domElement.addEventListener("pointerdown", onPointerDown);
      scope.domElement.addEventListener("pointercancel", onPointerUp);
      scope.domElement.addEventListener("wheel", onMouseWheel);
    };
    this.dispose = () => {
      var _a, _b, _c, _d, _e, _f;
      if (scope.domElement) {
        scope.domElement.style.touchAction = "auto";
      }
      (_a = scope.domElement) == null ? void 0 : _a.removeEventListener("contextmenu", onContextMenu);
      (_b = scope.domElement) == null ? void 0 : _b.removeEventListener("pointerdown", onPointerDown);
      (_c = scope.domElement) == null ? void 0 : _c.removeEventListener("pointercancel", onPointerUp);
      (_d = scope.domElement) == null ? void 0 : _d.removeEventListener("wheel", onMouseWheel);
      (_e = scope.domElement) == null ? void 0 : _e.ownerDocument.removeEventListener("pointermove", onPointerMove);
      (_f = scope.domElement) == null ? void 0 : _f.ownerDocument.removeEventListener("pointerup", onPointerUp);
      if (scope._domElementKeyEvents !== null) {
        scope._domElementKeyEvents.removeEventListener("keydown", onKeyDown);
      }
    };
    const scope = this;
    const changeEvent = { type: "change" };
    const startEvent = { type: "start" };
    const endEvent = { type: "end" };
    const STATE = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let state = STATE.NONE;
    const EPS = 1e-6;
    const spherical = new Spherical();
    const sphericalDelta = new Spherical();
    let scale = 1;
    const panOffset = new Vector3();
    const rotateStart = new Vector2();
    const rotateEnd = new Vector2();
    const rotateDelta = new Vector2();
    const panStart = new Vector2();
    const panEnd = new Vector2();
    const panDelta = new Vector2();
    const dollyStart = new Vector2();
    const dollyEnd = new Vector2();
    const dollyDelta = new Vector2();
    const dollyDirection = new Vector3();
    const mouse = new Vector2();
    let performCursorZoom = false;
    const pointers = [];
    const pointerPositions = {};
    function getAutoRotationAngle() {
      return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
    }
    function getZoomScale() {
      return Math.pow(0.95, scope.zoomSpeed);
    }
    function rotateLeft(angle) {
      if (scope.reverseOrbit || scope.reverseHorizontalOrbit) {
        sphericalDelta.theta += angle;
      } else {
        sphericalDelta.theta -= angle;
      }
    }
    function rotateUp(angle) {
      if (scope.reverseOrbit || scope.reverseVerticalOrbit) {
        sphericalDelta.phi += angle;
      } else {
        sphericalDelta.phi -= angle;
      }
    }
    const panLeft = (() => {
      const v = new Vector3();
      return function panLeft2(distance, objectMatrix) {
        v.setFromMatrixColumn(objectMatrix, 0);
        v.multiplyScalar(-distance);
        panOffset.add(v);
      };
    })();
    const panUp = (() => {
      const v = new Vector3();
      return function panUp2(distance, objectMatrix) {
        if (scope.screenSpacePanning === true) {
          v.setFromMatrixColumn(objectMatrix, 1);
        } else {
          v.setFromMatrixColumn(objectMatrix, 0);
          v.crossVectors(scope.object.up, v);
        }
        v.multiplyScalar(distance);
        panOffset.add(v);
      };
    })();
    const pan = (() => {
      const offset = new Vector3();
      return function pan2(deltaX, deltaY) {
        const element = scope.domElement;
        if (element && scope.object instanceof PerspectiveCamera && scope.object.isPerspectiveCamera) {
          const position = scope.object.position;
          offset.copy(position).sub(scope.target);
          let targetDistance = offset.length();
          targetDistance *= Math.tan(scope.object.fov / 2 * Math.PI / 180);
          panLeft(2 * deltaX * targetDistance / element.clientHeight, scope.object.matrix);
          panUp(2 * deltaY * targetDistance / element.clientHeight, scope.object.matrix);
        } else if (element && scope.object instanceof OrthographicCamera && scope.object.isOrthographicCamera) {
          panLeft(
            deltaX * (scope.object.right - scope.object.left) / scope.object.zoom / element.clientWidth,
            scope.object.matrix
          );
          panUp(
            deltaY * (scope.object.top - scope.object.bottom) / scope.object.zoom / element.clientHeight,
            scope.object.matrix
          );
        } else {
          console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
          scope.enablePan = false;
        }
      };
    })();
    function setScale(newScale) {
      if (scope.object instanceof PerspectiveCamera && scope.object.isPerspectiveCamera || scope.object instanceof OrthographicCamera && scope.object.isOrthographicCamera) {
        scale = newScale;
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
        scope.enableZoom = false;
      }
    }
    function dollyOut(dollyScale) {
      setScale(scale / dollyScale);
    }
    function dollyIn(dollyScale) {
      setScale(scale * dollyScale);
    }
    function updateMouseParameters(event) {
      if (!scope.zoomToCursor || !scope.domElement) {
        return;
      }
      performCursorZoom = true;
      const rect = scope.domElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const w = rect.width;
      const h = rect.height;
      mouse.x = x / w * 2 - 1;
      mouse.y = -(y / h) * 2 + 1;
      dollyDirection.set(mouse.x, mouse.y, 1).unproject(scope.object).sub(scope.object.position).normalize();
    }
    function clampDistance(dist) {
      return Math.max(scope.minDistance, Math.min(scope.maxDistance, dist));
    }
    function handleMouseDownRotate(event) {
      rotateStart.set(event.clientX, event.clientY);
    }
    function handleMouseDownDolly(event) {
      updateMouseParameters(event);
      dollyStart.set(event.clientX, event.clientY);
    }
    function handleMouseDownPan(event) {
      panStart.set(event.clientX, event.clientY);
    }
    function handleMouseMoveRotate(event) {
      rotateEnd.set(event.clientX, event.clientY);
      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
      const element = scope.domElement;
      if (element) {
        rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
        rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
      }
      rotateStart.copy(rotateEnd);
      scope.update();
    }
    function handleMouseMoveDolly(event) {
      dollyEnd.set(event.clientX, event.clientY);
      dollyDelta.subVectors(dollyEnd, dollyStart);
      if (dollyDelta.y > 0) {
        dollyOut(getZoomScale());
      } else if (dollyDelta.y < 0) {
        dollyIn(getZoomScale());
      }
      dollyStart.copy(dollyEnd);
      scope.update();
    }
    function handleMouseMovePan(event) {
      panEnd.set(event.clientX, event.clientY);
      panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
      scope.update();
    }
    function handleMouseWheel(event) {
      updateMouseParameters(event);
      if (event.deltaY < 0) {
        dollyIn(getZoomScale());
      } else if (event.deltaY > 0) {
        dollyOut(getZoomScale());
      }
      scope.update();
    }
    function handleKeyDown(event) {
      let needsUpdate = false;
      switch (event.code) {
        case scope.keys.UP:
          pan(0, scope.keyPanSpeed);
          needsUpdate = true;
          break;
        case scope.keys.BOTTOM:
          pan(0, -scope.keyPanSpeed);
          needsUpdate = true;
          break;
        case scope.keys.LEFT:
          pan(scope.keyPanSpeed, 0);
          needsUpdate = true;
          break;
        case scope.keys.RIGHT:
          pan(-scope.keyPanSpeed, 0);
          needsUpdate = true;
          break;
      }
      if (needsUpdate) {
        event.preventDefault();
        scope.update();
      }
    }
    function handleTouchStartRotate() {
      if (pointers.length == 1) {
        rotateStart.set(pointers[0].pageX, pointers[0].pageY);
      } else {
        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
        rotateStart.set(x, y);
      }
    }
    function handleTouchStartPan() {
      if (pointers.length == 1) {
        panStart.set(pointers[0].pageX, pointers[0].pageY);
      } else {
        const x = 0.5 * (pointers[0].pageX + pointers[1].pageX);
        const y = 0.5 * (pointers[0].pageY + pointers[1].pageY);
        panStart.set(x, y);
      }
    }
    function handleTouchStartDolly() {
      const dx = pointers[0].pageX - pointers[1].pageX;
      const dy = pointers[0].pageY - pointers[1].pageY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dollyStart.set(0, distance);
    }
    function handleTouchStartDollyPan() {
      if (scope.enableZoom)
        handleTouchStartDolly();
      if (scope.enablePan)
        handleTouchStartPan();
    }
    function handleTouchStartDollyRotate() {
      if (scope.enableZoom)
        handleTouchStartDolly();
      if (scope.enableRotate)
        handleTouchStartRotate();
    }
    function handleTouchMoveRotate(event) {
      if (pointers.length == 1) {
        rotateEnd.set(event.pageX, event.pageY);
      } else {
        const position = getSecondPointerPosition(event);
        const x = 0.5 * (event.pageX + position.x);
        const y = 0.5 * (event.pageY + position.y);
        rotateEnd.set(x, y);
      }
      rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(scope.rotateSpeed);
      const element = scope.domElement;
      if (element) {
        rotateLeft(2 * Math.PI * rotateDelta.x / element.clientHeight);
        rotateUp(2 * Math.PI * rotateDelta.y / element.clientHeight);
      }
      rotateStart.copy(rotateEnd);
    }
    function handleTouchMovePan(event) {
      if (pointers.length == 1) {
        panEnd.set(event.pageX, event.pageY);
      } else {
        const position = getSecondPointerPosition(event);
        const x = 0.5 * (event.pageX + position.x);
        const y = 0.5 * (event.pageY + position.y);
        panEnd.set(x, y);
      }
      panDelta.subVectors(panEnd, panStart).multiplyScalar(scope.panSpeed);
      pan(panDelta.x, panDelta.y);
      panStart.copy(panEnd);
    }
    function handleTouchMoveDolly(event) {
      const position = getSecondPointerPosition(event);
      const dx = event.pageX - position.x;
      const dy = event.pageY - position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      dollyEnd.set(0, distance);
      dollyDelta.set(0, Math.pow(dollyEnd.y / dollyStart.y, scope.zoomSpeed));
      dollyOut(dollyDelta.y);
      dollyStart.copy(dollyEnd);
    }
    function handleTouchMoveDollyPan(event) {
      if (scope.enableZoom)
        handleTouchMoveDolly(event);
      if (scope.enablePan)
        handleTouchMovePan(event);
    }
    function handleTouchMoveDollyRotate(event) {
      if (scope.enableZoom)
        handleTouchMoveDolly(event);
      if (scope.enableRotate)
        handleTouchMoveRotate(event);
    }
    function onPointerDown(event) {
      var _a, _b;
      if (scope.enabled === false)
        return;
      if (pointers.length === 0) {
        (_a = scope.domElement) == null ? void 0 : _a.ownerDocument.addEventListener("pointermove", onPointerMove);
        (_b = scope.domElement) == null ? void 0 : _b.ownerDocument.addEventListener("pointerup", onPointerUp);
      }
      addPointer(event);
      if (event.pointerType === "touch") {
        onTouchStart(event);
      } else {
        onMouseDown(event);
      }
    }
    function onPointerMove(event) {
      if (scope.enabled === false)
        return;
      if (event.pointerType === "touch") {
        onTouchMove(event);
      } else {
        onMouseMove(event);
      }
    }
    function onPointerUp(event) {
      var _a, _b, _c;
      removePointer(event);
      if (pointers.length === 0) {
        (_a = scope.domElement) == null ? void 0 : _a.releasePointerCapture(event.pointerId);
        (_b = scope.domElement) == null ? void 0 : _b.ownerDocument.removeEventListener("pointermove", onPointerMove);
        (_c = scope.domElement) == null ? void 0 : _c.ownerDocument.removeEventListener("pointerup", onPointerUp);
      }
      scope.dispatchEvent(endEvent);
      state = STATE.NONE;
    }
    function onMouseDown(event) {
      let mouseAction;
      switch (event.button) {
        case 0:
          mouseAction = scope.mouseButtons.LEFT;
          break;
        case 1:
          mouseAction = scope.mouseButtons.MIDDLE;
          break;
        case 2:
          mouseAction = scope.mouseButtons.RIGHT;
          break;
        default:
          mouseAction = -1;
      }
      switch (mouseAction) {
        case MOUSE.DOLLY:
          if (scope.enableZoom === false)
            return;
          handleMouseDownDolly(event);
          state = STATE.DOLLY;
          break;
        case MOUSE.ROTATE:
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            if (scope.enablePan === false)
              return;
            handleMouseDownPan(event);
            state = STATE.PAN;
          } else {
            if (scope.enableRotate === false)
              return;
            handleMouseDownRotate(event);
            state = STATE.ROTATE;
          }
          break;
        case MOUSE.PAN:
          if (event.ctrlKey || event.metaKey || event.shiftKey) {
            if (scope.enableRotate === false)
              return;
            handleMouseDownRotate(event);
            state = STATE.ROTATE;
          } else {
            if (scope.enablePan === false)
              return;
            handleMouseDownPan(event);
            state = STATE.PAN;
          }
          break;
        default:
          state = STATE.NONE;
      }
      if (state !== STATE.NONE) {
        scope.dispatchEvent(startEvent);
      }
    }
    function onMouseMove(event) {
      if (scope.enabled === false)
        return;
      switch (state) {
        case STATE.ROTATE:
          if (scope.enableRotate === false)
            return;
          handleMouseMoveRotate(event);
          break;
        case STATE.DOLLY:
          if (scope.enableZoom === false)
            return;
          handleMouseMoveDolly(event);
          break;
        case STATE.PAN:
          if (scope.enablePan === false)
            return;
          handleMouseMovePan(event);
          break;
      }
    }
    function onMouseWheel(event) {
      if (scope.enabled === false || scope.enableZoom === false || state !== STATE.NONE && state !== STATE.ROTATE) {
        return;
      }
      event.preventDefault();
      scope.dispatchEvent(startEvent);
      handleMouseWheel(event);
      scope.dispatchEvent(endEvent);
    }
    function onKeyDown(event) {
      if (scope.enabled === false || scope.enablePan === false)
        return;
      handleKeyDown(event);
    }
    function onTouchStart(event) {
      trackPointer(event);
      switch (pointers.length) {
        case 1:
          switch (scope.touches.ONE) {
            case TOUCH.ROTATE:
              if (scope.enableRotate === false)
                return;
              handleTouchStartRotate();
              state = STATE.TOUCH_ROTATE;
              break;
            case TOUCH.PAN:
              if (scope.enablePan === false)
                return;
              handleTouchStartPan();
              state = STATE.TOUCH_PAN;
              break;
            default:
              state = STATE.NONE;
          }
          break;
        case 2:
          switch (scope.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (scope.enableZoom === false && scope.enablePan === false)
                return;
              handleTouchStartDollyPan();
              state = STATE.TOUCH_DOLLY_PAN;
              break;
            case TOUCH.DOLLY_ROTATE:
              if (scope.enableZoom === false && scope.enableRotate === false)
                return;
              handleTouchStartDollyRotate();
              state = STATE.TOUCH_DOLLY_ROTATE;
              break;
            default:
              state = STATE.NONE;
          }
          break;
        default:
          state = STATE.NONE;
      }
      if (state !== STATE.NONE) {
        scope.dispatchEvent(startEvent);
      }
    }
    function onTouchMove(event) {
      trackPointer(event);
      switch (state) {
        case STATE.TOUCH_ROTATE:
          if (scope.enableRotate === false)
            return;
          handleTouchMoveRotate(event);
          scope.update();
          break;
        case STATE.TOUCH_PAN:
          if (scope.enablePan === false)
            return;
          handleTouchMovePan(event);
          scope.update();
          break;
        case STATE.TOUCH_DOLLY_PAN:
          if (scope.enableZoom === false && scope.enablePan === false)
            return;
          handleTouchMoveDollyPan(event);
          scope.update();
          break;
        case STATE.TOUCH_DOLLY_ROTATE:
          if (scope.enableZoom === false && scope.enableRotate === false)
            return;
          handleTouchMoveDollyRotate(event);
          scope.update();
          break;
        default:
          state = STATE.NONE;
      }
    }
    function onContextMenu(event) {
      if (scope.enabled === false)
        return;
      event.preventDefault();
    }
    function addPointer(event) {
      pointers.push(event);
    }
    function removePointer(event) {
      delete pointerPositions[event.pointerId];
      for (let i = 0; i < pointers.length; i++) {
        if (pointers[i].pointerId == event.pointerId) {
          pointers.splice(i, 1);
          return;
        }
      }
    }
    function trackPointer(event) {
      let position = pointerPositions[event.pointerId];
      if (position === void 0) {
        position = new Vector2();
        pointerPositions[event.pointerId] = position;
      }
      position.set(event.pageX, event.pageY);
    }
    function getSecondPointerPosition(event) {
      const pointer = event.pointerId === pointers[0].pointerId ? pointers[1] : pointers[0];
      return pointerPositions[pointer.pointerId];
    }
    this.dollyIn = (dollyScale = getZoomScale()) => {
      dollyIn(dollyScale);
      scope.update();
    };
    this.dollyOut = (dollyScale = getZoomScale()) => {
      dollyOut(dollyScale);
      scope.update();
    };
    this.getScale = () => {
      return scale;
    };
    this.setScale = (newScale) => {
      setScale(newScale);
      scope.update();
    };
    this.getZoomScale = () => {
      return getZoomScale();
    };
    if (domElement !== void 0)
      this.connect(domElement);
    this.update();
  }
}
const tempNormal = /* @__PURE__ */ new Vector3();
function getUv(faceDirVector, normal, uvAxis, projectionAxis, radius, sideLength) {
  const totArcLength = 2 * Math.PI * radius / 4;
  const centerLength = Math.max(sideLength - 2 * radius, 0);
  const halfArc = Math.PI / 4;
  tempNormal.copy(normal);
  tempNormal[projectionAxis] = 0;
  tempNormal.normalize();
  const arcUvRatio = 0.5 * totArcLength / (totArcLength + centerLength);
  const arcAngleRatio = 1 - tempNormal.angleTo(faceDirVector) / halfArc;
  if (Math.sign(tempNormal[uvAxis]) === 1) {
    return arcAngleRatio * arcUvRatio;
  } else {
    const lenUv = centerLength / (totArcLength + centerLength);
    return lenUv + arcUvRatio + arcUvRatio * (1 - arcAngleRatio);
  }
}
class RoundedBoxGeometry extends BoxGeometry {
  constructor(width = 1, height = 1, depth = 1, segments = 2, radius = 0.1) {
    segments = segments * 2 + 1;
    radius = Math.min(width / 2, height / 2, depth / 2, radius);
    super(1, 1, 1, segments, segments, segments);
    if (segments === 1)
      return;
    const geometry2 = this.toNonIndexed();
    this.index = null;
    this.attributes.position = geometry2.attributes.position;
    this.attributes.normal = geometry2.attributes.normal;
    this.attributes.uv = geometry2.attributes.uv;
    const position = new Vector3();
    const normal = new Vector3();
    const box = new Vector3(width, height, depth).divideScalar(2).subScalar(radius);
    const positions = this.attributes.position.array;
    const normals = this.attributes.normal.array;
    const uvs = this.attributes.uv.array;
    const faceTris = positions.length / 6;
    const faceDirVector = new Vector3();
    const halfSegmentSize = 0.5 / segments;
    for (let i = 0, j = 0; i < positions.length; i += 3, j += 2) {
      position.fromArray(positions, i);
      normal.copy(position);
      normal.x -= Math.sign(normal.x) * halfSegmentSize;
      normal.y -= Math.sign(normal.y) * halfSegmentSize;
      normal.z -= Math.sign(normal.z) * halfSegmentSize;
      normal.normalize();
      positions[i + 0] = box.x * Math.sign(position.x) + normal.x * radius;
      positions[i + 1] = box.y * Math.sign(position.y) + normal.y * radius;
      positions[i + 2] = box.z * Math.sign(position.z) + normal.z * radius;
      normals[i + 0] = normal.x;
      normals[i + 1] = normal.y;
      normals[i + 2] = normal.z;
      const side = Math.floor(i / faceTris);
      switch (side) {
        case 0:
          faceDirVector.set(1, 0, 0);
          uvs[j + 0] = getUv(faceDirVector, normal, "z", "y", radius, depth);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "z", radius, height);
          break;
        case 1:
          faceDirVector.set(-1, 0, 0);
          uvs[j + 0] = 1 - getUv(faceDirVector, normal, "z", "y", radius, depth);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "z", radius, height);
          break;
        case 2:
          faceDirVector.set(0, 1, 0);
          uvs[j + 0] = 1 - getUv(faceDirVector, normal, "x", "z", radius, width);
          uvs[j + 1] = getUv(faceDirVector, normal, "z", "x", radius, depth);
          break;
        case 3:
          faceDirVector.set(0, -1, 0);
          uvs[j + 0] = 1 - getUv(faceDirVector, normal, "x", "z", radius, width);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "z", "x", radius, depth);
          break;
        case 4:
          faceDirVector.set(0, 0, 1);
          uvs[j + 0] = 1 - getUv(faceDirVector, normal, "x", "y", radius, width);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "x", radius, height);
          break;
        case 5:
          faceDirVector.set(0, 0, -1);
          uvs[j + 0] = getUv(faceDirVector, normal, "x", "y", radius, width);
          uvs[j + 1] = 1 - getUv(faceDirVector, normal, "y", "x", radius, height);
          break;
      }
    }
  }
}
function createD6Geometry(radius = 1.1) {
  const cornerRadius = radius * MATERIAL_CONFIG.chamferRadius;
  const geometry = new RoundedBoxGeometry(
    radius * 2,
    // width
    radius * 2,
    // height
    radius * 2,
    // depth
    MATERIAL_CONFIG.chamferSegments,
    // width segments
    cornerRadius
    // corner radius
  );
  return geometry;
}
function calcTextureSize$1(approx) {
  return Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)));
}
function createTextTexture$1(text, color, backColor, size, margin) {
  if (!text) return null;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return null;
  const ts = calcTextureSize$1(size + size * 2 * margin) * 2;
  canvas.width = canvas.height = ts;
  context.fillStyle = backColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = `${ts / (1 + 2 * margin)}pt ${MATERIAL_CONFIG.fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = color;
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  if (text === "6" || text === "9") {
    context.fillText("  .", canvas.width / 2, canvas.height / 2);
  }
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}
function createD6Materials(size = 50, margin = 0.9, diceColor = "#202020", numberColor = "#aaaaaa") {
  const materials = [];
  const materialOptions = {
    specular: 5592405,
    color: 16777215,
    shininess: 100,
    flatShading: true
  };
  const faceLabels = ["1", "6", "2", "5", "3", "4"];
  for (const label of faceLabels) {
    const texture = createTextTexture$1(label, numberColor, diceColor, size, margin);
    const material = new THREE.MeshPhongMaterial({
      ...materialOptions,
      map: texture
    });
    materials.push(material);
  }
  return materials;
}
function createD8Geometry(radius = 1) {
  const vertices = [
    [1, 0, 0],
    // 0: +X
    [-1, 0, 0],
    // 1: -X
    [0, 1, 0],
    // 2: +Y
    [0, -1, 0],
    // 3: -Y
    [0, 0, 1],
    // 4: +Z
    [0, 0, -1]
    // 5: -Z
  ];
  const faces = [
    // Top half (vertex 0 at +X)
    [0, 2, 4],
    // Face 0
    [0, 4, 3],
    // Face 1
    [0, 3, 5],
    // Face 2
    [0, 5, 2],
    // Face 3
    // Bottom half (vertex 1 at -X)
    [1, 3, 4],
    // Face 4
    [1, 4, 2],
    // Face 5
    [1, 2, 5],
    // Face 6
    [1, 5, 3]
    // Face 7
  ];
  const positions = [];
  const normals = [];
  const uvs = [];
  faces.forEach((face) => {
    const v0 = vertices[face[0]];
    const v1 = vertices[face[1]];
    const v2 = vertices[face[2]];
    positions.push(
      v0[0] * radius,
      v0[1] * radius,
      v0[2] * radius,
      v1[0] * radius,
      v1[1] * radius,
      v1[2] * radius,
      v2[0] * radius,
      v2[1] * radius,
      v2[2] * radius
    );
    const va = new THREE.Vector3(v1[0] - v0[0], v1[1] - v0[1], v1[2] - v0[2]);
    const vb = new THREE.Vector3(v2[0] - v0[0], v2[1] - v0[1], v2[2] - v0[2]);
    const normal = new THREE.Vector3().crossVectors(va, vb).normalize();
    for (let i = 0; i < 3; i++) {
      normals.push(normal.x, normal.y, normal.z);
    }
    uvs.push(
      0.5,
      1,
      // Top vertex
      0,
      0,
      // Bottom left
      1,
      0
      // Bottom right
    );
  });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  for (let i = 0; i < 8; i++) {
    geometry.addGroup(i * 3, 3, i);
  }
  return geometry;
}
function calcTextureSize(approx) {
  return Math.pow(2, Math.floor(Math.log(approx) / Math.log(2)));
}
function createTextTexture(text, color, backColor, size = 100, margin = 1) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not get canvas context");
  const ts = calcTextureSize(size + size * 2 * margin) * 2;
  canvas.width = canvas.height = ts;
  context.fillStyle = backColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.font = `${ts / (1 + 2 * margin)}pt ${MATERIAL_CONFIG.fontFamily}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = color;
  const centerY = canvas.height * 0.55;
  context.fillText(text, canvas.width / 2, centerY);
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}
function createD8Materials(size = 50, margin = 0.9, diceColor = "#202020", numberColor = "#aaaaaa") {
  const materials = [];
  const materialOptions = {
    specular: 5592405,
    color: 16777215,
    shininess: 100,
    flatShading: true
  };
  for (let i = 1; i <= 8; i++) {
    const texture = createTextTexture(
      i.toString(),
      numberColor,
      diceColor,
      size,
      margin
    );
    const material = new THREE.MeshPhongMaterial({
      ...materialOptions,
      map: texture
    });
    materials.push(material);
  }
  return materials;
}
function createD8(dieSize = 1, diceColor = "#202020", numberColor = "#aaaaaa") {
  return {
    geometry: createD8Geometry(dieSize),
    materials: createD8Materials(50, 0.9, diceColor, numberColor)
  };
}
function createD20TextTexture(text, textColor = "#ffffff", diceColor = "#4a90e2") {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  context.fillStyle = diceColor;
  context.fillRect(0, 0, size, size);
  context.fillStyle = textColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "bold 80px Arial";
  const centerY = size * 0.67;
  context.fillText(text, size / 2, centerY);
  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}
function createTriangleUVs() {
  return new Float32Array([
    0.5,
    0.9,
    // top vertex (flipped Y)
    0.1,
    0.1,
    // bottom left
    0.9,
    0.1
    // bottom right
  ]);
}
function createD20(radius = 1, diceColor = "#2b8a51", numberColor = "#aaaaaa") {
  const geometry = new THREE.IcosahedronGeometry(radius);
  const uvs = [];
  const triangleUV = createTriangleUVs();
  for (let i = 0; i < 20; i++) {
    uvs.push(...triangleUV);
  }
  geometry.setAttribute(
    "uv",
    new THREE.BufferAttribute(new Float32Array(uvs), 2)
  );
  const materials = [];
  for (let i = 1; i <= 20; i++) {
    const texture = createD20TextTexture(i.toString(), numberColor, diceColor);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      color: 16777215,
      // White so texture colors show properly
      shininess: 100,
      flatShading: true
    });
    materials.push(material);
  }
  geometry.clearGroups();
  for (let i = 0; i < 20; i++) {
    geometry.addGroup(i * 3, 3, i);
  }
  return { geometry, materials };
}
const PHI = (1 + Math.sqrt(5)) / 2;
const ICOSAHEDRON_VERTICES = [
  [-1, PHI, 0],
  [1, PHI, 0],
  [-1, -PHI, 0],
  [1, -PHI, 0],
  [0, -1, PHI],
  [0, 1, PHI],
  [0, -1, -PHI],
  [0, 1, -PHI],
  [PHI, 0, -1],
  [PHI, 0, 1],
  [-PHI, 0, -1],
  [-PHI, 0, 1]
].map((v) => {
  const scale = 1 / Math.sqrt(1 + PHI * PHI);
  return [v[0] * scale, v[1] * scale, v[2] * scale];
});
const ICOSAHEDRON_FACES = [
  [0, 11, 5],
  [0, 5, 1],
  [0, 1, 7],
  [0, 7, 10],
  [0, 10, 11],
  [1, 5, 9],
  [5, 11, 4],
  [11, 10, 2],
  [10, 7, 6],
  [7, 1, 8],
  [3, 9, 4],
  [3, 4, 2],
  [3, 2, 6],
  [3, 6, 8],
  [3, 8, 9],
  [4, 9, 5],
  [2, 4, 11],
  [6, 2, 10],
  [8, 6, 7],
  [9, 8, 1]
];
function calculateFaceNormal(v1, v2, v3) {
  const edge1 = [v2[0] - v1[0], v2[1] - v1[1], v2[2] - v1[2]];
  const edge2 = [v3[0] - v1[0], v3[1] - v1[1], v3[2] - v1[2]];
  const normal = [
    edge1[1] * edge2[2] - edge1[2] * edge2[1],
    edge1[2] * edge2[0] - edge1[0] * edge2[2],
    edge1[0] * edge2[1] - edge1[1] * edge2[0]
  ];
  const length = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
  return [normal[0] / length, normal[1] / length, normal[2] / length];
}
function applyQuaternion(vector, quaternion) {
  const x = vector[0];
  const y = vector[1];
  const z = vector[2];
  const qx = quaternion.x;
  const qy = quaternion.y;
  const qz = quaternion.z;
  const qw = quaternion.w;
  const ix = qw * x + qy * z - qz * y;
  const iy = qw * y + qz * x - qx * z;
  const iz = qw * z + qx * y - qy * x;
  const iw = -qx * x - qy * y - qz * z;
  return [
    ix * qw + iw * -qx + iy * -qz - iz * -qy,
    iy * qw + iw * -qy + iz * -qx - ix * -qz,
    iz * qw + iw * -qz + ix * -qy - iy * -qx
  ];
}
function detectD20Face(quaternion) {
  const upVector = [0, 1, 0];
  let closestFace = -1;
  let closestDot = -2;
  for (let i = 0; i < ICOSAHEDRON_FACES.length; i++) {
    const face = ICOSAHEDRON_FACES[i];
    const v1 = ICOSAHEDRON_VERTICES[face[0]];
    const v2 = ICOSAHEDRON_VERTICES[face[1]];
    const v3 = ICOSAHEDRON_VERTICES[face[2]];
    const faceNormal = calculateFaceNormal(v1, v2, v3);
    const worldNormal = applyQuaternion(faceNormal, quaternion);
    const dot = worldNormal[0] * upVector[0] + worldNormal[1] * upVector[1] + worldNormal[2] * upVector[2];
    if (dot > closestDot) {
      closestDot = dot;
      closestFace = i;
    }
  }
  return closestFace;
}
function createPhysicsWorld(physicsParams) {
  const world = new CANNON.World();
  world.gravity.set(0, -physicsParams.gravity, 0);
  const diceMaterial = new CANNON.Material("dice");
  const groundMaterial = new CANNON.Material("ground");
  const wallMaterial = new CANNON.Material("wall");
  world.addContactMaterial(new CANNON.ContactMaterial(
    diceMaterial,
    groundMaterial,
    {
      friction: physicsParams.diceFriction,
      restitution: physicsParams.diceRestitution
    }
  ));
  world.addContactMaterial(new CANNON.ContactMaterial(
    diceMaterial,
    wallMaterial,
    {
      friction: physicsParams.wallFriction,
      restitution: physicsParams.wallRestitution
    }
  ));
  world.addContactMaterial(new CANNON.ContactMaterial(
    diceMaterial,
    diceMaterial,
    {
      friction: physicsParams.diceFriction,
      restitution: physicsParams.diceRestitution
    }
  ));
  const groundShape = new CANNON.Box(new CANNON.Vec3(TABLE_CONFIG.groundSize / 2, 0.5, TABLE_CONFIG.groundSize / 2));
  const groundBody = new CANNON.Body({
    mass: 0,
    shape: groundShape,
    material: groundMaterial,
    type: CANNON.Body.STATIC
  });
  groundBody.position.set(0, TABLE_CONFIG.groundY - 0.5, 0);
  world.addBody(groundBody);
  const wallBodies = [];
  return {
    world,
    diceMaterial,
    groundMaterial,
    wallMaterial,
    groundBody,
    wallBodies
  };
}
function createDieBody(dieType, dieSize, diceMaterial, physicsParams) {
  let dieBody;
  if (dieType === "d6") {
    const dieShape = new CANNON.Box(new CANNON.Vec3(dieSize, dieSize, dieSize));
    dieBody = new CANNON.Body({
      mass: 1,
      shape: dieShape,
      material: diceMaterial,
      linearDamping: physicsParams.linearDamping,
      angularDamping: physicsParams.angularDamping
    });
  } else if (dieType === "d8") {
    const vertices = [
      new CANNON.Vec3(1, 0, 0),
      new CANNON.Vec3(-1, 0, 0),
      new CANNON.Vec3(0, 1, 0),
      new CANNON.Vec3(0, -1, 0),
      new CANNON.Vec3(0, 0, 1),
      new CANNON.Vec3(0, 0, -1)
    ];
    vertices.forEach((v) => v.scale(dieSize, v));
    const faces = [
      [0, 2, 4],
      [0, 4, 3],
      [0, 3, 5],
      [0, 5, 2],
      [1, 3, 4],
      [1, 4, 2],
      [1, 2, 5],
      [1, 5, 3]
    ];
    const dieShape = new CANNON.ConvexPolyhedron({ vertices, faces });
    dieBody = new CANNON.Body({
      mass: 1,
      shape: dieShape,
      material: diceMaterial,
      linearDamping: physicsParams.linearDamping,
      angularDamping: physicsParams.angularDamping
    });
  } else {
    const t = (1 + Math.sqrt(5)) / 2;
    const vertices = [
      new CANNON.Vec3(-1, t, 0),
      new CANNON.Vec3(1, t, 0),
      new CANNON.Vec3(-1, -t, 0),
      new CANNON.Vec3(1, -t, 0),
      new CANNON.Vec3(0, -1, t),
      new CANNON.Vec3(0, 1, t),
      new CANNON.Vec3(0, -1, -t),
      new CANNON.Vec3(0, 1, -t),
      new CANNON.Vec3(t, 0, -1),
      new CANNON.Vec3(t, 0, 1),
      new CANNON.Vec3(-t, 0, -1),
      new CANNON.Vec3(-t, 0, 1)
    ];
    vertices.forEach((v) => v.scale(dieSize / Math.sqrt(1 + t * t), v));
    const faces = [
      [0, 11, 5],
      [0, 5, 1],
      [0, 1, 7],
      [0, 7, 10],
      [0, 10, 11],
      [1, 5, 9],
      [5, 11, 4],
      [11, 10, 2],
      [10, 7, 6],
      [7, 1, 8],
      [3, 9, 4],
      [3, 4, 2],
      [3, 2, 6],
      [3, 6, 8],
      [3, 8, 9],
      [4, 9, 5],
      [2, 4, 11],
      [6, 2, 10],
      [8, 6, 7],
      [9, 8, 1]
    ];
    const dieShape = new CANNON.ConvexPolyhedron({ vertices, faces });
    dieBody = new CANNON.Body({
      mass: 1,
      shape: dieShape,
      material: diceMaterial,
      linearDamping: physicsParams.linearDamping,
      angularDamping: physicsParams.angularDamping
    });
  }
  return dieBody;
}
function generateThrowParams(throwForce = THROW_CONFIG.defaultForce) {
  const force = Math.max(THROW_CONFIG.minForce, Math.min(THROW_CONFIG.maxForce, throwForce));
  return {
    position: THROW_CONFIG.startPosition,
    rotation: [
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    ],
    velocity: [
      (Math.random() - 0.5) * THROW_CONFIG.velocityScale * force,
      THROW_CONFIG.velocityScale * force,
      (Math.random() - 0.5) * THROW_CONFIG.velocityScale * force
    ],
    angularVelocity: [
      (Math.random() - 0.5) * THROW_CONFIG.angularVelocityScale * force,
      (Math.random() - 0.5) * THROW_CONFIG.angularVelocityScale * force,
      (Math.random() - 0.5) * THROW_CONFIG.angularVelocityScale * force
    ]
  };
}
function diceHasStopped(body, threshold = PHYSICS_SIM_CONFIG.linearThreshold) {
  const v = body.velocity;
  const av = body.angularVelocity;
  const linearSpeed = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
  const angularSpeed = Math.sqrt(av.x * av.x + av.y * av.y + av.z * av.z);
  return linearSpeed < threshold && angularSpeed < threshold;
}
function detectFaceValueFromBody(body, dieType = "d6") {
  const upVector = new CANNON.Vec3(0, 1, 0);
  if (dieType === "d6") {
    const faceNormals = [
      new CANNON.Vec3(1, 0, 0),
      // +X face (1)
      new CANNON.Vec3(-1, 0, 0),
      // -X face (6)
      new CANNON.Vec3(0, 1, 0),
      // +Y face (2)
      new CANNON.Vec3(0, -1, 0),
      // -Y face (5)
      new CANNON.Vec3(0, 0, 1),
      // +Z face (3)
      new CANNON.Vec3(0, 0, -1)
      // -Z face (4)
    ];
    const faceValues = DICE_CONFIGS.d6.defaultMapping;
    let closestFace = -1;
    let closestDot = -2;
    for (let i = 0; i < faceNormals.length; i++) {
      const worldNormal = body.quaternion.vmult(faceNormals[i]);
      const dot = worldNormal.dot(upVector);
      if (dot > closestDot) {
        closestDot = dot;
        closestFace = i;
      }
    }
    return closestFace >= 0 ? faceValues[closestFace] : -1;
  } else if (dieType === "d8") {
    const faceNormals = [
      // Top half faces (vertices 0,2,4 / 0,4,3 / 0,3,5 / 0,5,2)
      new CANNON.Vec3(0.577, 0.577, 0.577),
      new CANNON.Vec3(0.577, -0.577, 0.577),
      new CANNON.Vec3(0.577, -0.577, -0.577),
      new CANNON.Vec3(0.577, 0.577, -0.577),
      // Bottom half faces (vertices 1,3,4 / 1,4,2 / 1,2,5 / 1,5,3)
      new CANNON.Vec3(-0.577, -0.577, 0.577),
      new CANNON.Vec3(-0.577, 0.577, 0.577),
      new CANNON.Vec3(-0.577, 0.577, -0.577),
      new CANNON.Vec3(-0.577, -0.577, -0.577)
    ];
    const faceValues = DICE_CONFIGS.d8.defaultMapping;
    let closestFace = -1;
    let closestDot = -2;
    for (let i = 0; i < faceNormals.length; i++) {
      const worldNormal = body.quaternion.vmult(faceNormals[i]);
      const dot = worldNormal.dot(upVector);
      if (dot > closestDot) {
        closestDot = dot;
        closestFace = i;
      }
    }
    return closestFace >= 0 ? faceValues[closestFace] : -1;
  } else {
    const faceIndex = detectD20Face(body.quaternion);
    return faceIndex >= 0 ? faceIndex + 1 : -1;
  }
}
function simulateThrow(params, dieSize, dieType = "d6", physicsParams) {
  const physicsSetup = createPhysicsWorld(physicsParams);
  const { world, diceMaterial } = physicsSetup;
  const dieBody = createDieBody(dieType, dieSize, diceMaterial, physicsParams);
  dieBody.position.set(...params.position);
  dieBody.quaternion.setFromEuler(...params.rotation);
  dieBody.velocity.set(...params.velocity);
  dieBody.angularVelocity.set(...params.angularVelocity);
  world.addBody(dieBody);
  const maxSteps = PHYSICS_SIM_CONFIG.maxSimSteps;
  let steps = 0;
  let stopped = false;
  let stoppedFrames = 0;
  const requiredStoppedFrames = PHYSICS_SIM_CONFIG.stoppedFramesRequired;
  while (!stopped && steps < maxSteps) {
    world.step(PHYSICS_SIM_CONFIG.timeStep);
    steps++;
    const threshold = dieType === "d20" ? PHYSICS_SIM_CONFIG.linearThresholdD20 : PHYSICS_SIM_CONFIG.linearThreshold;
    if (diceHasStopped(dieBody, threshold)) {
      stoppedFrames++;
      if (stoppedFrames >= requiredStoppedFrames) {
        stopped = true;
      }
    } else {
      stoppedFrames = 0;
    }
  }
  return detectFaceValueFromBody(dieBody, dieType);
}
const D8_FACE_NORMALS = [
  // Top half faces (calculated from vertices)
  new THREE.Vector3(0.577, 0.577, 0.577),
  // Face 0: normal of triangle (0,2,4)
  new THREE.Vector3(0.577, -0.577, 0.577),
  // Face 1: normal of triangle (0,4,3)
  new THREE.Vector3(0.577, -0.577, -0.577),
  // Face 2: normal of triangle (0,3,5)
  new THREE.Vector3(0.577, 0.577, -0.577),
  // Face 3: normal of triangle (0,5,2)
  // Bottom half faces
  new THREE.Vector3(-0.577, -0.577, 0.577),
  // Face 4: normal of triangle (1,3,4)
  new THREE.Vector3(-0.577, 0.577, 0.577),
  // Face 5: normal of triangle (1,4,2)
  new THREE.Vector3(-0.577, 0.577, -0.577),
  // Face 6: normal of triangle (1,2,5)
  new THREE.Vector3(-0.577, -0.577, -0.577)
  // Face 7: normal of triangle (1,5,3)
];
function detectMeshFaceValue(mesh, dieType, currentFaceMapping) {
  const upVector = new THREE.Vector3(0, 1, 0);
  let closestFace = -1;
  let closestAngle = Math.PI * 2;
  if (dieType === "d6") {
    const faceNormals = [
      new THREE.Vector3(1, 0, 0),
      // +X
      new THREE.Vector3(-1, 0, 0),
      // -X
      new THREE.Vector3(0, 1, 0),
      // +Y
      new THREE.Vector3(0, -1, 0),
      // -Y
      new THREE.Vector3(0, 0, 1),
      // +Z
      new THREE.Vector3(0, 0, -1)
      // -Z
    ];
    for (let i = 0; i < faceNormals.length; i++) {
      const worldNormal = faceNormals[i].clone().applyQuaternion(mesh.quaternion).normalize();
      const angle = worldNormal.angleTo(upVector);
      if (angle < closestAngle) {
        closestAngle = angle;
        closestFace = i;
      }
    }
    return closestFace >= 0 ? currentFaceMapping[closestFace] : -1;
  } else if (dieType === "d8") {
    for (let i = 0; i < D8_FACE_NORMALS.length; i++) {
      const worldNormal = D8_FACE_NORMALS[i].clone().applyQuaternion(mesh.quaternion).normalize();
      const angle = worldNormal.angleTo(upVector);
      if (angle < closestAngle) {
        closestAngle = angle;
        closestFace = i;
      }
    }
    return closestFace >= 0 ? currentFaceMapping[closestFace] : -1;
  } else {
    const faceIndex = detectD20Face(mesh.quaternion);
    return faceIndex >= 0 ? currentFaceMapping[faceIndex] : -1;
  }
}
function createScene() {
  const scene = new THREE.Scene();
  scene.background = null;
  return scene;
}
function createCamera(width, height) {
  const aspect = width / height;
  const camera = new THREE.PerspectiveCamera(
    SCENE_CONFIG.cameraFov,
    aspect,
    SCENE_CONFIG.cameraNear,
    SCENE_CONFIG.cameraFar
  );
  camera.position.set(...SCENE_CONFIG.cameraPosition);
  camera.lookAt(...SCENE_CONFIG.cameraLookAt);
  return camera;
}
function createRenderer(width, height) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}
function addLighting(scene) {
  const ambientLight = new THREE.AmbientLight(16777215, LIGHTING_CONFIG.ambientIntensity);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(16777215, LIGHTING_CONFIG.directionalIntensity);
  directionalLight.position.set(...LIGHTING_CONFIG.directionalPosition);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = LIGHTING_CONFIG.shadowMapSize;
  directionalLight.shadow.mapSize.height = LIGHTING_CONFIG.shadowMapSize;
  scene.add(directionalLight);
}
function addGround(scene) {
  const groundGeometry = new THREE.PlaneGeometry(TABLE_CONFIG.groundSize, TABLE_CONFIG.groundSize);
  const groundVisualMaterial = new THREE.ShadowMaterial({
    opacity: 0.5
    // Adjust shadow darkness (0 = invisible, 1 = black)
  });
  const ground = new THREE.Mesh(groundGeometry, groundVisualMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = TABLE_CONFIG.groundY;
  ground.receiveShadow = true;
  scene.add(ground);
}
function createControls(camera, renderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = CONTROLS_CONFIG.enablePan;
  controls.minDistance = CONTROLS_CONFIG.minDistance;
  controls.maxDistance = CONTROLS_CONFIG.maxDistance;
  controls.target.set(...CONTROLS_CONFIG.target);
  controls.update();
  return controls;
}
function setupCompleteScene(width, height, mountElement) {
  const scene = createScene();
  const camera = createCamera(width, height);
  const renderer = createRenderer(width, height);
  const existingCanvas = mountElement.querySelector("canvas");
  if (existingCanvas) {
    mountElement.removeChild(existingCanvas);
  }
  mountElement.appendChild(renderer.domElement);
  addLighting(scene);
  addGround(scene);
  const controls = createControls(camera, renderer);
  return {
    scene,
    camera,
    renderer,
    controls
  };
}
function calculateMaterialShift(predictedResult, desiredResult, baseMaterials, dieType) {
  if (predictedResult <= 0 || predictedResult === desiredResult) {
    return null;
  }
  const numFaces = DICE_CONFIGS[dieType].faces;
  const defaultMapping = DICE_CONFIGS[dieType].defaultMapping;
  const predictedFaceIndex = defaultMapping.indexOf(predictedResult);
  let shift = 0;
  for (let s = 0; s < numFaces; s++) {
    const testValue = defaultMapping[(predictedFaceIndex - s + numFaces) % numFaces];
    if (testValue === desiredResult) {
      shift = s;
      break;
    }
  }
  const shiftedMaterials = new Array(numFaces);
  const newFaceMapping = new Array(numFaces);
  if (baseMaterials.length !== numFaces) {
    console.error(`Material count mismatch for ${dieType}: expected ${numFaces}, got ${baseMaterials.length}`);
    return null;
  }
  for (let i = 0; i < numFaces; i++) {
    const sourceIndex = (i - shift + numFaces) % numFaces;
    shiftedMaterials[i] = baseMaterials[sourceIndex];
    newFaceMapping[i] = defaultMapping[sourceIndex];
  }
  return {
    shiftedMaterials,
    newFaceMapping,
    shift
  };
}
function resetMaterials(mesh, baseMaterials, dieType) {
  mesh.material = baseMaterials;
  return DICE_CONFIGS[dieType].defaultMapping;
}
const DiceRoller = ({
  // Visual customization
  diceColor = "#4a90e2",
  numberColor = "#ffffff",
  // Die configuration
  dieType: propDieType = "d6",
  predeterminedResult = null,
  // Size and display
  width = 600,
  height = 400,
  dieSize = 1,
  // Callbacks
  onResult,
  onRollStart,
  onRollEnd,
  // Optional features
  showControls = false,
  showResultDisplay = true,
  throwForce: propThrowForce = 1
}) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const worldRef = useRef(null);
  const dieBodyRef = useRef(null);
  const dieMeshRef = useRef(null);
  const frameRef = useRef(void 0);
  const controlsRef = useRef(null);
  const materialsRef = useRef([]);
  const baseMaterialsRef = useRef([]);
  const currentFaceMappingRef = useRef([]);
  const diceMaterialRef = useRef(null);
  const [lastResult, setLastResult] = useState(null);
  const [targetResult, setTargetResult] = useState(predeterminedResult ?? null);
  const [dieType, setDieType] = useState(propDieType);
  const [isRolling, setIsRolling] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [physicsParams, setPhysicsParams] = useState(DEFAULT_PHYSICS);
  const [worldReady, setWorldReady] = useState(false);
  const [throwForce, setThrowForce] = useState(propThrowForce);
  const [internalDiceColor, setInternalDiceColor] = useState(diceColor);
  const [internalNumberColor, setInternalNumberColor] = useState(numberColor);
  const stoppedFramesRef = useRef(0);
  const physicsParamsRef = useRef(physicsParams);
  useEffect(() => {
    setTargetResult(predeterminedResult);
  }, [predeterminedResult]);
  useEffect(() => {
    setDieType(propDieType);
  }, [propDieType]);
  useEffect(() => {
    setThrowForce(propThrowForce);
  }, [propThrowForce]);
  useEffect(() => {
    setInternalDiceColor(diceColor);
  }, [diceColor]);
  useEffect(() => {
    setInternalNumberColor(numberColor);
  }, [numberColor]);
  const initScene = useCallback(() => {
    if (!mountRef.current) return;
    const { scene, camera, renderer, controls } = setupCompleteScene(
      width,
      height,
      mountRef.current
    );
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    controlsRef.current = controls;
    const physicsSetup = createPhysicsWorld(DEFAULT_PHYSICS);
    worldRef.current = physicsSetup.world;
    diceMaterialRef.current = physicsSetup.diceMaterial;
    setIsInitialized(true);
    setWorldReady(true);
  }, [width, height]);
  const createDie = useCallback(() => {
    if (!sceneRef.current || !worldRef.current) return;
    if (dieMeshRef.current) {
      sceneRef.current.remove(dieMeshRef.current);
      dieMeshRef.current.geometry.dispose();
      if (Array.isArray(dieMeshRef.current.material)) {
        dieMeshRef.current.material.forEach((m) => {
          if (m && m.dispose) m.dispose();
        });
      } else if (dieMeshRef.current.material && dieMeshRef.current.material.dispose) {
        dieMeshRef.current.material.dispose();
      }
    }
    if (dieBodyRef.current) {
      worldRef.current.removeBody(dieBodyRef.current);
    }
    let geometry;
    let materials;
    if (dieType === "d6") {
      geometry = createD6Geometry(dieSize);
      materials = createD6Materials(50, 0.9, internalDiceColor, internalNumberColor);
      baseMaterialsRef.current = [...materials];
      materialsRef.current = [...materials];
      currentFaceMappingRef.current = DICE_CONFIGS.d6.defaultMapping;
    } else if (dieType === "d8") {
      const d8Data = createD8(dieSize, internalDiceColor, internalNumberColor);
      geometry = d8Data.geometry;
      materials = [...d8Data.materials];
      baseMaterialsRef.current = [...materials];
      materialsRef.current = [...materials];
      currentFaceMappingRef.current = DICE_CONFIGS.d8.defaultMapping;
    } else {
      const d20Data = createD20(dieSize, internalDiceColor, internalNumberColor);
      geometry = d20Data.geometry;
      materials = [...d20Data.materials];
      baseMaterialsRef.current = [...materials];
      materialsRef.current = [...materials];
      currentFaceMappingRef.current = DICE_CONFIGS.d20.defaultMapping;
    }
    const dieBody = createDieBody(dieType, dieSize, diceMaterialRef.current, physicsParamsRef.current);
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    sceneRef.current.add(mesh);
    dieMeshRef.current = mesh;
    dieBody.position.set(...THROW_CONFIG.startPosition);
    dieBody.quaternion.setFromEuler(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    worldRef.current.addBody(dieBody);
    dieBodyRef.current = dieBody;
  }, [dieType, dieSize, internalDiceColor, internalNumberColor]);
  const detectFaceValue = useCallback(() => {
    if (!dieMeshRef.current) return -1;
    return detectMeshFaceValue(
      dieMeshRef.current,
      dieType,
      currentFaceMappingRef.current
    );
  }, [dieType]);
  const throwDie = useCallback(() => {
    if (!dieBodyRef.current || !dieMeshRef.current || isRolling) return;
    setIsRolling(true);
    stoppedFramesRef.current = 0;
    if (onRollStart) onRollStart();
    const params = generateThrowParams(throwForce);
    const desiredResult = targetResult;
    const maxValue = DICE_CONFIGS[dieType].faces;
    if (desiredResult && desiredResult >= 1 && desiredResult <= maxValue) {
      const predictedResult = simulateThrow(params, dieSize, dieType, physicsParamsRef.current);
      if (predictedResult > 0 && predictedResult !== desiredResult) {
        const shiftResult = calculateMaterialShift(
          predictedResult,
          desiredResult,
          baseMaterialsRef.current,
          dieType
        );
        if (shiftResult) {
          materialsRef.current = shiftResult.shiftedMaterials;
          currentFaceMappingRef.current = shiftResult.newFaceMapping;
          dieMeshRef.current.material = shiftResult.shiftedMaterials;
        }
      } else {
        materialsRef.current = [...baseMaterialsRef.current];
        currentFaceMappingRef.current = resetMaterials(
          dieMeshRef.current,
          baseMaterialsRef.current,
          dieType
        );
      }
    } else {
      materialsRef.current = [...baseMaterialsRef.current];
      currentFaceMappingRef.current = resetMaterials(
        dieMeshRef.current,
        baseMaterialsRef.current,
        dieType
      );
    }
    dieBodyRef.current.position.set(...params.position);
    dieBodyRef.current.quaternion.setFromEuler(...params.rotation);
    dieBodyRef.current.velocity.set(...params.velocity);
    dieBodyRef.current.angularVelocity.set(...params.angularVelocity);
  }, [isRolling, targetResult, dieType, dieSize, throwForce, onRollStart]);
  const animate = useCallback(() => {
    if (!sceneRef.current || !rendererRef.current || !cameraRef.current || !worldRef.current) return;
    worldRef.current.step(PHYSICS_SIM_CONFIG.timeStep);
    if (dieBodyRef.current && dieMeshRef.current) {
      dieMeshRef.current.position.set(
        dieBodyRef.current.position.x,
        dieBodyRef.current.position.y,
        dieBodyRef.current.position.z
      );
      dieMeshRef.current.quaternion.set(
        dieBodyRef.current.quaternion.x,
        dieBodyRef.current.quaternion.y,
        dieBodyRef.current.quaternion.z,
        dieBodyRef.current.quaternion.w
      );
      if (Math.abs(dieMeshRef.current.position.x) > ANIMATION_CONFIG.fallOffTableThreshold || Math.abs(dieMeshRef.current.position.z) > ANIMATION_CONFIG.fallOffTableThreshold || dieMeshRef.current.position.y < ANIMATION_CONFIG.fallThroughFloorY) {
        dieBodyRef.current.position.set(...THROW_CONFIG.startPosition);
        dieBodyRef.current.velocity.set(0, 0, 0);
        dieBodyRef.current.angularVelocity.set(0, 0, 0);
        setIsRolling(false);
      }
      if (isRolling) {
        const v = dieBodyRef.current.velocity;
        const av = dieBodyRef.current.angularVelocity;
        const speed = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        const angSpeed = Math.sqrt(av.x * av.x + av.y * av.y + av.z * av.z);
        const threshold = dieType === "d20" ? PHYSICS_SIM_CONFIG.linearThresholdD20 : PHYSICS_SIM_CONFIG.linearThreshold;
        if (speed < threshold && angSpeed < threshold) {
          stoppedFramesRef.current++;
          if (stoppedFramesRef.current >= PHYSICS_SIM_CONFIG.stoppedFramesRequired) {
            setIsRolling(false);
            stoppedFramesRef.current = 0;
            setTimeout(() => {
              const result = detectFaceValue();
              if (result > 0) {
                setLastResult(result);
                if (onResult) onResult(result);
              }
              if (onRollEnd) onRollEnd();
            }, ANIMATION_CONFIG.resultDelay);
          }
        } else {
          stoppedFramesRef.current = 0;
        }
      }
    }
    if (controlsRef.current) {
      controlsRef.current.update();
    }
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    frameRef.current = requestAnimationFrame(animate);
  }, [isRolling, detectFaceValue, onResult, onRollEnd, dieType]);
  useEffect(() => {
    initScene();
    return () => {
      const frame = frameRef.current;
      const renderer = rendererRef.current;
      const mount = mountRef.current;
      if (frame) {
        cancelAnimationFrame(frame);
      }
      if (renderer && mount && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [initScene]);
  useEffect(() => {
    if (worldReady) {
      createDie();
    }
  }, [worldReady, dieType, createDie]);
  useEffect(() => {
    if (isInitialized) {
      animate();
    }
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isInitialized, animate]);
  useEffect(() => {
    if (!worldReady || !worldRef.current) return;
    worldRef.current.gravity.set(0, -physicsParams.gravity, 0);
    if (dieBodyRef.current) {
      dieBodyRef.current.linearDamping = physicsParams.linearDamping;
      dieBodyRef.current.angularDamping = physicsParams.angularDamping;
      if (dieBodyRef.current.position.y < ANIMATION_CONFIG.fallThroughFloorY) {
        dieBodyRef.current.position.set(...THROW_CONFIG.startPosition);
        dieBodyRef.current.velocity.set(0, 0, 0);
        dieBodyRef.current.angularVelocity.set(0, 0, 0);
      }
    }
    const diceMaterial = diceMaterialRef.current;
    if (!diceMaterial) return;
    let groundMaterial = null;
    let wallMaterial = null;
    worldRef.current.bodies.forEach((body) => {
      if (body.material) {
        const mat = body.material;
        if (mat.name === "ground") groundMaterial = mat;
        if (mat.name === "wall") wallMaterial = mat;
      }
    });
    worldRef.current.contactmaterials = [];
    if (groundMaterial) {
      worldRef.current.addContactMaterial(new CANNON.ContactMaterial(
        diceMaterial,
        groundMaterial,
        {
          friction: physicsParams.diceFriction,
          restitution: physicsParams.diceRestitution
        }
      ));
    }
    if (wallMaterial) {
      worldRef.current.addContactMaterial(new CANNON.ContactMaterial(
        diceMaterial,
        wallMaterial,
        {
          friction: physicsParams.wallFriction,
          restitution: physicsParams.wallRestitution
        }
      ));
    }
    worldRef.current.addContactMaterial(new CANNON.ContactMaterial(
      diceMaterial,
      diceMaterial,
      {
        friction: physicsParams.diceFriction,
        restitution: physicsParams.diceRestitution
      }
    ));
  }, [physicsParams, worldReady, isRolling]);
  useEffect(() => {
    physicsParamsRef.current = physicsParams;
  }, [physicsParams]);
  const handlePhysicsChange = useCallback((newParams) => {
    if (isRolling) {
      alert(ERROR_MESSAGES.physicsWhileRolling);
      return;
    }
    setPhysicsParams(newParams);
  }, [isRolling]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.diceWrapper, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: styles.sceneContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.diceContainer, style: { width, height }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref: mountRef,
          style: { width: "100%", height: "100%", cursor: "pointer" },
          onClick: throwDie
        }
      ),
      showResultDisplay && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", bottom: 20, left: 20, color: "black" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Click anywhere to roll the die!" }),
        lastResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "24px", marginTop: "10px" }, children: [
          "Last roll: ",
          lastResult
        ] })
      ] })
    ] }) }),
    showControls && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.controlsPanel, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.controlsSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: UI_CONFIG.controlsHeading }, children: "Die Controls" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: UI_CONFIG.controlsText, fontWeight: "bold" }, children: "Throw Force:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", marginTop: "5px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "range",
                min: THROW_CONFIG.minForce,
                max: THROW_CONFIG.maxForce,
                step: THROW_CONFIG.forceStep,
                value: throwForce,
                onChange: (e) => setThrowForce(parseFloat(e.target.value)),
                style: { width: UI_CONFIG.sliderHeight }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
              marginLeft: "10px",
              backgroundColor: UI_CONFIG.monospaceBg,
              padding: "2px 8px",
              borderRadius: "4px",
              fontFamily: "monospace",
              color: UI_CONFIG.controlsText
            }, children: [
              throwForce.toFixed(1),
              "x"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: UI_CONFIG.controlsText, fontWeight: "bold" }, children: "Die Type:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", marginTop: "5px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => {
                  setDieType("d6");
                  setTargetResult(null);
                },
                style: {
                  backgroundColor: dieType === "d6" ? UI_CONFIG.buttonPrimary : UI_CONFIG.inputBackground,
                  color: dieType === "d6" ? "white" : "black",
                  border: `1px solid ${UI_CONFIG.inputBorder}`,
                  padding: "5px 10px",
                  cursor: "pointer"
                },
                children: "D6"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => {
                  setDieType("d8");
                  setTargetResult(null);
                },
                style: {
                  backgroundColor: dieType === "d8" ? UI_CONFIG.buttonPrimary : UI_CONFIG.inputBackground,
                  color: dieType === "d8" ? "white" : "black",
                  border: `1px solid ${UI_CONFIG.inputBorder}`,
                  padding: "5px 10px",
                  cursor: "pointer"
                },
                children: "D8"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => {
                  setDieType("d20");
                  setTargetResult(null);
                },
                style: {
                  backgroundColor: dieType === "d20" ? UI_CONFIG.buttonPrimary : UI_CONFIG.inputBackground,
                  color: dieType === "d20" ? "white" : "black",
                  border: `1px solid ${UI_CONFIG.inputBorder}`,
                  padding: "5px 10px",
                  cursor: "pointer"
                },
                children: "D20"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: UI_CONFIG.controlsText, fontWeight: "bold" }, children: "Predetermined Result:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", marginTop: "5px", flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setTargetResult(null),
                style: {
                  backgroundColor: targetResult === null ? UI_CONFIG.buttonPrimary : UI_CONFIG.inputBackground,
                  color: targetResult === null ? "white" : "black",
                  border: `1px solid ${UI_CONFIG.inputBorder}`,
                  padding: "5px 10px",
                  cursor: "pointer"
                },
                children: "Random"
              }
            ),
            Array.from({ length: dieType === "d6" ? 6 : dieType === "d8" ? 8 : 20 }, (_, i) => i + 1).map((num) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => setTargetResult(num),
                style: {
                  backgroundColor: targetResult === num ? UI_CONFIG.buttonPrimary : UI_CONFIG.inputBackground,
                  color: targetResult === num ? "white" : "black",
                  border: `1px solid ${UI_CONFIG.inputBorder}`,
                  padding: "5px 10px",
                  cursor: "pointer",
                  minWidth: "35px"
                },
                children: num
              },
              num
            ))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.controlsSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: UI_CONFIG.controlsHeading }, children: "Visual Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: UI_CONFIG.controlsText, fontWeight: "bold" }, children: "Die Color:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", marginTop: "5px", gap: "10px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "color",
                value: internalDiceColor,
                onChange: (e) => setInternalDiceColor(e.target.value),
                style: {
                  width: "50px",
                  height: "30px",
                  border: `1px solid ${UI_CONFIG.inputBorder}`,
                  borderRadius: "4px",
                  cursor: "pointer"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              backgroundColor: UI_CONFIG.monospaceBg,
              padding: "2px 8px",
              borderRadius: "4px",
              fontFamily: "monospace",
              color: UI_CONFIG.controlsText
            }, children: internalDiceColor })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: "15px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: UI_CONFIG.controlsText, fontWeight: "bold" }, children: "Number Color:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", marginTop: "5px", gap: "10px" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "color",
                value: internalNumberColor,
                onChange: (e) => setInternalNumberColor(e.target.value),
                style: {
                  width: "50px",
                  height: "30px",
                  border: `1px solid ${UI_CONFIG.inputBorder}`,
                  borderRadius: "4px",
                  cursor: "pointer"
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              backgroundColor: UI_CONFIG.monospaceBg,
              padding: "2px 8px",
              borderRadius: "4px",
              fontFamily: "monospace",
              color: UI_CONFIG.controlsText
            }, children: internalNumberColor })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setInternalDiceColor("#4a90e2");
              setInternalNumberColor("#ffffff");
            },
            style: {
              backgroundColor: UI_CONFIG.inputBackground,
              color: UI_CONFIG.controlsText,
              border: `1px solid ${UI_CONFIG.inputBorder}`,
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "4px"
            },
            children: "Reset Colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PhysicsControls,
        {
          params: physicsParams,
          onChange: handlePhysicsChange
        }
      )
    ] })
  ] });
};
export {
  ANIMATION_CONFIG,
  DEFAULT_PHYSICS,
  DICE_CONFIGS,
  DiceRoller,
  THROW_CONFIG
};
//# sourceMappingURL=dice-roller-react.es.js.map

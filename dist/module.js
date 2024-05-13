import React, { useRef, useState, useCallback, useEffect } from 'react';

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _excluded = ["children", "onVisibilityChange", "onEntryUpdate", "root", "rootMargin", "threshold"];
var VisibleObserver = function VisibleObserver(_ref) {
  var children = _ref.children,
    onVisibilityChange = _ref.onVisibilityChange,
    onEntryUpdate = _ref.onEntryUpdate,
    _ref$root = _ref.root,
    root = _ref$root === void 0 ? null : _ref$root,
    _ref$rootMargin = _ref.rootMargin,
    rootMargin = _ref$rootMargin === void 0 ? '0px' : _ref$rootMargin,
    _ref$threshold = _ref.threshold,
    threshold = _ref$threshold === void 0 ? 0.1 : _ref$threshold,
    props = _objectWithoutProperties(_ref, _excluded);
  var elementRef = useRef(null);
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    visibility = _useState2[0],
    setVisibility = _useState2[1];
  var handleObserverUpdate = useCallback(function (isVisible, entry) {
    if (onEntryUpdate) onEntryUpdate(isVisible, entry);
    if (isVisible !== visibility) {
      setVisibility(isVisible);
      if (onVisibilityChange) onVisibilityChange(isVisible, entry);
    }
  }, [onEntryUpdate, onVisibilityChange, visibility]);
  useEffect(function () {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        handleObserverUpdate(entry.isIntersecting, entry);
      });
    }, {
      root: root,
      rootMargin: rootMargin,
      threshold: threshold
    });
    var currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    return function () {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, handleObserverUpdate]);
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: elementRef
  }, props), children);
};

// children: React 子元素，即需要被观察的元素。
// onVisible: 当观察的元素进入可视区域时触发的回调函数。
// root: 指定根元素，用作视口检查的容器，如果不指定或为 null，则使用浏览器视窗。
// rootMargin: 定义根元素的边距，格式为 CSS 的 margin 属性。
// threshold: 一个数值或数值数组，定义了什么时候视为通过了观察。例如，0.1 表示目标元素有 10% 进入视口时触发。

// useIntersectionObserver.js
var useIntersectionObserver = function useIntersectionObserver(ref, onVisibilityChange, onEntryUpdate) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  var observerRef = useRef(null);
  var intersectingStates = useRef(new Map());
  useEffect(function () {
    observerRef.current = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        // 调用任意变化的回调
        onEntryUpdate && onEntryUpdate(entry);

        // 检查`isIntersecting`状态是否变化
        var prevIntersecting = intersectingStates.current.get(entry.target);
        var currIntersecting = entry.isIntersecting;
        if (prevIntersecting !== currIntersecting) {
          intersectingStates.current.set(entry.target, currIntersecting);
          onVisibilityChange && onVisibilityChange(currIntersecting, entry);
        }
      });
    }, options);
    var nodes = ref.current;
    if (nodes) {
      if (Array.isArray(nodes)) {
        nodes.forEach(function (node) {
          if (node) {
            observerRef.current.observe(node);
          }
        });
      } else {
        observerRef.current.observe(nodes);
      }
    }
    return function () {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, onVisibilityChange, onEntryUpdate, options]);
  return observerRef;
};

export { VisibleObserver as default, useIntersectionObserver };

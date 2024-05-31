# React Visible Observer

**React Visible Observer** 是一个基于 Intersection Observer API 的 React 组件库，专为监控元素何时进入或离开视口（`可视区域`）而设计。此库可以在元素变得可见或不可见时触发回调函数，非常适合用于实现懒加载、动画触发以及其他依赖于元素可见性的交互功能。

![npm version](https://img.shields.io/npm/v/react-visible-observer)

[Read English](https://github.com/SailingCoder/react-visible-observer/blob/main/README.md)

## 安装

你可以通过 npm 或 yarn 来安装这个库：

```bash
npm install react-visible-observer
```

或

```bash
yarn add react-visible-observer
```

## 快速开始

### 1、监控单个元素

```jsx
import React, { useRef } from 'react';
import { useIntersectionObserver } from 'use-intersection-observer';

const MyComponent = () => {
  const ref = useRef(null);
  const onVisibilityChange = (isVisible) => {
    console.log(`元素现在 ${isVisible ? '可见' : '不可见'}`);
  };

  useIntersectionObserver(ref, onVisibilityChange);

  return (
    <div ref={ref} style={{ height: '100px', backgroundColor: 'blue' }}>
      This is a div that will be observed.
    </div>
  );
};

export default MyComponent;
```

### 2、监控元素列表，多用于滚动加载

```jsx
import React, { useRef } from 'react';
import { useIntersectionObserver } from 'use-intersection-observer';

const MyComponent = () => {
  const listRef = useRef([]);

  const onVisibilityChange = (isVisible, entry) => {
    const id = entry.target.id; // 获取元素的ID
    console.log(`${id} 元素现在 ${isVisible ? '可见' : '不可见'}`);
  };

  useIntersectionObserver(listRef, onVisibilityChange);

  return (
    <div>
      <div ref={el => listRef.current[0] = el} id="item1">Item 1</div>
      <div ref={el => listRef.current[1] = el} id="item2">Item 2</div>
      <div ref={el => listRef.current[2] = el} id="item3">Item 3</div>
    </div>
  );
};

export default MyComponent;
```

### API

 `useIntersectionObserver(ref, onVisibilityChange, onEntryUpdate, options)`

| **Option**           | **Description**                                                                                              | **Type**          | **Required** | **Default**                                         |
| -------------------- | ----------------------------- | ----------------- | ------------ | --------------------------------------------------- |
| `ref`                | 要观察的 DOM 元素的 ref。                                                                                            | `React.RefObject` or `Array[React.RefObject]` | **必填**       | 无                                                   |
| `onVisibilityChange` | 当观察的元素从不可见变为可见或从可见变为不可见时调用。接受两个参数：`isVisible` (boolean) 表示元素是否可见，`entry` (IntersectionObserverEntry) 提供详细信息。 | `Function`        | **必填**          | `undefined`                                         |
| `onEntryUpdate`      | 当有任何更新时调用，无论元素是否可见。接受一个参数：`entry` (IntersectionObserverEntry)。                                               | `Function`        | 可选           | `undefined`                                         |
| `options`            | `IntersectionObserver` 的配置选项。                                                                                | `Object`          | 可选           | `{ root: null, rootMargin: '0px', threshold: 0.1 }` |

### `options` 配置选项

| **Option**   | **Description**                  | **Type**            | **Required** | **Default** |
| ------------ | -------------------------------- | ------------------- | ------------ | ----------- |
| `root`       | 观察者的根元素。默认值为 `null`，使用视口作为根元素。   | `Element`           | 可选           | `null`      |
| `rootMargin` | 字符串，用于指定根元素的外边距。用于增加或减少被视为视口的区域。 | `String`            | 可选           | `'0px'`     |
| `threshold`  | 数字或数字数组，定义了目标可见性的百分比，触发回调的阈值。    | `Number`or`Array` | 可选           | `0.1`       |

### `IntersectionObserverEntry` 属性

- `boundingClientRect`: 一个 `DOMRectReadOnly` 对象，表示目标元素的边界框的当前大小和位置，以视口坐标系为基准。 
- `intersectionRatio`: 一个浮点数，表示目标元素的可见比例。当元素完全可见时，此值为 1.0，当元素不可见时，此值为 0.0。 
- `intersectionRect`: 一个 `DOMRectReadOnly` 对象，表示目标元素与交叉区域的交叉区域的大小和位置，以视口坐标系为基准。 
- `isIntersecting`: 一个布尔值，表示目标元素是否与其所设置的根元素（如果存在）相交，即是否处于交叉状态。当元素进入视窗或与根元素相交时，值为 `true`，否则为 `false`。 
- `rootBounds`: 一个 `DOMRectReadOnly` 对象，表示根元素的边界框的大小和位置，以视口坐标系为基准。如果没有设置根元素，则此值为 `null`。 
- `target`: 一个 `Element` 对象，表示观察器正在观察的目标元素。 
- `time`: 一个浮点数，表示发生交叉的时间戳，以毫秒为单位。


## 许可证

**React Visible Observer** 采用 MIT 许可证发布。欲了解更多许可信息，请参阅项目中的 [LICENSE](https://github.com/SailingCoder/react-visible-observer/blob/main/LICENSE) 文件。
# React Visible Observer

[![npm version](https://badge.fury.io/js/react-visible-observer.svg)](https://badge.fury.io/js/react-visible-observer)

**React Visible Observer** 是一个基于 Intersection Observer API 的 React 组件库，专为监控元素何时进入或离开视口（`可视区域`）而设计。此库可以在元素变得可见或不可见时触发回调函数，非常适合用于实现懒加载、动画触发以及其他依赖于元素可见性的交互功能。

## 安装

你可以通过 npm 或 yarn 来安装这个库：

```bash
npm install react-visible-observer
````

或

```bash
yarn add react-visible-observer
```

## 使用方式

这里提供了两种实用的封装方式，适应不同的使用场景：

[1. React 自定义钩子（推荐使用，很灵活）](./doc/README_HOOKS.md)

快速入手

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

[2. React 组件实现](./doc/README_COMPONENT.md)

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import VisibleObserver from 'react-visible-observer';

const App = () => {
  const handleVisibilityChange = (isVisible) => {
    console.log(`Element is now ${isVisible ? 'visible' : 'hidden'}`);
  };

  return (
    <VisibleObserver
      onVisibilityChange={handleVisibilityChange}
      rootMargin="10px"
      threshold={0.5}
      style={{ width: '100%' }}
    >
      <div style={{height: '500px', background: 'coral'}}>
        Watched Element
      </div>
    </VisibleObserver>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

## 许可证

**React Visible Observer** 采用 MIT 许可证发布。欲了解更多许可信息，请参阅项目中的 [LICENSE](./LICENSE) 文件。
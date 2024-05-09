# React VisibleObserver 组件

`React Visible Observer` 是一个基于 Intersection Observer API 的 React 组件库，用于监视元素何时进入视口，并在该元素可见时触发回调函数。这个组件特别适用于实现懒加载、动画触发等功能。

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

以下是如何在你的项目中使用 `VisibleObserver` 组件的简单示例：

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

## API

`VisibleObserver` 组件接受以下 props:

-   `children`: React 节点，被监视的内容。
-   `onVisibilityChange`: 当元素的可见性发生变化时调用的函数。它接收两个参数：isVisible（布尔值，指示元素是否可见）和 entry（IntersectionObserver条目对象）。
-   `onEntryUpdate`: 每当交叉观察者更新时调用的函数。它接收同样的参数。
-   `root`: 观察者的根元素。如果未指定或为 null，使用视口作为根元素。
-   `rootMargin`: 字符串，用于指定根元素的外边距。这对应用增加或减少被视为视口的区域非常有用。
-   `threshold`: 一个数字或数字数组，定义了目标可见性的百分比，触发回调的阈值。例如：[0.1, 0.5, 1]
-   `style`: css style。
-   `className`: className。

## 示例

1、提供一个更复杂的示例，展示如何在实际项目中使用此组件来懒加载图片：

```jsx
import React from 'react';
import VisibleObserver from 'react-visible-observer';

const LazyImage = ({ src, alt, ...props }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <VisibleObserver onVisibilityChange={() => setIsVisible(true)}>
      {isVisible ? <img src={src} alt={alt} {...props} /> : <div>Loading image...</div>}
    </VisibleObserver>
  );
};

export default LazyImage;
```

2、假设我们有一个数据列表，我们想在每个列表项进入视口时执行某些操作

```jsx
import React from 'react';
import VisibleObserver from 'react-visible-observer';

const LazyLoadList = ({ items }) => {
    return (
        <div>
            {items.map((item, index) => (
                <VisibleObserver
                    key={item.id}
                    onVisibilityChange={() => console.log(`Item ${item.id} is now visible`)}
                    rootMargin="10px"
                    threshold={0.5}
                >
                    <div className="list-item">
                        {item.content}
                    </div>
                </VisibleObserver>
            ))}
        </div>
    );
};

export default LazyLoadList;
```

# React Visible Observer

![npm version](https://img.shields.io/npm/v/react-visible-observer)


[简体中文](https://github.com/SailingCoder/react-visible-observer/blob/main/doc/README_HOOKS.md)

**React Visible Observer** is a React component library based on the Intersection Observer API, designed to monitor when elements enter or leave the viewport (`visible area`). This library can trigger callback functions when elements become visible or invisible, making it ideal for implementing lazy loading, animation triggering, and other interactive features dependent on element visibility.

## Installation

You can install this library via npm or yarn:

```bash
npm install react-visible-observer
```

or

```bash
yarn add react-visible-observer
```

## Quick Start

### 1. Monitor a Single Element

```jsx
import React, { useRef } from 'react';
import { useIntersectionObserver } from 'react-visible-observer';

const MyComponent = () => {
  const ref = useRef(null);
  const onVisibilityChange = (isVisible) => {
    console.log(`The element is now ${isVisible ? 'visible' : 'hidden'}`);
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

### 2. Monitor a List of Elements, Typically Used for Infinite Scrolling

```jsx
import React, { useRef } from 'react';
import useIntersectionObserver from 'react-visible-observer';

const MyComponent = () => {
  const listRef = useRef([]);

  const onVisibilityChange = (isVisible, entry) => {
    console.log(`The element is now ${isVisible ? 'visible' : 'hidden'}`);
    const id = entry.target.id; // Get the ID of the element
    console.log(`${id} is now visible`);
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
| `ref`                | The ref of the DOM element(s) to observe.                                                                           | `React.RefObject` or `Array[React.RefObject]` | **Required**       | None                                                 |
| `onVisibilityChange` | Callback function called when the observed element goes from invisible to visible or from visible to invisible. Receives two parameters: `isVisible` (boolean) indicating whether the element is visible, and `entry` (IntersectionObserverEntry) providing detailed information. | `Function`        | **Required**          | `undefined`                                         |
| `onEntryUpdate`      | Callback function called when there is any update, whether the element is visible or not. Receives one parameter: `entry` (IntersectionObserverEntry).                                               | `Function`        | Optional           | `undefined`                                         |
| `options`            | Configuration options for `IntersectionObserver`.                                                                                | `Object`          | Optional           | `{ root: null, rootMargin: '0px', threshold: 0.1 }` |

### `options` Configuration Options

| **Option**   | **Description**                  | **Type**            | **Required** | **Default** |
| ------------ | -------------------------------- | ------------------- | ------------ | ----------- |
| `root`       | The root element of the observer. Default is `null`, which uses the viewport as the root element.   | `Element`           | Optional           | `null`      |
| `rootMargin` | A string specifying the margins of the root element. Used to increase or decrease the area considered as the viewport. | `String`            | Optional           | `'0px'`     |
| `threshold`  | A number or an array of numbers defining the percentage of target visibility that triggers the callback.    | `Number`or`Array` | Optional           | `0.1`       |

### `IntersectionObserverEntry` Properties

- `boundingClientRect`: A `DOMRectReadOnly` object representing the current size and position of the target element's bounding box in viewport coordinates. 
- `intersectionRatio`: A floating-point number indicating the ratio of the intersection area to the target's bounding box or to the root's bounding box, depending on the value of the root property.
- `intersectionRect`: A `DOMRectReadOnly` object representing the size and position of the intersection rectangle's intersection area.
- `isIntersecting`: A Boolean value indicating whether the target element intersects with the root element.
- `rootBounds`: A `DOMRectReadOnly` object representing the bounding box of the root element in viewport coordinates. If there is no root element, this value is `null`.
- `target`: An `Element` object representing the target element being observed.
- `time`: A floating-point number representing the time at which the intersection occurred, in milliseconds.

## License

**React Visible Observer** is released under the MIT License. See the [LICENSE](https://github.com/SailingCoder/react-visible-observer/blob/main/LICENSE) file for details.
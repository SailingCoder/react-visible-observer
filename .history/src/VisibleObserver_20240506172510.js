import React, { useEffect, useRef } from 'react';

const VisibleObserver = ({ children, onVisible, root = null, rootMargin = '0px', threshold = 0.1 }) => {
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    onVisible();  // 当元素可见时调用 onVisible 回调函数
                }
            });
        }, { root, rootMargin, threshold });

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
            observer.disconnect();
        };
    }, [elementRef, root, rootMargin, threshold, onVisible]);

    return <div ref={elementRef}>{children}</div>;
};

export default VisibleObserver;


// children: React 子元素，即需要被观察的元素。
// onVisible: 当观察的元素进入可视区域时触发的回调函数。
// root: 指定根元素，用作视口检查的容器，如果不指定或为 null，则使用浏览器视窗。
// rootMargin: 定义根元素的边距，格式为 CSS 的 margin 属性。
// threshold: 一个数值或数值数组，定义了什么时候视为通过了观察。例如，0.1 表示目标元素有 10% 进入视口时触发。
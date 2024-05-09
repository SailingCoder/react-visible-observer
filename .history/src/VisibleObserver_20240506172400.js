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

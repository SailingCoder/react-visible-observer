// useIntersectionObserver.js
import React, { useEffect, useRef } from 'react';

const useIntersectionObserver = (ref, onVisibilityChange, onEntryUpdate, options = {
  root: null, 
  rootMargin: '0px', 
  threshold: 0.1, 
}) => {
  const observerRef = useRef(null);
  const intersectingStates = useRef(new Map());

  useEffect(() => {
    // 如果 observerRef.current 已经存在，先断开之前的观察器
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 调用任意变化的回调
        if (onEntryUpdate) onEntryUpdate(entry);

        // 检查`isIntersecting`状态是否变化
        const prevIntersecting = intersectingStates.current.get(entry.target);
        const currIntersecting = entry.isIntersecting;
        if (prevIntersecting !== currIntersecting) {
          intersectingStates.current.set(entry.target, currIntersecting);
          if (onVisibilityChange) onVisibilityChange(currIntersecting, entry);
        }
      });
    }, options);

    const nodes = ref.current;
  
    if (nodes) {
      if (Array.isArray(nodes)) {
        nodes.forEach(node => {
          if (node) {
            observerRef.current.observe(node);
          }
        });
      } else {
        observerRef.current.observe(nodes);
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [ref, onVisibilityChange, onEntryUpdate, options]);

  return observerRef;
};

export default useIntersectionObserver;
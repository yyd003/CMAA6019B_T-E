import React, { Suspense } from 'react';

// 默认加载状态组件
const DefaultLoadingComponent = () => (
  <div className="loading-container">
    <p>Loading component...</p>
    <div className="loading-spinner"></div>
  </div>
);

/**
 * LazyLoad 组件 - 用于包装懒加载的组件
 * @param {Object} props - 组件属性
 * @param {React.LazyExoticComponent} props.component - 使用 React.lazy 加载的组件
 * @param {React.ReactNode} [props.fallback] - 自定义加载状态组件
 * @param {Object} [props.componentProps] - 传递给懒加载组件的属性
 */
function LazyLoad({ component: Component, fallback = <DefaultLoadingComponent />, componentProps = {} }) {
  return (
    <Suspense fallback={fallback}>
      <Component {...componentProps} />
    </Suspense>
  );
}

export default LazyLoad;
import React, { VFC, useState, CSSProperties } from 'react';
import styled from '@emotion/styled';
import type { IFrameWidgetProps } from './types';

const IFrameWidget: VFC<IFrameWidgetProps> = ({ url, retry_time, retry_count, width, height, position, zIndex }) => {
  const [count, setCount] = useState(0);

  const handleLoaded = () => {
    console.log(`iframe: ${url} loaded`);
  };

  const handleError = (e) => {
    console.warn(`iframe: ${url}`, e);
    if (count < retry_count) {
      setTimeout(() => {
        setCount(count + 1);
      }, retry_time * 1000);
    }
  };

  const style: CSSProperties = {
    position: 'absolute',
    zIndex,
  };

  if (position?.top !== undefined) style.top = position.top;
  if (position?.right !== undefined) style.right = position.right;
  if (position?.bottom !== undefined) style.bottom = position.bottom;
  if (position?.left !== undefined) style.left = position.left;

  return (
    <iframe
      key={count}
      src={url}
      width={`${width}px`}
      height={`${height}px`}
      onLoad={handleLoaded}
      onError={handleError}
      style={style}
    />
  );
};

export { IFrameWidget };

import React, { VFC, CSSProperties } from 'react';
import type { TextWidgetProps } from '@/components/TextWidget/types';

const calcTextShadow = (weight, color) => {
  const edge = [
    `${weight}px ${weight}px 0 ${color}`,
    `-${weight}px -${weight}px 0 ${color}`,
    `-${weight}px ${weight}px 0 ${color}`,
    `${weight}px -${weight}px 0 ${color}`,
    `0px ${weight}px 0 ${color}`,
    `0-${weight}px 0 ${color}`,
    `-${weight}px 0 0 ${color}`,
    `${weight}px 0 0 ${color}`
  ].join(', ');
  return edge;
};

const defaultStyle: CSSProperties = {
  display: 'flex',
  boxSizing: 'border-box',
  whiteSpace: 'pre-wrap',
  overflow: 'hidden',
  color: '#ffffff',
  backgroundColor: 'rgba(0,0,0,0.1)',
  textShadow: calcTextShadow(1, '#000000'),
  textAlign: 'start',
  verticalAlign: 'start',
  width: 320,
  height: 540,
  padding: '0.25rem 0.5rem',
  position: 'absolute',
};

const TextWidget: VFC<TextWidgetProps> = ({
  text,
  textColor,
  fontSize,
  textAlign,
  verticalAlign,
  backgroundColor,
  edgeWeight,
  edgeColor,
  width,
  height,
  padding,
  position,
  hidden,
  autoHidden,
  zIndex,
}) => {
  const edge = calcTextShadow(edgeWeight || 1, edgeColor || '#000000');

  const style: CSSProperties = {
    ...defaultStyle,
    width: `${width || 320}px`,
    height: `${height || 540}px`,
    padding: padding || '0.25rem 0.5rem',
    color: textColor || '#ffffff',
    fontSize: fontSize || '1rem',
    textShadow: edge,
    justifyContent: textAlign || 'start',
    alignItems: verticalAlign || 'start',
    backgroundColor: backgroundColor || 'rgba(0,0,0,0.1)',
    display: hidden || autoHidden && text.length === 0 ? 'none' : 'flex',
    zIndex,
  };

  if (position?.top !== undefined) style.top = position.top;
  if (position?.right !== undefined) style.right = position.right;
  if (position?.bottom !== undefined) style.bottom = position.bottom;
  if (position?.left !== undefined) style.left = position.left;

  return <div style={style}>{text}</div>;
};

export { TextWidget }

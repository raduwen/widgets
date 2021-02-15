import { VFC, CSSProperties } from 'react';

type Position = {
  top?: number;    // px
  right?: number;  // px
  bottom?: number; // px
  left?: number;   // px
}

type TextWidgetProps = {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  edgeWeight?: number; // px
  edgeColor?: string;
  width?: number;      // px
  height?: number;     // px
  padding?: string;    // px
  position?: Position;
};


const defaultStyle: CSSProperties = {
  boxSizing: 'border-box',
  whiteSpace: 'pre-wrap',
  overflow: 'hidden',
  textColor: 'white',
  backgroundColor: 'rgba(0, 0, 0 0.1)',
  edgeWeight: 1,
  edgeColor: 'black',
  width: 320,
  height: 540,
  padding: '4px 8px',
  position: 'absolute',
};

const TextWidget: VFC<TextWidgetProps> = ({
  text,
  textColor,
  backgroundColor,
  edgeWeight,
  edgeColor,
  width,
  height,
  padding,
  position,
}) => {
  const ew = edgeWeight || 1;
  const edge_color = edgeColor || 'black';

  const edge = [
    `${ew}px ${ew}px 0 ${edge_color}`,
    `-${ew}px -${ew}px 0 ${edge_color}`,
    `-${ew}px ${ew}px 0 ${edge_color}`,
    `${ew}px -${ew}px 0 ${edge_color}`,
    `0px ${ew}px 0 ${edge_color}`,
    `0-${ew}px 0 ${edge_color}`,
    `-${ew}px 0 0 ${edge_color}`,
    `${ew}px 0 0 ${edge_color}`
  ].join(', ');

  const style: CSSProperties = {
    ...defaultStyle,
    width: `${width || 320}px`,
    height: `${height | 540}px`,
    padding: padding || '4px 8px',
    color: textColor || 'white',
    textShadow: edge,
    backgroundColor: backgroundColor || 'rgba(0, 0, 0, 0.1)',
  };

  if (position?.top || position?.right || position?.bottom || position?.left) {
    if (position?.top) style.top = position.top;
    if (position?.right) style.right = position.right;
    if (position?.bottom) style.bottom = position.bottom;
    if (position?.left) style.left = position.left;
  } else {
    style.right = 0;
  }

  console.log(style);

  return <div style={style}>{text}</div>;
};

export default TextWidget

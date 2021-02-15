import { CSSProperties } from 'react';

const TextWidget = ({ text }) => {
  const edge_color = 'black';
  const ew = 1;
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
    boxSizing: 'border-box',
    position: 'absolute',
    right: 0,
    width: '320px',
    height: '540px',
    padding: '4px 8px',
    color: 'white',
    textShadow: edge,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    whiteSpace: 'pre-wrap',
  };

  return <div style={style}>{text}</div>;
};

export default TextWidget

import { Property } from 'csstype';

type Position = {
  top?: number;    // px
  right?: number;  // px
  bottom?: number; // px
  left?: number;   // px
}

type TextWidgetProps = {
  text: string;
  textColor?: string;
  fontSize?: string;
  textAlign?: Property.TextAlign;
  backgroundColor?: string;
  edgeWeight?: number; // px
  edgeColor?: string;
  width?: number;      // px
  height?: number;     // px
  padding?: string;    // px
  position?: Position;
  hidden: boolean;
};

export type { Position, TextWidgetProps };

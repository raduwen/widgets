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
  backgroundColor?: string;
  edgeWeight?: number; // px
  edgeColor?: string;
  width?: number;      // px
  height?: number;     // px
  padding?: string;    // px
  position?: Position;
};

export type { Position, TextWidgetProps };

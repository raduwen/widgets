type Position = {
  top?: number;    // px
  right?: number;  // px
  bottom?: number; // px
  left?: number;   // px
};

type IFrameWidgetProps = {
  url: string;
  retry_time: number;
  retry_count: number;
  width: number;
  height: number;
  position?: Position;
}

export type { Position, IFrameWidgetProps };

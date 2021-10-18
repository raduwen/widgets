import { TextWidget, TextWidgetEditor } from './TextWidget';
import { TimeWidget, TimeWidgetEditor } from './TimeWidget';
import { IFrameWidget, IFrameWidgetEditor } from './IFrameWidget';

export const PreviewMap = {
  text: TextWidget,
  time: TimeWidget,
  iframe: IFrameWidget,
};

export const EditorMap = {
  text: TextWidgetEditor,
  time: TimeWidgetEditor,
  iframe: IFrameWidgetEditor,
};

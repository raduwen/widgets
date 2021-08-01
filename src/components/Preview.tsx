import React, { VFC } from 'react';

import { TextWidget } from '@/components/TextWidget';
import { TimeWidget } from '@/components/TimeWidget';

const Widgets = {
  'text': TextWidget,
  'time': TimeWidget,
};

const Preview: VFC = () => {
  const text = `オレオレOBSウィジェットの整理`;

  const widgets = [
    { name: 'text', props: { text: text } },
    { name: 'time', props: { size: 30 } },
  ];

  return (
    <div>
      {widgets.map((widget) => {
        const Widget = Widgets[widget.name];
        return <Widget {...widget.props} />
      })}
    </div>
  );
};

export { Preview };

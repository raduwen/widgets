import React, { VFC } from 'react';
import { FirebaseDatabaseNode } from '@react-firebase/database';

import { TextWidget } from '@/components/TextWidget';
import { TimeWidget } from '@/components/TimeWidget';
import { IFrameWidget } from '@/components/IFrameWidget';

const Widgets = {
  'text': TextWidget,
  'time': TimeWidget,
  'iframe': IFrameWidget,
};

const Preview: VFC = () => {
  return (
    <div>
      <FirebaseDatabaseNode path="/widgets">
        {d => {
          const widgets = d.value || {};
          console.log(Object.values(widgets));
          return (
            <>
              {
                Object.keys(widgets).map((id) => {
                  const widget: any = widgets[id];
                  const Widget = Widgets[widget.name];
                  return <Widget key={id} {...widget.props} />
                })
              }
            </>
          );
        }}
      </FirebaseDatabaseNode>
    </div>
  );
};

export { Preview };

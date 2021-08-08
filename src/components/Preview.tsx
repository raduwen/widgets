import React, { VFC } from 'react';
import { FirebaseDatabaseNode } from '@react-firebase/database';

import { TextWidget } from '@/components/TextWidget';
import { TimeWidget } from '@/components/TimeWidget';

const Widgets = {
  'text': TextWidget,
  'time': TimeWidget,
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
                Object.entries(widgets).map(([id, widget]) => {
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

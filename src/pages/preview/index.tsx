import { useEffect, useState } from 'react';
import { DataSnapshot } from '@firebase/database-types';

import { db } from '@/lib/firebase';
import { TextWidget } from '@/components/TextWidget';
import { TimeWidget } from '@/components/TimeWidget';
import { IFrameWidget } from '@/components/IFrameWidget';

const Widgets = {
  'text': TextWidget,
  'time': TimeWidget,
  'iframe': IFrameWidget,
};

type Widget = {
  name: string;
  props: any;
}

type WidgetList = { [key: string]: Widget }

const PreviewPage = () => {
  const [widgets, setWidgets] = useState<WidgetList>({});

  useEffect(() => {
    db.ref('/widgets').on('value', (snap: DataSnapshot) => {
      if (snap?.val()) {
        setWidgets(snap.val());
      }
    });
  }, []);

  return (
    <div>
      {
        Object.keys(widgets).map((id) => {
          const widget: any = widgets[id];
          const Widget = Widgets[widget.name];
          return <Widget key={id} {...widget.props} />
        })
      }
    </div>
  );
};

export default PreviewPage;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ref, onValue, DataSnapshot } from '@firebase/database';

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
  const router = useRouter();
  const profile = router.query.id;
  const [widgets, setWidgets] = useState<WidgetList>({});

  useEffect(() => {
    const widgetsRef = ref(db, `/profiles/${profile}/widgets`);
    onValue(widgetsRef, (snap: DataSnapshot) => {
      if (snap?.val()) {
        setWidgets(snap.val());
      }
    });
  }, [profile]);

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

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ref, onValue, DataSnapshot } from '@firebase/database';

import { db } from '@/lib/firebase';
import { PreviewMap } from '@/components/widgets';

type Widget = {
  name: string;
  props: any;
}

type WidgetList = { [key: string]: Widget }

type PreviewProps = {
  profile: string;
}

const Preview = ({ profile }: PreviewProps) => {
  const router = useRouter();
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
          const Widget = PreviewMap[widget.name];
          return <Widget key={id} {...widget.props} />
        })
      }
    </div>
  );
};

export { Preview };

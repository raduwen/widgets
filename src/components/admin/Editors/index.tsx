import { useEffect, useState } from 'react';
import { ref, onValue, DataSnapshot } from '@firebase/database';
import { db } from '@/lib/firebase';
import { TextWidgetEditor } from '@/components/TextWidget';
import { TimeWidgetEditor } from '@/components/TimeWidget';
import { IFrameWidgetEditor } from '@/components/IFrameWidget';

const EditorMap = {
  text: TextWidgetEditor,
  time: TimeWidgetEditor,
  iframe: IFrameWidgetEditor,
};

type Widget = {
  name: string;
}

type WidgetList = { [key: string]: Widget }

type EditorsProps = {
  profile: string;
};

const Editors = ({ profile }: EditorsProps) => {
  const [widgets, setWidgets] = useState<WidgetList>({});

  useEffect(() => {
    const widgetsRef = ref(db, `/profiles/${profile}/widgets`);
    onValue(widgetsRef, (snap: DataSnapshot) => {
      setWidgets(snap.val() || {});
    });
  }, [profile]);

  return (
    <div>
      {
        Object.keys(widgets).map((id) => {
          const widget: any = widgets[id];
          const Editor = EditorMap[widget.name];
          return <Editor key={`${profile}-${id}`} id={id} profile={profile} />
        })
      }
    </div>
  );
};

export { Editors };

import { useState, useEffect } from 'react';
import firebase from 'firebase';
import { TextWidget } from '@/components/TextWidget';
import { TimeWidget } from '@/components/TimeWidget';

const Widgets = {
  'text': TextWidget,
  'time': TimeWidget,
};

// function createWidget(db, name: string, props: any) {
//   db.ref('widgets').push({
//     name,
//     props,
//   });
// }

const IndexPage = () => {
  const db = firebase.database();
  const [widgets, setWidgets] = useState([]);

  useEffect(async () => {
    const dss = await db.ref('widgets').get();
    const ws = [];
    dss.forEach((ss) => {
      ws.push(ss.val());
    });
    setWidgets(ws);
  }, [widgets]);

  return (
    <div>
      {widgets.map((widget) => {
        const Widget = Widgets[widget.name];
        return <Widget {...widget.props} />
      })}
    </div>
  );
};

export default IndexPage;

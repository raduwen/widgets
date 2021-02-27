import { useState, useEffect } from 'react';
import firebase from 'firebase';
import { TextWidget } from '@/components/TextWidget';
import { TimeWidget } from '@/components/TimeWidget';

const Widgets = {
  'text': TextWidget,
  'time': TimeWidget,
};

const IndexPage = () => {
  const db = firebase.database();
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    db.ref('widgets').get().then((dss) => {
      const ws = [];
      dss.forEach((ss) => {
        ws.push(ss.val());
      });
      setWidgets(ws);
    });
    console.log("==> Widgets initialized");
  }, []);

  return (
    <div>
      {widgets.map((widget, i) => {
        const Widget = Widgets[widget.name];
        return <Widget key={i} {...widget.props} />
      })}
    </div>
  );
};

export default IndexPage;

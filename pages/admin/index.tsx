import { useState, useEffect } from 'react';
import firebase from 'firebase';

import { TextEditor } from '@/components/TextWidget';
import { TimeEditor } from '@/components/TimeWidget';

const Editors = {
  'text': TextEditor,
  'time': TimeEditor,
};

function createWidget(db, name: string, props: any) {
  db.ref('widgets').push({
    name,
    props,
  });
}

const AdminIndexPage = () => {
  const db = firebase.database();
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    db.ref('widgets').get().then((dss) => {
      const ws = [];
      dss.forEach((ss) => {
        ws.push({ name: ss.val().name, key: ss.key });
      });
      setWidgets(ws);
    });
    console.log("==> Widgets initialized");
  }, []);

  return (
    <div>
      {widgets.map((widget) => {
        const Editor = Editors[widget.name];
        return <Editor key={widget.key} id={widget.key} />
      })}
    </div>
  );
};

export default AdminIndexPage;

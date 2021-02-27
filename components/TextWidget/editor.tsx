import { useState, useEffect } from 'react';
import firebase from 'firebase';

const TextEditor = ({ id }) => {
  const db = firebase.database();
  const [text, setText] = useState('');

  // initialize
  useEffect(() => {
    db.ref('widgets').child(`${id}/props`).get().then((dss) => {
      const props = dss.val();
      setText(props.text);
    });
  }, []);

  // handle edit
  useEffect(() => {
    db.ref('widgets').child(`${id}/props/text`).set(text);
  }, [text]);

  return (
    <form>
      <label>text</label>
      <textarea style={{ outline: '1px solid #eee' }} value={text} onChange={(e) => {
        setText(e.target.value);
      }}/>
    </form>
  );
};

export { TextEditor };

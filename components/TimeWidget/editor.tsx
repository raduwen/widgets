import { useState, useEffect } from 'react';
import firebase from 'firebase';

const TimeEditor = ({ id }) => {
  const db = firebase.database();
  const [size, setSize] = useState(30);

  // initialize
  useEffect(() => {
    db.ref('widgets').child(`${id}/props`).get().then((dss) => {
      const props = dss.val();
      setSize(props.size);
    });
  }, []);

  // handle edit
  useEffect(() => {
    db.ref('widgets').child(`${id}/props/size`).set(size);
  }, [size]);

  return (
    <form>
      <label>size</label>
      <input type="number" style={{ outline: '1px solid #eee'}} value={size} onChange={(e) => {
        setSize(parseInt(e.target.value));
      }}/>
    </form>
  );
};

export { TimeEditor };

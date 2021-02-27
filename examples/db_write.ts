import firebase from 'firebase';
import { initFirebase } from '@/lib/firebase';

function writeUserData(db, userId, name, email, imageUrl) {
  db.ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}

initFirebase();
const db = firebase.database();
writeUserData(db, "raduwen", "raduwen", "raduwen@gmail.com", "https://picsum.photos/200/300");

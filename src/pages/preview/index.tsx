import { Preview } from '@/components/Preview'
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import firebase from '@/lib/firebase';

const PreviewPage = () => {
  return (
    <FirebaseDatabaseProvider firebase={firebase}>
      <Preview />
    </FirebaseDatabaseProvider>
  );
};

export default PreviewPage;

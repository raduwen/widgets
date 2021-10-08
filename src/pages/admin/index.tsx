import { Index } from '@/components/admin'
import { FirebaseDatabaseProvider } from '@react-firebase/database';
import firebase from '@/lib/firebase';

const AdminPage = () => {
  return (
    <FirebaseDatabaseProvider firebase={firebase}>
      <Index />
    </FirebaseDatabaseProvider>
  );
};

export default AdminPage;

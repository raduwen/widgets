import { User, onAuthStateChanged } from '@firebase/auth';
import { FC, createContext, useContext, useEffect, useState } from 'react';
import { getFirebaseAuth } from '@/lib/firebase';

type AuthContextProps = {
  currentUser: User | null | undefined;
};

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    onAuthStateChanged(getFirebaseAuth(), (user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };

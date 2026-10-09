import * as SecureStore from 'expo-secure-store';
import {
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';

import { auth } from '@/config/firebase';

type AuthContextData = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
  recuperarSenha: (email: string) => Promise<void>;
  cadastrar: (nome: string, email: string, senha: string) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (usuario) => {
      if (usuario) {
        const jwt = await usuario.getIdToken();
        await SecureStore.setItemAsync('jwt', jwt);
        setToken(jwt);
      } else {
        await SecureStore.deleteItemAsync('jwt');
        setToken(null);
      }
      setUser(usuario);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function login(email: string, senha: string) {
    await signInWithEmailAndPassword(auth, email, senha);
  }

  async function logout() {
    await signOut(auth);
  }

  async function recuperarSenha(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  async function cadastrar(nome: string, email: string, senha: string) {
    const credencial = await createUserWithEmailAndPassword(auth, email, senha);
    await updateProfile(credencial.user, { displayName: nome });
    await signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, recuperarSenha, cadastrar }}
    >
      {children}
    </AuthContext.Provider>
  );
}

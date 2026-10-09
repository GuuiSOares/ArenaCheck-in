import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCq6PbyroLfw-GAaqSXI63xfatdPrPC1hE',
  authDomain: 'arenacheck-in.firebaseapp.com',
  projectId: 'arenacheck-in',
  storageBucket: 'arenacheck-in.firebasestorage.app',
  messagingSenderId: '361365450311',
  appId: '1:361365450311:web:e76501608f740819f18b62',
};

const firebaseJaIniciado = getApps().length > 0;

const app = firebaseJaIniciado ? getApp() : initializeApp(firebaseConfig);

export const auth = firebaseJaIniciado
  ? getAuth(app)
  : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

export const db = getFirestore(app);

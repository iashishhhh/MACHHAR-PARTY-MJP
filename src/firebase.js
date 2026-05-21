import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCDH5VN7K4Xs7Luak7axBwpWc9UfxCHi3U',
  authDomain: 'machhar-janta-party.firebaseapp.com',
  databaseURL: 'https://machhar-janta-party-default-rtdb.firebaseio.com',
  projectId: 'machhar-janta-party',
  storageBucket: 'machhar-janta-party.firebasestorage.app',
  messagingSenderId: '979449978613',
  appId: '1:979449978613:web:fb37f1ee009fb7239defbc',
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

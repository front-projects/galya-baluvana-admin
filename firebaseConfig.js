import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC-8x4N3Yy_7oyCtNiO1Xvl-H1zttz7qzs',
  authDomain: 'galya-baluvana-ec037.firebaseapp.com',
  projectId: 'galya-baluvana-ec037',
  storageBucket: 'galya-baluvana-ec037.appspot.com',
  messagingSenderId: '1093121386032',
  appId: '1:1093121386032:web:2a2bb0362f2550e5522ff5',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

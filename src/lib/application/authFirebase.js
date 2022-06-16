/* eslint-disable import/no-cycle */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
// eslint-disable-next-line object-curly-newline
import { getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from './init.js';
import { app } from './dataFirestore.js';

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const sendEmailVerificationFirebase = () => sendEmailVerification(auth.currentUser);

export const registerWithEmail = (email, password) => (
  createUserWithEmailAndPassword(auth, email, password)
);
export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const signOff = () => signOut(auth);

export const signInWithGoogle = () => (
  signInWithPopup(auth, provider)
);

export const modiedPerfil = (name, photoUser) => updateProfile(auth.currentUser, {
  displayName: name,
  photoURL: photoUser,
});
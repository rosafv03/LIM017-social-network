/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import {
  initializeApp,
  /* getAuth, */
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
  getDoc,
  updateDoc,
} from './init.js';

import { auth } from './authFirebase.js';
import { firebaseConfig } from './config.js';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const postCollection = async (postDescription) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      nameUser: auth.currentUser.displayName,
      id: auth.currentUser.uid,
      photo: auth.currentUser.photoURL,
      text: postDescription,
      author: localStorage.getItem('userEmail'),
      like: [],
      date: new Date().toLocaleDateString('es'),
      hora: new Date().toLocaleTimeString('es'),
    });
  } catch (e) {
    alert('Error adding document: ', e);
  }
};

export const deletePost = (id) => deleteDoc(doc(db, 'posts', id));

export const getPostPublication = (id) => getDoc(doc(db, 'posts', id));

export const onGetPosts = (callback) => onSnapshot(query(collection(db, 'posts'), orderBy('date', 'desc')), callback);

export const fuctionEditPost = (id, idPost) => updateDoc(doc(db, 'posts', id), idPost);

/* eslint-disable max-len */
// funciones relacionadas dentro de firebase

/* export const signInWithPopup = jest.fn((auth, provider) => Promise.resolve({ user: { email: emailUser } })); */
export const signInWithPopup = () => Promise.resolve({ });
export const signInWithGoogle = () => Promise.resolve({ });
export const getAuth = () => Promise.resolve({});
export const GoogleAuthProvider = jest.fn(() => ({}));
// export class GoogleAuthProvider {}

export const createUserWithEmailAndPassword = jest.fn((auth, emailUser, passwordUser) => Promise.resolve({ user: { email: emailUser } }));
// eslint-disable-next-line max-len
export const signInWithEmailAndPassword = ( auth, emailUser, passwordUser) => Promise.resolve({ user: { email: emailUser } });
// export const signInWithEmailAndPassword = () => Promise.resolve({});
/// / funciones relacionadas dentro de authFirebase
export const initializeApp = () => Promise.resolve({});
export const getFirestore = () => Promise.resolve({});
export const addDoc = () => Promise.resolve({});
export const signOut = jest.fn(() => Promise.resolve({}));

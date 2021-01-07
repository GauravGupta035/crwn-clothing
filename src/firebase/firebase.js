import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAkysaRiMbVt-3_oe8jFcWycDDtlXupH98",
    authDomain: "crown-db-3b7ad.firebaseapp.com",
    projectId: "crown-db-3b7ad",
    storageBucket: "crown-db-3b7ad.appspot.com",
    messagingSenderId: "953292535345",
    appId: "1:953292535345:web:8a3f37cfb4540e607f8710",
    measurementId: "G-WECW1PXR4E"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists)
    {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try
        {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData 
            })
        }
        catch (error)
        {
            console.log('error creating user', error.message);
        }
    }

    return userRef; 
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


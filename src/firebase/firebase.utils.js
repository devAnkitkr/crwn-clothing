import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCRP8RigGBiEwriB4o4EG3PsJMMntV6OBU",
    authDomain: "crwn-db-5231a.firebaseapp.com",
    databaseURL: "https://crwn-db-5231a.firebaseio.com",
    projectId: "crwn-db-5231a",
    storageBucket: "crwn-db-5231a.appspot.com",
    messagingSenderId: "934153215717",
    appId: "1:934153215717:web:b1e3694f0f6a148f583e0c",
    measurementId: "G-QCB20YE1EC"
};

export const createUserProfileDocument = async (userAuth,additionalData) => {

    if (!userAuth) return;

    //crud perform on doc reference only
    // not on collection reference
    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapshot = await userRef.get()
    if (!snapshot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })

        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })

export const SignInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
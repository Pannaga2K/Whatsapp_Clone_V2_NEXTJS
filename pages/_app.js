import '../styles/globals.css';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "../firebase";
import Login from './login';
import Loading from '../Components/Loading';
import { useEffect } from 'react';
import firebase from "firebase";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);                                        // CURRENT USER

  useEffect(() => {
    if(user) {
      db.collection("users").doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL
      }, {merge: true});
    }
  }, [user]);

  if(loading) return <Loading/>;

  console.log(!user);

  if(!user) return <Login/>;

  return <Component {...pageProps} />
}

export default MyApp

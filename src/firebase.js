
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyBnqK8_j_XPxDkicjFjww0HDVM0C7FYrhc",
  authDomain: "netflix-clone-9987d.firebaseapp.com",
  projectId: "netflix-clone-9987d",
  storageBucket: "netflix-clone-9987d.firebasestorage.app",
  messagingSenderId: "628519800713",
  appId: "1:628519800713:web:4b983c9993894f93645b58",
  measurementId: "G-MS3V33Z59N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)


const signup = async (name,email,password)=>{
    try {
    const  res = await createUserWithEmailAndPassword(auth, email, password);
        const user= res.user;
        await addDoc(collection(db,"user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async()=>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
    }

const logout = ()=>{
    signOut(auth);
}
export { auth, db, login, signOut, logout, signup };
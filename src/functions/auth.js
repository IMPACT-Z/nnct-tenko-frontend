import {} from "./firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";


const auth = getAuth();

const providers = {
    google: new GoogleAuthProvider(),
}

const login = async (provider) => {
    try {
        signInWithPopup(auth, provider)
    } catch (e) {
        // Error handling
    }
    // ここでユーザーが読み取れるが，特に使う必要はない
    // auth.currentUserでどこでも読み取れる．
    // const user = result.user;
}

const getIdToken = async () => await auth.currentUser.getIdToken();

const logout = async () => {
    signOut(auth).then(() => {
        alert('ログアウトに成功しました');
    }).catch((error) => {
        alert('ログアウトに失敗しました');
    });
}

const onAuthStateChangedByCallback = (callback) => {
    onAuthStateChanged(auth, callback);
}

export { 
    providers, 
    login, 
    getIdToken, 
    onAuthStateChangedByCallback, 
    logout,
};

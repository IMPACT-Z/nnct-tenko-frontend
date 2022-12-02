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

const isAuth = async () => {
    let result;

    await getIdToken()
    .then((idToken) => {
        console.log(idToken);
        result = idToken !== null;
    })
    .catch(() => {
        result = false;
    });

    return result;
}

const logout = async () => {
    signOut(auth).then(() => {
        alert('ログアウトに成功しました');
    }).catch((error) => {
        alert('ログアウトに失敗しました');
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // alert(JSON.stringify(user));
    } else {
        // User is signed out
        // alert("ログアウト中");
    }
});

export { providers, login, getIdToken, isAuth, logout };

import {} from "./firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";


const auth = getAuth();

const providers = {
    google: new GoogleAuthProvider(),
}

const logout = async () => {
    signOut(auth)
    .catch(error => {
        alert(error.message);
    });
}

const login = async (provider) => {
    signInWithPopup(auth, provider)
    .then(result => {
        const emailDomain = result.user.email.split('@')[1];
        try {
            // 長野高専の学生のアカウントかを確認
            if (emailDomain !== 'g.nagano-nct.ac.jp') 
                throw new Error('許可されたドメインのメールアドレスではありません');
        } catch(error) {
            alert(error.message);
            logout();
        }
    })
    .catch(error => {
        alert(error.message);
    });
}

const getIdToken = async () => {
    return auth.currentUser.getIdToken()
    .catch(error => {
        alert(error.message);
    });
}

const getUserInfo = () => {
    const user = auth.currentUser;
    return {
        studentId: Number(user.email.split('@')[0]),
        name: user.displayName,
        photoURL: user.photoURL,
    }
}

const onAuthStateChangedByCallback = (callback) => {
    onAuthStateChanged(auth, callback);
}

export { 
    providers, 
    login, 
    getIdToken,
    getUserInfo,
    logout,
    onAuthStateChangedByCallback, 
};

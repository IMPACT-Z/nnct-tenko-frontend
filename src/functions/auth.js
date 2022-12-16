import {} from "./firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";


const auth = getAuth();

const providers = {
    google: new GoogleAuthProvider(),
}

const logout = async () => {
    signOut(auth)
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'ログアウト失敗',
            text: error.message,
        });
    });
}

const login = async (provider) => {
    try {
        await signInWithPopup(auth, provider)
        
        try {
            // const emailDomain = result.user.email.split('@')[1];
            // 長野高専の学生のアカウントかを確認
            // if (emailDomain !== 'g.nagano-nct.ac.jp') 
            //     throw new Error('許可されたドメインのメールアドレスではありません');
        }
        catch(error) {
            await logout();
            throw error;
        }
    }
    catch(error) {
        Swal.fire({
            icon: 'error',
            title: 'ログイン失敗',
            text: error.message,
        });
    }
}

const getIdTokenExcludingAuth = async () => {
    try {
        return auth.currentUser.getIdToken()
    }
    catch(error) {
        Swal.fire({
            icon: 'error',
            title: '認証エラー',
            text: error.message,
        });
        throw error;
    }
}

const getUserInfo = () => {
    const user = auth.currentUser;
    return {
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
    }
}

const onAuthStateChangedExcludingAuth = (callback) => {
    return onAuthStateChanged(auth, callback);
}

export { 
    providers, 
    login, 
    getIdTokenExcludingAuth,
    getUserInfo,
    logout,
    onAuthStateChangedExcludingAuth, 
};

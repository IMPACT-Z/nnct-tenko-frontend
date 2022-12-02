import Base, { AUTH_TYPE } from "../base/Base";
import { providers, login } from "../../functions/auth";


const Login = () => {
    return (
        <Base 
            authType={AUTH_TYPE.NOT_AUTH}
            backgroundClassName="bg-gradient-to-bl from-cyan-100 via-sky-100 to-blue-100"
            contents={
                <button 
                    onClick={() => login(providers.google)}
                >
                    Googleでログイン
                </button>
            }
        />
    );
}

export default Login;

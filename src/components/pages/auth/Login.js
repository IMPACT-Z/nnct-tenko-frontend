import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";
import { providers, login } from "../../../functions/auth";


const Login = () => {
    return (
        <PageBase
            authType={AUTH_TYPE.NOT_AUTH}
            backgroundClassName="bg-gradient-to-bl from-cyan-100 via-sky-100 to-blue-100"
            inner={
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

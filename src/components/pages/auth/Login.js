import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";
import { providers, login } from "../../../functions/auth";


const Login = () => {
    return (
        <PageBase
            authType={AUTH_TYPE.NOT_AUTH}
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

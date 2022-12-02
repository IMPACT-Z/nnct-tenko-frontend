import { AUTH_TYPE } from "../Base";
import PageBase from "./Base";

const Home = () => {
    return (
        <PageBase
            authType={AUTH_TYPE.AUTH}
            backgroundClassName="bg-gradient-to-bl from-cyan-100 via-sky-100 to-blue-100"
            inner={
                <div>
                    Home
                </div>
            }
        />
    );
}

export default Home;

import Base, { AUTH_TYPE } from "./base/Base";

const Home = () => {
    return (
        <Base 
            authType={AUTH_TYPE.AUTH}
            backgroundClassName="bg-gradient-to-bl from-cyan-100 via-sky-100 to-blue-100"
            contents={
                <div>
                    Home
                </div>
            }
        />
    );
}

export default Home;

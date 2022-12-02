import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";

const RollCall = () => {
    return (
        <PageBase
            authType={AUTH_TYPE.AUTH}
            backgroundClassName="bg-gradient-to-bl from-cyan-100 via-sky-100 to-blue-100"
            inner={
                <div>
                    点呼をします
                </div>
            }
        />
    );
}

export default RollCall;

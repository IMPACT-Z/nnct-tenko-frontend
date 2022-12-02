import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";

const RollCall = () => {
    return (
        <PageBase
            authType={AUTH_TYPE.AUTH}
            backgroundClassName='bg-white'
            inner={
                <div>
                    点呼をします
                </div>
            }
        />
    );
}

export default RollCall;

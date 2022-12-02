import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";

const RollCallHistory = () => {
    return (
        <PageBase
            authType={AUTH_TYPE.AUTH}
            backgroundClassName='bg-white'
            inner={
                <div>
                    点呼履歴
                </div>
            }
        />
    );
}

export default RollCallHistory;

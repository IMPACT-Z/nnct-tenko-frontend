import { useEffect, useState } from "react";

import RestApi from '../../../functions/restApi';
import WebSocket from '../../../functions/webSocket';
import useInterval from '../../../functions/useInterval';

import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";


const RollCall = () => {
    // 点呼ステータスの処理
    const [status, setStatus] = useState();
    const [reflectStatusFlag, setReflectStatusFlag] = useState(true);
    const statusMessages = {
        'PENDING': '点呼の実施を待機しています',
        'DONE': '点呼が完了しました',
        'UNAVAILABLE': '点呼実施時刻ではありません',
    }
    useEffect(() => {
        // new RestApi('/api/v1/tenko').get()
        // .then((response) => {
        //     setStatus(response.data);
        // });
        setStatus('PENDING');
    }, [reflectStatusFlag]);
    const reflectStatus = () => setReflectStatusFlag(!reflectStatusFlag);

    // const socket = new WebSocket('/api/v1/tenko/session')

    // 顔の画像を送信
    const [faceImageCount, setFaceImageCount] = useState(0);
    useInterval(() => {
        if (status === 'PENDING') {
            setFaceImageCount(faceImageCount + 1);
        }
    }, 2000);
    useEffect(() => {
        // socket.send('faceImage', faceImage);
    }, [faceImageCount]);

    const [phase, setPhase] = useState();
    const phaseLabels = {
        'FACE_RECOGNITION': '顔認証',
        '3CHALLENGES': '3チャレンジ',
    }
    const [instruction, setInstruction] = useState();
    const instructionMessages = {
        'FACE_DIRECTION_UP': '上を向いてください',
        'FACE_DIRECTION_DOWN': '上を向いてください',
        'FACE_DIRECTION_LEFT': '上を向いてください',
        'FACE_DIRECTION_RIGHT': '上を向いてください',
        'FACE_DIRECTION_FRONT': '上を向いてください',
        'FACE_NOT_DETECTED': '顔を認識できません',
    }
    const [currentStep, setCurrentStep] = useState(null);
    const [totalStep, setTotalStep] = useState(null);
    // socket.receive('instructions', jsonData => {
    //     const data = JSON.parse(jsonData);

    //     switch(data.phase) {
    //         case 'FACE_RECOGNITION':
    //             setCurrentStep(null);
    //             setTotalStep(null);
    //             break;
    //         case '3CHALLENGES':
    //             setCurrentStep(data.steps.current);
    //             setTotalStep(data.steps.total);
    //             break;
    //         default:
    //             // エラーメッセージ
    //             break;
    //     }
    // });

    // socket.receive('disconnectReason', data => {
    //     switch(data) {
    //         case 'DONE':
    //         case 'UNAVAILABLE':
    //         case 'SUCCESS':
    //             reflectStatus();
    //             break;
    //         case 'INVALID_TOKEN':
    //             // エラーメッセージ
    //             break;
    //         case 'INVALID_SESSION':
    //             // エラーメッセージ
    //             break;
    //         default:
    //             // エラーメッセージ
    //             break;
    //     }
    // });


    return (
        <PageBase
            authType={AUTH_TYPE.AUTH}
            backgroundClassName='bg-white'
            inner={
                <div>
                    {statusMessages[status]}
                    {phaseLabels[phase]}
                    {instructionMessages[instruction]}
                    {phase === '3CHALLENGES' &&
                        <div>{`${currentStep}/${totalStep}`}</div>
                    }
                </div>
            }
        />
    );
}


export default RollCall;
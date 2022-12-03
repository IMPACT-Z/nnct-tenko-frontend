import { useEffect, useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

import RestApi from '../../../functions/restApi';
import WebSocket from '../../../functions/webSocket';
import useInterval from '../../../functions/useInterval';

import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";


const cameraSetting = {
    width: 480,
    height: 270,
    format: 'png',
    interval: 2000,
}
const videoConstraints = {
    width: cameraSetting.width,
    height: cameraSetting.height,
    facingMode: 'user',
}

const RollCall = () => {
    // 点呼ステータスの処理
    const [status, setStatus] = useState();

    const statusMessages = {
        'PENDING': '点呼を実施してください',
        'DONE': '点呼が完了しました',
        'UNAVAILABLE': `点呼実施時刻ではありません`,
    };

    let reflectStatusClk = false;
    // const reflectStatus = () => reflectStatusClk = !reflectStatusClk;

    useEffect(() => {
        new RestApi('/api/v1/tenko').get()
        .then((response) => {
            setStatus(response.data.status);
        });
    }, [reflectStatusClk]);

    const checkCanDo = () => status === 'PENDING';


    const [durationMessage, setDurationMessage] = useState();
    useEffect(() => {
        new RestApi('/api/v1/tenko/duration').get()
        .then((response) => {
            const startTime = response.data?.start;
            const endTime = response.data?.end;
            const src = {
                start: {
                    hour: String(startTime?.hour)?.padStart(2, '0') ?? '',
                    minute: String(startTime?.minute)?.padStart(2, '0') ?? '',
                },
                end: {
                    hour: String(endTime?.hour)?.padStart(2, '0') ?? '',
                    minute: String(endTime?.minute)?.padStart(2, '0') ?? '',
                }
            }
            setDurationMessage(`${src.start.hour}:${src.start.minute}〜${src.end.hour}:${src.end.minute}`);
        });
    }, []);


    const webcamRef = useRef(null);
    const capture = useCallback(
        () => webcamRef.current?.getScreenshot() ?? null, 
        [webcamRef]
    );


    const socket = new WebSocket('/api/v1/tenko/session')

    // 顔の画像を送信
    useInterval(() => {
        if (status !== 'PENDING') return;

        // 撮影した画像を取得
        const image = capture();
        // データ形式の変換
        const blob = atob(image.replace(/^.*,/, ''));
        let buffer = new Uint8Array(blob.length);
        for (let i = 0; i < blob.length; i++) {
            buffer[i] = blob.charCodeAt(i);
        }
        // 送信
        socket.send('faceImage', buffer);
    }, cameraSetting.interval);


    // const [phase, setPhase] = useState();
    // const phaseLabels = {
    //     'FACE_RECOGNITION': '顔認証',
    //     '3CHALLENGES': '3チャレンジ',
    // }
    // const [instruction, setInstruction] = useState();
    // const instructionMessages = {
    //     'FACE_DIRECTION_UP': '上を向いてください',
    //     'FACE_DIRECTION_DOWN': '上を向いてください',
    //     'FACE_DIRECTION_LEFT': '上を向いてください',
    //     'FACE_DIRECTION_RIGHT': '上を向いてください',
    //     'FACE_DIRECTION_FRONT': '上を向いてください',
    //     'FACE_NOT_DETECTED': '顔を認識できません',
    // }
    // const [currentStep, setCurrentStep] = useState(null);
    // const [totalStep, setTotalStep] = useState(null);
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
    //             // エラーメッセージString(
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
                <div className="py-16 flex flex-col items-center">
                    <div>
                        {statusMessages[status]}
                        （{durationMessage}）
                        {/* {phaseLabels[phase]} */}
                        {/* {instructionMessages[instruction]} */}
                        {/* {phase === '3CHALLENGES' &&
                            <div>{`${currentStep}/${totalStep}`}</div>
                        } */}
                    </div>
                    {checkCanDo() && 
                            <Webcam
                                audio={false}
                                width={cameraSetting.width}
                                height={cameraSetting.height}
                                ref={webcamRef}
                                screenshotFormat={`image/${cameraSetting.format}`}
                                videoConstraints={videoConstraints}
                            ></Webcam>
                    }
                </div>
            }
        />
    );
}


export default RollCall;
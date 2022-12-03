import { useEffect, useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

import RestApi from '../../../functions/restApi';
import WebSocket from '../../../functions/webSocket';
import useInterval from '../../../functions/useInterval';

import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";


const cameraSetting = {
    width: 800,
    height: 450,
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
    const reflectStatus = () => reflectStatusClk = !reflectStatusClk;

    useEffect(() => {
        new RestApi('/api/v1/tenko').get()
        .then((response) => {
            setStatus(response.data.status);
        });
    }, [reflectStatusClk]);

    const checkCanDo = () => status === 'PENDING';


    const [isClickedStartButton, setIsClickedStartButton] = useState(false);


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


    const [phase, setPhase] = useState('3CHALLENGES');
    const phaseLabels = {
        'FACE_RECOGNITION': '顔認証',
        '3CHALLENGES': '3チャレンジ',
    }
    const [instruction, setInstruction] = useState('FACE_DIRECTION_UP');
    const instructionMessages = {
        'FACE_DIRECTION_UP': '上を向いてください',
        'FACE_DIRECTION_DOWN': '上を向いてください',
        'FACE_DIRECTION_LEFT': '上を向いてください',
        'FACE_DIRECTION_RIGHT': '上を向いてください',
        'FACE_DIRECTION_FRONT': '上を向いてください',
        'FACE_NOT_DETECTED': '顔を認識できません',
    }
    const [currentStep, setCurrentStep] = useState(0);
    const [totalStep, setTotalStep] = useState(3);
    socket.receive('instructions', jsonData => {
        console.log('receive');
        const data = JSON.parse(jsonData);

        setPhase(data.phase);

        switch(data.phase) {
            case 'FACE_RECOGNITION':
                setInstruction(null);
                setCurrentStep(null);
                setTotalStep(null);
                break;
            case '3CHALLENGES':
                setInstruction(data.instruction);
                setCurrentStep(data.steps.current);
                setTotalStep(data.steps.total);
                break;
            default:
                // エラーメッセージ
                break;
        }
    });

    socket.receive('disconnectReason', data => {
        switch(data) {
            case 'DONE':
            case 'UNAVAILABLE':
            case 'SUCCESS':
                reflectStatus();
                break;
            case 'INVALID_TOKEN':
                // エラーメッセージ
                break;
            case 'INVALID_SESSION':
                // エラーメッセージ
                break;
            default:
                // エラーメッセージ
                break;
        }
    });

    return (
        <PageBase
            authType={AUTH_TYPE.AUTH}
            backgroundClassName='bg-white'
            inner={
                <div className="py-16 px-16 flex flex-col items-center gap-y-12">
                    <div className="flex flex-col items-center gap-y-5">
                        <div className="text-3xl text-gray-800 tracking-wider">{statusMessages[status]}</div>
                        <div className="text-2xl text-gray-400">{`(実施時間：${durationMessage})`}</div>
                        {(checkCanDo() && isClickedStartButton) && <>
                            <div className="text-xl flex">
                                {Object.keys(phaseLabels).map((key, index) => {
                                    const textColorClassName = (key === phase) ? 'text-white' : 'text-gray-400';
                                    const bgColorClassName = (key === phase) ? 'bg-sky-400' : 'bg-gray-100';
                                    return (
                                        <div key={key} className={`w-48 ${bgColorClassName} ${textColorClassName} ring-1 ring-gray-300 tracking-wider px-4 py-2 flex gap-x-2`}>
                                            <div>{`(${index+1})`}</div>
                                            <div>{phaseLabels[key]}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex gap-x-4 text-2xl text-gray-600 tracking-wider">
                                <div>
                                    {instructionMessages[instruction]}
                                </div>
                                {phase === '3CHALLENGES' &&
                                    <div>{`(${currentStep + 1}/${totalStep})`}</div>
                                }
                            </div>
                        </>}
                    </div>
                    {checkCanDo() && 
                        <>
                            {isClickedStartButton ?
                                <Webcam
                                    audio={false}
                                    width={cameraSetting.width}
                                    height={cameraSetting.height}
                                    ref={webcamRef}
                                    screenshotFormat={`image/${cameraSetting.format}`}
                                    videoConstraints={videoConstraints}
                                    className="ring-8 ring-gray-200 shadow-xl shadow-gray-600"
                                ></Webcam>
                                :
                                <button
                                    onClick={() => setIsClickedStartButton(true)}
                                    className="text-xl px-4 py-2 rounded-full bg-sky-400 text-white tracking-wider hover:opacity-70"
                                >
                                    点呼を実施する
                                </button>
                            }
                        </>
                    }
                </div>
            }
        />
    );
}


export default RollCall;
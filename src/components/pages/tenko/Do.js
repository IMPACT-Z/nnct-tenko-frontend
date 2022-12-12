import React, { useEffect, useState, useRef, useCallback, useReducer } from "react";
import Webcam from "react-webcam";
import Swal from 'sweetalert2';
import {io} from "socket.io-client";

import RestApi from '../../../functions/restApi';

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
    const getStatusMessages = useCallback(() => {
        return {
            'PENDING': '点呼を実施してください',
            'DONE': '点呼が完了しました',
            'UNAVAILABLE': `点呼実施時刻ではありません`,
        };
    }, []);
    const [status, dispatchStatus] = useReducer((state, arg) => {
        if (arg === 'init') {
            return null;
        }
        if (Object.keys(getStatusMessages()).some(key => key === arg)) {
            return arg;
        }
        Swal.fire({
            icon: 'error',
            title: 'サーバーエラー',
            text: '予期しない点呼ステータスが返ってきました'
        });
        return state;
    }, null);
    const getStatusMessage = useCallback(() => {
        return getStatusMessages()[status]
    }, [status, getStatusMessages]);

    let reflectStatusClk = false;
    // const reflectStatus = () => reflectStatusClk = !reflectStatusClk;

    useEffect(() => {
        const job = async () => {
            try {
                const response = await RestApi.get(
                    '/api/v1/tenko',
                    '点呼の実施状況が取得できませんでした',
                );
                dispatchStatus(response.data.status);
            }
            catch(error) {
                dispatchStatus('init');
            }
        }
        job();
    }, [reflectStatusClk, dispatchStatus]);

    const checkCanDo = useCallback(() => {
        return status === 'PENDING'
    }, [status]);

    const [session, dispatchSession] = useReducer((state, action) => {
        switch(action) {
            case 'start':
                return true;
            case 'kill':
                return false;
            default:
                return state;
        }
    }, false);

    const [durationMessage, setDurationMessage] = useState(null);
    useEffect(() => {
        const job = async () => {
            try {
                const response = await RestApi.get(
                    '/api/v1/tenko/duration',
                    '点呼の実施時間が取得できませんでした',
                )
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
            }
            catch(error) {
                setDurationMessage(null);
            }
        }
        job();
    }, [setDurationMessage]);

    const killSession = useCallback((socket, errorBySwalFmt) => {
        if (session) {
            if (errorBySwalFmt) {
                Swal.fire(errorBySwalFmt);
            }
            dispatchSession('kill');
            socket?.disconnect();
            window.location.reload();
        }
    }, [session, dispatchSession]);


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
                </>
            }
        />
    );
});


export default Tenko;
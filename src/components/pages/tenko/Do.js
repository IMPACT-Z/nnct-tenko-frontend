import React, { useEffect, useState, useRef, useCallback, useReducer } from "react";
import Webcam from "react-webcam";
import Swal from 'sweetalert2';
import {io} from "socket.io-client";

import RestApi from '../../../functions/restApi';
import Cookie from '../../../functions/cookie';

import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";
import { getIdTokenExcludingAuth, logout } from "../../../functions/auth";


const TenkoSession = React.memo(({reflectStatus, killSession, messageHTML}) => {
    const getCameraSetting = useCallback(() => {
        return {
            width: 800,
            height: 450,
            format: 'jpeg',
            interval: 1000,
        }
    }, []);
    const getVideoConstraints = useCallback(() => {
        return {
            width: getCameraSetting().width,
            height: getCameraSetting().height,
            facingMode: 'user',
        }
    }, [getCameraSetting]);
    const webcamRef = useRef(null);
    const capture = useCallback(() => {
        return webcamRef.current?.getScreenshot() ?? null;
    }, [webcamRef]);

    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const job = async () => {
            try {
                const token = await getIdTokenExcludingAuth();
                setSocket(io(
                    process.env.REACT_APP_API_PREFIX.replaceAll((/^https?/, 'ws')), 
                    {
                        path: '/api/v1/tenko/session',
                        extraHeaders: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                ));
                console.log('Start websocket...');
            } 
            catch(error) {
                killSession(null, {
                    type: 'error',
                    title: 'ログイン失敗',
                    text: error.msg,
                });
                await logout();
            }
        }
        job();
    }, [killSession, setSocket]);

    const getPhaseLabels = useCallback(() => {
        return {
            'FACE_RECOGNITION': '顔認証',
            '3CHALLENGES': '3チャレンジ',
        }
    }, []);
    const [phase, setPhase] = useReducer((state, arg) => {
        if (Object.keys(getPhaseLabels()).some(key => key === arg)) {
            return arg;
        }
        else {
            Swal.fire({
                type: 'error',
                title: 'サーバーエラー',
                text: '予期しない段階が返ってきました'
            });
            return state;
        }
    }, null);
    const getPhaseLabel = useCallback(() => {
        return getPhaseLabels()[phase];
    }, [phase, getPhaseLabels])

    const getInstructionMessages = useCallback(() => {
        return {
            'FACE_DIRECTION_UP': '上を向いてください',
            'FACE_DIRECTION_DOWN': '下を向いてください',
            'FACE_DIRECTION_LEFT': '左を向いてください',
            'FACE_DIRECTION_RIGHT': '右を向いてください',
            'FACE_DIRECTION_FRONT': '正面を向いてください',
            'FACE_NOT_DETECTED': '顔を認識できません',
            'WAIT': 'そのままお待ち下さい',
        }
    }, []);
    const [instruction, setInstruction] = useReducer((state, arg) => {
        if (Object.keys(getInstructionMessages()).some(key => key === arg)) {
            return arg;
        }
        else {
            Swal.fire({
                type: 'error',
                title: 'サーバーエラー',
                text: '予期しない指示が返ってきました'
            });
            return state;
        }
    }, null);
    const getInstructionMessage = useCallback(() => {
        return getInstructionMessages()[instruction];
    }, [instruction, getInstructionMessages]);

    const [currentStep, setCurrentStep] = useState(null);
    const [totalStep, setTotalStep] = useState(null);
    useEffect(() => {
        if (socket !== null) {
            socket.on('instructions', jsonData => {
                const data = JSON.parse(jsonData);
        
                setPhase(data.phase);
                setInstruction(data.instruction);
        
                switch(data.phase) {
                    case 'FACE_RECOGNITION':
                        setCurrentStep(null);
                        setTotalStep(null);
                        break;
                    case '3CHALLENGES':
                        if (data.steps !== null && data.steps !== undefined) {
                            setCurrentStep(data.steps.current);
                            setTotalStep(data.steps.total);
                        }
                        break;
                    default:
                        killSession(socket, {
                            type: 'error',
                            title: 'サーバーエラー',
                            text: '取得した現在の段階が正しくありません'
                        });
                        break;
                }
            });
        }
    }, [socket, killSession]);
    useEffect(() => {
        if (instruction !== null) {
            new Audio(
                `${process.env.PUBLIC_URL}/audio/instruction/${instruction}.wav`
            ).play();
            window.navigator.vibrate([200]);
        }
    }, [instruction]);

    // 顔の画像を送信
    useEffect(() => {
        if (socket !== null && instruction !== null) {
            const interval = setInterval(() => {
                // 撮影した画像を取得
                const image = capture();
                // データ形式の変換
                const blob = atob(image.replace(/^.*,/, ''));
                const buffer = new Uint8Array(blob.length);
                for (let i = 0; i < blob.length; i++) {
                    buffer[i] = blob.charCodeAt(i);
                }
                console.log('顔画像の送信');
                // 送信
                socket.emit('faceImage', buffer);
            }
            , getCameraSetting().interval);
            return () => clearInterval(interval);
        }
    }, [socket, instruction, capture, getCameraSetting]);

    useEffect(() => {
        if (socket !== null) {
            socket.io.on("error", (error) => {
                killSession(socket, {
                    type: 'error',
                    title: '点呼のセッションが遮断されました',
                    text: '予期しないエラー',
                });
            });
            socket.on("disconnect", () => {
                console.log('Kill websocket...');
                killSession(socket, {
                    type: 'error',
                    title: '点呼のセッションが遮断されました',
                    text: '予期しないエラー',
                });
            });
            socket.on('disconnectReason', data => {
                const job = async () => {
                    switch(data) {
                        case 'DONE':
                            killSession(socket, {
                                type: 'warning',
                                title: '点呼はできません',
                                text: '点呼はすでに完了しています',
                            });
                            break;
                        
                        case 'UNAVAILABLE':
                            reflectStatus();
                            killSession(socket, {
                                type: 'warning',
                                title: '点呼はできません',
                                text: '現在は点呼が実施されていません',
                            });
                            break;
                        
                        case 'SUCCESS':
                            // new Audio(
                            //     `${process.env.PUBLIC_URL}/audio/instruction/SUCCESS.wav`
                            // ).play();
                            reflectStatus();
                            killSession(socket, {
                                type: 'success',
                                title: '点呼完了！',
                                text: '点呼が完了しました',
                            });
                            break;
                        
                        case 'INVALID_TOKEN':
                            killSession(socket, {
                                type: 'error',
                                title: 'サーバーエラー',
                                text: `無効なトークンです`
                            });
                            await logout();
                            break;
                        
                        case 'INVALID_SESSION':
                            killSession(socket, {
                                type: 'error',
                                title: '点呼の失敗',
                                text: `${getPhaseLabel()}が失敗しました`
                            });
                            break;
                        
                        case 'FACE_MODEL_NOT_REGISTERED':
                            killSession(socket, {
                                type: 'error',
                                title: '点呼の失敗',
                                text: '顔が登録されていません'
                            });
                            break;
                        
                        default:
                            killSession(socket, {
                                type: 'error',
                                title: 'サーバーエラー',
                                text: `取得した接続の遮断理由が正しくありません`
                            });
                            break;
                    }
                }
                job();
            });
        }
    }, [socket, getPhaseLabel, killSession, reflectStatus]);

    return (
        <>
            {instruction === null ? 
                <div className="flex items-center justify-center pt-12">
                    <div className="text-gray-600 text-2xl">Loading...</div>
                </div>
                :
                <div className="py-10 md:py-16 px-6 md:px-16 flex flex-col items-center gap-y-3 md:gap-y-12">
                    <div className="flex flex-col items-center gap-y-2 md:gap-y-5">
                        {messageHTML}
                        <div className="text-sm md:text-xl flex">
                            {Object.keys(getPhaseLabels()).map((key, index) => {
                                const textColorClassName = (key === phase) ? 'text-white' : 'text-gray-400';
                                const bgColorClassName = (key === phase) ? 'bg-gray-500' : 'bg-gray-100';
                                return (
                                    <div key={key} className={`w-36 md:w-48 ${bgColorClassName} ${textColorClassName} ring-1 ring-gray-300 tracking-wider px-4 py-2 flex gap-x-2`}>
                                        <div>{`(${index+1})`}</div>
                                        <div>{getPhaseLabels()[key]}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex gap-x-1 md:gap-x-4 text-lg md:text-2xl text-gray-600 tracking-wider">
                            <div>
                                {getInstructionMessage()}
                            </div>
                            {phase === '3CHALLENGES' &&
                                <div>{`(${currentStep + 1}/${totalStep})`}</div>
                            }
                        </div>
                    </div>
                    <Webcam
                        audio={false}
                        width={getCameraSetting().width}
                        height={getCameraSetting().height}
                        ref={webcamRef}
                        screenshotFormat={`image/${getCameraSetting().format}`}
                        videoConstraints={getVideoConstraints()}
                        mirrored={true}
                        className="ring-2 ring-gray-500 shadow-lg shadow-gray-400"
                    ></Webcam>
                </div>
            }
        </>
    );
});

const Tenko = React.memo(() => {
    const [canStart, setCanStart] = useState(false);
    const [params, setParams] = useState(null);
    useEffect(() => {
        const cookie = new Cookie(document);

        let tmpParams = {};
        for (let key of ['type', 'title', 'text']) {
            const tmpValue = cookie.get(key);
            if (tmpValue === null) {
                tmpParams = null;
                break;
            }
            tmpParams[key] = tmpValue;
        }

        if (tmpParams === null) {
            setCanStart(true);
        }
        else {
            setParams(tmpParams);
        }
    }, [setCanStart, setParams]);

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
            type: 'error',
            title: 'サーバーエラー',
            text: '予期しない点呼ステータスが返ってきました'
        });
        return state;
    }, null);
    const getStatusMessage = useCallback(() => {
        return getStatusMessages()[status]
    }, [status, getStatusMessages]);

    const [reflectStatusClk, reflectStatus] = useReducer((state, action) => {
        return !state;
    }, false);

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
        if (session && errorBySwalFmt) {
            dispatchSession('kill');
            socket?.disconnect();
            setCanStart(false);

            const cookie = new Cookie(document);
            for (let key of ['type', 'title', 'text'])
                cookie.set(key, errorBySwalFmt[key]);

            window.location.reload();
        }
    }, [session, dispatchSession]);

    const getMessageHTML = useCallback(() => {
        return (
            <div className="flex flex-col md:flex-row gap-y-1 md:gap-y-0 md:gap-x-8">
                {status !== null &&
                    <div className="text-xl md:text-3xl text-gray-600 tracking-wider">{getStatusMessage()}</div>
                }
                {durationMessage !== null &&
                    <div className="text-lg md:text-2xl text-gray-400">{`(実施時間：${durationMessage})`}</div>
                }
            </div>
        );
    }, [status, durationMessage, getStatusMessage]);

    return (
        <PageBase
            authType={AUTH_TYPE.AUTH}
            backgroundClassName='bg-white'
            innerHTML={!canStart ?
                <>
                    {params === null ?
                        <div className="flex items-center justify-center pt-12">
                            <div className="text-gray-600 text-2xl">Loading...</div>
                        </div>
                        :
                        <div className="pt-12 flex flex-col gap-y-2 md:gap-y-6 items-center">
                            {params?.title &&
                                <div className="text-lg md:text-3xl text-gray-600 tracking-wider">{params.title}</div>
                            }
                            {params?.text &&
                                <div className="text-md md:text-2xl text-gray-600">{params.text}</div>
                            }
                            <button
                                onClick={() => {
                                    setParams(null);
                                    setCanStart(true);
                                    const cookie = new Cookie(document);
                                    for (let key of ['type', 'title', 'text']) 
                                        cookie.clear(key);
                                }}
                                className="text-md md:text-xl px-3 py-1 md:px-4 md:py-2 rounded-full bg-gray-500 text-white tracking-wider hover:opacity-70"
                            >
                                {params?.type === 'success' ? '再点呼' :'再読み込み'}
                            </button>
                        </div>
                    }
                </>
                :
                <>
                    {(status === null || durationMessage === null) ? 
                        <div className="flex items-center justify-center pt-12">
                            <div className="text-gray-600 text-2xl">Loading...</div>
                        </div>
                        :
                        <>
                            {session ? 
                                <TenkoSession
                                    killSession={killSession}
                                    reflectStatus={reflectStatus}
                                    messageHTML={getMessageHTML()}
                                />
                                :
                                <div className="py-10 md:py-16 px-6 md:px-16 flex flex-col items-center gap-y-3 md:gap-y-12">
                                    <div className="flex flex-col items-center gap-y-5">
                                        {getMessageHTML()}
                                    </div>
                                    {checkCanDo() &&
                                        <button
                                            onClick={() => dispatchSession('start')}
                                            className="text-md md:text-xl px-3 py-1 md:px-4 md:py-2 rounded-full bg-gray-500 text-white tracking-wider hover:opacity-70"
                                        >
                                            点呼を実施する
                                        </button>
                                    }
                                </div>
                            }
                        </>
                    }
                </>
            }
        />
    );
});


export default Tenko;
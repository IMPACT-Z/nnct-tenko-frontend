import React, { useCallback, useRef, useState } from 'react';
import Webcam from "react-webcam";
import Swal from 'sweetalert2';

import { getUserInfo } from '../../../functions/auth';
import { uploadToCloudStorage } from '../../../functions/cloudStorage';

import { AUTH_TYPE } from "../../Base";
import PageBase from "../Base";


const RegisterFace = React.memo(() => {
    const getCloudStoragePath = useCallback(() => {
        return `images/${encodeURIComponent(getUserInfo().email)}/model.jpeg`;
    }, []);

    const [isCompleted, setIsCompleted] = useState(false);

    const getCameraSetting = useCallback(() => {
        return {
            width: 480,
            height: 270,
            format: 'jpeg',
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

    const [image, setImage] = useState(null);

    const sendImage = useCallback(() => {
        const job = async () => {
            try {
                // データ形式の変換
                const blob = atob(image.replace(/^.*,/, ''));
                const buffer = new Uint8Array(blob.length);
                for (let i = 0; i < blob.length; i++) {
                    buffer[i] = blob.charCodeAt(i);
                }
                const file = new File([buffer], 'model.jpeg');

                await uploadToCloudStorage(
                    getCloudStoragePath(),
                    file,
                );
            }
            catch(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'サーバーエラー',
                    text: '顔画像の送信に失敗しました',
                });
                return;
            }

            setIsCompleted(true);
            Swal.fire({
                icon: 'success',
                title: '登録成功！',
                text: '顔画像の登録に成功しました'
            });
        }
        job();
    }, [image, getCloudStoragePath]);

    return (
        <PageBase
            authType={AUTH_TYPE.AUTH}
            backgroundClassName='bg-white'
            innerHTML={
                <div className="pt-8 xl:pt-20 flex flex-col items-center gap-y-8 xl:gap-y-16">
                    <div className="text-3xl text-gray-600">
                        {isCompleted ? '顔画像の登録はすでに完了しています' : '顔画像を登録して下さい'}</div>
                    {!isCompleted &&
                        <div className="flex flex-col xl:flex-row items-center justify-center gap-y-8 xl:gap-x-8">
                            <div className="flex xl:flex-col gap-x-10 xl:gap-y-10 items-center">
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
                                <button
                                    onClick={() => setImage(capture())}
                                    className="w-32 text-xl px-4 py-2 rounded-full bg-gray-500 text-white tracking-wider hover:opacity-70"
                                >
                                    撮影
                                </button>
                            </div>
                            <div className="flex xl:flex-col gap-x-10 xl:gap-y-10 items-center">
                                {image !== null ?
                                    <img
                                        src={image}
                                        alt="確認用"
                                        width={getCameraSetting().width}
                                        height={getCameraSetting().height}
                                        className="ring-2 ring-gray-500 shadow-lg shadow-gray-400"
                                    />
                                    :
                                    <div
                                        style={{width: getCameraSetting().width, height: getCameraSetting().height}}
                                        className="ring-2 ring-gray-500 shadow-lg shadow-gray-400"
                                    >
                                    </div>
                                }
                                {image !== null ?
                                    <button
                                        onClick={() => sendImage()}
                                        className="w-32 text-xl px-4 py-2 rounded-full bg-gray-500 text-white tracking-wider hover:opacity-70"
                                    >
                                        送信
                                    </button>
                                    :
                                    <button
                                        disabled
                                        className="w-32 text-xl px-4 py-2 rounded-full bg-gray-200 text-white tracking-wider"
                                    >
                                        送信
                                    </button>
                                }
                            </div>
                        </div>
                    }
                </div>
            }
        />
    );
});

export default RegisterFace;
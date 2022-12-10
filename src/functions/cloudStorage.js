import { getBlob, getStorage, ref, uploadBytes } from "firebase/storage";


const uploadToCloudStorage = async (path, data) => {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, data);
}

const hasFileInCloudStorage = async (path) => {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    try {
        // FIXME CORS
        const data = await getBlob(storageRef);
        console.log(data);
        return true;
    }
    catch {
        return false;
    }
}


export { uploadToCloudStorage, hasFileInCloudStorage };

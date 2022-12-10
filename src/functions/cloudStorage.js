import { getStorage, ref, uploadBytes } from "firebase/storage";


const uploadToCloudStorage = async (path, data) => {
    const storage = getStorage();
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, data);
}


export { uploadToCloudStorage };

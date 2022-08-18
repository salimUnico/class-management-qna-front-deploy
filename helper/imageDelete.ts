import { ref, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

const DeleteImage = async (path: any) => {
    const storageRef = await ref(storage, path);
    const res = await deleteObject(storageRef).then(() => {
        // File deleted successfully
        return "success"
    }).catch((error: any) => {
        // Uh-oh, an error occurred!
        return "error"
    });
    return res;
}

export default DeleteImage;
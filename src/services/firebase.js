import firebase from "firebase/app";
import "firebase/storage";
import { ToastError, ToastUpdate } from "../components/CustomToast";
import { isFileImage } from "../utils";
import { toast } from "react-toastify";
import { ResumeEvent } from "../constants/ContextEvent";

const firebaseConfig = {
  apiKey: "AIzaSyBJP-QPa6Tx_RRkQSZUorCfX7VkdXK7xAI",
  authDomain: "civizen-139f1.firebaseapp.com",
  databaseURL: "https://civizen-139f1.firebaseio.com",
  projectId: "civizen-139f1",
  storageBucket: "civizen-139f1.appspot.com",
  messagingSenderId: "667348434963",
  appId: "1:667348434963:web:661414ea3669f8c24ebfe6",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const uploadPhotograph = async (file, dispatch, t) => {
  if (!file) return null;

  if (!isFileImage(file)) {
    ToastError(t("storage.notFilePhoto"));
    return null;
  }

  if (file.size > 597152) {
    ToastError(t("storage.overSizeFilePhoto"));
    return null;
  }

  const uploadTask = firebase
    .storage()
    .ref(`/users/${new Date().getTime()}`)
    .put(file);

  let progress = 0;
  let current = toast(t("storage.firingUp"), {
    progress,
  });

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      ToastUpdate(t("storage.uploading"), current);
    },
    (error) => ToastError(error),
    async () => {
      const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
      dispatch({
        type: ResumeEvent.ON_INPUT,
        payload: {
          path: "struct.profile.photograph",
          value: downloadURL,
        },
      });
      ToastUpdate(t("storage.uploadSuccess"), current);
    }
  );
};

export default firebase;

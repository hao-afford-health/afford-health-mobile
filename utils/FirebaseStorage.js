import { app } from './Firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

export const uploadFile = async (path, uri, blob) => {
  const storageRef = ref(getStorage(), path + '/' + uri);

  const uploadTask = uploadBytesResumable(storageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            reject('User doesn\'t have permission to access the object');
            break;
          case 'storage/canceled':
            reject('User canceled the upload');
            break;
          case 'storage/unknown':
            reject('Unknown error occurred');
            break;
          default:
            reject('An error occurred during the upload');
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve(downloadURL);
          })
          .catch((error) => {
            reject('Error getting download URL: ' + error.message);
          });
      }
    );
  });
}

export const deleteFile = async (path, uri) => {
  const desertRef = ref(getStorage(), path + '/' + uri);

  await deleteObject(desertRef);
}
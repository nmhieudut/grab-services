import firestore from '@react-native-firebase/firestore';

function getProfile(uid) {
    return new Promise((resolve, reject) => {
        firestore()
            .collection('Profiles')
            .doc(uid)
            .get()
            .then((documentSnapshot) => {
                resolve(documentSnapshot.data());
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}
export default {
    getProfile
}
import auth from '@react-native-firebase/auth'

function login(email, password) {
    return new Promise((resolve, reject) => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {
                resolve(res);
                console.log('res: ', res);
            })
            .catch((err) => {
                reject(err);
                console.log(err);
            });
    });
}
function signOut() {
    return new Promise((resolve, reject) => {
        auth()
            .signOut.then((result) => {
                resolve(result);
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}
export default {
    login,
    signOut
}



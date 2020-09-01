import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

function register(values) {
    return new Promise((resolve, reject) => {
        auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then(() => {
                let uid = auth().currentUser.uid;
                // Update role,username
                firestore().collection('Profiles').doc(uid).set({
                    email: values.email,
                    displayName: values.username,
                    roles: values.roles,
                    gender: values.gender,
                    phone: values.phone
                });
                alert("User account created");
                resolve('User account created');
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    reject('That email address is already in use!');
                    alert("That email address is already in use!")
                }
                if (error.code === 'auth/invalid-email') {
                    reject('That email address is invalid!');
                    alert('That email address is invalid!')
                }
                console.error(error);
                reject(error);
            });
    });
}


export default {
    register
}
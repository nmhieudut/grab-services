import firestore from '@react-native-firebase/firestore';

function getVendors() {
    return new Promise((resolve, reject) => {
        firestore()
            .collection('Vendors')
            .get()
            .then((querySnapshot) => {
                const vendors = [];
                querySnapshot.forEach((documentSnapshot) => {
                    const vendor = documentSnapshot.data();
                    vendors.push(vendor);
                });
                resolve(vendors);
                console.log("Vendors: ", vendors)
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

function getServices() {
    return new Promise((resolve, reject) => {
        firestore()
            .collection('Services')
            .get()
            .then((querySnapshot) => {
                const services = [];
                querySnapshot.forEach((documentSnapshot) => {
                    const service = documentSnapshot.data();
                    service.vendor.get().then((vendorDocumentSnapshot) => {
                        service.vendor = vendorDocumentSnapshot.data();
                        console.log('servicesvendor: ', service.vendor);
                    });
                    services.push(service);
                });
                resolve(services);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

function getServicesOfVendor(id) {
    return new Promise((resolve, reject) => {
        const vendorRef = firestore().collection('Vendors').doc(id);

        firestore()
            .collection('Services')
            .where('vendor', '==', vendorRef)
            .get()
            .then((querySnapshot) => {
                const services = [];
                querySnapshot.forEach((documentSnapshot) => {
                    const service = documentSnapshot.data();

                    service.vendor.get().then((v) => {
                        service.vendor = v.data();
                    });

                    services.push(service);
                });
                console.log('ServicesOfVendor: ', services);
                resolve(services);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export default {
    getVendors,
    getServices,
    getServicesOfVendor,
};
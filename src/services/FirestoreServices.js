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
        console.log('Vendors: ', vendors);
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
          });
          const serviceSpecific = {
            id: documentSnapshot.id,
            service: service,
          };
          services.push(serviceSpecific);
          console.log('services:', services);
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
function getServicesDetail(id) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Services')
      .doc(id)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          resolve(documentSnapshot.data());
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
function createOrder(order) {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Orders')
      .add(order)
      .then((ref) => {
        // OK
        // TODO: Send a email to customers (THANK YOU)
        // TODO: Send notification to call center
        ref
          .get()
          .then((documentSnapshot) => {
            let createdOrder = documentSnapshot.data();
            createdOrder.id = documentSnapshot.id;
            resolve(createdOrder);
          })
          .catch((err) => console.log(err));
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
  getServicesDetail,
  getServicesOfVendor,
  createOrder,
};

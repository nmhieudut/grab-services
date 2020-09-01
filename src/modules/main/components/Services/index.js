import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native'
import Loading from '../../../../components/Loading'
import Service from './Service'
import FirestoreServices from '../../../../services/FirestoreServices';


export default function index() {
    //states
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    //get Data
    useEffect(() => {
        FirestoreServices.getServices().then((services) => {
            setLoading(false);
            setServices(services);
        });
    }, [])
    console.log('So vit: ', services);

    const renderItem = ({ item }) => {
        return (
            <View>
                <Service item={item} />
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#eeeeee', }}>
            {loading
                ? (<Loading />)
                : (<FlatList
                    data={services}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `service-${index}`}
                    key={1}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />)
            }
        </View>
    )
}

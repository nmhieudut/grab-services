import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Avatar, Card, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
    item: {
        margin: 20,
        padding: 10,
        borderRadius: 20,
    },
})
export default function Vendor({ vendor }) {
    const navigation = useNavigation();
    const LeftContent = props => <Avatar.Image {...props} source={{ uri: vendor.pictureUrl }} />
    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => { }}>
                <Card>
                    <Card.Title title={vendor.name}
                        subtitle={`Cách đây ${vendor.location._latitude} km`}
                        titleStyle={{ textTransform: "uppercase" }}
                        subtitleStyle={{ fontSize: 14 }}
                        left={LeftContent}
                    />
                    <Card.Content>
                        <Chip mode="flat"
                            style={{
                                flex: 1,
                                borderRadius: 0,
                                backgroundColor: '#e0e0e0',
                                margin: 4
                            }}
                            icon="email"> {vendor.email}</Chip>
                        <Chip mode="flat"
                            style={{
                                flex: 1,
                                borderRadius: 0,
                                backgroundColor: '#e0e0e0',
                                margin: 4
                            }}
                            icon="currency-usd"> Giá: {vendor.minPrice} - {vendor.maxPrice} $</Chip>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        </View>
    )
}

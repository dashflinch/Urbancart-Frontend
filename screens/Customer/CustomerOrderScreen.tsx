import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,FlatList,Image,TouchableOpacity,useColorScheme,} from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { getCustomerOrders } from '../../services/order';
import { SafeAreaView } from 'react-native-safe-area-context';



function CustomerOrdersScreen({ navigation }: any) {

    const [orders, setOrders] = useState<any[]>([]);
    const isDark = useColorScheme() === 'dark';

    const COLORS = isDark
        ? {
            background: '#03071E',
            card: '#11182D',
            text: '#FFFFFF',
            desc: '#FAA307',
            line: '#E85D04',
            button: '#F48C06',
        }
        : {
            background: '#FFFFFF',
            card: '#F7F7F7',
            text: '#03071E',
            desc: '#370617',
            line: '#FAA307',
            button: '#DC2F02',
        };

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const response = await getCustomerOrders();
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: COLORS.background,
                },
            ]}>

            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}>

                    <ArrowLeft
                        size={26}
                        color={COLORS.text}
                    />

                </TouchableOpacity>

                <Text
                    style={[
                        styles.heading,
                        {
                            color: COLORS.text,
                        },
                    ]}>
                    My Orders
                </Text>

            </View>

            <FlatList
                data={orders}
                keyExtractor={(item) => item.order_id.toString()}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLORS.desc,
                            marginTop: 80,
                        }}>
                        No Orders Found
                    </Text>
                }
                renderItem={({ item }) => (

                    <View
                        style={[
                            styles.card,
                            {
                                backgroundColor: COLORS.card,
                                borderColor: COLORS.line,
                            },
                        ]}>

                        <Image
                            source={{
                                uri: item.product_image,
                            }}
                            style={styles.image}
                        />

                        <View
                            style={{
                                flex: 1,
                                marginLeft: 15,
                            }}>

                            <Text
                                style={[
                                    styles.name,
                                    {
                                        color: COLORS.text,
                                    },
                                ]}>
                                {item.product_name}
                            </Text>

                            <Text
                                style={{
                                    color: COLORS.desc,
                                }}>
                                Qty : {item.quantity}
                            </Text>

                            <Text
                                style={{
                                    color: COLORS.button,
                                    fontWeight: '700',
                                    marginTop: 5,
                                }}>
                                ₹{item.price}
                            </Text>

                            <Text
                                style={{
                                    color:
                                        item.status === "pending"
                                            ? "#F59E0B"
                                            : "#10B981",
                                    marginTop: 6,
                                    fontWeight: '700',
                                }}>
                                {item.status}
                            </Text>

                        </View>

                    </View>

                )}
            />

        </SafeAreaView>

    );

}

export default CustomerOrdersScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },

    heading: {
        fontSize: 24,
        fontWeight: '800',
        marginLeft: 20,
    },

    card: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 18,
        borderWidth: 1,
        padding: 15,
    },

    image: {
        width: 90,
        height: 90,
        borderRadius: 12,
    },

    name: {
        fontSize: 18,
        fontWeight: '700',
    },

});
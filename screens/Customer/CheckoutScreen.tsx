import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    Alert,
    useColorScheme,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

import { useCart } from '../Context/CartContext';

function CheckoutScreen({ navigation }: any) {

    const { cart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);

    const isDark = useColorScheme() === 'dark';

    const COLORS = isDark
        ? {
            background: '#03071E',
            card: '#11182D',
            text: '#FFFFFF',
            desc: '#FAA307',
            button: '#F48C06',
            buttonText: '#FFFFFF',
        }
        : {
            background: '#FFFFFF',
            card: '#F7F7F7',
            text: '#03071E',
            desc: '#370617',
            button: '#DC2F02',
            buttonText: '#FFFFFF',
        };

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const delivery = cart.length > 0 ? 40 : 0;

    const total = subtotal + delivery;

    const handleOrder = async () => {

        try {

            setLoading(true);

            await placeCartOrder(cart);

            clearCart();

            Alert.alert(
                "Success",
                "Order placed successfully!",
                [
                    {
                        text: "OK",
                        onPress: () =>
                            navigation.replace("Home"),
                    },
                ]
            );

        } catch (error: any) {

            Alert.alert(
                "Error",
                error.response?.data?.detail ||
                "Unable to place order."
            );

        } finally {

            setLoading(false);

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
                        size={24}
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
                    Checkout
                </Text>

            </View>

            <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (

                    <View
                        style={[
                            styles.card,
                            {
                                backgroundColor: COLORS.card,
                            },
                        ]}>

                        <Image
                            source={{ uri: item.image }}
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
                                {item.name}
                            </Text>

                            <Text
                                style={{
                                    color: COLORS.desc,
                                }}>
                                Qty : {item.quantity}
                            </Text>

                            <Text
                                style={{
                                    color: COLORS.text,
                                    marginTop: 5,
                                }}>
                                ₹{item.price}
                            </Text>

                        </View>

                    </View>

                )}

                ListFooterComponent={

                    <View
                        style={[
                            styles.summary,
                            {
                                backgroundColor: COLORS.card,
                            },
                        ]}>

                        <Text
                            style={[
                                styles.title,
                                {
                                    color: COLORS.text,
                                },
                            ]}>
                            Order Summary
                        </Text>

                        <View style={styles.row}>
                            <Text style={{ color: COLORS.text }}>
                                Subtotal
                            </Text>

                            <Text style={{ color: COLORS.text }}>
                                ₹{subtotal}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={{ color: COLORS.text }}>
                                Delivery
                            </Text>

                            <Text style={{ color: COLORS.text }}>
                                ₹{delivery}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text
                                style={[
                                    styles.total,
                                    {
                                        color: COLORS.button,
                                    },
                                ]}>
                                Total
                            </Text>

                            <Text
                                style={[
                                    styles.total,
                                    {
                                        color: COLORS.button,
                                    },
                                ]}>
                                ₹{total}
                            </Text>
                        </View>

                    </View>

                }

            />

            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        backgroundColor: COLORS.button,
                    },
                ]}
                onPress={handleOrder}
                disabled={loading}>

                <Text
                    style={[
                        styles.buttonText,
                        {
                            color: COLORS.buttonText,
                        },
                    ]}>
                    {
                        loading
                            ? "Placing Order..."
                            : "Place Order"
                    }
                </Text>

            </TouchableOpacity>

        </SafeAreaView>

    );

}

export default CheckoutScreen;

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
        margin: 12,
        padding: 15,
        borderRadius: 15,
    },

    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
    },

    name: {
        fontSize: 18,
        fontWeight: '700',
    },

    summary: {
        margin: 15,
        padding: 20,
        borderRadius: 15,
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 15,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },

    total: {
        fontSize: 22,
        fontWeight: '800',
    },

    button: {
        margin: 20,
        height: 60,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 20,
        fontWeight: '700',
    },

});

function placeCartOrder(cart: { id: number; name: string; description: string; image: string; price: number; stock: number; seller_id: number; quantity: number; }[]) {
    throw new Error('Function not implemented.');
}

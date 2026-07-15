import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    useColorScheme,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Minus, Plus } from 'lucide-react-native';
import { placeOrder } from '../../services/order';

function BuyNowScreen({ route, navigation }: any) {

    const { product } = route.params;

    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const isDarkMode = useColorScheme() === 'dark';

    const COLORS = isDarkMode
        ? {
            background: '#03071E',
            urban: '#FFFFFF',
            cart: '#FFBA08',
            line: '#E85D04',
            desc: '#FAA307',
            button: '#F48C06',
            buttonText: '#FFFFFF',
            card: '#11182D',
        }
        : {
            background: '#FFFFFF',
            urban: '#03071E',
            cart: '#F48C06',
            line: '#FAA307',
            desc: '#370617',
            button: '#DC2F02',
            buttonText: '#FFFFFF',
            card: '#F7F7F7',
        };

    const total = product.price * quantity;

    const handlePlaceOrder = async () => {

        try {

            setLoading(true);

            await placeOrder(
                product.id,
                quantity
            );

            Alert.alert(
                "Success",
                "Order placed successfully!",
                [
                    {
                        text: "OK",
                        onPress: () =>
                            navigation.navigate("Home"),
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

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 120,
                }}
                showsVerticalScrollIndicator={false}>

            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}>

                    <ArrowLeft
                        size={28}
                        color={COLORS.urban}
                    />

                </TouchableOpacity>

                <Text
                    style={[
                        styles.heading,
                        {
                            color: COLORS.urban,
                        },
                    ]}>
                    Checkout
                </Text>

            </View>

            <Image
                source={{
                    uri: product.image,
                }}
                style={styles.image}
            />

            <View
                style={[
                    styles.card,
                    {
                        backgroundColor: COLORS.card,
                    },
                ]}>

                <Text
                    style={[
                        styles.name,
                        {
                            color: COLORS.urban,
                        },
                    ]}>
                    {product.name}
                </Text>

                <Text
                    style={[
                        styles.price,
                        {
                            color: COLORS.cart,
                        },
                    ]}>
                    ₹{product.price}
                </Text>

                <Text
                    style={{
                        color: COLORS.desc,
                        marginTop: 8,
                    }}>
                    Stock : {product.stock}
                </Text>

                <Text
                    style={[
                        styles.section,
                        {
                            color: COLORS.urban,
                        },
                    ]}>
                    Quantity
                </Text>

                <View style={styles.quantityRow}>

                    <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => {

                            if (quantity > 1) {

                                setQuantity(
                                    quantity - 1
                                );

                            }

                        }}>

                        <Minus
                            size={18}
                            color="#fff"
                        />

                    </TouchableOpacity>

                    <Text
                        style={[
                            styles.quantity,
                            {
                                color: COLORS.urban,
                            },
                        ]}>
                        {quantity}
                    </Text>

                    <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => {

                            if (
                                quantity <
                                product.stock
                            ) {

                                setQuantity(
                                    quantity + 1
                                );

                            }

                        }}>

                        <Plus
                            size={18}
                            color="#fff"
                        />

                    </TouchableOpacity>

                </View>

                <Text
                    style={[
                        styles.section,
                        {
                            color: COLORS.urban,
                        },
                    ]}>
                    Delivery Address
                </Text>

                <Text
                    style={{
                        color: COLORS.desc,
                    }}>
                    Bhubaneswar, Odisha
                </Text>

                <Text
                    style={[
                        styles.section,
                        {
                            color: COLORS.urban,
                        },
                    ]}>
                    Payment
                </Text>

                <Text
                    style={{
                        color: COLORS.desc,
                    }}>
                    Cash On Delivery
                </Text>

                <Text
                    style={[
                        styles.total,
                        {
                            color: COLORS.cart,
                        },
                    ]}>
                    Total : ₹{total}
                </Text>

                

            </View>

            </ScrollView>

            <TouchableOpacity
                style={[
                    styles.orderButton,
                    {
                        backgroundColor:
                            COLORS.button,
                    },
                ]}
                disabled={loading}
                onPress={handlePlaceOrder}>

                <Text
                    style={[
                        styles.orderText,
                        {
                            color:
                                COLORS.buttonText,
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

export default BuyNowScreen;

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

    image: {
        width: '100%',
        height: 280,
        resizeMode: 'contain',
    },

    card: {
        margin: 20,
        borderRadius: 20,
        padding: 20,
    },

    name: {
        fontSize: 24,
        fontWeight: '700',
    },

    price: {
        fontSize: 28,
        fontWeight: '800',
        marginTop: 10,
    },

    section: {
        marginTop: 25,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: '700',
    },

    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    qtyButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F48C06',
        justifyContent: 'center',
        alignItems: 'center',
    },

    quantity: {
        fontSize: 20,
        fontWeight: '700',
        marginHorizontal: 25,
    },

    total: {
        marginTop: 35,
        fontSize: 28,
        fontWeight: '800',
    },

    orderButton: {
        marginHorizontal: 20,
        height: 60,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },

    orderText: {
        fontSize: 20,
        fontWeight: '700',
    },

});
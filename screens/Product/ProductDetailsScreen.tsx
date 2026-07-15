import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, useColorScheme, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ShoppingCart, Zap } from 'lucide-react-native';
import { useCart } from '../Context/CartContext';




function ProductDetailsScreen({ route, navigation }: any) {

    const { product } = route.params;
    const { addToCart } = useCart();
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

    return (

        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: COLORS.background,
                },
            ]}>

            <ScrollView>

                {/* Header */}

                <View style={styles.header}>

                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>

                        <ArrowLeft
                            size={28}
                            color={COLORS.urban}
                        />

                    </TouchableOpacity>

                </View>

                {/* Image */}

                <Image
                    source={{
                        uri: product.image,
                    }}
                    style={styles.image}
                />

                {/* Details */}

                <View
                    style={[
                        styles.card,
                        {
                            backgroundColor: COLORS.card,
                            borderColor: COLORS.line,
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
                        style={[
                            styles.stock,
                            {
                                color: COLORS.desc,
                            },
                        ]}>

                        Stock Available : {product.stock}

                    </Text>

                    <Text
                        style={[
                            styles.heading,
                            {
                                color: COLORS.urban,
                            },
                        ]}>

                        Description

                    </Text>

                    <Text
                        style={[
                            styles.description,
                            {
                                color: COLORS.desc,
                            },
                        ]}>

                        {product.description}

                    </Text>

                </View>

            </ScrollView>

            {/* Bottom Buttons */}

            <View
                style={[
                    styles.bottom,
                    {
                        backgroundColor: COLORS.background,
                    },
                ]}>
                <View style={styles.firstRow}>

                    <TouchableOpacity
                        style={[
                            styles.cartButton,
                            {
                                backgroundColor: COLORS.line,
                            },
                        ]}
                        onPress={() => {
                            console.log("Adding Product:", product);
                            addToCart(product);
                            navigation.navigate("Cart");
                        }}>

                        <ShoppingCart
                            size={22}
                            color="#fff"
                        />

                        <Text style={styles.buttonText}>
                            Add To Cart
                        </Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.buyButton,
                            {
                                backgroundColor: COLORS.button,
                            },
                        ]}
                        onPress={() =>
                            navigation.navigate(
                                "BuyNow",
                                {
                                    product,
                                }
                            )
                        }>

                        <Zap
                            size={22}
                            color="#fff"
                        />

                        <Text style={styles.buttonText}>
                            Buy Now
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[
                        styles.messageButton,
                        {
                            backgroundColor: COLORS.line,
                        },
                    ]}
                    onPress={() =>
                        navigation.navigate("Chat", {
                            receiverId: product.seller_id,
                            receiverName: "Seller",
                        })
                    }>

                    <Text style={styles.messageText}>
                        Message Seller
                    </Text>

                </TouchableOpacity>

            </View>

        </SafeAreaView>

    );
}

export default ProductDetailsScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    header: {
        padding: 20,
    },

    image: {
        width: '100%',
        height: 320,
        resizeMode: 'cover',
    },

    card: {
        margin: 20,
        borderRadius: 20,
        borderWidth: 1,
        padding: 20,
    },

    name: {
        fontSize: 28,
        fontWeight: '800',
    },

    price: {
        fontSize: 26,
        fontWeight: '800',
        marginTop: 15,
    },

    stock: {
        fontSize: 16,
        marginTop: 10,
    },

    heading: {
        fontSize: 20,
        fontWeight: '700',
        marginTop: 25,
        marginBottom: 10,
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
    },

    bottom: {
        padding: 15,
    },

    cartButton: {
        flex: 1,
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginRight: 8,
    },

    buyButton: {
        flex: 1,
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 8,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 8,
    },

    messageButton: {
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },

    messageText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },

    firstRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },

});
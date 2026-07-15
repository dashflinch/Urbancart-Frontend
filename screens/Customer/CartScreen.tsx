import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react-native';
import { useCart } from '../Context/CartContext';

function CartScreen({ navigation }: any) {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useCart();

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

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );

    return (
        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: COLORS.background,
                },
            ]}>
            {/* Header */}

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ArrowLeft size={26} color={COLORS.text} />
                </TouchableOpacity>

                <Text
                    style={[
                        styles.heading,
                        {
                            color: COLORS.text,
                        },
                    ]}>
                    My Cart
                </Text>
            </View>

            {cart.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text
                        style={[
                            styles.emptyText,
                            {
                                color: COLORS.desc,
                            },
                        ]}>
                        Your cart is empty
                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.shopButton,
                            {
                                backgroundColor: COLORS.button,
                            },
                        ]}
                        onPress={() => navigation.navigate('Home')}>
                        <Text
                            style={[
                                styles.shopButtonText,
                                {
                                    color: COLORS.buttonText,
                                },
                            ]}>
                            Continue Shopping
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        renderItem={({ item }) => (
                            <View
                                style={[
                                    styles.card,
                                    {
                                        backgroundColor: COLORS.card,
                                    },
                                ]}>
                                <Image
                                    source={{
                                        uri: item.image,
                                    }}
                                    style={styles.image}
                                />

                                <View style={{ flex: 1 }}>
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
                                            color: COLORS.button,
                                            fontSize: 18,
                                            fontWeight: '700',
                                            marginTop: 6,
                                        }}>
                                        ₹{item.price}
                                    </Text>

                                    <View style={styles.row}>
                                        <TouchableOpacity
                                            style={styles.qtyButton}
                                            onPress={() => decreaseQuantity(item.id)}>
                                            <Minus size={18} color="#fff" />
                                        </TouchableOpacity>

                                        <Text
                                            style={[
                                                styles.qty,
                                                {
                                                    color: COLORS.text,
                                                },
                                            ]}>
                                            {item.quantity}
                                        </Text>

                                        <TouchableOpacity
                                            style={styles.qtyButton}
                                            onPress={() => increaseQuantity(item.id)}>
                                            <Plus size={18} color="#fff" />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{ marginLeft: 'auto' }}
                                            onPress={() => removeFromCart(item.id)}>
                                            <Trash2 color="red" size={22} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    />

                    <View
                        style={[
                            styles.footer,
                            {
                                backgroundColor: COLORS.card,
                            },
                        ]}>
                        <Text
                            style={[
                                styles.total,
                                {
                                    color: COLORS.text,
                                },
                            ]}>
                            Total ₹{total}
                        </Text>

                        <TouchableOpacity
                            style={[
                                styles.checkout,
                                {
                                    backgroundColor: COLORS.button,
                                },
                            ]}
                            onPress={() => navigation.navigate('Checkout')}>
                            <Text
                                style={[
                                    styles.checkoutText,
                                    {
                                        color: COLORS.buttonText,
                                    },
                                ]}>
                                Checkout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
}

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    heading: {
        fontSize: 26,
        fontWeight: '800',
        marginLeft: 20,
    },

    card: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginVertical: 8,
        padding: 15,
        borderRadius: 18,
    },

    image: {
        width: 95,
        height: 95,
        borderRadius: 12,
        marginRight: 15,
    },

    name: {
        fontSize: 18,
        fontWeight: '700',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },

    qtyButton: {
        width: 35,
        height: 35,
        borderRadius: 18,
        backgroundColor: '#F48C06',
        justifyContent: 'center',
        alignItems: 'center',
    },

    qty: {
        marginHorizontal: 18,
        fontSize: 18,
        fontWeight: '700',
    },

    footer: {
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    total: {
        fontSize: 24,
        fontWeight: '800',
    },

    checkout: {
        marginTop: 15,
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    checkoutText: {
        fontSize: 18,
        fontWeight: '700',
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyText: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 25,
    },

    shopButton: {
        height: 55,
        paddingHorizontal: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    shopButtonText: {
        fontSize: 18,
        fontWeight: '700',
    },
});
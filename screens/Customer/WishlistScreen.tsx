import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    useColorScheme,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import {
    ArrowLeft,
    Heart,
    ShoppingCart,
    Trash2,
} from 'lucide-react-native';

import { useWishlist } from '../Context/WishlistContext';
import { useCart } from '../Context/CartContext';

const WishlistScreen = ({ navigation }: any) => {

    const isDark = useColorScheme() === 'dark';

    const {
        wishlist,
        removeFromWishlist,
    } = useWishlist();

    const {
        addToCart,
    } = useCart();

    const COLORS = isDark
        ? {
            background: '#03071E',
            card: '#11182D',
            text: '#FFFFFF',
            desc: '#FAA307',
            button: '#F48C06',
            buttonText: '#FFFFFF',
            line: '#E85D04',
        }
        : {
            background: '#F7F8FA',
            card: '#FFFFFF',
            text: '#03071E',
            desc: '#555555',
            button: '#DC2F02',
            buttonText: '#FFFFFF',
            line: '#FAA307',
        };

    const handleAddToCart = (item: any) => {

        addToCart(item);

        removeFromWishlist(item.id);
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
                        size={27}
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

                    My Wishlist

                </Text>

                <Heart
                    size={27}
                    color={COLORS.button}
                    fill={COLORS.button}
                />

            </View>


            {wishlist.length === 0 ? (

                <View style={styles.emptyContainer}>

                    <Heart
                        size={80}
                        color={COLORS.desc}
                    />

                    <Text
                        style={[
                            styles.emptyTitle,
                            {
                                color: COLORS.text,
                            },
                        ]}>

                        Your Wishlist is Empty

                    </Text>

                    <Text
                        style={[
                            styles.emptyDesc,
                            {
                                color: COLORS.desc,
                            },
                        ]}>

                        Save products you love here

                    </Text>

                    <TouchableOpacity
                        style={[
                            styles.shopButton,
                            {
                                backgroundColor: COLORS.button,
                            },
                        ]}
                        onPress={() =>
                            navigation.navigate('Home')
                        }>

                        <Text style={styles.shopButtonText}>

                            Continue Shopping

                        </Text>

                    </TouchableOpacity>

                </View>

            ) : (

                <FlatList
                    data={wishlist}
                    keyExtractor={(item) =>
                        item.id.toString()
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 30,
                    }}
                    renderItem={({ item }) => (

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>
                                navigation.navigate(
                                    'ProductDetails',
                                    {
                                        product: item,
                                    }
                                )
                            }
                            style={[
                                styles.card,
                                {
                                    backgroundColor: COLORS.card,
                                    borderColor: COLORS.line,
                                },
                            ]}>

                            <Image
                                source={{
                                    uri: item.image,
                                }}
                                style={styles.image}
                            />

                            <View style={styles.productContent}>

                                <Text
                                    numberOfLines={2}
                                    style={[
                                        styles.productName,
                                        {
                                            color: COLORS.text,
                                        },
                                    ]}>

                                    {item.name}

                                </Text>

                                <Text
                                    style={[
                                        styles.price,
                                        {
                                            color: COLORS.button,
                                        },
                                    ]}>

                                    ₹{item.price}

                                </Text>


                                <View style={styles.actionRow}>

                                    <TouchableOpacity
                                        style={[
                                            styles.cartButton,
                                            {
                                                backgroundColor:
                                                    COLORS.button,
                                            },
                                        ]}
                                        onPress={(event) => {

                                            event.stopPropagation();

                                            handleAddToCart(item);

                                        }}>

                                        <ShoppingCart
                                            size={18}
                                            color={
                                                COLORS.buttonText
                                            }
                                        />

                                        <Text
                                            style={[
                                                styles.cartText,
                                                {
                                                    color:
                                                        COLORS.buttonText,
                                                },
                                            ]}>

                                            Add to Cart

                                        </Text>

                                    </TouchableOpacity>


                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={(event) => {

                                            event.stopPropagation();

                                            removeFromWishlist(
                                                item.id
                                            );

                                        }}>

                                        <Trash2
                                            size={22}
                                            color="#EF4444"
                                        />

                                    </TouchableOpacity>

                                </View>

                            </View>

                        </TouchableOpacity>

                    )}
                />

            )}

        </SafeAreaView>
    );
};

export default WishlistScreen;


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 18,
    },

    heading: {
        fontSize: 25,
        fontWeight: '800',
    },

    card: {
        marginHorizontal: 18,
        marginVertical: 8,
        borderRadius: 18,
        borderWidth: 1,
        padding: 14,
        flexDirection: 'row',
    },

    image: {
        width: 105,
        height: 105,
        borderRadius: 14,
        resizeMode: 'contain',
    },

    productContent: {
        flex: 1,
        marginLeft: 15,
    },

    productName: {
        fontSize: 17,
        fontWeight: '700',
    },

    price: {
        fontSize: 19,
        fontWeight: '800',
        marginTop: 7,
    },

    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 14,
    },

    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 40,
        borderRadius: 12,
    },

    cartText: {
        marginLeft: 7,
        fontSize: 14,
        fontWeight: '700',
    },

    deleteButton: {
        marginLeft: 'auto',
        padding: 8,
    },

    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },

    emptyTitle: {
        fontSize: 24,
        fontWeight: '800',
        marginTop: 20,
    },

    emptyDesc: {
        fontSize: 16,
        marginTop: 8,
    },

    shopButton: {
        height: 55,
        paddingHorizontal: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },

    shopButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },

});
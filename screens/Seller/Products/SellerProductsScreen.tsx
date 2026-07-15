import React, {
    useCallback,
    useState,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    useColorScheme,
    ActivityIndicator,
} from 'react-native';

import {
    Home,
    Package,
    User,
} from 'lucide-react-native';

import {
    SafeAreaView,
} from 'react-native-safe-area-context';

import {
    useFocusEffect,
} from '@react-navigation/native';

import api from '../../../services/api';

import {
    getToken,
} from '../../../utils/storage';


type Product = {

    id: number;

    name: string;

    description: string;

    price: number;

    stock: number;

    image: string;

    seller_id: number;

};


function SellerProductsScreen({ navigation }: any) {

    const isDarkMode =
        useColorScheme() === 'dark';


    const COLORS = isDarkMode
        ? {
            background: '#03071E',
            urban: '#FFFFFF',
            cart: '#FFBA08',
            line: '#E85D04',
            desc: '#FAA307',
            button: '#F48C06',
            buttonText: '#FFFFFF',
            inputBg: '#0B1028',
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
            inputBg: '#F7F7F7',
            card: '#FFFFFF',
        };


    const [products, setProducts] =
        useState<Product[]>([]);

    const [loading, setLoading] =
        useState(false);


    const loadProducts = async () => {

        try {

            setLoading(true);

            const token =
                await getToken();


            const response =
                await api.get(
                    '/seller/products',
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );


            console.log(
                'SELLER PRODUCTS:',
                response.data
            );


            setProducts(
                response.data
            );

        } catch (error: any) {

            console.log(
                'PRODUCT ERROR:',
                error.response?.data ||
                error.message
            );

        } finally {

            setLoading(false);

        }

    };


    useFocusEffect(

        useCallback(() => {

            loadProducts();

        }, [])

    );


    return (

        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor:
                        COLORS.background,
                },
            ]}>


            <View style={styles.header}>

                <Text
                    style={[
                        styles.heading,
                        {
                            color: COLORS.urban,
                        },
                    ]}>

                    My Products

                </Text>


                <Text
                    style={{
                        color: COLORS.desc,
                    }}>

                    {products.length} Products

                </Text>

            </View>


            {loading ? (

                <ActivityIndicator
                    size="large"
                    color={COLORS.button}
                    style={{
                        marginTop: 50,
                    }}
                />

            ) : (

                <FlatList

                    data={products}

                    keyExtractor={(item) =>
                        item.id.toString()
                    }

                    contentContainerStyle={{
                        paddingHorizontal: 20,
                        paddingBottom: 100,
                    }}

                    ListEmptyComponent={

                        <Text
                            style={{
                                color: COLORS.desc,
                                textAlign: 'center',
                                marginTop: 50,
                            }}>

                            No products added yet

                        </Text>

                    }

                    renderItem={({ item }) => (

                        <TouchableOpacity
                            activeOpacity={0.9}
                            style={[
                                styles.productCard,
                                {
                                    backgroundColor:
                                        COLORS.card,

                                    borderColor:
                                        COLORS.line,
                                },
                            ]}>


                            <Image
                                source={{
                                    uri: item.image,
                                }}
                                style={
                                    styles.productImage
                                }
                            />


                            <View
                                style={{
                                    flex: 1,
                                    marginLeft: 15,
                                }}>


                                <Text
                                    style={[
                                        styles.productName,
                                        {
                                            color:
                                                COLORS.urban,
                                        },
                                    ]}>

                                    {item.name}

                                </Text>


                                <Text
                                    numberOfLines={2}
                                    style={{
                                        color:
                                            COLORS.desc,

                                        marginTop: 5,
                                    }}>

                                    {item.description}

                                </Text>


                                <Text
                                    style={[
                                        styles.price,
                                        {
                                            color:
                                                COLORS.cart,
                                        },
                                    ]}>

                                    ₹{item.price}

                                </Text>


                                <Text
                                    style={{
                                        color:
                                            COLORS.urban,

                                        marginTop: 5,
                                    }}>

                                    Stock: {item.stock}

                                </Text>


                            </View>


                        </TouchableOpacity>

                    )}

                />

            )}


            {/* BOTTOM NAVIGATION */}

            <View
                style={[
                    styles.bottomNav,
                    {
                        backgroundColor:
                            COLORS.card,

                        borderTopColor:
                            COLORS.line,
                    },
                ]}>


                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() =>
                        navigation.navigate('Home')
                    }>

                    <Home
                        size={24}
                        color={COLORS.desc}
                    />

                    <Text
                        style={[
                            styles.navText,
                            {
                                color: COLORS.desc,
                            },
                        ]}>

                        Home

                    </Text>

                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.navItem}>

                    <Package
                        size={24}
                        color={COLORS.button}
                    />

                    <Text
                        style={[
                            styles.navText,
                            {
                                color: COLORS.button,
                            },
                        ]}>

                        Products

                    </Text>

                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() =>
                        navigation.navigate(
                            'SellerDashboard'
                        )
                    }>

                    <User
                        size={24}
                        color={COLORS.desc}
                    />

                    <Text
                        style={[
                            styles.navText,
                            {
                                color: COLORS.desc,
                            },
                        ]}>
                        Profile
                    </Text>

                </TouchableOpacity>


            </View>


        </SafeAreaView>

    );

}


export default SellerProductsScreen;


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },

    heading: {
        fontSize: 30,
        fontWeight: '800',
    },

    productCard: {
        borderWidth: 1,
        borderRadius: 18,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    productImage: {
        width: 100,
        height: 100,
        borderRadius: 15,
    },

    productName: {
        fontSize: 18,
        fontWeight: '700',
    },

    price: {
        fontSize: 20,
        fontWeight: '800',
        marginTop: 10,
    },

    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
    },

    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    navText: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: '600',
    },

});
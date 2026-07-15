import React, {
    useCallback,
    useState,
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
    FlatList,
    Image,
    ActivityIndicator,
} from 'react-native';

import {
    Home,
    Package,
    ClipboardList,
    User,
} from 'lucide-react-native';

import {
    SafeAreaView,
} from 'react-native-safe-area-context';

import {
    useFocusEffect,
} from '@react-navigation/native';

import {
    getSellerOrders,
} from '../../../services/order';


type SellerOrder = {
    order_id: number;
    customer_name: string;
    product_name: string;
    product_image: string;
    quantity: number;
    price: number;
    status: string;
};


function SellerOrdersScreen({ navigation }: any) {

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
            card: '#FFFFFF',
        };


    const [orders, setOrders] = useState<SellerOrder[]>([]);
    const [loading, setLoading] = useState(false);


    const loadOrders = async () => {
        try {
            setLoading(true);
            const response = await getSellerOrders();

            console.log(
                'SELLER ORDERS:',
                response.data
            );

            setOrders(response.data);

        } catch (error: any) {
            console.log(
                'ORDER ERROR:',
                error.response?.data ||
                error.message
            );

        } finally {
            setLoading(false);
        }
    };


    useFocusEffect(
        useCallback(() => {
            loadOrders();
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
                    style={[styles.heading,{color: COLORS.urban,},]}>
                    My Orders
                </Text>

                <Text
                    style={{color: COLORS.desc,marginTop: 5,}}>
                    {orders.length} Orders
                </Text>
            </View>


            {loading ? (
                <ActivityIndicator
                    size="large"
                    color={COLORS.button}
                    style={{marginTop: 50,}}
                />
            ) : (

                <FlatList
                    data={orders}
                    keyExtractor={(item, index) =>item.order_id.toString() + index}

                    contentContainerStyle={{paddingHorizontal: 20,paddingBottom: 100,}}

                    ListEmptyComponent={
                        <Text
                            style={{color: COLORS.desc,textAlign: 'center', marginTop: 100,}}>
                            No customer orders yet
                        </Text>
                    }

                    renderItem={({ item }) => (

                        <View
                            style={[ styles.orderCard,{backgroundColor: COLORS.card, borderColor: COLORS.line, },]}>


                            <Image
                                source={{uri:item.product_image,}}
                                style={styles.productImage}
                            />


                            <View
                                style={{flex: 1,marginLeft: 15,}}>

                                <Text
                                    style={[styles.productName,{ color:COLORS.urban,},]}>
                                    {item.product_name}
                                </Text>


                                <Text
                                    style={{color: COLORS.desc,marginTop: 5,}}>
                                    Customer: {item.customer_name}
                                </Text>


                                <Text
                                    style={{  color: COLORS.urban, marginTop: 5,}}>
                                    Quantity: {item.quantity}
                                </Text>


                                <Text
                                    style={[ styles.price,{ color:COLORS.cart, },]}>
                                    ₹{item.price * item.quantity}
                                </Text>


                                <Text
                                    style={{color: COLORS.button, marginTop: 5, fontWeight: '700',}}>
                                    {item.status.toUpperCase()}
                                </Text>

                            </View>
                        </View>
                    )}
                />
            )}


            <View
                style={[
                    styles.bottomNav,
                    {backgroundColor: COLORS.card, borderTopColor: COLORS.line,}, ]}>


                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() =>navigation.navigate('Home')}>

                    <Home
                        size={24}
                        color={COLORS.desc}
                    />

                    <Text
                        style={[ styles.navText,{color: COLORS.desc, },]}>
                        Home
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() =>
                        navigation.navigate(
                            'SellerProducts'
                        )
                    }>

                    <Package
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
                        Products
                    </Text>

                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.navItem}>

                    <ClipboardList
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
                        Orders
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


export default SellerOrdersScreen;


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

    orderCard: {
        borderWidth: 1,
        borderRadius: 18,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    productImage: {
        width: 90,
        height: 90,
        borderRadius: 15,
    },

    productName: {
        fontSize: 18,
        fontWeight: '700',
    },

    price: {
        fontSize: 19,
        fontWeight: '800',
        marginTop: 6,
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
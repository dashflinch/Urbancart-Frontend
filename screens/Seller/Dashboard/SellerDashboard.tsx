import React, { useCallback, useState, } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, useColorScheme, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Bell, Package, ShoppingCart, Users, IndianRupee, ClipboardList, Home, User, Plus, TicketPercent, BarChart3, MessageSquare, Settings, ChevronRight, LogOut, } from 'lucide-react-native';
import { useFocusEffect, } from '@react-navigation/native';
import api from '../../../services/api';
import { getToken, removeToken, removeRole } from '../../../utils/storage';



type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    seller_id: number;
};


type DashboardData = {
    seller_name: string;
    total_products: number;
    total_orders: number;
    total_revenue: number;
    total_customers: number;
    recent_products: Product[];
};

function SellerDashboard({ navigation }: any) {

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
            inputBg: '#0B1028',
            card: '#11182D',
        }
        : {
            background: '#F7F8FA',
            urban: '#03071E',
            cart: '#F48C06',
            line: '#FAA307',
            desc: '#555555',
            button: '#DC2F02',
            buttonText: '#FFFFFF',
            inputBg: '#FFFFFF',
            card: '#FFFFFF',
        };

    const actions = [
        { title: 'Add Product', icon: Plus },
        { title: 'Orders', icon: ClipboardList },
        { title: 'Analytics', icon: BarChart3 },
        { title: 'Coupons', icon: TicketPercent },
        { title: 'Messages', icon: MessageSquare },
        { title: 'Settings', icon: Settings },
    ];

    const [dashboard, setDashboard] = useState<DashboardData | null>(null);
    const products = dashboard?.recent_products ?? [];

    const stats = [
        {
            title: 'Products',
            value: dashboard?.total_products ?? 0,
            icon: Package,
            color: '#FF9800',
        },
        {
            title: 'Orders',
            value: dashboard?.total_orders ?? 0,
            icon: ClipboardList,
            color: '#4CAF50',
        },
        {
            title: 'Revenue',
            value: `₹${dashboard?.total_revenue ?? 0}`,
            icon: IndianRupee,
            color: '#2196F3',
        },
        {
            title: 'Customers',
            value: dashboard?.total_customers ?? 0,
            icon: Users,
            color: '#9C27B0',
        },
    ];

    const handleLogout = async () => {
        try {
            await removeToken();
            await removeRole();

            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });

        } catch (error) {
            console.log('LOGOUT ERROR:', error);
        }
    };

    const loadDashboard = async () => {

        try {
            const token = await getToken();
            const response = await api.get('/seller/dashboard', { headers: { Authorization: `Bearer ${token}`, }, });

            console.log('DASHBOARD:', response.data);
            setDashboard(response.data);
        } catch (error: any) {

            console.log(
                'DASHBOARD ERROR:',
                error.response?.data ||
                error.message
            );
        }
    };


    useFocusEffect(useCallback(() => { loadDashboard(); }, []));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background, }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Menu size={30} color={COLORS.urban} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                        <Text style={[styles.logo, { color: COLORS.urban, },]}>
                            Urban
                        </Text>

                        <Text style={[styles.logo, { color: COLORS.cart, },]}>
                            Cart
                        </Text>

                    </View>
                    <TouchableOpacity onPress={handleLogout}>
                        <LogOut
                            size={28}
                            color={COLORS.button}
                        />
                    </TouchableOpacity>
                </View>

                {/* WELCOME */}
                <View
                    style={[styles.welcomeCard, { backgroundColor: COLORS.button, },]}>

                    <Image
                        source={{ uri: 'https://i.pravatar.cc/300', }}
                        style={styles.avatar}
                    />

                    <View
                        style={{ flex: 1, marginLeft: 15, }}>

                        <Text
                            style={styles.hello}>
                            Hello {dashboard?.seller_name ?? 'Seller'} 👋
                        </Text>

                        <Text
                            style={styles.subtitle}>
                            Welcome Back to Seller Dashboard
                        </Text>
                    </View>
                </View>

                {/* PART 2 STARTS HERE */}
                {/* ================= STATISTICS ================= */}

                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: COLORS.urban, },]}>
                        Statistics
                    </Text>
                </View>

                <View style={styles.statsContainer}>

                    {stats.map((item, index) => {
                        const StatIcon = item.icon;

                        return (
                            <View
                                key={index}
                                style={[styles.statCard, { backgroundColor: COLORS.card, borderColor: COLORS.line },]}>

                                <View
                                    style={[styles.iconBox, { backgroundColor: item.color + '20', },]}>
                                    <StatIcon size={28} color={item.color} />
                                </View>

                                <Text
                                    style={[
                                        styles.statValue,
                                        { color: COLORS.urban },
                                    ]}>
                                    {item.value}
                                </Text>

                                <Text style={[styles.statTitle, { color: COLORS.desc },]}>
                                    {item.title}
                                </Text>
                            </View>
                        );
                    })}
                </View>

                {/* ================= QUICK ACTIONS ================= */}

                <View style={styles.sectionHeader}>
                    <Text
                        style={[styles.sectionTitle, { color: COLORS.urban, },]}>
                        Quick Actions
                    </Text>
                </View>

                <View style={styles.actionContainer}>

                    {actions.map((item, index) => {
                        const ActionIcon = item.icon;

                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.8}
                                onPress={() => {

                                    if (item.title === 'Add Product') {
                                        navigation.navigate('AddProduct');
                                    }
                                    else if (item.title === 'Orders') {
                                        navigation.navigate('SellerOrders');
                                    }
                                    else if (item.title === 'Messages') {
                                        navigation.navigate('Messages');
                                    }
                                }}
                                style={[
                                    styles.actionCard,
                                    {
                                        backgroundColor: COLORS.card,
                                        borderColor: COLORS.line,
                                    },
                                ]}>

                                <ActionIcon
                                    size={30}
                                    color={COLORS.button}
                                />

                                <Text
                                    style={[styles.actionText, { color: COLORS.urban, },]}>
                                    {item.title}
                                </Text>

                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* ================= PART 3 STARTS HERE ================= */}
                {/* ================= RECENT PRODUCTS ================= */}
                <View style={styles.sectionHeader}>

                    <Text
                        style={[styles.sectionTitle, { color: COLORS.urban, },]}>
                        Recent Products
                    </Text>
                </View>

                {products.map((item) => (

                    <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.85}
                        style={[
                            styles.productCard,
                            {
                                backgroundColor: COLORS.card,
                                borderColor: COLORS.line,
                            },
                        ]}>

                        <Image
                            source={{
                                uri: item.image,
                            }}
                            style={styles.productImage}
                        />

                        <View
                            style={{
                                flex: 1,
                                marginLeft: 15,
                            }}>

                            <Text
                                numberOfLines={2}
                                style={[styles.productName, { color: COLORS.urban, },]}>
                                {item.name}
                            </Text>

                            <Text
                                style={[styles.productStock, { color: '#16A34A', },]}>
                                Stock : {item.stock}
                            </Text>

                            <Text style={[styles.productPrice, { color: COLORS.button, },]}>
                                ₹{item.price}
                            </Text>
                        </View>

                        <TouchableOpacity>
                            <ChevronRight
                                size={28}
                                color={COLORS.desc} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}

                {/* ================= SALES OVERVIEW ================= */}

                <View style={styles.sectionHeader}>

                    <Text style={[styles.sectionTitle, { color: COLORS.urban, },]}>
                        Sales Overview
                    </Text>
                </View>

                <View style={[styles.salesCard, { backgroundColor: COLORS.button, },]}>

                    <Text style={styles.salesTitle}>
                        Total Sales
                    </Text>

                    <Text style={styles.salesAmount}>
                        ₹{dashboard?.total_revenue ?? 0}
                    </Text>

                    {/* <View style={styles.graphContainer}>
                        <View style={[styles.bar, { height: 35 }]} />
                        <View style={[styles.bar, { height: 60 }]} />
                        <View style={[styles.bar, { height: 45 }]} />
                        <View style={[styles.bar, { height: 80 }]} />
                        <View style={[styles.bar, { height: 70 }]} />
                        <View style={[styles.bar, { height: 100 }]} />
                    </View>*/}
                </View>

                <View style={{ height: 90, }} />
            </ScrollView>

            {/* ================= FLOATING BUTTON ================= */}

            <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.fab, { backgroundColor: COLORS.button, },]}>
                <Plus size={34} color="#FFFFFF" />
            </TouchableOpacity>

            {/* ================= BOTTOM NAVIGATION ================= */}

            <View
                style={[styles.bottomNav, { backgroundColor: COLORS.card, borderTopColor: COLORS.line, },]}>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Home')}>
                    <Home size={26} color={COLORS.button} />

                    <Text style={[styles.navText, { color: COLORS.button, },]}>
                        Home
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SellerProducts')}>
                    <Package size={24} color={COLORS.desc} />
                    <Text style={[styles.navText, { color: COLORS.desc, },]}>
                        Products
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('SellerOrders')}>
                    <ClipboardList size={24} color={COLORS.desc} />
                    <Text
                        style={[styles.navText, { color: COLORS.desc },]}>
                        Orders
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('SellerDashboard')}>
                    <User size={24} color={COLORS.desc} />
                    <Text
                        style={[styles.navText, { color: COLORS.desc, },]}>
                        Profile
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

export default SellerDashboard;

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    logo: {
        fontSize: 28,
        fontWeight: '800',
    },

    welcomeCard: {
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },

    hello: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: '700',
    },

    subtitle: {
        color: '#FFFFFF',
        marginTop: 5,
        fontSize: 15,
    },

    sectionHeader: {
        paddingHorizontal: 20,
        marginBottom: 15,
        marginTop: 10,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '800',
    },

    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },

    statCard: {
        width: '48%',
        borderRadius: 18,
        borderWidth: 1,
        padding: 18,
        marginBottom: 15,
    },

    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    statValue: {
        fontSize: 24,
        fontWeight: '800',
        marginTop: 15,
    },

    statTitle: {
        marginTop: 4,
        fontSize: 14,
    },

    actionContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },

    actionCard: {
        width: '31%',
        borderRadius: 18,
        borderWidth: 1,
        paddingVertical: 18,
        alignItems: 'center',
        marginBottom: 15,
    },

    actionText: {
        marginTop: 10,
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 13,
    },

    productCard: {
        marginHorizontal: 20,
        marginBottom: 15,
        borderRadius: 18,
        borderWidth: 1,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },

    productImage: {
        width: 75,
        height: 75,
        borderRadius: 12,
    },

    productName: {
        fontSize: 16,
        fontWeight: '700',
    },

    productStock: {
        marginTop: 6,
        fontSize: 13,
        fontWeight: '600',
    },

    productPrice: {
        marginTop: 6,
        fontSize: 18,
        fontWeight: '800',
    },

    salesCard: {
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
    },

    salesTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },

    salesAmount: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: '800',
        marginTop: 6,
    },

    graphContainer: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 110,
    },

    bar: {
        width: 18,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },

    fab: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4, }, elevation: 6,
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
    },

    navText: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: '600',
    },
});
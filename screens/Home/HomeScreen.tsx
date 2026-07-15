import React, { useEffect, useRef, useState, useCallback, } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TextInput, TouchableOpacity, StatusBar, Dimensions, useColorScheme, NativeSyntheticEvent, NativeScrollEvent, } from 'react-native';
import { getProducts } from '../../services/product';
import { useFocusEffect } from '@react-navigation/native';
import { ClipboardList, Home, Package, User } from 'lucide-react-native';
import { getRole } from '../../utils/storage';
import { useWishlist } from '../Context/WishlistContext';




type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    seller_id: number;
};

const { width } = Dimensions.get('window');
export default function HomeScreen({ navigation }: any) {
    const isDark = useColorScheme() === 'dark';
    const {
        toggleWishlist,
        isInWishlist,
    } = useWishlist();
    const COLORS = isDark
        ? {
            background: '#03071E',
            card: '#0B1028',
            input: '#111827',
            text: '#FFFFFF',
            subText: '#D1D5DB',
            primary: '#FFBA08',
            secondary: '#F48C06',
            border: '#222',
            dot: '#555',
        }
        : {
            background: '#F7F7F7',
            card: '#FFFFFF',
            input: '#FFFFFF',
            text: '#111827',
            subText: '#6B7280',
            primary: '#FFBA08',
            secondary: '#F48C06',
            border: '#E5E7EB',
            dot: '#D1D5DB',
        };

    const banners = [
        {
            id: '1',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVqnvfL0XNO5CCj1X1uN0lupA-eAtgTbrnDBVItOuB_g&s=10',
        },
        {
            id: '2',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7OALqoXH4SIgv2pRodZ_4fqJBecliAMWzO-f08HK8Gw&s=10',
        },
        {
            id: '3',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjL4fSkykJr1xxTSsMZsd5sijjWrn4zzgWcPQb917loA&s=10',
        },
        {
            id: '4',
            image:
                'https://img.magnific.com/free-psd/furniture-banner-template-style_23-2148646142.jpg',
        },
        {
            id: '5',
            image:
                'https://img.magnific.com/free-vector/hand-drawn-electronics-store-sale-banner-template_23-2151138129.jpg?semt=ais_hybrid&w=740&q=80',
        },
    ];


    const categories = [
        {
            id: '1',
            name: 'Mobiles',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj-6FuquBQDccksI4Pps0GlGUUqs_HtU6laejdKAFcRg&s',
        },
        {
            id: '2',
            name: 'Electronics',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCQNFLPtDHZh92xAgLvs2w39X9z6GAYc_SPLBbDLFYow&s=10',
        },
        {
            id: '3',
            name: 'Fashion',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41_sRAYvy0YF49eyZpdcOeeEumFuE2O_C001xJKnnaA&s=10',
        },
        {
            id: '4',
            name: 'Home',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2r4M3iLq0eEkp_Zwo-cjBt3cCLez36H4-NU1oDH-eGA&s=10',
        },
        {
            id: '5',
            name: 'Beauty',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD47EXSuU2e8HShhdt4fwax2U25NefXtSYrjTA-keUKA&s=10',
        },
        {
            id: '6',
            name: 'Appliances',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEkupaMELlnaYOvoZSzDNkrAWMbEDavmkMCw-BhYxDpQ&s=10',
        },
    ];

    const bannerRef = useRef<FlatList>(null);
    const [currentBanner, setCurrentBanner] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);

    const loadProducts = async () => {

        try {
            const response = await getProducts();
            console.log("PRODUCTS:", response.data);
            setProducts(response.data);
        } catch (error: any) {
            console.log("PRODUCT ERROR:", error.response?.data || error.message);
        }
    };

    useFocusEffect(useCallback(() => { loadProducts(); }, []));

    useEffect(() => {
        const timer = setInterval(() => {
            const next = currentBanner === banners.length - 1 ? 0 : currentBanner + 1;
            bannerRef.current?.scrollToIndex({ index: next, animated: true, });
            setCurrentBanner(next);
        }, 3000);
        return () => clearInterval(timer);
    }, [currentBanner]);

    const onScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>,) => {
        const index = Math.round(e.nativeEvent.contentOffset.x / width,);
        setCurrentBanner(index);
    };


    const handleProfile = async () => {
        const role = await getRole();
        if (role === "seller") {
            navigation.navigate("SellerDashboard");
        } else {
            navigation.navigate("CustomerProfile");
        }
    };


    const [role, setRole] = useState("");
    useEffect(() => {
        const loadRole = async () => {
            const userRole = await getRole();
            if (userRole) {
                setRole(userRole);
            }
        };
        loadRole();
    }, []);


    return (

        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: COLORS.background,
                },
            ]}>

            <StatusBar
                backgroundColor={COLORS.background}
                barStyle={isDark ? 'light-content' : 'dark-content'}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}>

                {/* HEADER */}

                <View style={styles.header}>
                    <View>
                        <Text
                            style={[
                                styles.logo,
                                {
                                    color: COLORS.text,
                                },
                            ]}>

                            Urban
                            <Text
                                style={{
                                    color: COLORS.primary,
                                }}>
                                Cart
                            </Text>
                        </Text>

                        <Text
                            style={{
                                color: COLORS.subText,
                                marginTop: 5,
                            }}>
                            Hello Sonali 👋
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                        }}>

                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate("Wishlist")}>

                            <Text style={styles.icon}>
                                ❤️
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate("Cart")}>

                            <Text style={styles.icon}>
                                🛒
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>



                {/* SEARCH */}

                <View
                    style={[
                        styles.searchContainer,
                        {
                            backgroundColor: COLORS.input,
                        },
                    ]}>

                    <Text
                        style={styles.searchIcon}>
                        🔍
                    </Text>

                    <TextInput
                        placeholder="Search for Products..."
                        placeholderTextColor="gray"
                        style={[
                            styles.searchInput,
                            {
                                color: COLORS.text,
                            },
                        ]}
                    />

                    <Text style={styles.searchIcon}>
                        🎤
                    </Text>

                </View>

                {/* HERO BANNER */}

                <FlatList
                    ref={bannerRef}
                    horizontal
                    pagingEnabled
                    data={banners}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    onMomentumScrollEnd={onScrollEnd}
                    renderItem={({ item }) => (
                        <Image
                            source={{
                                uri: item.image,
                            }}
                            style={styles.banner}
                        />
                    )}
                />

                <View style={styles.dotContainer}>

                    {
                        banners.map((_, index) => (

                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    {
                                        backgroundColor:
                                            currentBanner === index
                                                ? COLORS.primary
                                                : COLORS.dot,

                                        width: currentBanner === index ? 22 : 8,
                                    },]} />))}
                </View>



                {/* =========CATEGORIES==========*/}

                <View style={styles.sectionHeader}>

                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color: COLORS.text,
                            },
                        ]}>
                        Shop By Category
                    </Text>

                </View>

                <FlatList
                    horizontal
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                        paddingBottom: 20,
                    }}
                    renderItem={({ item }) => (

                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={[
                                styles.categoryCard,
                                {
                                    backgroundColor: COLORS.card,
                                },
                            ]}>

                            <Image
                                source={{
                                    uri: item.image,
                                }}
                                style={styles.categoryImage}
                            />

                            <Text
                                style={[
                                    styles.categoryText,
                                    {
                                        color: COLORS.text,
                                    },
                                ]}>
                                {item.name}
                            </Text>

                        </TouchableOpacity>

                    )}
                />



                {/* =======\=====OFFERS=================*/}

                <View style={styles.sectionHeader}>

                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color: COLORS.text,
                            },
                        ]}>
                        Today's Deals
                    </Text>

                    <TouchableOpacity>

                        <Text
                            style={{
                                color: COLORS.secondary,
                                fontWeight: '700',
                            }}>
                            See All
                        </Text>

                    </TouchableOpacity>

                </View>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                    }}>

                    <TouchableOpacity
                        style={[
                            styles.offerCard,
                            {
                                backgroundColor: '#FFE7B2',
                            },
                        ]}>

                        <Text style={styles.offerHeading}>
                            Mega Deals
                        </Text>

                        <Text style={styles.offerSub}>
                            Up to 50% Off
                        </Text>

                        <Text style={styles.offerButton}>
                            Shop Now →
                        </Text>

                        <Image
                            source={{
                                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jACxOcuI9VFynJwonwKiZKr2Abw7zAp7LUouSRUacg&s=10',
                            }}
                            style={styles.offerImage}
                        />

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.offerCard,
                            {
                                backgroundColor: '#FFF2C8',
                            },
                        ]}>

                        <Text style={styles.offerHeading}>
                            No Cost EMI
                        </Text>

                        <Text style={styles.offerSub}>
                            Up to 12 Months
                        </Text>

                        <Text style={styles.offerButton}>
                            Explore →
                        </Text>

                        <Image
                            source={{
                                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMuW6RD3uRGb3lwR8OjAFBX9t5149u4OlhpjdIm2sI4A&s=10',
                            }}
                            style={styles.offerImage}
                        />
                    </TouchableOpacity>
                </ScrollView>

                {/* =========TRENDING PRODUCTS================ */}

                <View style={styles.sectionHeader}>
                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color: COLORS.text,
                            },
                        ]}>
                        🔥 Trending Products
                    </Text>

                    <TouchableOpacity>
                        <Text
                            style={{
                                color: COLORS.secondary,
                                fontWeight: '700',
                            }}>
                            See All
                        </Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    horizontal
                    data={products}
                    keyExtractor={(item) =>
                        item.id.toString() + 'recommend'
                    }
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                        paddingBottom: 100,
                    }}
                    renderItem={({ item }) => (

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>
                                navigation.navigate(
                                    "ProductDetails",
                                    {
                                        product: item,
                                    }
                                )
                            }
                            style={[
                                styles.productCard,
                                {
                                    backgroundColor: COLORS.card,
                                },
                            ]}>

                            <TouchableOpacity
                                style={styles.wishlistBtn}
                                onPress={(event) => {
                                    event.stopPropagation();
                                    toggleWishlist(item);
                                }}>

                                <Text style={{ fontSize: 18 }}>
                                    {isInWishlist(item.id) ? '❤️' : '🤍'}
                                </Text>

                            </TouchableOpacity>

                            <Image
                                source={{
                                    uri: item.image,
                                }}
                                style={styles.productImage}
                            />

                            <Text
                                numberOfLines={2}
                                style={[
                                    styles.productTitle,
                                    {
                                        color: COLORS.text,
                                    },
                                ]}>

                                {item.name}

                            </Text>

                            <Text
                                style={[
                                    styles.productPrice,
                                    {
                                        color: COLORS.text,
                                    },
                                ]}>

                                ₹{item.price}

                            </Text>

                            <Text
                                style={{
                                    color: COLORS.subText,
                                    marginTop: 5,
                                }}>

                                Stock: {item.stock}

                            </Text>

                        </TouchableOpacity>

                    )}
                />


                {/* ================BEST SELLERS================ */}

                <View style={styles.sectionHeader}>

                    <Text
                        style={[
                            styles.sectionTitle,
                            {
                                color: COLORS.text,
                            },
                        ]}>
                        ⭐ Best Sellers
                    </Text>

                    <TouchableOpacity>
                        <Text
                            style={{
                                color: COLORS.secondary,
                                fontWeight: '700',
                            }}>
                            See All
                        </Text>
                    </TouchableOpacity>

                </View>

                <FlatList
                    horizontal
                    data={products.slice(0, 5)}
                    keyExtractor={(item) => item.id.toString() + 'best'}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                    }}
                    renderItem={({ item }) => (

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>
                                navigation.navigate(
                                    "ProductDetails",
                                    {
                                        product: item,
                                    }
                                )
                            }
                            style={[
                                styles.productCard,
                                {
                                    backgroundColor: COLORS.card,
                                },
                            ]}>

                            <TouchableOpacity
                                style={styles.wishlistBtn}
                                onPress={(event) => {
                                    event.stopPropagation();
                                    toggleWishlist(item);
                                }}>

                                <Text style={{ fontSize: 18 }}>
                                    {isInWishlist(item.id) ? '❤️' : '🤍'}
                                </Text>

                            </TouchableOpacity>

                            <Image
                                source={{ uri: item.image }}
                                style={styles.productImage}
                            />

                            <Text
                                numberOfLines={2}
                                style={[
                                    styles.productTitle,
                                    {
                                        color: COLORS.text,
                                    },
                                ]}>
                                {item.name}
                            </Text>

                            <Text
                                style={[styles.productPrice, { color: COLORS.text, },]}>
                                ₹{item.price}
                            </Text>

                            <Text
                                style={{ color: COLORS.subText, marginTop: 5, }}>
                                Stock: {item.stock}
                            </Text>
                        </TouchableOpacity>

                    )}
                />

                {/* ============RECOMMENDED============ */}


                    <View style={styles.sectionHeader}>
                        <Text
                            style={[
                                styles.sectionTitle,
                                {
                                    color: COLORS.text,
                                },
                            ]}>
                            ❤️ Recommended For You
                        </Text>
                    </View>

                <FlatList
                    horizontal
                    data={products.slice().reverse()}
                    keyExtractor={(item) => item.id.toString() + 'recommend'}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 15,
                        paddingBottom: 100,
                    }}
                    renderItem={({ item }) => (

                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() =>
                                navigation.navigate(
                                    "ProductDetails",
                                    {
                                        product: item,
                                    }
                                )
                            }
                            style={[
                                styles.productCard,
                                {
                                    backgroundColor: COLORS.card,
                                },
                            ]}>

                            <TouchableOpacity
                                style={styles.wishlistBtn}
                                onPress={(event) => {
                                    event.stopPropagation();
                                    toggleWishlist(item);
                                }}>

                                <Text style={{ fontSize: 18 }}>
                                    {isInWishlist(item.id) ? '❤️' : '🤍'}
                                </Text>

                            </TouchableOpacity>

                            <Image
                                source={{ uri: item.image, }}
                                style={styles.productImage}
                            />

                            <Text
                                numberOfLines={2}
                                style={[styles.productTitle, { color: COLORS.text, },]}>
                                {item.name}
                            </Text>

                            <Text
                                style={[styles.productPrice, { color: COLORS.text, },]}>
                                ₹{item.price}
                            </Text>

                            <Text
                                style={{
                                    color: COLORS.subText,
                                    marginTop: 5,
                                }}>

                                Stock: {item.stock}
                            </Text>
                        </TouchableOpacity>

                    )}
                />

                <View style={{ height: 100 }} />
                <View
                    style={{
                        height: 40,
                    }}
                />
            </ScrollView >

            {/* ================= BOTTOM NAVIGATION ================= */}

            <View
                style={[
                    styles.bottomNav,
                    {
                        backgroundColor: COLORS.card,
                        borderTopColor: COLORS.border,
                    },
                ]}>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate("Home")}>

                    <Home size={26} color={COLORS.secondary} />

                    <Text
                        style={[
                            styles.navText,
                            {
                                color: COLORS.secondary,
                            },
                        ]}>
                        Home
                    </Text>

                </TouchableOpacity>

                {role === "seller" ? (
                    <>
                        <TouchableOpacity
                            style={styles.navItem}
                            onPress={() => navigation.navigate("SellerProducts")}>

                            <Package
                                size={24}
                                color={COLORS.subText}
                            />

                            <Text
                                style={[
                                    styles.navText,
                                    {
                                        color: COLORS.subText,
                                    },
                                ]}>
                                Products
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.navItem}
                            onPress={() => navigation.navigate("SellerOrders")}>

                            <ClipboardList
                                size={24}
                                color={COLORS.subText}
                            />

                            <Text
                                style={[
                                    styles.navText,
                                    {
                                        color: COLORS.subText,
                                    },
                                ]}>
                                Orders
                            </Text>

                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <TouchableOpacity
                            style={styles.navItem}
                            onPress={() => navigation.navigate("Messages")}>

                            <ClipboardList
                                size={24}
                                color={COLORS.subText}
                            />

                            <Text
                                style={[
                                    styles.navText,
                                    {
                                        color: COLORS.subText,
                                    },
                                ]}>
                                Messages
                            </Text>

                        </TouchableOpacity>
                    </>
                )}

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={handleProfile}>

                    <User
                        size={24}
                        color={COLORS.subText}
                    />

                    <Text
                        style={[
                            styles.navText,
                            {
                                color: COLORS.subText,
                            },
                        ]}>
                        Profile
                    </Text>

                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
}




const styles = StyleSheet.create({


    categoryCard: {
        width: 90,
        marginRight: 14,
        borderRadius: 18,
        alignItems: 'center',
        paddingVertical: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: .08,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },

    categoryImage: {
        width: 52,
        height: 52,
    },

    categoryText: {
        marginTop: 8,
        fontWeight: '600',
        fontSize: 13,
    },

    offerCard: {
        width: 300,
        height: 150,
        borderRadius: 22,
        marginRight: 15,
        padding: 20,
        overflow: 'hidden',
    },

    offerHeading: {
        fontSize: 28,
        fontWeight: '800',
        color: '#111827',
    },

    offerSub: {
        fontSize: 18,
        marginTop: 8,
        fontWeight: '600',
        color: '#374151',
    },

    offerButton: {
        marginTop: 20,
        fontWeight: '700',
        fontSize: 15,
        color: '#111827',
    },

    offerImage: {
        position: 'absolute',
        right: 7,
        bottom: 25,
        width: 130,
        height: 100,
        resizeMode: 'contain',
    },

    productCard: {
        width: 180,
        marginRight: 16,
        borderRadius: 18,
        padding: 14,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
    },

    wishlistBtn: {
        alignSelf: 'flex-end',
    },

    productImage: {
        width: '100%',
        height: 140,
        resizeMode: 'contain',
        marginVertical: 10,
    },

    productTitle: {
        fontSize: 15,
        fontWeight: '600',
        minHeight: 42,
    },

    rating: {
        color: '#16A34A',
        fontWeight: '700',
        marginTop: 8,
    },

    productPrice: {
        fontSize: 22,
        fontWeight: '800',
        marginTop: 8,
    },

    oldPrice: {
        color: '#9CA3AF',
        textDecorationLine: 'line-through',
        marginTop: 3,
    },

    discount: {
        color: '#16A34A',
        fontWeight: '700',
        marginTop: 3,
    },

    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingTop: 18,
        paddingBottom: 15,
    },

    logo: {
        fontSize: 32,
        fontWeight: '800',
    },

    iconButton: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF20',
        marginLeft: 10,
    },

    icon: {
        fontSize: 20,
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 18,
        paddingHorizontal: 15,
        height: 55,
        borderRadius: 18,
        marginBottom: 18,
    },

    searchIcon: {
        fontSize: 20,
    },

    searchInput: {
        flex: 1,
        marginHorizontal: 10,
        fontSize: 16,
    },

    banner: {
        width: width - 30,
        height: 190,
        marginHorizontal: 15,
        borderRadius: 20,
    },

    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 15,
    },

    dot: {
        height: 8,
        borderRadius: 20,
        marginHorizontal: 4,
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 18,
        marginTop: 25,
        marginBottom: 15,
    },

    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
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
})

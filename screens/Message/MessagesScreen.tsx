import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, useColorScheme, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getConversations } from '../../services/message';
import { Home, Package, ClipboardList, User, MessageCircle } from 'lucide-react-native';
import { getRole } from '../../utils/storage';


function MessagesScreen({ navigation }: any) {

    const isDarkMode = useColorScheme() === 'dark';
    const COLORS = isDarkMode
        ? {
            background: '#03071E',
            card: '#11182D',
            text: '#FFFFFF',
            line: '#E85D04',
            desc: '#FAA307',
        }
        : {
            background: '#FFFFFF',
            card: '#F7F7F7',
            text: '#03071E',
            line: '#FAA307',
            desc: '#555',
        };

    const [conversations, setConversations] = useState<any[]>([]);
    const [role, setRole] = useState("");

    useEffect(() => {

        loadConversations();
        loadRole();

    }, []);

    const loadRole = async () => {

        const userRole = await getRole();

        if (userRole) {
            setRole(userRole);
        }

    };
    const loadConversations = async () => {
        try {
            const response = await getConversations();
            setConversations(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleProfile = () => {

        if (role === "seller") {
            navigation.navigate("SellerDashboard");
        } else {
            navigation.navigate("CustomerProfile");
        }

    };



    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.background,
            }}>

            <View style={styles.header}>
                <Text
                    style={[
                        styles.heading,
                        {
                            color: COLORS.text,
                        },
                    ]}>
                    Messages
                </Text>
            </View>

            <FlatList
                data={conversations}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text
                            style={{
                                color: COLORS.desc,
                                fontSize: 18,
                            }}>
                            No Conversations
                        </Text>
                    </View>
                }
                renderItem={({ item }) => (

                    <TouchableOpacity
                        style={[
                            styles.card,
                            {
                                backgroundColor: COLORS.card,
                                borderColor: COLORS.line,
                            },
                        ]}
                        onPress={() =>
                            navigation.navigate(
                                "Chat",
                                {
                                    receiverId: item.id,
                                    receiverName: item.name,
                                }
                            )
                        }>

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
                            {item.last_message}
                        </Text>

                    </TouchableOpacity>

                )}
            />


            <View
                style={[
                    styles.bottomNav,
                    {
                        backgroundColor: COLORS.card,
                        borderTopColor: COLORS.line,
                    },
                ]}>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate("Home")}>

                    <Home size={24} color={COLORS.desc} />

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

                {role === "seller" ? (
                    <>
                        <TouchableOpacity
                            style={styles.navItem}
                            onPress={() => navigation.navigate("SellerProducts")}>

                            <Package size={24} color={COLORS.desc} />

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
                            style={styles.navItem}
                            onPress={() => navigation.navigate("SellerOrders")}>

                            <ClipboardList size={24} color={COLORS.desc} />

                            <Text
                                style={[
                                    styles.navText,
                                    {
                                        color: COLORS.desc,
                                    },
                                ]}>
                                Orders
                            </Text>

                        </TouchableOpacity>
                    </>
                ) : null}

                <TouchableOpacity style={styles.navItem}>

                    <MessageCircle size={24} color={COLORS.line} />

                    <Text
                        style={[
                            styles.navText,
                            {
                                color: COLORS.line,
                            },
                        ]}>
                        Messages
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.navItem}
                    onPress={handleProfile}>

                    <User size={24} color={COLORS.desc} />

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

export default MessagesScreen;

const styles = StyleSheet.create({

    header: {
        padding: 20,
    },

    heading: {
        fontSize: 28,
        fontWeight: '800',
    },

    card: {
        marginHorizontal: 15,
        marginVertical: 8,
        borderRadius: 15,
        borderWidth: 1,
        padding: 15,
    },

    name: {
        fontSize: 18,
        fontWeight: '700',
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 120,
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
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, ShoppingBag, MessageCircle, LogOut, ChevronRight, } from 'lucide-react-native';
import { removeToken, removeRole, } from '../../utils/storage';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';




function CustomerProfileScreen({ navigation }: any) {

    const isDark = useColorScheme() === 'dark';
    const COLORS = isDark
        ? {
            background: '#03071E',
            card: '#11182D',
            text: '#FFFFFF',
            desc: '#FAA307',
            line: '#E85D04',
            button: '#F48C06',
        }
        : {
            background: '#F7F7F7',
            card: '#FFFFFF',
            text: '#03071E',
            desc: '#555555',
            line: '#FAA307',
            button: '#DC2F02',
        };


    const options = [
        {
            title: 'My Orders',
            icon: ShoppingBag,
            screen: 'CustomerOrders',
        },
        {
            title: 'Messages',
            icon: MessageCircle,
            screen: 'Messages',
        },
        {
            title: 'Home',
            icon: User,
            screen: 'Home',
        },
    ];


    const [name, setName] = useState("Customer");
    const [email, setEmail] = useState("UrbanCart Customer");

    useEffect(() => {
        const loadUser = async () => {
            const storedName = await AsyncStorage.getItem("user_name");
            const storedEmail = await AsyncStorage.getItem("user_email");
            if (storedName) {
                setName(storedName);
            }
            if (storedEmail) {
                setEmail(storedEmail);
            }
        };
        loadUser();
    }, []);

    const handleLogout = async () => {
        await removeToken();
        await removeRole();
        navigation.replace("Login");
    };

    return (

        <SafeAreaView
            style={[
                styles.container,
                {
                    backgroundColor: COLORS.background,
                },
            ]}>

            <Text
                style={[
                    styles.heading,
                    {
                        color: COLORS.text,
                    },
                ]}>
                My Profile
            </Text>


            <View
                style={[
                    styles.profileCard,
                    {
                        backgroundColor: COLORS.card,
                        borderColor: COLORS.line,
                    },
                ]}>

                <View
                    style={[
                        styles.avatar,
                        {
                            backgroundColor: COLORS.button,
                        },
                    ]}>

                    <User
                        size={42}
                        color="#FFFFFF"
                    />

                </View>

                <Text
                    style={[
                        styles.name,
                        {
                            color: COLORS.text,
                        },
                    ]}>
                    {name}
                </Text>

                <Text
                    style={{
                        color: COLORS.desc,
                    }}>
                    {email}
                </Text>

            </View>


            {options.map((item, index) => {

                const Icon = item.icon;

                return (

                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.option,
                            {
                                backgroundColor: COLORS.card,
                                borderColor: COLORS.line,
                            },
                        ]}
                        onPress={() =>
                            navigation.navigate(item.screen)
                        }>

                        <Icon
                            size={25}
                            color={COLORS.button}
                        />

                        <Text
                            style={[
                                styles.optionText,
                                {
                                    color: COLORS.text,
                                },
                            ]}>
                            {item.title}
                        </Text>

                        <ChevronRight
                            size={22}
                            color={COLORS.desc}
                        />

                    </TouchableOpacity>

                );

            })}


            <TouchableOpacity
                style={[styles.logout, { backgroundColor: COLORS.button, },]}
                onPress={handleLogout}>

                <LogOut
                    size={22}
                    color="#FFFFFF"
                />

                <Text style={styles.logoutText}>
                    Logout
                </Text>

            </TouchableOpacity>

        </SafeAreaView>

    );

}


export default CustomerProfileScreen;


const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
    },

    heading: {
        fontSize: 28,
        fontWeight: '800',
        marginBottom: 25,
    },

    profileCard: {
        borderRadius: 20,
        borderWidth: 1,
        padding: 25,
        alignItems: 'center',
        marginBottom: 25,
    },

    avatar: {
        width: 85,
        height: 85,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
    },

    name: {
        fontSize: 23,
        fontWeight: '800',
        marginTop: 15,
    },

    option: {
        height: 65,
        borderRadius: 15,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        marginBottom: 15,
    },

    optionText: {
        flex: 1,
        fontSize: 17,
        fontWeight: '600',
        marginLeft: 15,
    },

    logout: {
        height: 58,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    logoutText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
    },

});
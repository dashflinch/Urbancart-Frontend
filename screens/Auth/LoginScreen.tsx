import React, { useState } from 'react';
import { View, Text, useColorScheme, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import { loginUser } from '../../services/auth';
import { saveToken, saveRole } from '../../utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';



function LoginScreen({ navigation }: any) {

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
        };


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert(
                "Error",
                "Please fill all fields"
            );
            return;
        }


        try {
            setLoading(true);
            const cleanEmail = email.trim().toLowerCase();
            const cleanPassword = password.trim();


            console.log(
                "LOGIN DATA:",
                JSON.stringify(cleanEmail),
                JSON.stringify(cleanPassword)
            );


            const response = await loginUser({
                email: cleanEmail,
                password: cleanPassword,
            });
            console.log(
                "Login Response:",
                response.data
            );


            const user = response.data.user;
            console.log(
                "TOKEN:",
                response.data.access_token
            );
            await AsyncStorage.setItem(
                "user_name",
                user.full_name
            );

            await AsyncStorage.setItem(
                "user_email",
                user.email
            );
            await saveToken(response.data.access_token);
            await saveRole(user.role);

            Alert.alert(
                "Success",
                `Welcome ${user.full_name}!`,
                [
                    {
                        text: "OK",
                        onPress: () => {
                            if (user.role === "seller") {
                                navigation.replace(
                                    "SellerDashboard"
                                );
                            } else {
                                navigation.replace(
                                    "Home"
                                );
                            }
                        },
                    },
                ]
            );
        } catch (error: any) {
            console.log("FULL LOGIN ERROR:", error);
            Alert.alert(
                "Login Error",
                `${error.message}\nStatus: ${error.response?.status || 'No Status'}\nDetail: ${JSON.stringify(error.response?.data)}`
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: COLORS.background, justifyContent: 'center' }}>
            <View style={styles.container}>
                <View style={[styles.avatar]}>
                    <Image
                        source={{ uri: 'https://img.freepik.com/premium-vector/cheerful-young-adult-man-semi-flat-vector-character-head-hispanic-male-person-editable-cartoon-avatar-icon-face-emotion-colorful-spot-illustration-web-graphic-design-animation_151150-15964.jpg', }}
                        style={{ width: "100%", height: "100%", marginTop: 20, }} />
                </View>

                <Text style={[styles.heading, { color: COLORS.urban },]}>Login Account</Text>

                <Text style={[styles.subHeading, { color: COLORS.desc },]}>Welcome Back to UrbanCart</Text>

                <Text style={[styles.label, { color: COLORS.urban },]}>Email Address</Text>

                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Enter Email"
                    placeholderTextColor="gray"
                    style={[styles.input, { backgroundColor: COLORS.inputBg, borderColor: COLORS.line, color: COLORS.urban },]}
                />

                <Text style={[styles.label, { color: COLORS.urban },]}>Password</Text>

                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter Password"
                    placeholderTextColor="gray"
                    secureTextEntry
                    style={[styles.input, { backgroundColor: COLORS.inputBg, borderColor: COLORS.line, color: COLORS.urban },]}
                />

                <TouchableOpacity>
                    <Text style={[styles.forgot, { color: COLORS.desc }]}>
                        Forgot Password
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.button, },]}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={[styles.buttonText, { color: COLORS.buttonText }]}>
                        {loading ? "Logging in..." : "Login"}
                    </Text>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                    <Text style={{ color: COLORS.desc }}>
                        Not registered yet?
                    </Text>

                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={{ color: COLORS.urban }}>{' '}Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}

export default LoginScreen;


const styles = StyleSheet.create({

    container: {
        paddingHorizontal: 25,
    },

    avatar: {
        width: 160,
        height: 160,
        borderRadius: 65,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 30,
    },

    avatarText: {
        fontSize: 50,
    },

    heading: {
        fontSize: 35,
        fontWeight: '800',
    },

    subHeading: {
        marginTop: 5,
        marginBottom: 30,
        fontSize: 16,
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        marginTop: 15,
    },

    input: {
        height: 55,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 15,
        fontSize: 16,
    },

    forgot: {
        alignSelf: 'flex-end',
        marginTop: 10,
        fontSize: 14,
    },

    button: {
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
    },

    buttonText: {
        fontSize: 22,
        fontWeight: '700',
    },

    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 35,
    },

});

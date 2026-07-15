import React, { useState } from 'react';
import { Alert } from 'react-native';
import { registerUser } from '../../services/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View, ScrollView } from 'react-native';





function SignupScreen({ navigation }: any) {
    const isDarkMode = useColorScheme() === 'dark';

    const COLORS = isDarkMode
        ? {
            background: '#03071E',
            urban: '#FFFFFF',
            desc: '#FAA307',
            button: '#F48C06',
            buttonText: '#FFFFFF',
            inputBg: '#0B1028',
            line: '#E85D04',
        }
        : {
            background: '#FFFFFF',
            urban: '#03071E',
            desc: '#370617',
            button: '#F48C06',
            buttonText: '#FFFFFF',
            inputBg: '#F7F7F7',
            line: '#E5E5E5',
        };


    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<'customer' | 'seller'>('customer');




    const handleSignup = async () => {
        if (!fullName || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            setLoading(true);

            await registerUser({
                full_name: fullName,
                email,
                password,
                role,
            });

            Alert.alert('Success', 'Account created successfully!', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Login'),
                },
            ]);

            // } catch (error: any) {
            //     console.log(error.response?.data);

            //     const errorMessage =
            //         typeof error.response?.data?.detail === 'string'
            //             ? error.response.data.detail
            //             : error.response?.data?.detail?.[0]?.msg || 'Something went wrong';

            //     Alert.alert(
            //         'Registration Failed',
            //         errorMessage
            //     );
            // }

        } catch (error: any) {
            console.log("FULL ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);

            Alert.alert(
                "Registration Failed",
                JSON.stringify(error.response?.data || error.message)
            );
        }
        finally {
            setLoading(false);
        }
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background, }}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={[styles.heading, { color: COLORS.urban, },]}>
                        Create Account
                    </Text>

                    <Text style={[styles.subHeading, { color: COLORS.desc, },]}>
                        Sign up to get started
                    </Text>

                    <Text style={[styles.label, { color: COLORS.urban, },]}>
                        Full Name
                    </Text>

                    <TextInput
                        value={fullName}
                        onChangeText={setFullName}
                        placeholder="Enter Full Name"
                        placeholderTextColor="gray"
                        style={[styles.input, { backgroundColor: COLORS.inputBg, borderColor: COLORS.line, color: COLORS.urban, },]}
                    />

                    <Text style={[styles.label, { color: COLORS.urban, },]}>
                        Email Address
                    </Text>

                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        placeholder="Enter Email"
                        placeholderTextColor="gray"
                        style={[styles.input, { backgroundColor: COLORS.inputBg, borderColor: COLORS.line, color: COLORS.urban, },]}
                    />

                    <Text style={[styles.label, { color: COLORS.urban, },]}>
                        Password
                    </Text>

                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter Password"
                        placeholderTextColor="gray"
                        secureTextEntry
                        style={[styles.input, { backgroundColor: COLORS.inputBg, borderColor: COLORS.line, color: COLORS.urban, },]}
                    />

                    <Text style={[styles.label, { color: COLORS.urban, },]}>
                        Confirm Password
                    </Text>

                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm Password"
                        placeholderTextColor="gray"
                        secureTextEntry
                        style={[styles.input, { backgroundColor: COLORS.inputBg, borderColor: COLORS.line, color: COLORS.urban, },]}
                    />

                    <Text
                        style={[
                            styles.label,
                            {
                                color: COLORS.urban,
                            },
                        ]}>
                        Account Type
                    </Text>

                    <View style={styles.roleContainer}>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setRole('customer')}
                            style={[
                                styles.roleCard,
                                {
                                    backgroundColor:
                                        role === 'customer'
                                            ? COLORS.button
                                            : COLORS.inputBg,

                                    borderColor:
                                        role === 'customer'
                                            ? COLORS.button
                                            : COLORS.line,
                                },
                            ]}>

                            <Text style={styles.roleIcon}>🛒</Text>

                            <Text
                                style={[
                                    styles.roleTitle,
                                    {
                                        color:
                                            role === 'customer'
                                                ? '#FFFFFF'
                                                : COLORS.urban,
                                    },
                                ]}>
                                Customer
                            </Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setRole('seller')}
                            style={[
                                styles.roleCard,
                                {
                                    backgroundColor:
                                        role === 'seller'
                                            ? COLORS.button
                                            : COLORS.inputBg,

                                    borderColor:
                                        role === 'seller'
                                            ? COLORS.button
                                            : COLORS.line,
                                },
                            ]}>

                            <Text style={styles.roleIcon}>🏪</Text>

                            <Text
                                style={[
                                    styles.roleTitle,
                                    {
                                        color:
                                            role === 'seller'
                                                ? '#FFFFFF'
                                                : COLORS.urban,
                                    },
                                ]}>
                                Seller
                            </Text>

                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.button, },]}
                        onPress={handleSignup}
                        disabled={loading}>
                        <Text style={[styles.buttonText, { color: COLORS.buttonText, },]}>
                            {loading ? 'Creating Account...' : 'Sign Up →'}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.loginContainer}>
                        <Text style={{ color: COLORS.desc, }}>
                            Already have an account?
                        </Text>

                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: COLORS.button, fontWeight: '700', }}>
                                {' '}Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}



export default SignupScreen;


const styles = StyleSheet.create({

    scrollContainer: {
        flexGrow: 1,
    },

    container: {
        flex: 1,
        paddingHorizontal: 25,
        paddingBottom: 30,
        justifyContent: 'center',
    },

    heading: {
        fontSize: 36,
        fontWeight: '800',
    },

    subHeading: {
        fontSize: 16,
        marginTop: 5,
        marginBottom: 35,
    },

    label: {
        fontSize: 15,
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

    button: {
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

    buttonText: {
        fontSize: 22,
        fontWeight: '700',
    },

    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 35,
    },


    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
        marginBottom: 10,
    },

    roleCard: {
        width: '48%',
        height: 100,

        borderRadius: 18,
        borderWidth: 2,

        justifyContent: 'center',
        alignItems: 'center',
    },

    roleIcon: {
        fontSize: 30,
    },

    roleTitle: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: '700',
    },
});
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useColorScheme, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




const WelcomeScreen = ({ navigation }: any) => {
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
        } // light mode
        : {
            background: '#FFFFFF',
            urban: '#03071E',
            cart: '#F48C06',
            line: '#FAA307',
            desc: '#370617',
            button: '#DC2F02',
            buttonText: '#FFFFFF',
        }; // dark mode



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background, }}>
            <Image
                source={{ uri: 'https://plus.unsplash.com/premium_vector-1726642206838-9274776e3538?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', }}
                style={{ width: "100%", height: "55%", marginTop: 20, }} />

            <View style={styles.container}>
                <Text style={[styles.logo, { color: COLORS.urban, },]}>
                    Urban
                    <Text style={[styles.cart, { color: COLORS.cart, },]}>Cart</Text>
                </Text>
            </View>

            <View style={[styles.line, { backgroundColor: COLORS.line, },]}></View>

            <Text style={[styles.desc, { color: COLORS.desc, },]}>
                Discover amazing products{"\n"}
                at the best prices
            </Text>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: COLORS.button, },]}
                onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.buttonText, { color: COLORS.buttonText, },]}>Let's Go →</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

export default WelcomeScreen;


const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    logo: {
        fontSize: 55,
        fontWeight: '900',
        letterSpacing: -1,
    },

    cart: {
        fontSize: 55,
    },

    line: {
        width: 60,
        height: 5,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
    },

    desc: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 30,
        lineHeight: 30,
    },

    button: {
        marginTop: 60,
        width: '80%',
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    buttonText: {
        fontSize: 25,
        fontWeight: '600',
    }


})


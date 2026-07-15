import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, useColorScheme, } from 'react-native';
import { ArrowLeft, Send } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMessages, sendMessage } from '../../services/message';





function ChatScreen({ navigation, route }: any) {

    const isDark = useColorScheme() === 'dark';
    const COLORS = isDark
        ? {
            background: '#03071E',
            card: '#11182D',
            text: '#FFFFFF',
            line: '#E85D04',
            button: '#F48C06',
            input: '#0B1028',
        }
        : {
            background: '#FFFFFF',
            card: '#F7F7F7',
            text: '#03071E',
            line: '#FAA307',
            button: '#DC2F02',
            input: '#F4F4F4',
        };


    const [message, setMessage] = useState("");
    const { receiverId } = route.params;
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        loadMessages();
        const interval = setInterval(() => {
            loadMessages();
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const loadMessages = async () => {
        try {
            const response = await getMessages(receiverId);
            setMessages(response.data);
        } catch (error) {
            console.log(error);
        }
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
                        size={26}
                        color={COLORS.text}
                    />

                </TouchableOpacity>

                <Text
                    style={[
                        styles.title,
                        {
                            color: COLORS.text,
                        },
                    ]}>
                    Chat
                </Text>

            </View>

            <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                ListEmptyComponent={
                    <View
                        style={styles.empty}>

                        <Text
                            style={{
                                color: COLORS.text,
                            }}>
                            Start your conversation
                        </Text>

                    </View>
                }
                renderItem={({ item }) => (

                    <View
                        style={[
                            styles.message,
                            {
                                backgroundColor: COLORS.card,
                            },
                        ]}>

                        <Text
                            style={{
                                color: COLORS.text,
                            }}>
                            {item.message}
                        </Text>

                    </View>

                )}
            />

            <View
                style={[
                    styles.bottom,
                    {
                        borderTopColor: COLORS.line,
                    },
                ]}>

                <TextInput
                    placeholder="Type a message..."
                    placeholderTextColor="gray"
                    value={message}
                    onChangeText={setMessage}
                    style={[
                        styles.input,
                        {
                            backgroundColor: COLORS.input,
                            color: COLORS.text,
                        },
                    ]}
                />

                <TouchableOpacity
                    style={[styles.send, { backgroundColor: COLORS.button, },]}
                    onPress={async () => {
                        if (!message.trim()) return;
                        try {
                            await sendMessage(receiverId, message,);
                            setMessage("");
                            loadMessages();
                        } catch (error) {
                            console.log(error);
                        }
                    }}>

                    <Send
                        size={20}
                        color="#fff"
                    />
                </TouchableOpacity>

            </View>
        </SafeAreaView>

    );

}

export default ChatScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
    },

    title: {
        fontSize: 22,
        fontWeight: '700',
        marginLeft: 20,
    },

    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    message: {
        padding: 14,
        borderRadius: 14,
        margin: 10,
        maxWidth: '80%',
    },

    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        padding: 10,
    },

    input: {
        flex: 1,
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 50,
    },

    send: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },

});
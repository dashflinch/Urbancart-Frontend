import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    ScrollView,
    Alert,
} from 'react-native';
import { addSellerProduct } from '../../../services/seller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, PackagePlus } from 'lucide-react-native';


function AddProductScreen({ navigation }: any) {


    const [loading, setLoading] = useState(false);
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


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState('');


    const handleAddProduct = async () => {

        if (!name || !price || !stock) {
            Alert.alert(
                'Error',
                'Please fill required fields'
            );
            return;
        }

        try {
            setLoading(true);

            await addSellerProduct(
                {
                    name,
                    description,
                    price: Number(price),
                    stock: Number(stock),
                    image,
                }
            );

            Alert.alert(
                'Success',
                'Product added successfully!'
            );

            setName('');
            setDescription('');
            setPrice('');
            setStock('');
            setImage('');


        } catch (error: any) {

            console.log(
                error.response?.data
            );


            Alert.alert(
                'Error',
                error.response?.data?.detail ||
                'Failed to add product'
            );


        } finally {
            setLoading(false);
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

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}>

                {/* HEADER */}

                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>

                        <ArrowLeft
                            size={28}
                            color={COLORS.urban}
                        />
                    </TouchableOpacity>


                    <Text
                        style={[
                            styles.headerTitle,
                            {
                                color: COLORS.urban,
                            },
                        ]}>
                        Add Product
                    </Text>


                    <PackagePlus
                        size={28}
                        color={COLORS.cart}
                    />
                </View>


                {/* PRODUCT CARD */}

                <View
                    style={[
                        styles.formCard,
                        {
                            backgroundColor: COLORS.card,
                            borderColor: COLORS.line,
                        },
                    ]}>


                    <Text
                        style={[
                            styles.heading,
                            {
                                color: COLORS.urban,
                            },
                        ]}>
                        Product Details
                    </Text>


                    <Text
                        style={[
                            styles.subHeading,
                            {
                                color: COLORS.desc,
                            },
                        ]}>
                        Add your product information
                    </Text>


                    {/* PRODUCT NAME */}

                    <Text
                        style={[
                            styles.label,
                            {
                                color: COLORS.urban,
                            },
                        ]}>
                        Product Name
                    </Text>

                    <TextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter Product Name"
                        placeholderTextColor="gray"
                        style={[
                            styles.input,
                            {
                                backgroundColor: COLORS.inputBg,
                                borderColor: COLORS.line,
                                color: COLORS.urban,
                            },
                        ]}
                    />


                    {/* DESCRIPTION */}

                    <Text
                        style={[
                            styles.label,
                            {
                                color: COLORS.urban,
                            },
                        ]}>
                        Description
                    </Text>

                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter Product Description"
                        placeholderTextColor="gray"
                        multiline
                        style={[
                            styles.descriptionInput,
                            {
                                backgroundColor: COLORS.inputBg,
                                borderColor: COLORS.line,
                                color: COLORS.urban,
                            },
                        ]}
                    />


                    {/* PRICE */}

                    <Text
                        style={[
                            styles.label,
                            {
                                color: COLORS.urban,
                            },
                        ]}>
                        Price
                    </Text>

                    <TextInput
                        value={price}
                        onChangeText={setPrice}
                        placeholder="Enter Product Price"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        style={[
                            styles.input,
                            {
                                backgroundColor: COLORS.inputBg,
                                borderColor: COLORS.line,
                                color: COLORS.urban,
                            },
                        ]}
                    />


                    {/* STOCK */}

                    <Text
                        style={[
                            styles.label,
                            {
                                color: COLORS.urban,
                            },
                        ]}>
                        Stock
                    </Text>

                    <TextInput
                        value={stock}
                        onChangeText={setStock}
                        placeholder="Enter Product Stock"
                        placeholderTextColor="gray"
                        keyboardType="numeric"
                        style={[
                            styles.input,
                            {
                                backgroundColor: COLORS.inputBg,
                                borderColor: COLORS.line,
                                color: COLORS.urban,
                            },
                        ]}
                    />


                    {/* IMAGE */}

                    <Text
                        style={[
                            styles.label,
                            {
                                color: COLORS.urban,
                            },
                        ]}>
                        Image URL
                    </Text>

                    <TextInput
                        value={image}
                        onChangeText={setImage}
                        placeholder="Enter Product Image URL"
                        placeholderTextColor="gray"
                        style={[
                            styles.input,
                            {
                                backgroundColor: COLORS.inputBg,
                                borderColor: COLORS.line,
                                color: COLORS.urban,
                            },
                        ]}
                    />


                    {/* BUTTON */}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={handleAddProduct}
                        disabled={loading}
                        style={[
                            styles.button,
                            {
                                backgroundColor: COLORS.button,
                            },
                        ]}>

                        <PackagePlus
                            size={24}
                            color={COLORS.buttonText}
                        />

                        <Text
                            style={[
                                styles.buttonText,
                                {
                                    color: COLORS.buttonText,
                                },
                            ]}>
                            {loading ? 'Adding Product...' : 'Add Product'}
                        </Text>

                    </TouchableOpacity>


                </View>

            </ScrollView>

        </SafeAreaView>

    );
}


export default AddProductScreen;


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    scrollContainer: {
        paddingBottom: 40,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 18,
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
    },

    formCard: {
        marginHorizontal: 20,
        borderRadius: 20,
        borderWidth: 1,
        padding: 20,
    },

    heading: {
        fontSize: 26,
        fontWeight: '800',
    },

    subHeading: {
        fontSize: 15,
        marginTop: 5,
        marginBottom: 20,
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

    descriptionInput: {
        height: 120,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingTop: 15,
        fontSize: 16,
        textAlignVertical: 'top',
    },

    button: {
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 35,
    },

    buttonText: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 10,
    },

});
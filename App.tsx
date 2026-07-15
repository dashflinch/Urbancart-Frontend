import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SellerDashboard from './src/screens/Seller/Dashboard/SellerDashboard';
import WelcomeScreen from './src/screens/Auth/WelcomeScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import SignupScreen from './src/screens/Auth/SignupScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import AddProductScreen from './src/screens/Seller/AddProduct/AddProductScreen';
import SellerProductsScreen from './src/screens/Seller/Products/SellerProductsScreen';
import CustomerProfileScreen from './src/screens/Profile/CustomerProfileScreen';
import BuyNowScreen from './src/screens/Customer/BuyNowScreen';
import ProductDetailsScreen from './src/screens/Product/ProductDetailsScreen';
import SellerOrdersScreen from './src/screens/Seller/Orders/OrdersScreen';
import MessagesScreen from './src/screens/Message/MessagesScreen';
import ChatScreen from './src/screens/Message/ChatScreen';
import CustomerOrdersScreen from './src/screens/Customer/CustomerOrderScreen';
import { CartProvider } from './src/screens/Context/CartContext';
import CartScreen from './src/screens/Customer/CartScreen';
import CheckoutScreen from './src/screens/Customer/CheckoutScreen';
import WishlistScreen from './src/screens/Customer/WishlistScreen';
import { WishlistProvider } from './src/screens/Context/WishlistContext';



const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
            }}>

            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
            />

            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />

            <Stack.Screen
              name="Signup"
              component={SignupScreen}
            />

            <Stack.Screen
              name="Home"
              component={HomeScreen}
            />

            <Stack.Screen
              name="SellerDashboard"
              component={SellerDashboard}
            />

            <Stack.Screen
              name="AddProduct"
              component={AddProductScreen}
            />

            <Stack.Screen
              name="SellerProducts"
              component={SellerProductsScreen}
            />

            <Stack.Screen
              name="SellerOrders"
              component={SellerOrdersScreen}
            />

            <Stack.Screen
              name="CustomerProfile"
              component={CustomerProfileScreen}
            />

            <Stack.Screen
              name="ProductDetails"
              component={ProductDetailsScreen}
            />

            <Stack.Screen
              name="BuyNow"
              component={BuyNowScreen}
            />

            <Stack.Screen
              name="Messages"
              component={MessagesScreen}
            />

            <Stack.Screen
              name="Chat"
              component={ChatScreen}
            />

            <Stack.Screen
              name="CustomerOrders"
              component={CustomerOrdersScreen}
            />

            <Stack.Screen
              name="Cart"
              component={CartScreen}
            />

            <Stack.Screen
              name="Checkout"
              component={CheckoutScreen}
            />

            <Stack.Screen
              name="Wishlist"
              component={WishlistScreen}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;
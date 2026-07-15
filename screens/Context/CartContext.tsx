import React, {
    createContext,
    useContext,
    useState,
} from 'react';

type CartItem = {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    stock: number;
    seller_id: number;
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (id: number) => void;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType>(
    {} as CartContextType
);

export const CartProvider = ({ children }: any) => {

    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (product: any) => {

        const existing = cart.find(
            item => item.id === product.id
        );

        if (existing) {

            setCart(
                cart.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                )
            );

        } else {

            setCart([
                ...cart,
                {
                    ...product,
                    quantity: 1,
                },
            ]);

        }

    };

    const removeFromCart = (id: number) => {

        setCart(
            cart.filter(item => item.id !== id)
        );

    };

    const increaseQuantity = (id: number) => {

        setCart(
            cart.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );

    };

    const decreaseQuantity = (id: number) => {

        setCart(
            cart.map(item =>
                item.id === id
                    ? {
                        ...item,
                        quantity:
                            item.quantity > 1
                                ? item.quantity - 1
                                : 1,
                    }
                    : item
            )
        );

    };

    const clearCart = () => {

        setCart([]);

    };

    return (

        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
            }}>

            {children}

        </CartContext.Provider>

    );

};

export const useCart = () => useContext(CartContext);
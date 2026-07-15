import React, {
    createContext,
    useContext,
    useState,
} from 'react';

type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    description?: string;
    stock?: number;
};

type WishlistContextType = {
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;
    toggleWishlist: (product: Product) => void;
};

const WishlistContext =
    createContext<WishlistContextType | undefined>(
        undefined,
    );

export const WishlistProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [wishlist, setWishlist] = useState<Product[]>([]);

    const addToWishlist = (product: Product) => {
        setWishlist(current => {
            const exists = current.some(
                item => item.id === product.id,
            );

            if (exists) {
                return current;
            }

            return [...current, product];
        });
    };

    const removeFromWishlist = (id: number) => {
        setWishlist(current =>
            current.filter(item => item.id !== id),
        );
    };

    const isInWishlist = (id: number) => {
        return wishlist.some(item => item.id === id);
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                toggleWishlist,
            }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);

    if (!context) {
        throw new Error(
            'useWishlist must be used inside WishlistProvider',
        );
    }

    return context;
};
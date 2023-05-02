import { create } from "zustand";
interface CartItem {
  product_title: string;
  quantity: number;
  product_price: number;
}

type CartStore = {
  items: CartItem[];
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
  increaseQuantity: (item: CartItem) => void;
  decreaseQuantity: (item: CartItem) => void;
};

const useCartStore = create<CartStore>((set) => ({
  items: [],
  totalPrice: 0,
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
      totalPrice: state.totalPrice + item.quantity * item.product_price,
    })),

  removeItem: (item) =>
    set((state) => ({
      items: state.items.filter(
        (cartItem) => cartItem.product_title !== item.product_title
      ),
      totalPrice: state.totalPrice - (item.quantity * item.product_price || 0),
    })),
  clearCart: () =>
    set((state) => ({
      items: [],
      totalPrice: 0,
    })),
  increaseQuantity: (item) =>
    set((state) => ({
      items: state.items.map((cartItem) =>
        cartItem.product_title === item.product_title
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ),
      totalPrice: state.totalPrice + item.product_price,
    })),
  decreaseQuantity: (item) =>
    set((state) => ({
      items: state.items.map((cartItem) =>
        cartItem.product_title === item.product_title
          ? {
              ...cartItem,
              quantity: cartItem.quantity > 1 ? cartItem.quantity - 1 : 1,
            }
          : cartItem
      ),
      totalPrice: state.totalPrice - item.product_price,
    })),
}));

export default useCartStore;

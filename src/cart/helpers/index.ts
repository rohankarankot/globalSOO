import { AddToCart } from '../dto/add-to-cart';

export const calculateCartItemPrice = (cartItems) => {
  return cartItems?.reduce((acc: number, item: AddToCart) => {
    return (acc += item.finalPrice);
  }, 0);
};

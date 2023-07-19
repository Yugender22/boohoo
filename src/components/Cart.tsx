import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { withBadge, Icon } from 'react-native-elements';

interface IProps {
  quantity: number,
  onPress: () => void,
}
export const Cart: React.FC<IProps> = (props: IProps) => {

  const CartBadge = withBadge(props.quantity)(Icon)
  const CartIcon = () => (<CartBadge type={'material-community'} name='cart-outline' color={'black'} size={24} />)

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}>
      <View style={styles.addToCartButton}>
        {props.quantity > 0 ?
          <CartIcon />
          :
          <Icon type={'material-community'} name='cart-outline' color={'black'} size={24} />
        }
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  addToCartButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addToCart: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 10,
  },
  quantityColor: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
})
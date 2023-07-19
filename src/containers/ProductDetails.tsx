import React, { useMemo } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ProductType } from "../types";
import { useRoute } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { formatAmount } from '../utils/util';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addItem, removeItem } from '../redux/slices/CartSlice';
import { CartItem } from '../types/CartItem';
import { QuantityButton } from '../components';
import { ProductsTestIDs } from '../constants/TestIDs';

interface IProps {
  product: ProductType
}

export const ProductDetails: React.FC = () => {

  const route = useRoute()
  const params = route.params as IProps
  const product = params.product
  console.log('route', route)

  const dispatch = useAppDispatch();
  const cartItem = useAppSelector(state => state.cart.data?.find((item: CartItem) => item.product.id === product.id))

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View >
        <Image
          source={{
            uri: product.img,
            cache: 'only-if-cached'
          }}
          defaultSource={require('../assets/placeholder.png')}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.details}>
          <View style={styles.textView}>
            <Text style={styles.description}>{product.name}</Text>
            <Text style={styles.amount}>
              {formatAmount(product.price)}
            </Text>
          </View>
          <View style={styles.textView}>
            <View style={{ flex: 0.5 }}>
              <View style={{ backgroundColor: product.colour.toLowerCase(), height: 20, width: 20, marginTop: 10 }} />
            </View>
            {!cartItem ?
              <TouchableOpacity
                testID={ProductsTestIDs.AddToCartTestId}
                onPress={() => dispatch(addItem({ product: product, quantity: 1 }))}
                style={styles.addToCartButton}>
                <Text style={styles.addToCart}>Add to cart</Text>
              </TouchableOpacity>
              :
              <QuantityButton
                quantity={cartItem.quantity}
                increase={() => dispatch(addItem(cartItem))}
                decrease={() => dispatch(removeItem(cartItem))}
              />}
          </View>

        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: Dimensions.get('window').height * 0.7,
  },
  details: {
    padding: 20,
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    flex: 0.7
  },
  amount: {
    fontSize: 18,
    fontWeight: '500',
    flex: 0.3,
    textAlign: 'right'
  },
  addToCartButton: {
    borderRadius: 20,
    flex: 0.5,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  addToCart: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 10
  },
  textView: {
    flex: 1,
    flexDirection: 'row',
  }
})
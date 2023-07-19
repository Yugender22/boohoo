import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { QuantityTestIDs } from '../constants/TestIDs';

interface IProps {
  quantity: number,
  increase: () => void,
  decrease: () => void,
}
export const QuantityButton: React.FC<IProps> = (props: IProps) => {

  return (
    <View style={styles.addToCartButton} testID={QuantityTestIDs.QuantityTestId}>
      <TouchableOpacity
        testID={QuantityTestIDs.DecreaseTestId}
        onPress={props.decrease}
        style={styles.container}>
        <Text style={styles.addToCart}>-</Text>
      </TouchableOpacity>
      <Text testID={QuantityTestIDs.QuantityValueTestId} style={[styles.addToCart, styles.quantityColor]}>{props.quantity}</Text>
      <TouchableOpacity
        testID={QuantityTestIDs.IncreaseTestId}
        onPress={props.increase}
        style={styles.container}>
        <Text style={styles.addToCart}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addToCartButton: {
    flexDirection: 'row',
    borderRadius: 20,
    flex: 0.5,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  addToCart: {
    flex: 0.6,
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    padding: 6,
  },
  quantityColor: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  textView: {
    flex: 1,
    flexDirection: 'row',
  }
})
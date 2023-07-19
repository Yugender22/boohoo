import * as React from 'react';
import { ProductType } from '../types';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { formatAmount } from '../utils/util';
import { CartItem } from '../types/CartItem';
import { QuantityButton } from './QuantityButton';

interface IProps {
  item: CartItem
  onPress: (item: ProductType) => void
  increase: () => void
  decrease: () => void
}

export const CartRow: React.FC<IProps> = (props: IProps) => {

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => props.onPress(props.item.product)}>
      <View style={styles.rowFlex}>
        <FastImage
          source={{
            uri: props.item.product.img,
            cache: FastImage.cacheControl.cacheOnly
          }}
          defaultSource={require('../assets/placeholder.png')}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.details}>
          <Text style={styles.description}>{props.item.product.name}</Text>
          <View style={styles.rowFlex}>
            <View style={[styles.textView, { flex: 0.4 }]}>
              <Text style={[styles.description, { marginVertical: 5 }]}>
                {formatAmount(props.item.product.price)}
              </Text>
              <View style={{ backgroundColor: props.item.product.colour.toLowerCase(), height: 20, width: 20 }} />
            </View>

          </View>
          <View style={{ flex: 1, maxWidth: Dimensions.get('window').width / 2.5, marginTop: 10 }}>
            <QuantityButton quantity={props.item.quantity} increase={props.increase} decrease={props.decrease} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  rowFlex: {
    flexDirection: 'row',
  },
  image: {
    alignSelf: 'center',
    width: Dimensions.get('window').width / 4,
    height: Dimensions.get('window').height / 4.5,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  description: {
    fontSize: 18,
    fontWeight: '500'
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

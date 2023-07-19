import * as React from 'react';
import { ProductType } from '../types';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { formatAmount } from '../utils/util';

interface ProductProps {
  product: ProductType
  onPress: (item: ProductType) => void
}

export const Product: React.FC<ProductProps> = (props: ProductProps) => {

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: props.product.colour }]}
      onPress={() => props.onPress(props.product)}>
      <View>
        <FastImage
          source={{
            uri: props.product.img,
            cache: FastImage.cacheControl.cacheOnly
          }}
          defaultSource={require('../assets/placeholder.png')}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />
        <View style={styles.details}>
          <Text style={styles.description}>{props.product.name}</Text>
          <View style={styles.textView}>
            <Text style={[styles.description, { marginVertical: 5 }]}>
              {formatAmount(props.product.price)}
            </Text>
            <View style={{ backgroundColor: props.product.colour.toLowerCase(), height: 20, width: 20 }} />

          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 2.3,
  },
  details: {
    padding: 10,
  },
  description: {
    fontSize: 18,
    fontWeight: '500'
  },
  textView: {
    flexDirection: 'column',
  }
})
